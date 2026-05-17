
"""
PCAP Replay Service
===================
Replay old PCAP files 
ML classify 
To show evaluators real attack demo 
"""

import asyncio
import httpx
from fastapi import APIRouter, UploadFile, File, HTTPException
import tempfile
import os

router = APIRouter(prefix="/simulate", tags=["Demo & Simulation"])

ML_URL     = "http://nt_ml_api:8001/predict"
INGEST_URL = "http://localhost:8000/threats/ingest"


@router.post("/attack")
async def simulate_attack(
    attack_type: str = "SSH Brute Force",
    attacker_ip: str = "220.181.38.148",
    count: int = 1
):
    """
    Manual attack simulate karo — demo ke liye
    Evaluators yeh endpoint call karke
    dashboard par live update dekh sakte hain
    """
    attack_map = {
        "SSH Brute Force":   22,
        "DDoS Attack":       80,
        "Port Scan":         443,
        "SQL Injection":     3306,
        "Malware Upload":    445,
        "FTP Brute Force":   21,
    }

    port = attack_map.get(attack_type, 22)
    results = []

    async with httpx.AsyncClient(timeout=10) as client:
        for i in range(min(count, 10)):  # max 10
            resp = await client.post(INGEST_URL, json={
                "attacker_ip":  attacker_ip,
                "attack_type":  attack_type,
                "attack_port":  port,
                "source_tool":  "Scapy",
            })
            results.append(resp.json())
            await asyncio.sleep(0.5)

    return {
        "message": f"{count} attacks simulated",
        "attack_type": attack_type,
        "attacker_ip": attacker_ip,
        "results": results
    }


@router.post("/pcap-replay")
async def replay_pcap(file: UploadFile = File(...)):
    """
    PCAP file upload karo → ML classify karo
    Evaluators apni pcap files yahan upload kar sakte hain
    """
    try:
        from scapy.all import rdpcap, IP, TCP, UDP
    except ImportError:
        raise HTTPException(
            status_code=503,
            detail="Scapy not installed in this environment"
        )

    # Save it in Temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pcap") as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name

    try:
        packets = rdpcap(tmp_path)
        results = []

        async with httpx.AsyncClient(timeout=30) as client:
            for pkt in packets[:100]:  # max 100 packets
                if not pkt.haslayer(IP):
                    continue

                src_ip   = pkt[IP].src
                dst_port = 0

                if pkt.haslayer(TCP):
                    dst_port = pkt[TCP].dport
                elif pkt.haslayer(UDP):
                    dst_port = pkt[UDP].dport

                # Extract simple features
                features = {
                    "Destination Port":   dst_port,
                    "Flow Duration":      1000000,
                    "Flow Packets/s":     100,
                    "Flow Bytes/s":       50000,
                    "Packet Length Mean": len(pkt),
                    "Flow IAT Mean":      10000,
                    "Flow IAT Std":       5000,
                    "Fwd Packets/s":      50,
                    "Bwd Packets/s":      50,
                    "Init_Win_bytes_forward":  65535,
                    "Init_Win_bytes_backward": 65535,
                }

                # ML classify 
                try:
                    ml_resp = await client.post(
                        ML_URL,
                        json={"features": features}
                    )
                    ml_result = ml_resp.json()
                    label = ml_result.get("label", "Unknown")

                    if label != "BENIGN":
                        await client.post(INGEST_URL, json={
                            "attacker_ip":  src_ip,
                            "attack_type":  label,
                            "attack_port":  dst_port,
                            "source_tool":  "PCAP Replay",
                        })
                        results.append({
                            "ip": src_ip,
                            "attack": label,
                            "risk": ml_result.get("risk_score", 0)
                        })
                except Exception:
                    continue

        return {
            "message":      "PCAP replayed successfully",
            "packets_read": len(packets),
            "attacks_found": len(results),
            "attacks":       results[:20]
        }

    finally:
        os.unlink(tmp_path)