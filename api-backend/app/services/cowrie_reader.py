
"""
Cowrie SSH Honeypot Log Reader
Har 30 second mein cowrie.json padhta hai
aur naye attacks /threats/ingest ko bhejta hai
"""

import json
import os
import asyncio
import httpx

COWRIE_LOG      = "/app/enterprise-sensors/cowrie/logs/cowrie.json"
LAST_POS_FILE   = "/app/cowrie_last_pos.txt"
API_INGEST_URL  = "http://nt_api:8000/threats/ingest"


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


async def read_cowrie_logs():
    if not os.path.exists(COWRIE_LOG):
        return

    position = _get_last_position()

    with open(COWRIE_LOG, "r") as f:
        f.seek(position)
        new_lines = f.readlines()
        new_position = f.tell()

    if not new_lines:
        return

    # Yeh events process karo
    relevant_events = [
        "cowrie.login.failed",
        "cowrie.login.success",
        "cowrie.session.connect",
        "cowrie.command.input",
    ]

    async with httpx.AsyncClient() as client:
        for line in new_lines:
            try:
                log = json.loads(line.strip())

                if log.get("eventid") not in relevant_events:
                    continue

                # Attack type decide karo
                if log.get("eventid") == "cowrie.login.failed":
                    attack_type = "SSH Brute Force"
                elif log.get("eventid") == "cowrie.login.success":
                    attack_type = "SSH Unauthorized Access"
                else:
                    attack_type = "SSH Attack"

                attack_data = {
                    "attacker_ip":  log.get("src_ip",   "Unknown"),
                    "attack_type":  attack_type,
                    "attack_port":  log.get("dst_port", 22),
                    "source_tool":  "Cowrie"
                }

                await client.post(
                    API_INGEST_URL,
                    json=attack_data,
                    timeout=5.0
                )
                print(f"[COWRIE] Ingested: {attack_data['attacker_ip']} → {attack_type}")

            except json.JSONDecodeError:
                continue
            except Exception as e:
                print(f"[COWRIE] Error: {e}")
                continue

    _save_position(new_position)


async def cowrie_background_task():
    """Har 30 second mein Cowrie logs check karo"""
    print("[COWRIE] Log reader started — checking every 30s")
    while True:
        try:
            await read_cowrie_logs()
        except Exception as e:
            print(f"[COWRIE] Background task error: {e}")
        await asyncio.sleep(30)