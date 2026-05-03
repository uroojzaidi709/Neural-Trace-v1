
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from ..database import db, models
from ..forensics.pdf_generator import generate_forensic_pdf
import os

router = APIRouter(prefix="/forensics", tags=["Forensics"])


@router.post("/generate/{attack_id}")
def generate_report(attack_id: int, db_session: Session = Depends(db.get_db)):

    attack = db_session.query(models.AttackLogs).filter(
        models.AttackLogs.id == attack_id
    ).first()

    if not attack:
        raise HTTPException(status_code=404, detail="Attack not found")

    existing = db_session.query(models.ForensicData).filter(
        models.ForensicData.attack_log_id == attack_id
    ).first()

    if existing:
        return {
            "message":     "Report already exists",
            "report_id":   existing.id,
            "pdf_path":    existing.pdf_report_path,
            "sha256_hash": existing.forensic_details,
        }

    attack_dict = {
        "attacker_ip":       attack.attacker_ip,
        "attack_type":       attack.attack_type,
        "attack_port":       attack.attack_port,
        "attacker_location": attack.attacker_location,
        "source_tool":       attack.source_tool,
        "is_killed":         attack.is_killed,
        "timestamp":         attack.timestamp,
        "risk_score":        8,
    }

    report_count = db_session.query(models.ForensicData).count()
    report_id    = report_count + 1

    filepath, file_hash = generate_forensic_pdf(attack_dict, report_id)

    forensic_record = models.ForensicData(
        user_id          = 1,
        attack_log_id    = attack_id,
        pdf_report_path  = filepath,
        forensic_details = file_hash,
        status           = "Generated"
    )
    db_session.add(forensic_record)
    db_session.commit()
    db_session.refresh(forensic_record)

    return {
        "message":     "Forensic report generated successfully",
        "report_id":   forensic_record.id,
        "attack_id":   attack_id,
        "pdf_path":    filepath,
        "sha256_hash": file_hash,
        "status":      "Generated"
    }


@router.get("/")
def get_all_reports(db_session: Session = Depends(db.get_db)):

    reports = db_session.query(models.ForensicData).order_by(
        models.ForensicData.timestamp.desc()
    ).all()

    result = []
    for r in reports:
        attack = db_session.query(models.AttackLogs).filter(
            models.AttackLogs.id == r.attack_log_id
        ).first()
        result.append({
            "report_id":    r.id,
            "attack_id":    r.attack_log_id,
            "attacker_ip":  attack.attacker_ip  if attack else "Unknown",
            "attack_type":  attack.attack_type  if attack else "Unknown",
            "pdf_path":     r.pdf_report_path,
            "sha256_hash":  r.forensic_details,
            "status":       r.status,
            "generated_at": r.timestamp,
        })
    return result


@router.get("/{report_id}/download")
def download_report(report_id: int, db_session: Session = Depends(db.get_db)):

    report = db_session.query(models.ForensicData).filter(
        models.ForensicData.id == report_id
    ).first()

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    if not os.path.exists(report.pdf_report_path):
        raise HTTPException(status_code=404, detail="PDF file not found on disk")

    return FileResponse(
        path       = report.pdf_report_path,
        media_type = "application/pdf",
        filename   = os.path.basename(report.pdf_report_path)
    )

