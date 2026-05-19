
"""
Dionaea Malware Honeypot Log Reader
Reads every 60 seconds the dionaea.json file
Detects FTP/SMB/HTTP malware upload attempts
"""

import json
import os
import asyncio
import httpx

DIONAEA_LOG     = "/app/enterprise-sensors/dionaea/logs/dionaea.json"
LAST_POS_FILE   = "/app/dionaea_last_pos.txt"
API_INGEST_URL  = "http://nt_api:8000/threats/ingest"

# Port → Attack type mapping
PORT_ATTACK_MAP = {
    21:  "FTP Attack",
    445: "SMB/Malware Upload",
    80:  "HTTP Exploit Attempt",
    443: "HTTPS Exploit Attempt",
    3306: "MySQL Attack",
    1433: "MSSQL Attack",
    23:  "Telnet Attack",
}


def _get_last_position() -> int:
    if os.path.exists(LAST_POS_FILE):
        try:
            with open(LAST_POS_FILE, "r") as f:
                return int(f.read().strip() or 0)
        except Exception:
            return 0
    return 0


def _save_position(pos: int):
    with open(LAST_POS_FILE, "w") as f:
        f.write(str(pos))


async def read_dionaea_logs():
    if not os.path.exists(DIONAEA_LOG):
        return

    position = _get_last_position()

    with open(DIONAEA_LOG, "r") as f:
        f.seek(position)
        new_lines = f.readlines()
        new_position = f.tell()

    if not new_lines:
        return

    async with httpx.AsyncClient() as client:
        for line in new_lines:
            try:
                log = json.loads(line.strip())

                src_ip   = log.get("src_ip",   log.get("remote_host", "Unknown"))
                dst_port = log.get("dst_port", log.get("local_port",  445))

                attack_type = PORT_ATTACK_MAP.get(dst_port, "Malware Upload")

                # Malware hash capture kiya?
                malware_hash = log.get("md5hash", log.get("sha512hash", ""))
                if malware_hash:
                    attack_type = "Malware Upload"

                if src_ip == "Unknown" or src_ip == "127.0.0.1":
                    continue

                attack_data = {
                    "attacker_ip":  src_ip,
                    "attack_type":  attack_type,
                    "attack_port":  dst_port,
                    "source_tool":  "Dionaea"
                }

                await client.post(
                    API_INGEST_URL,
                    json=attack_data,
                    timeout=5.0
                )
                print(f"[DIONAEA] Ingested: {src_ip} → {attack_type} (port {dst_port})")

            except json.JSONDecodeError:
                continue
            except Exception as e:
                print(f"[DIONAEA] Error: {e}")
                continue

    _save_position(new_position)


async def dionaea_background_task():
    """Har 60 second mein Dionaea logs check karo"""
    print("[DIONAEA] Log reader started — checking every 60s")
    while True:
        try:
            await read_dionaea_logs()
        except Exception as e:
            print(f"[DIONAEA] Background task error: {e}")
        await asyncio.sleep(60)