
import subprocess
import platform

def block_ip(ip_address: str) -> bool:
    """
    Block Attacker IP automatically.
    Linux: use iptables(production)
    Windows: simulation mode (development)
    """
    if platform.system() == "Linux":
        try:
            
            check = subprocess.run(
                ["iptables", "-C", "INPUT", "-s", ip_address, "-j", "DROP"],
                capture_output=True
            )
            if check.returncode == 0:
                print(f"[FIREWALL] Already blocked: {ip_address}")
                return True

            # Block 
            subprocess.run(
                ["iptables", "-A", "INPUT", "-s", ip_address, "-j", "DROP"],
                check=True, capture_output=True
            )
            print(f"[FIREWALL] ✓ Blocked: {ip_address}")
            return True

        except Exception as e:
            print(f"[FIREWALL] Error blocking {ip_address}: {e}")
            return False
    else:
        # Windows development mode
        print(f"[FIREWALL][SIMULATION] Would block IP: {ip_address}")
        return True


def unblock_ip(ip_address: str) -> bool:
    """IP block hatao"""
    if platform.system() == "Linux":
        try:
            subprocess.run(
                ["iptables", "-D", "INPUT", "-s", ip_address, "-j", "DROP"],
                check=True, capture_output=True
            )
            print(f"[FIREWALL] ✓ Unblocked: {ip_address}")
            return True
        except Exception as e:
            print(f"[FIREWALL] Error unblocking {ip_address}: {e}")
            return False
    else:
        print(f"[FIREWALL][SIMULATION] Would unblock IP: {ip_address}")
        return True