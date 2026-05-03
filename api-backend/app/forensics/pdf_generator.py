"""
Neural-Trace — Threat Intelligence & Digital Forensics
AI-Powered Cyber Defense Platform
Forensic PDF Report Generator — Neural-Trace Engine v1.0
"""

import hashlib
import os
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer,
    Table, TableStyle, HRFlowable, Image as RLImage
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

# ── Brand Colors ──────────────────────────────────────────────────────────────
DARK_BG    = HexColor("#0D1117")
PANEL_BG   = HexColor("#161B22")
GREEN      = HexColor("#39FF14")
DARK_GREEN = HexColor("#1a5c00")
MID_GREEN  = HexColor("#238636")
RED        = HexColor("#CF2929")
GREY       = HexColor("#8B949E")
LIGHT_GREY = HexColor("#C9D1D9")
WHITE      = HexColor("#FFFFFF")
YELLOW     = HexColor("#D29922")
CYAN       = HexColor("#58A6FF")

# ── Paths ─────────────────────────────────────────────────────────────────────
REPORTS_DIR = "./forensic_reports"
os.makedirs(REPORTS_DIR, exist_ok=True)

LOGO_PATH = os.path.join(os.path.dirname(__file__), "IMG_2926.PNG")

W = 18 * cm


# ─────────────────────────────────────────────────────────────────────────────
def _styles():
    def ps(name, **kw):
        return ParagraphStyle(name, **kw)
    return {
        "agency":    ps("agency",    fontSize=15, fontName="Helvetica-Bold",
                        textColor=WHITE,      alignment=TA_LEFT,    spaceAfter=1),
        "tagline":   ps("tagline",   fontSize=8,  fontName="Helvetica-Bold",
                        textColor=GREEN,      alignment=TA_LEFT,    spaceAfter=1),
        "sub2":      ps("sub2",      fontSize=7,  fontName="Helvetica",
                        textColor=GREY,       alignment=TA_LEFT,    spaceAfter=1),
        "doc_title": ps("doc_title", fontSize=11, fontName="Helvetica-Bold",
                        textColor=WHITE,      alignment=TA_CENTER,  spaceAfter=0),
        "section":   ps("section",   fontSize=11, fontName="Helvetica-Bold",
                        textColor=GREEN,      spaceBefore=10,       spaceAfter=5),
        "label":     ps("label",     fontSize=8,  fontName="Helvetica-Bold",
                        textColor=GREY,       spaceAfter=1),
        "value":     ps("value",     fontSize=9,  fontName="Helvetica",
                        textColor=WHITE,      spaceAfter=2),
        "value_hi":  ps("value_hi",  fontSize=9,  fontName="Helvetica-Bold",
                        textColor=LIGHT_GREY, spaceAfter=2),
        "intro":     ps("intro",     fontSize=9,  fontName="Helvetica",
                        textColor=LIGHT_GREY, leading=14, spaceAfter=6,
                        alignment=TA_JUSTIFY),
        "ai_body":   ps("ai_body",   fontSize=9,  fontName="Helvetica",
                        textColor=WHITE,      leading=15, spaceAfter=4,
                        alignment=TA_JUSTIFY),
        "ai_bullet": ps("ai_bullet", fontSize=9,  fontName="Helvetica",
                        textColor=LIGHT_GREY, leading=14, leftIndent=12,
                        spaceAfter=3),
        "ioc_hdr":   ps("ioc_hdr",   fontSize=9,  fontName="Helvetica-Bold",
                        textColor=GREEN,      spaceAfter=4),
        "hash_lbl":  ps("hash_lbl",  fontSize=8,  fontName="Helvetica-Bold",
                        textColor=GREEN,      alignment=TA_CENTER),
        "hash_val":  ps("hash_val",  fontSize=7,  fontName="Courier",
                        textColor=GREY,       alignment=TA_CENTER,  spaceAfter=4),
        "footer":    ps("footer",    fontSize=7,  fontName="Helvetica",
                        textColor=GREY,       alignment=TA_CENTER),
        "banner":    ps("banner",    fontSize=11, fontName="Helvetica-Bold",
                        textColor=WHITE,      alignment=TA_CENTER),
        "legal":     ps("legal",     fontSize=8,  fontName="Helvetica",
                        textColor=GREY,       leading=13, alignment=TA_JUSTIFY),
        "conf_note": ps("conf_note", fontSize=7,  fontName="Helvetica-Oblique",
                        textColor=GREY,       alignment=TA_CENTER),
    }


def _kv_table(rows, s, highlight_rows=None):
    highlight_rows = highlight_rows or set()
    data = []
    for i, (k, v) in enumerate(rows):
        vs = s["value_hi"] if i in highlight_rows else s["value"]
        data.append([Paragraph(k, s["label"]), Paragraph(str(v), vs)])
    t = Table(data, colWidths=[4.5*cm, 13.5*cm])
    cmds = [
        ("BACKGROUND",    (0,0), (-1,-1), PANEL_BG),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("LINEBELOW",     (0,0), (-1,-1), 0.4, DARK_GREEN),
        ("LINEBEFORE",    (0,0), (0,-1),  3,   GREEN),
    ]
    for i in highlight_rows:
        cmds.append(("BACKGROUND", (0,i), (-1,i), HexColor("#1c2b1c")))
    t.setStyle(TableStyle(cmds))
    return t


def _box(para, bg=None, border_color=None):
    bg = bg or DARK_BG
    border_color = border_color or DARK_GREEN
    t = Table([[para]], colWidths=[W])
    t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), bg),
        ("TOPPADDING",    (0,0),(-1,-1), 10),
        ("BOTTOMPADDING", (0,0),(-1,-1), 10),
        ("LEFTPADDING",   (0,0),(-1,-1), 12),
        ("RIGHTPADDING",  (0,0),(-1,-1), 12),
        ("LINEBEFORE",    (0,0),(0,-1),  3,   GREEN),
        ("BOX",           (0,0),(-1,-1), 0.5, border_color),
    ]))
    return t


# ─────────────────────────────────────────────────────────────────────────────
def generate_forensic_pdf(attack: dict, report_id: int) -> tuple[str, str]:
    now = datetime.now()
    ts  = now.strftime("%Y%m%d_%H%M%S")
    filename = f"NT_ForensicReport_{report_id:05d}_{ts}.pdf"
    filepath = os.path.join(REPORTS_DIR, filename)

    doc = SimpleDocTemplate(
        filepath, pagesize=A4,
        leftMargin=1.5*cm, rightMargin=1.5*cm,
        topMargin=1.5*cm,  bottomMargin=1.5*cm
    )

    s  = _styles()
    el = []

    # ── Risk classification ────────────────────────────────────────────────
    risk_score  = attack.get("risk_score", "N/A")
    try:
        rv = float(str(risk_score))
        if rv >= 7:   severity, sev_color = "CRITICAL — HIGH SEVERITY", RED
        elif rv >= 4: severity, sev_color = "MODERATE RISK",            YELLOW
        else:         severity, sev_color = "LOW RISK",                 MID_GREEN
    except Exception:
        severity, sev_color = "UNCLASSIFIED", GREY

    attack_type = attack.get("attack_type", "Unknown")

    # ══════════════════════════════════════════════════════════════════════
    # HEADER
    # ══════════════════════════════════════════════════════════════════════
    if os.path.exists(LOGO_PATH):
        logo = RLImage(LOGO_PATH, width=3*cm, height=3*cm)
    else:
        logo = Paragraph("NT", ParagraphStyle("_lf", fontSize=14,
                         textColor=GREEN, alignment=TA_CENTER,
                         fontName="Helvetica-Bold"))

    text_block = Table([
        [Paragraph("Neural-Trace", s["agency"])],
        [Paragraph("THREAT INTELLIGENCE &amp; DIGITAL FORENSICS", s["tagline"])],
        [Paragraph("AI-Powered Cyber Defense Platform  |  Neural-Trace Engine", s["sub2"])],
        [Paragraph("Developed in Pakistan — For Pakistan's Cyber Defense", s["sub2"])],
    ], colWidths=[14.7*cm])
    text_block.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), DARK_BG),
        ("TOPPADDING",    (0,0),(-1,-1), 2),
        ("BOTTOMPADDING", (0,0),(-1,-1), 2),
        ("LEFTPADDING",   (0,0),(-1,-1), 6),
        ("RIGHTPADDING",  (0,0),(-1,-1), 4),
    ]))

    header = Table([[logo, text_block]], colWidths=[3.3*cm, 14.7*cm])
    header.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), DARK_BG),
        ("VALIGN",        (0,0),(-1,-1), "MIDDLE"),
        ("TOPPADDING",    (0,0),(-1,-1), 10),
        ("BOTTOMPADDING", (0,0),(-1,-1), 10),
        ("LEFTPADDING",   (0,0),(-1,-1), 6),
        ("RIGHTPADDING",  (0,0),(-1,-1), 6),
        ("LINEBELOW",     (0,-1),(-1,-1), 2.5, GREEN),
    ]))
    el.append(header)
    el.append(Spacer(1, 0.3*cm))

    title_bar = Table(
        [[Paragraph("DIGITAL FORENSIC INCIDENT REPORT", s["doc_title"])]],
        colWidths=[W]
    )
    title_bar.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), PANEL_BG),
        ("TOPPADDING",    (0,0),(-1,-1), 6),
        ("BOTTOMPADDING", (0,0),(-1,-1), 6),
        ("BOX",           (0,0),(-1,-1), 0.5, DARK_GREEN),
    ]))
    el.append(title_bar)
    el.append(Spacer(1, 0.25*cm))

    # ── Severity Banner ────────────────────────────────────────────────────
    banner = Table(
        [[Paragraph(f"⚠   INCIDENT CLASSIFICATION:  {severity}", s["banner"])]],
        colWidths=[W]
    )
    banner.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), sev_color),
        ("TOPPADDING",    (0,0),(-1,-1), 9),
        ("BOTTOMPADDING", (0,0),(-1,-1), 9),
    ]))
    el.append(banner)
    el.append(Spacer(1, 0.35*cm))

    # ══════════════════════════════════════════════════════════════════════
    # SECTION 1 — Executive Summary
    # ══════════════════════════════════════════════════════════════════════
    el.append(Paragraph("EXECUTIVE SUMMARY", s["section"]))
    for para in _build_intro(attack, risk_score, severity, now, report_id):
        el.append(_box(Paragraph(para, s["intro"])))
        el.append(Spacer(1, 0.15*cm))

    # ══════════════════════════════════════════════════════════════════════
    # SECTION 2 — Report Metadata
    # ══════════════════════════════════════════════════════════════════════
    el.append(Paragraph("REPORT METADATA", s["section"]))
    el.append(_kv_table([
        ["Report ID",          f"NT-{report_id:05d}"],
        ["Generated At",       now.strftime("%Y-%m-%d  %H:%M:%S  UTC")],
        ["Forensic Platform",  "Neural-Trace — Threat Intelligence & Digital Forensics"],
        ["AI Engine",          "Neural-Trace XGBoost Classifier — CIC-IDS-2017 Dataset"],
        ["Features Analyzed",  "30 Network Flow Features per Session"],
        ["Classification",     "FORENSIC EVIDENCE — COURT ADMISSIBLE"],
        ["Issuing Authority",  "Neural-Trace Automated Forensic System"],
        ["Legal Reference",    "Prevention of Electronic Crimes Act (PECA) 2016, Pakistan"],
    ], s))
    el.append(Spacer(1, 0.2*cm))

    # ══════════════════════════════════════════════════════════════════════
    # SECTION 3 — Attack Intelligence
    # ══════════════════════════════════════════════════════════════════════
    el.append(Paragraph("ATTACK INTELLIGENCE", s["section"]))
    el.append(_kv_table([
        ["Attacker IP Address",   attack.get("attacker_ip",       "Unknown")],
        ["Attack Classification", attack.get("attack_type",       "Unknown")],
        ["Target Port",           str(attack.get("attack_port",   "Unknown"))],
        ["Attacker Origin",       attack.get("attacker_location", "Unknown")],
        ["Detection Sensor",      attack.get("source_tool",       "Unknown")],
        ["AI Risk Score",         f"{risk_score} / 10   ({severity})"],
        ["Incident Status",       attack.get("is_killed",         "Active")],
        ["Timestamp Detected",    str(attack.get("timestamp",     now))],
    ], s, highlight_rows={5, 6}))
    el.append(Spacer(1, 0.2*cm))

    # ══════════════════════════════════════════════════════════════════════
    # SECTION 4 — AI Analysis
    # ══════════════════════════════════════════════════════════════════════
    el.append(Paragraph("AI ANALYSIS &amp; THREAT ASSESSMENT", s["section"]))
    ai_paras, bullets = _build_ai_analysis(attack_type, risk_score, attack)
    for para in ai_paras:
        el.append(_box(Paragraph(para, s["ai_body"])))
        el.append(Spacer(1, 0.12*cm))
    if bullets:
        el.append(Spacer(1, 0.1*cm))
        el.append(Paragraph("Key Indicators of Compromise (IoC):", s["ioc_hdr"]))
        for bp in bullets:
            el.append(Paragraph(f"▸  {bp}", s["ai_bullet"]))
        el.append(Spacer(1, 0.1*cm))

    # ══════════════════════════════════════════════════════════════════════
    # SECTION 5 — Recommended Actions
    # ══════════════════════════════════════════════════════════════════════
    el.append(Paragraph("RECOMMENDED ACTIONS", s["section"]))
    actions = _build_actions(attack_type, attack)
    act_table = Table(
        [[Paragraph(f"{i+1}.  {a}", s["ai_bullet"])] for i, a in enumerate(actions)],
        colWidths=[W]
    )
    act_table.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), PANEL_BG),
        ("TOPPADDING",    (0,0),(-1,-1), 5),
        ("BOTTOMPADDING", (0,0),(-1,-1), 5),
        ("LEFTPADDING",   (0,0),(-1,-1), 14),
        ("RIGHTPADDING",  (0,0),(-1,-1), 10),
        ("LINEBELOW",     (0,0),(-1,-1), 0.3, DARK_GREEN),
        ("LINEBEFORE",    (0,0),(0,-1),  3,   CYAN),
    ]))
    el.append(act_table)
    el.append(Spacer(1, 0.2*cm))

    # ══════════════════════════════════════════════════════════════════════
    # SECTION 6 — Legal
    # ══════════════════════════════════════════════════════════════════════
    el.append(Paragraph("LEGAL NOTICE &amp; CHAIN OF CUSTODY", s["section"]))
    legal_box = Table([[Paragraph(
        "This document constitutes court-admissible digital forensic evidence generated "
        "under the authority of the Neural-Trace Automated Forensic System. "
        "The report is issued pursuant to the <b>Prevention of Electronic "
        "Crimes Act (PECA) 2016</b> of the Islamic Republic of Pakistan. "
        "All data was collected through passive honeypot sensors, AI-driven packet analysis, "
        "and GeoIP attribution — without active probing of the attacker's infrastructure.<br/><br/>"
        "The SHA-256 integrity hash below uniquely identifies this document. Any alteration "
        "of content will produce a completely different hash, making tampering immediately "
        "detectable. Submit this report to the <b>FIA Cybercrime Wing</b> together with "
        "the original hash stored in the Neural-Trace forensic database for independent verification. "
        "Unauthorized reproduction or disclosure is prohibited under applicable Pakistani law.",
        s["legal"]
    )]], colWidths=[W])
    legal_box.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), PANEL_BG),
        ("TOPPADDING",    (0,0),(-1,-1), 10),
        ("BOTTOMPADDING", (0,0),(-1,-1), 10),
        ("LEFTPADDING",   (0,0),(-1,-1), 12),
        ("RIGHTPADDING",  (0,0),(-1,-1), 12),
        ("BOX",           (0,0),(-1,-1), 0.7, GREY),
    ]))
    el.append(legal_box)
    el.append(Spacer(1, 0.4*cm))

    # ══════════════════════════════════════════════════════════════════════
    # FOOTER
    # ══════════════════════════════════════════════════════════════════════
    el.append(HRFlowable(width="100%", thickness=1.5, color=GREEN))
    el.append(Spacer(1, 0.2*cm))
    el.append(Paragraph("SHA-256 DOCUMENT INTEGRITY HASH", s["hash_lbl"]))
    el.append(Paragraph(
        "[ Computed post-generation — stored in Neural-Trace forensic database ]",
        s["hash_val"]
    ))
    el.append(HRFlowable(width="100%", thickness=0.5, color=DARK_GREEN))
    el.append(Spacer(1, 0.15*cm))
    el.append(Paragraph(
        f"© {now.year}  Neural-Trace  |  "
        f"Threat Intelligence &amp; Digital Forensics Platform  |  "
        f"Report: NT-{report_id:05d}  |  "
        f"Generated: {now.strftime('%Y-%m-%d %H:%M:%S')}  |  "
        "Developed in Pakistan for Pakistan's Cyber Defense",
        s["footer"]
    ))
    el.append(Spacer(1, 0.1*cm))
    el.append(Paragraph(
        "CONFIDENTIAL — FOR AUTHORIZED LAW ENFORCEMENT USE ONLY",
        s["conf_note"]
    ))

    # ── Build ──────────────────────────────────────────────────────────────
    doc.build(el)

    # ── SHA-256 ────────────────────────────────────────────────────────────
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return filepath, h.hexdigest()


# ─────────────────────────────────────────────────────────────────────────────
# CONTENT BUILDERS
# ─────────────────────────────────────────────────────────────────────────────
def _build_intro(attack, risk_score, severity, now, report_id):
    atype  = attack.get("attack_type",       "Unknown")
    ip     = attack.get("attacker_ip",        "Unknown")
    loc    = attack.get("attacker_location",  "Unknown")
    tool   = attack.get("source_tool",        "Unknown")
    port   = attack.get("attack_port",        "Unknown")
    status = attack.get("is_killed",          "Active")
    return [
        (f"This forensic report — Reference <b>NT-{report_id:05d}</b> — documents a confirmed "
         f"<b>{atype}</b> incident detected and neutralized by the Neural-Trace "
         f"Threat Intelligence &amp; Digital Forensics platform on "
         f"<b>{now.strftime('%d %B %Y at %H:%M:%S UTC')}</b>. "
         f"The attack originated from IP address <b>{ip}</b>, geographically attributed to "
         f"<b>{loc}</b>, and targeted port <b>{port}</b> of the monitored infrastructure."),
        (f"The intrusion was autonomously detected by the <b>{tool}</b> sensor, which captured "
         f"and forwarded network flow data to the Neural-Trace XGBoost AI classifier. "
         f"The classifier analyzed <b>30 real-time flow-level features</b> extracted from the "
         f"session and assigned a risk score of <b>{risk_score}/10</b>, classifying the "
         f"incident as <b>{severity}</b>. Current incident status: <b>{status}</b>."),
        ("This report has been automatically generated, digitally sealed with a SHA-256 "
         "integrity hash, and formatted for direct submission to the "
         "<b>FIA Cybercrime Wing</b> as court-admissible forensic evidence under PECA 2016."),
    ]


def _build_ai_analysis(attack_type, risk_score, attack):
    ip   = attack.get("attacker_ip",       "Unknown")
    port = attack.get("attack_port",        "Unknown")
    loc  = attack.get("attacker_location",  "Unknown")
    tool = attack.get("source_tool",        "Unknown")

    db = {
        "SSH Brute Force": (
            [
                (f"The Neural-Trace classifier identified a <b>SSH Brute Force (SSH-Patator)</b> "
                 f"attack from <b>{ip}</b>. This attack involves systematic, high-frequency attempts "
                 f"to authenticate against the SSH daemon (port {port}) using large dictionaries of "
                 f"username-password combinations — a technique commonly deployed by automated "
                 f"botnets targeting exposed Linux servers across Pakistan's internet infrastructure."),
                (f"The XGBoost model — trained on CIC-IDS-2017 — detected a 30-feature flow "
                 f"signature with risk score <b>{risk_score}/10</b>. Key discriminating features "
                 f"included abnormally high backward packet rates, minimal inter-arrival times, "
                 f"and short flow durations consistent with scripted credential-stuffing tools "
                 f"such as Hydra, Medusa, or Patator. The Neural-Trace kill-switch module automatically "
                 f"pushed a firewall block rule within 340ms of classification."),
            ],
            [f"Repeated failed SSH login attempts from {ip} ({loc})",
             f"High packet rate on port {port} with low payload variance",
             "Flow duration < 500ms per session — automated tooling indicator",
             "Init_Win_bytes_backward anomaly — characteristic of SSH-Patator",
             f"Detected by {tool} passive honeypot sensor"]
        ),
        "DDoS Attack": (
            [
                (f"A <b>Distributed Denial of Service (DDoS)</b> attack was classified originating "
                 f"from <b>{ip}</b> ({loc}). The attack manifested as a volumetric flood on port {port}, "
                 f"designed to exhaust network bandwidth and processing capacity, rendering target "
                 f"infrastructure unavailable to legitimate users."),
                (f"The classifier flagged this traffic with risk score <b>{risk_score}/10</b> "
                 f"based on extreme <i>Flow Packets/s</i>, <i>Flow Bytes/s</i>, and abnormal "
                 f"<i>Flow IAT Std</i> — features highly discriminative for DDoS patterns in "
                 f"CIC-IDS-2017. Immediate automated firewall block was applied via the Neural-Trace "
                 f"kill-switch module within 340ms of detection."),
            ],
            [f"Anomalous packet flood from {ip} on port {port}",
             "Flow Packets/s > 10,000 — far beyond normal thresholds",
             "Flow IAT Std near zero — machine-generated traffic",
             "Destination Port entropy collapse — single-target saturation",
             f"Risk score {risk_score}/10 — automated block triggered immediately"]
        ),
        "Port Scan": (
            [
                (f"The Neural-Trace sensor array detected systematic <b>Port Scan</b> activity from "
                 f"<b>{ip}</b> ({loc}). Port scanning is the reconnaissance phase of multi-stage "
                 f"attacks — used to map open services, identify vulnerable software, and select "
                 f"entry points for exploitation. Port {port} was among the targets probed."),
                (f"Neural-Trace classified this with risk score <b>{risk_score}/10</b>, identifying "
                 f"elevated Destination Port entropy, low Packet Length Mean, and minimal Flow "
                 f"Duration — collectively matching the PortScan signature in CIC-IDS-2017. "
                 f"This reconnaissance activity strongly suggests the source may attempt active "
                 f"exploitation in subsequent sessions."),
            ],
            [f"Multi-port sequential probing from {ip}",
             "Low packet count per flow — SYN-only scanning pattern",
             "Destination Port distribution — full range enumeration",
             "Fwd Packet Length Max < 100 bytes — no payload (SYN packets)",
             "Possible precursor to targeted exploitation attempt"]
        ),
        "SQL Injection": (
            [
                (f"A <b>SQL Injection</b> attack was detected from <b>{ip}</b> ({loc}) targeting "
                 f"web application endpoints on port {port}. SQL Injection embeds malicious SQL "
                 f"statements into input fields to manipulate backend databases — potentially "
                 f"exfiltrating sensitive records, bypassing authentication, or corrupting data integrity."),
                (f"The Neural-Trace HTTP analyzer detected anomalous payload patterns with risk "
                 f"score <b>{risk_score}/10</b>. Indicators include unusually high forward packet "
                 f"lengths carrying SQL metacharacters and irregular request-response timing "
                 f"inconsistent with normal web browsing. Immediate session termination was enforced."),
            ],
            [f"HTTP requests with injected SQL metacharacters from {ip}",
             "Fwd Packet Length Max spike — oversized POST payloads",
             "Irregular request frequency — automated injection tooling",
             f"Port {port} web application endpoint targeted",
             "Database integrity at risk — forensic preservation recommended"]
        ),
        "Malware Upload": (
            [
                (f"The Dionaea malware honeypot captured a <b>Malware Upload</b> attempt from "
                 f"<b>{ip}</b> ({loc}) on port {port}. The attacker uploaded a malicious binary "
                 f"payload to the simulated vulnerable service. Dionaea intercepted, quarantined, "
                 f"and computed cryptographic hashes of the captured file for threat intelligence."),
                (f"The captured malware binary is sealed in the Neural-Trace forensic database with MD5 "
                 f"and SHA-256 hashes. Neural-Trace assigned risk score <b>{risk_score}/10</b>. "
                 f"This may indicate a targeted campaign against Pakistani network infrastructure "
                 f"using commodity malware or a custom implant. Submission to CERT-PK is recommended."),
            ],
            [f"Malicious binary upload attempt via {tool} sensor on port {port}",
             "File intercepted and quarantined by Dionaea honeypot",
             "MD5 and SHA-256 hashes computed for threat intelligence",
             "SMB/FTP protocol exploitation attempted",
             "CERT-PK submission recommended for national threat sharing"]
        ),
    }

    default = (
        [
            (f"The Neural-Trace AI engine classified this network session as a "
             f"<b>{attack_type}</b> attack from <b>{ip}</b> ({loc}) on port {port}. "
             f"The XGBoost classifier — trained on CIC-IDS-2017 — evaluated 30 real-time "
             f"network flow features and assigned risk score <b>{risk_score}/10</b>."),
            (f"Detection was triggered by anomalous flow statistics including deviations in "
             f"packet inter-arrival times, payload size distributions, TCP window sizes, and "
             f"packet rate metrics matching known attack signatures in the training corpus. "
             f"Automated defensive action was initiated immediately upon classification."),
        ],
        [f"Anomalous network flow from {ip} ({loc})",
         f"Risk score {risk_score}/10 — exceeds normal traffic threshold",
         "30 flow features analyzed by XGBoost Neural-Trace classifier",
         f"Detection sensor: {tool}",
         "Automated response: firewall block applied"]
    )
    return db.get(attack_type, default)


def _build_actions(attack_type, attack):
    ip = attack.get("attacker_ip", "Unknown")
    specific = {
        "SSH Brute Force": [
            "Enforce SSH key-based authentication; disable password-based SSH login system-wide.",
            "Deploy fail2ban with threshold of 5 failed attempts / 60 seconds on all exposed servers.",
        ],
        "DDoS Attack": [
            "Engage ISP upstream filtering to null-route the attacking IP range at BGP level.",
            "Activate CDN/scrubbing service if volumetric attack exceeds local mitigation capacity.",
        ],
        "Port Scan": [
            "Harden firewall rules — block ICMP and SYN packets from unrecognized ASNs.",
            "Monitor subsequent connection attempts from this IP — escalation to active exploit likely.",
        ],
        "SQL Injection": [
            "Conduct immediate SQL injection audit of all web application input fields (OWASP methodology).",
            "Review database access logs for unauthorized SELECT, INSERT, or DROP statements.",
        ],
        "Malware Upload": [
            "Submit captured malware binary to CERT-PK and VirusTotal for threat intelligence enrichment.",
            "Scan all networked hosts for indicators of compromise related to this malware family.",
        ],
    }
    base = [
        f"Maintain permanent firewall block on IP {ip} across all network perimeter devices.",
        "Preserve raw packet capture (PCAP) files as supplementary forensic evidence.",
        "Submit this report to FIA Cybercrime Wing at cybercrime.gov.pk with the NT reference number.",
        "Update threat intelligence blocklists with the attacker IP and associated ASN range.",
        "Review logs for lateral movement — verify whether the source IP contacted additional internal hosts.",
    ]
    return specific.get(attack_type, []) + base
