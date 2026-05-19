# Neural-Trace — AI-Powered Cyber Defense Platform

<div align="center">

![Neural-Trace](https://img.shields.io/badge/Neural--Trace-v1.0-39FF14?style=for-the-badge&labelColor=0d1520)
![Python](https://img.shields.io/badge/Python-3.13-blue?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)
![XGBoost](https://img.shields.io/badge/XGBoost-ML-FF6600?style=for-the-badge)

**Pakistan's AI-Powered Threat Intelligence & Digital Forensics Platform**

*Real-time network threat detection, honeypot intelligence, XGBoost ML classification, and automated forensic report generation.*

</div>

---

## Overview

Neural-Trace is a full-stack cybersecurity platform built to detect, classify, and document network attacks in real time. It combines passive honeypot sensors, live packet analysis, machine learning classification, and automated PDF forensic reports into a single unified dashboard.

The platform supports two user roles — **Citizens** (simplified threat awareness) and **Organizations** (full threat intelligence and forensics) — with separate dashboards tailored to each audience.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Neural-Trace Stack                     │
├─────────────┬──────────────┬──────────────┬─────────────────┤
│   Frontend  │   Backend    │   ML Engine  │   Honeypots     │
│   React     │   FastAPI    │   XGBoost    │  Cowrie+Dionaea │
│   Vite      │   PostgreSQL │   CIC-IDS-   │   SSH + FTP     │
│   Leaflet   │   Redis      │   2017       │   SMB + HTTP    │
│   Recharts  │   SQLAlchemy │   30 Features│                 │
└─────────────┴──────────────┴──────────────┴─────────────────┘
```

---

## Features

### Three-Layer Detection Pipeline

| Layer | Technology | What It Detects|
|-------|-----------|-----------------|
| **Layer 1** | Cowrie SSH Honeypot | SSH Brute Force, Unauthorized Access |
| **Layer 2** | Dionaea Malware Honeypot | Malware Upload, FTP Attack, SMB Exploit |
| **Layer 3** | Scapy + XGBoost ML | DDoS, Port Scan, SQL Injection, Botnet — 30 features |

### Detection Pipeline

```
Network Traffic
      │
      ▼
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Scapy     │───▶│  XGBoost ML  │───▶│  Auto-Block│
│  Sniffer    │    │  Classifier  │    │  iptables   │
│ 30 Features │    │ 99%+ Accuracy│    │   340ms     │
└─────────────┘    └──────────────┘    └─────────────┘
      │                                       │
      ▼                                       ▼
┌─────────────┐                    ┌─────────────────┐
│  PostgreSQL │                    │  Forensic PDF   │
│  Database   │                    │  SHA-256 Sealed │
└─────────────┘                    └─────────────────┘
```

### Dashboard Features

**Organization Dashboard:**
- Security Overview with live stats
- Threat Analytics (charts, country breakdown, 48h volume)
- Threat Intelligence Feeds with search and filter
- Forensic Evidence Vault (SHA-256 sealed PDF reports)
- IP Intelligence scanner

**Citizen Dashboard:**
- Live Attack Map (Pakistan)
- National Threat Alerts in plain language
- IP Safety Checker
- Cybersecurity Tips and Emergency Contacts

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React 18, Vite, TailwindCSS, Leaflet, Recharts |
| Backend | FastAPI, SQLAlchemy, PostgreSQL, Redis |
| ML Engine | XGBoost, Scikit-learn, CIC-IDS-2017 Dataset |
| Honeypots | Cowrie (SSH), Dionaea (Malware/FTP/SMB) |
| Packet Analysis | Scapy (30 network flow features) |
| PDF Generation | ReportLab |
| Infrastructure | Docker Compose (7 containers), AWS EC2 |
| CI/CD | GitHub Actions |

---

## Project Structure

```
Neural-Trace-v1/
├── api-backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py          # JWT authentication
│   │   │   ├── threats.py       # Threat ingestion & stats
│   │   │   ├── forensics.py     # PDF report generation
│   │   │   ├── ip_lookup.py     # GeoIP intelligence
│   │   │   └── ml.py            # ML classifier proxy
│   │   ├── services/
│   │   │   ├── cowrie_reader.py    # Cowrie log parser
│   │   │   ├── dionaea_reader.py   # Dionaea log parser
│   │   │   ├── scapy_sniffer.py    # Live packet capture
│   │   │   ├── pcap_replay.py      # Attack simulation
│   │   │   └── firewall.py         # iptables auto-block
│   │   ├── forensics/
│   │   │   └── pdf_generator.py    # ReportLab PDF engine
│   │   └── database/
│   │       ├── models.py           # SQLAlchemy models
│   │       └── db.py               # Database connection
│   ├── Dockerfile
│   ├── requirements.txt
│   └── seed.py
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Root component + routing
│   │   ├── Dashboard.jsx        # Org + Citizen dashboard
│   │   ├── LandingPage.jsx      # Marketing landing page
│   │   ├── LoginPage.jsx        # Auth (login + register)
│   │   ├── CitizenDashboard.jsx # Citizen wrapper
│   │   └── api.js               # API calls
│   └── Dockerfile
├── ml_model/
│   ├── inference_api.py         # FastAPI ML service
│   ├── Dockerfile
│   └── model_output/            # Trained model files (git-ignored)
├── enterprise-sensors/
│   ├── cowrie/                  # SSH honeypot
│   └── dionaea/                 # Malware honeypot
├── docker-compose.yml
├── init.sql
└── .github/
    └── workflows/
        └── deploy.yml           # CI/CD to AWS EC2
```

---

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Git

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/uroojzaidi709/Neural-Trace-v1.git
cd Neural-Trace-v1

# 2. Start all services
docker compose up --build

# 3. Access the platform
# Frontend:  http://localhost:3000
# API Docs:  http://localhost:8000/docs
# ML API:    http://localhost:8001/docs
```

### Seed Initial Data

```bash
docker exec nt_api python seed.py
```

---

## Environment Variables

**`api-backend/.env.docker`**
```env
DATABASE_URL=postgresql://postgres:postgres123@db:5432/neuraltrace_db
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ML_SERVICE_URL=http://ml-api:8001
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT |
| GET | `/threats/stats` | Dashboard statistics |
| GET | `/threats/` | All threats list |
| GET | `/threats/live-map` | Map data with coordinates |
| GET | `/threats/distribution` | Attack type breakdown |
| POST | `/threats/ingest` | Ingest new attack |
| GET | `/ip/lookup/{ip}` | GeoIP + risk score |
| POST | `/forensics/generate/{id}` | Generate PDF report |
| GET | `/forensics/` | All forensic reports |
| GET | `/forensics/{id}/download` | Download PDF |
| POST | `/simulate/attack` | Simulate attack for demo |
| POST | `/ml/predict` | Direct ML classification |

---

## ML Model

- **Dataset:** CIC-IDS-2017 (Canadian Institute for Cybersecurity)
- **Algorithm:** XGBoost Classifier
- **Accuracy:** 99%+
- **Features:** 30 network flow features extracted per session
- **Classes:** BENIGN, DDoS, SSH-Patator, FTP-Patator, PortScan, Bot, DoS Hulk, DoS GoldenEye, DoS slowloris, Web Attack XSS, Web Attack Brute Force

### Risk Scoring

| Score | Level | Description |
|-------|-------|-------------|
| 8–10 | CRITICAL | Immediate action required |
| 5–7 | HIGH | Monitor and investigate |
| 3–4 | MEDIUM | Low priority review |
| 1–2 | LOW | Benign traffic |

---

## Deployment

The platform is deployed on **AWS EC2** with automated CI/CD via GitHub Actions.

```
Push to main → GitHub Actions → SSH to EC2 → docker compose up --build
```

**Live Instance:**
- Frontend: `http://13.63.35.36:3000`
- API: `http://13.63.35.36:8000`
- API Docs: `http://13.63.35.36:8000/docs`

---

## Docker Services

| Container | Image | Port | Purpose |
|-----------|-------|------|---------|
| `nt_postgres_db` | postgres:15 | 5432 | Database |
| `nt_redis_cache` | redis:7 | 6379 | Caching |
| `nt_ml_api` | custom | 8001 | ML inference |
| `nt_api` | custom | 8000 | Backend API |
| `nt_frontend` | custom | 3000 | React frontend |
| `nt_cowrie` | cowrie/cowrie | 2222 | SSH honeypot |
| `nt_dionaea` | dinotools/dionaea | 2121,4445 | Malware honeypot |

---

## Testing the Detection Pipeline

### Simulate Attacks

```bash
# SSH Brute Force (Layer 1 - Cowrie)
curl -X POST "http://localhost:8000/simulate/attack?attack_type=SSH+Brute+Force&attacker_ip=220.181.38.148&count=3"

# DDoS Attack (Layer 3 - Scapy+ML)
curl -X POST "http://localhost:8000/simulate/attack?attack_type=DDoS+Attack&attacker_ip=45.33.32.156&count=2"

# Malware Upload (Layer 2 - Dionaea)
curl -X POST "http://localhost:8000/simulate/attack?attack_type=Malware+Upload&attacker_ip=185.220.101.1&count=2"
```

### Test ML Classifier Directly

```bash
curl -X POST "http://localhost:8001/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "features": {
      "Destination Port": 22,
      "Flow Duration": 500000,
      "Flow Packets/s": 1000,
      "Flow Bytes/s": 50000,
      "Packet Length Mean": 60,
      "Flow IAT Mean": 1000,
      "Flow IAT Std": 500,
      "Fwd Packets/s": 800,
      "Bwd Packets/s": 200,
      "Init_Win_bytes_forward": 65535,
      "Init_Win_bytes_backward": 65535
    }
  }'
```

### Check Honeypot Logs

```bash
# Cowrie SSH honeypot logs
docker logs nt_cowrie --tail 30

# Dionaea malware honeypot logs
docker logs nt_dionaea --tail 30

# API logs
docker logs nt_api --tail 50
```

---

## User Roles

### Organization Account
Full access to all threat intelligence features:
- Security Overview with real-time stats
- Threat Analytics and visualizations
- Threat Feeds with search/filter
- Forensic Vault (PDF reports)
- IP Intelligence scanner

### Citizen Account
Simplified threat awareness:
- Live Attack Map
- National Alerts in plain language
- IP Safety Checker
- Safety tips and emergency contacts

---

## Forensic Reports

Each generated report includes:
- Incident classification and severity
- Report metadata (ID, timestamp, platform info)
- Attack intelligence (IP, type, port, location)
- AI analysis and threat assessment
- Key Indicators of Compromise (IoC)
- Recommended actions
- Legal notice and chain of custody
- SHA-256 document integrity hash

---

## Team

**Developed by:** Urooj Zeeshan (Team Lead & Backend Architect), Abeeha Kamran (Front-end Developer) & Amna Ashraf (ML Specialist)
**Institution:** Bahria University 
**Year:** 2026  
**Project Type:**  Second Year Project — Cybersecurity

---

## License

This project is developed for academic and research purposes.

---

<div align="center">
<strong>Neural-Trace — Defending Pakistan's Digital Infrastructure</strong>
</div>
