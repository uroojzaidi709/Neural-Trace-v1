
from app.database.db import SessionLocal, engine
from app.database import models

def seed_data():

    db = SessionLocal()

    if db.query(models.AttackLogs).first():
        print("Data already exists, skipping....")
        return 
    
    attacks = [

        models.AttackLogs(attacker_ip = "192.168.1.50", attack_type = "SSH Brute Force", attack_port = 22, attacker_location="Karachi, PK", source_tool="Cowrie"),
        models.AttackLogs(attacker_ip="103.45.12.9", attack_type="SQL Injection", attack_port=80, attacker_location="Lahore, PK", source_tool="Scapy"),
        models.AttackLogs(attacker_ip="45.22.11.90", attack_type="Port Scan", attack_port=443, attacker_location="Islamabad, PK", source_tool="Dionaea"),
        models.AttackLogs(attacker_ip="180.12.33.1", attack_type="DDoS Attack", attack_port=53, attacker_location="Quetta, PK", source_tool="Scapy")

    ]

    db.add_all(attacks)
    db.commit()
    print("Data seeded successfully")
    db.close()

    if __name__ == "__main__":
        seed_data()



