
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import db, models

router = APIRouter(prefix="/threats", tags=["Threats Intelligence"])

@router.get("/live-map")
def get_live_threats(db_session: Session = Depends(db.get_db)):

    threats = db_session.query(models.AttackLogs).all()

    return threats
