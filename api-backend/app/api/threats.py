
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import db, models
from sqlalchemy import func
from typing import Optional 
import requests

router = APIRouter(prefix="/threats", tags=["Threats Intelligence"])

@router.post("/ingest")
def ingest_threat_data(threat_data: dict, db_session: Session = Depends(db.get_db)):

    ip_address = threat_data.get("attacker_ip")
    if not ip_address:
        raise HTTPException(status_code=400, detail="IP is required")
    
    try:
        response = requests.get(f"http://ip-api.com/json/{ip_address}", timeout=5).json()
        city = response.get('city', 'Unknown')
        country = response.get('country', 'Unknown')
        location = f"{city}, {country}"
    except Exception:
      
        location = "Unknown Location"

    new_attack = models.AttackLogs(
        attacker_ip=ip_address,
        attack_type=threat_data.get("attack_type", "Unknown"),
        attack_port=threat_data.get("attack_port", 0),
        attacker_location=location,
        source_tool=threat_data.get("source_tool", "Scapy Engine"),
        is_killed="Active"
    )         

    db_session.add(new_attack)
    db_session.commit()
    db_session.refresh(new_attack)
    
    return {
        "message": "Attack logged successfully",
        "attack_id": new_attack.id,
        "location_detected": location
    }

@router.get("/stats")
def get_attack_stats(db_session: Session = Depends(db.get_db)):
    
    total = db_session.query(func.count(models.AttackLogs.id)).scalar()

    active = db_session.query(func.count(models.AttackLogs.id)).filter(models.AttackLogs.is_killed == "Active").scalar()
    
    blocked = db_session.query(func.count(models.AttackLogs.id)).filter(models.AttackLogs.is_killed == "Blocked").scalar()

    top_attack = db_session.query(
        models.AttackLogs.attack_type,
        func.count(models.AttackLogs.attack_type).label("count")
    ).group_by(
        models.AttackLogs.attack_type
    ).order_by(
        func.count(models.AttackLogs.attack_type).desc()).first()
    
    return {
        "total_threats": total or 0,
        "active_threats": active or 0,
        "blocked_threats": blocked or 0,
        "latest_attack_type": top_attack[0] if top_attack else "None",
        "system_health": "Online",
        "sensors_active": {
            "cowrie": 14,
            "dionaea": 8
        }
    }                 
        
@router.get("/distribution")
def get_distribution(db_session: Session = Depends(db.get_db)):

    results = db_session.query(
        models.AttackLogs.attack_type,
        func.count(models.AttackLogs.id).label('count')
    ).group_by(models.AttackLogs.attack_type).all()

    return [
        {"name": r.attack_type, "value": r.count}
        for r in results
    ]


@router.get("/live-map")
def get_map_data(db_session: Session = Depends(db.get_db)):

    attacks = db_session.query(models.AttackLogs).order_by(models.AttackLogs.timestamp.desc()).limit(100).all()
 
    location_coords = {
        "Karachi, Pakistan":   {"lat": 24.8607, "lng": 67.0011},
        "Lahore, Pakistan":    {"lat": 31.5204, "lng": 74.3587},
        "Islamabad, Pakistan": {"lat": 33.6844, "lng": 73.0479},
        "Quetta, Pakistan":    {"lat": 30.1798, "lng": 66.9750},
        "Peshawar, Pakistan":  {"lat": 34.0151, "lng": 71.5249},
        "Karachi, PK":         {"lat": 24.8607, "lng": 67.0011},
        "Lahore, PK":          {"lat": 31.5204, "lng": 74.3587},
        "Islamabad, PK":       {"lat": 33.6844, "lng": 73.0479},
        "Quetta, PK":          {"lat": 30.1798, "lng": 66.9750},
        "Peshawar, PK":        {"lat": 34.0151, "lng": 71.5249},
        "Unknown Location":    {"lat": 30.3753, "lng": 69.3451},
        "Unknown":             {"lat": 30.3753, "lng": 69.3451},
    }

    map_data = []
    for attack in attacks:

        coords = location_coords.get(attack.attacker_location,
             {"lat": 30.3753, "lng": 69.3451})
        
        map_data.append({
            "id": attack.id,
            "ip": attack.attacker_ip,
            "attack_type": attack.attack_type,
            "location": attack.attacker_location,
            "lat": coords["lat"],
            "lng": coords["lng"],
            "is_killed": attack.is_killed,
            "timestamp": attack.timestamp.isoformat()

        })

    return map_data

@router.get("/")
def get_all_threats(

    db_session: Session = Depends(db.get_db),

    attack_type: Optional[str] = Query(None),

    is_killed: Optional[str] = Query(None),

    limit: int = Query(50, ge=1, le=200),
    skip: int = Query(0, ge=0)
):
    
    query = db_session.query(models.AttackLogs)

    if attack_type:
        query = query.filter(models.AttackLogs.attack_type == attack_type)

    if is_killed:
        query = query.filter(models.AttackLogs.is_killed == is_killed)
    
    attacks = query.order_by(models.AttackLogs.timestamp.desc()).offset(skip).limit(limit).all()

    return [
        {
            "id": a.id,
            "attacker_ip": a.attacker_ip,
            "attack_type": a.attack_type,
            "attack_port": a.attack_port,
            "attacker_location": a.attacker_location,
            "source_tool": a.source_tool,
            "is_killed": a.is_killed,
            "timestamp": a.timestamp
        }
        for a in attacks
    ]


@router.get("/{attack_id}")
def get_single_threat(
    attack_id: int,
    db_session: Session = Depends(db.get_db)
):
    
    attack = db_session.query(models.AttackLogs).filter(models.AttackLogs.id == attack_id).first()

    if not attack:
        raise HTTPException(
            status_code=404,
            detail=f"Attack with ID {attack_id} not found"
        )
    
    return {

        "id": attack.id,
        "attacker_ip": attack.attacker_ip,
        "attacker_type": attack.attack_type,
        "attack_port": attack.attack_port,
        "attacker_location": attack.attacker_location,
        "source_tool": attack.source_tool,
        "is_killed": attack.is_killed,
        "timestamp": attack.timestamp.isoformat()
    }


