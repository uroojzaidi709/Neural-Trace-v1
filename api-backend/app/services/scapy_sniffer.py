"""
Neural-Trace Scapy Packet Sniffer
==================================
Capture → Extract 30 features → ML classify → /threats/ingest

FIX: Direction detection bug — original code had:
  if flow_key in flow_tracker or flow_key not in flow_tracker:
  This is ALWAYS True, so every packet was 'fwd', bwd_count always 0.
  Fixed with seen_flow_keys set.
"""

import asyncio
import httpx
from collections import defaultdict

try:
    from scapy.all import sniff, IP, TCP, UDP
    SCAPY_AVAILABLE = True
except ImportError:
    SCAPY_AVAILABLE = False
    print("[SCAPY] Scapy not available — simulation mode")

ML_URL     = "http://nt_ml_api:8001/predict"
INGEST_URL = "http://nt_api:8000/threats/ingest"

flow_tracker   = defaultdict(list)
seen_flow_keys = set()  # FIX: tracks first-seen direction


def extract_features(packets: list) -> dict:
    if not packets:
        return {}

    first = packets[0]
    last  = packets[-1]

    fwd_packets = [p for p in packets if p.get('direction') == 'fwd']
    bwd_packets = [p for p in packets if p.get('direction') == 'bwd']

    fwd_lengths = [p.get('length', 0) for p in fwd_packets]
    bwd_lengths = [p.get('length', 0) for p in bwd_packets]
    all_lengths = [p.get('length', 0) for p in packets]

    timestamps    = [p.get('time', 0) for p in packets]
    flow_duration = (last.get('time', 0) - first.get('time', 0)) * 1e6

    iats = [timestamps[i+1] - timestamps[i] for i in range(len(timestamps)-1)]
    fwd_iats = [
        timestamps[i+1] - timestamps[i]
        for i in range(len(timestamps)-1)
        if packets[i].get('direction') == 'fwd'
    ]

    import statistics

    def safe_mean(lst): return statistics.mean(lst) if lst else 0.0
    def safe_std(lst):  return statistics.stdev(lst) if len(lst) > 1 else 0.0
    def safe_max(lst):  return max(lst) if lst else 0.0
    def safe_min(lst):  return min(lst) if lst else 0.0

    total_fwd_bytes = sum(fwd_lengths)
    total_bytes     = sum(all_lengths)
    total_packets   = len(packets)
    fwd_count       = len(fwd_packets)
    bwd_count       = len(bwd_packets)
    duration_sec    = max(flow_duration / 1e6, 0.001)
    dst_port        = first.get('dst_port', 0)

    return {
        "Destination Port":              dst_port,
        "Flow Duration":                 flow_duration,
        "Total Length of Fwd Packets":   total_fwd_bytes,
        "Fwd Packet Length Max":         safe_max(fwd_lengths),
        "Bwd Packet Length Min":         safe_min(bwd_lengths),
        "Flow Bytes/s":                  total_bytes / duration_sec,
        "Flow Packets/s":                total_packets / duration_sec,
        "Flow IAT Mean":                 safe_mean(iats) * 1e6,
        "Flow IAT Std":                  safe_std(iats) * 1e6,
        "Flow IAT Max":                  safe_max(iats) * 1e6,
        "Flow IAT Min":                  safe_min(iats) * 1e6,
        "Fwd IAT Total":                 sum(fwd_iats) * 1e6,
        "Fwd IAT Mean":                  safe_mean(fwd_iats) * 1e6,
        "Fwd IAT Min":                   safe_min(fwd_iats) * 1e6,
        "Fwd IAT Max":                   safe_max(fwd_iats) * 1e6,
        "Bwd Packets/s":                 bwd_count / duration_sec,
        "Fwd Packets/s":                 fwd_count / duration_sec,
        "Packet Length Mean":            safe_mean(all_lengths),
        "Packet Length Std":             safe_std(all_lengths),
        "Packet Length Variance":        safe_std(all_lengths) ** 2,
        "Average Packet Size":           safe_mean(all_lengths),
        "Avg Bwd Segment Size":          safe_mean(bwd_lengths),
        "Subflow Fwd Bytes":             total_fwd_bytes,
        "Bwd Header Length":             bwd_count * 20,
        "Fwd Header Length":             fwd_count * 20,
        "Init_Win_bytes_forward":        first.get('window', 0),
        "Init_Win_bytes_backward":       last.get('window', 0),
        "min_seg_size_forward":          safe_min(fwd_lengths) if fwd_lengths else 0,
        "Fwd PSH Flags":                 sum(1 for p in fwd_packets if p.get('psh', False)),
        "SYN Flag Count":                sum(1 for p in packets if p.get('syn', False)),
    }


async def classify_and_ingest(flow_key: str, features: dict, src_ip: str, dst_port: int):
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            ml_resp   = await client.post(ML_URL, json={"features": features})
            ml_result = ml_resp.json()

            label      = ml_result.get("label", "Unknown")
            risk_score = ml_result.get("risk_score", 5)
            confidence = ml_result.get("confidence", 0)

            if label == "BENIGN" and risk_score < 4:
                return

            label_map = {
                "SSH-Patator":                   "SSH Brute Force",
                "FTP-Patator":                   "FTP Brute Force",
                "DDoS":                          "DDoS Attack",
                "DoS Hulk":                      "DDoS Attack",
                "DoS GoldenEye":                 "DDoS Attack",
                "DoS slowloris":                 "DDoS Attack",
                "DoS Slowhttptest":              "DDoS Attack",
                "PortScan":                      "Port Scan",
                "Bot":                           "Botnet Activity",
                "Web Attack \u2013 Brute Force": "Web Brute Force",
                "Web Attack \u2013 XSS":         "XSS Attack",
            }
            attack_type = label_map.get(label, label)

            await client.post(INGEST_URL, json={
                "attacker_ip":  src_ip,
                "attack_type":  attack_type,
                "attack_port":  dst_port,
                "source_tool":  "Scapy",
                "risk_score":   risk_score,
                "confidence":   confidence,
            })
            print(f"[SCAPY] {src_ip}:{dst_port} → {attack_type} (risk:{risk_score} conf:{confidence:.2f})")

    except Exception as e:
        print(f"[SCAPY] Error: {e}")


def packet_callback(packet):
    try:
        if not packet.haslayer(IP):
            return

        src_ip  = packet[IP].src
        dst_ip  = packet[IP].dst
        length  = len(packet)
        ts      = packet.time

        src_port = dst_port = 0
        window = 0
        psh = syn = False

        if packet.haslayer(TCP):
            src_port = packet[TCP].sport
            dst_port = packet[TCP].dport
            window   = packet[TCP].window
            flags    = packet[TCP].flags
            psh      = bool(flags & 0x08)
            syn      = bool(flags & 0x02)
        elif packet.haslayer(UDP):
            src_port = packet[UDP].sport
            dst_port = packet[UDP].dport

        flow_key = f"{src_ip}:{src_port}-{dst_ip}:{dst_port}"
        rev_key  = f"{dst_ip}:{dst_port}-{src_ip}:{src_port}"

        # FIX: proper bidirectional tracking
        if rev_key in seen_flow_keys:
            direction = 'bwd'
            key = rev_key
        else:
            direction = 'fwd'
            key = flow_key
            seen_flow_keys.add(flow_key)

        flow_tracker[key].append({
            'time':      ts,
            'length':    length,
            'src_ip':    src_ip,
            'dst_port':  dst_port,
            'window':    window,
            'psh':       psh,
            'syn':       syn,
            'direction': direction,
        })

        pkts = flow_tracker[key]
        if len(pkts) >= 50:
            features = extract_features(pkts)
            if features:
                asyncio.create_task(classify_and_ingest(key, features, src_ip, dst_port))
            del flow_tracker[key]
            seen_flow_keys.discard(key)

    except Exception as e:
        print(f"[SCAPY] Packet error: {e}")


async def scapy_background_task():
    print("[SCAPY] Packet sniffer started")

    if not SCAPY_AVAILABLE:
        print("[SCAPY] Running in simulation mode")
        await _simulation_mode()
        return

    loop = asyncio.get_event_loop()
    await loop.run_in_executor(
        None,
        lambda: sniff(filter="ip", prn=packet_callback, store=False, iface="eth0")
    )


async def _simulation_mode():
    import random
    scenarios = [
        {"ip": "220.181.38.148", "port": 22,   "type": "SSH Brute Force"},
        {"ip": "45.33.32.156",   "port": 80,   "type": "DDoS Attack"},
        {"ip": "103.99.0.45",    "port": 443,  "type": "Port Scan"},
        {"ip": "185.220.101.1",  "port": 3306, "type": "SQL Injection"},
        {"ip": "194.165.16.11",  "port": 21,   "type": "FTP Brute Force"},
    ]
    async with httpx.AsyncClient(timeout=10) as client:
        while True:
            await asyncio.sleep(random.randint(45, 90))
            s = random.choice(scenarios)
            try:
                await client.post(INGEST_URL, json={
                    "attacker_ip": s["ip"], "attack_type": s["type"],
                    "attack_port": s["port"], "source_tool": "Scapy",
                })
                print(f"[SCAPY-SIM] {s['ip']} → {s['type']}")
            except Exception as e:
                print(f"[SCAPY-SIM] Error: {e}")

                