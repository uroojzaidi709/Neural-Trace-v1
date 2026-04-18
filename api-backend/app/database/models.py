from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .db import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email_address = Column(String, unique=True, index=True, nullable=False)
    phone_number = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="citizen")
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class AttackLogs(Base):

    __tablename__ = "attack_logs"

    id = Column(Integer, primary_key=True, index=True)
    attacker_ip = Column(String, nullable=False)
    attack_type = Column(String, nullable=False)
    attack_port = Column(Integer, nullable=False)
    attacker_location = Column(String, nullable=False)
    source_tool = Column(String, nullable=False)
    is_killed = Column(String, default="Active")
    timestamp = Column(DateTime(timezone=True), server_default= func.now())

class ForensicData(Base):

    __tablename__ = "forensic_data"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    attack_log_id = Column(Integer, ForeignKey("attack_logs.id"), nullable=False)

    pdf_report_path = Column(String, nullable=False)
    forensic_details = Column(String, nullable=False)
    status = Column(String, default="Generated")
    timestamp = Column(DateTime(timezone=True), server_default=func.now())



