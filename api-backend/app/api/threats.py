from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import db, models
from sqlalchemy import func
from typing import Optional
import requests
from ..services.firewall import block_ip

router = APIRouter(prefix="/threats", tags=["Threats Intelligence"])

# Attack type → risk score mapping
RISK_SCORES = {
    "DDoS Attack": 9,
    "Malware Upload": 9,
    "SSH Brute Force": 8,
    "SSH Unauthorized Access": 8,
    "SQL Injection": 7,
    "FTP Brute Force": 6,
    "Port Scan": 5,
    "Botnet Activity": 8,
    "Web Brute Force": 7,
    "XSS Attack": 6,
}

HIGH_RISK_TYPES = [
    "SSH Brute Force", "DDoS Attack",
    "Malware Upload", "SSH Unauthorized Access",
    "Botnet Activity", "SQL Injection",
]

# International IP → coordinates (for simulate attacks)
COUNTRY_COORDS = {
    "China":          {"lat": 39.9042, "lng": 116.4074},
    "Russia":         {"lat": 55.7558, "lng": 37.6173},
    "Germany":        {"lat": 52.5200, "lng": 13.4050},
    "United States":  {"lat": 37.0902, "lng": -95.7129},
    "Netherlands":    {"lat": 52.3676, "lng": 4.9041},
    "France":         {"lat": 48.8566, "lng": 2.3522},
    "United Kingdom": {"lat": 51.5074, "lng": -0.1278},
    "India":          {"lat": 20.5937, "lng": 78.9629},
    "Iran":           {"lat": 35.6892, "lng": 51.3890},
    "Pakistan":       {"lat": 30.3753, "lng": 69.3451},
}

CITY_COORDS = {
    "Beijing":     {"lat": 39.9042, "lng": 116.4074},
    "Shanghai":    {"lat": 31.2304, "lng": 121.4737},
    "Moscow":      {"lat": 55.7558, "lng": 37.6173},
    "Frankfurt":   {"lat": 50.1109, "lng": 8.6821},
    "Brandenburg": {"lat": 52.4125, "lng": 12.5316},
    "Fremont":     {"lat": 37.5485, "lng": -121.9886},
    "Amsterdam":   {"lat": 52.3676, "lng": 4.9041},
    "London":      {"lat": 51.5074, "lng": -0.1278},
    "Karachi":     {"lat": 24.8607, "lng": 67.0011},
    "Lahore":      {"lat": 31.5204, "lng": 74.3587},
    "Islamabad":   {"lat": 33.6844, "lng": 73.0479},
    "Quetta":      {"lat": 30.1798, "lng": 66.9750},
    "Peshawar":    {"lat": 34.0151, "lng": 71.5249},
}


def get_coords(location: str) -> dict:
    """Location string se coordinates nikalo."""
    if not location or location in ("Unknown", "Unknown Location"):
        return {"lat": 30.3753, "lng": 69.3451}

    # City match
    for city, coords in CITY_COORDS.items():
        if city.lower() in location.lower():
            return coords

    # Country match
    for country, coords in COUNTRY_COORDS.items():
        if country.lower() in location.lower():
            return coords

    return {"lat": 30.3753, "lng": 69.3451}


@router.post("/ingest")
def ingest_threat_data(threat_data: dict, db_session: Session = Depends(db.get_db)):
    ip_address = threat_data.get("attacker_ip")
    if not ip_address:
        raise HTTPException(status_code=400, detail="IP is required")

    # GeoIP lookup
    try:
        response = requests.get(
            f"http://ip-api.com/json/{ip_address}",
            timeout=5
        ).json()
        city    = response.get("city",    "Unknown")
        country = response.get("country", "Unknown")
        if city and city != "Unknown":
            location = f"{city}, {country}"
        else:
            location = country if country != "Unknown" else "Unknown Location"
    except Exception:
        location = "Unknown Location"

    attack_type = threat_data.get("attack_type", "Unknown")

    new_attack = models.AttackLogs(
        attacker_ip      = ip_address,
        attack_type      = attack_type,
        attack_port      = threat_data.get("attack_port", 0),
        attacker_location= location,
        source_tool      = threat_data.get("source_tool", "Scapy Engine"),
        is_killed        = "Active"
    )

    db_session.add(new_attack)
    db_session.commit()
    db_session.refresh(new_attack)

    # Auto-block high risk
    auto_blocked = False
    if attack_type in HIGH_RISK_TYPES:
        blocked = block_ip(ip_address)
        if blocked:
            new_attack.is_killed = "Blocked"
            db_session.commit()
            auto_blocked = True

    return {
        "message":        "Attack logged successfully",
        "attack_id":      new_attack.id,
        "location_detected": location,
        "auto_blocked":   auto_blocked,
        "is_killed":      new_attack.is_killed,
    }


@router.get("/stats")
def get_attack_stats(db_session: Session = Depends(db.get_db)):
    total   = db_session.query(func.count(models.AttackLogs.id)).scalar() or 0
    active  = db_session.query(func.count(models.AttackLogs.id)).filter(
                  models.AttackLogs.is_killed == "Active").scalar() or 0
    blocked = db_session.query(func.count(models.AttackLogs.id)).filter(
                  models.AttackLogs.is_killed == "Blocked").scalar() or 0

    top_attack = db_session.query(
        models.AttackLogs.attack_type,
        func.count(models.AttackLogs.attack_type).label("count")
    ).group_by(models.AttackLogs.attack_type).order_by(
        func.count(models.AttackLogs.attack_type).desc()
    ).first()

    return {
        "total_threats":     total,
        "active_threats":    active,
        "blocked_threats":   blocked,
        "latest_attack_type": top_attack[0] if top_attack else "None",
        "system_health":     "Online",
        "sensors_active":    {"cowrie": 14, "dionaea": 8},
    }


@router.get("/distribution")
def get_distribution(db_session: Session = Depends(db.get_db)):
    results = db_session.query(
        models.AttackLogs.attack_type,
        func.count(models.AttackLogs.id).label("count")
    ).group_by(models.AttackLogs.attack_type).all()
    return [{"name": r.attack_type, "value": r.count} for r in results]


@router.get("/live-map")
def get_map_data(db_session: Session = Depends(db.get_db)):
    attacks = db_session.query(models.AttackLogs).order_by(
        models.AttackLogs.timestamp.desc()
    ).limit(50).all()

    map_data = []
    for attack in attacks:
        coords = get_coords(attack.attacker_location)
        map_data.append({
            "id":          attack.id,
            "ip":          attack.attacker_ip,
            "attack_type": attack.attack_type,
            "location":    attack.attacker_location,
            "lat":         coords["lat"],
            "lng":         coords["lng"],
            "is_killed":   attack.is_killed,
            "timestamp":   attack.timestamp.isoformat(),
        })
    return map_data


@router.get("/")
def get_all_threats(
    db_session:  Session = Depends(db.get_db),
    attack_type: Optional[str] = Query(None),
    is_killed:   Optional[str] = Query(None),
    limit:       int = Query(100, ge=1, le=500),
    skip:        int = Query(0,   ge=0),
):
    query = db_session.query(models.AttackLogs)
    if attack_type:
        query = query.filter(models.AttackLogs.attack_type == attack_type)
    if is_killed:
        query = query.filter(models.AttackLogs.is_killed == is_killed)

    attacks = query.order_by(
        models.AttackLogs.timestamp.desc()
    ).offset(skip).limit(limit).all()

    return [
        {
            "id":               a.id,
            "attacker_ip":      a.attacker_ip,
            "attack_type":      a.attack_type,
            "attack_port":      a.attack_port,
            "attacker_location": a.attacker_location,
            "source_tool":      a.source_tool,
            "is_killed":        a.is_killed,
            "timestamp":        a.timestamp,
            "risk_score":       RISK_SCORES.get(a.attack_type, 5),
        }
        for a in attacks
    ]


@router.get("/{attack_id}")
def get_single_threat(attack_id: int, db_session: Session = Depends(db.get_db)):
    attack = db_session.query(models.AttackLogs).filter(
        models.AttackLogs.id == attack_id
    ).first()

    if not attack:
        raise HTTPException(status_code=404, detail=f"Attack {attack_id} not found")

    return {
        "id":               attack.id,
        "attacker_ip":      attack.attacker_ip,
        "attack_type":      attack.attack_type,
        "attack_port":      attack.attack_port,
        "attacker_location": attack.attacker_location,
        "source_tool":      attack.source_tool,
        "is_killed":        attack.is_killed,
        "risk_score":       RISK_SCORES.get(attack.attack_type, 5),
        "timestamp":        attack.timestamp.isoformat(),
    }


    