"""
Neural-Trace Inference API
==========================
Loads trained model and serves predictions via FastAPI.

Run:
    pip install fastapi uvicorn joblib numpy scikit-learn xgboost
    uvicorn inference_api:app --host 0.0.0.0 --port 8001

The Forensic Engine (Step 2) calls POST /predict with extracted features.
"""

import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
import os

# ── Load model artifacts safely ─────────────────────────────────────────────
MODEL_DIR = "./model_output"

MODEL    = None
SCALER   = None
LE       = None
FEATURES = None

# Only load if files exist — prevents crash on startup
if os.path.exists(f"{MODEL_DIR}/model.pkl"):
    MODEL    = joblib.load(f"{MODEL_DIR}/model.pkl")
    SCALER   = joblib.load(f"{MODEL_DIR}/scaler.pkl")
    LE       = joblib.load(f"{MODEL_DIR}/label_encoder.pkl")
    FEATURES = joblib.load(f"{MODEL_DIR}/feature_list.pkl")
    print("✓ ML models loaded successfully")
else:
    print("⚠ Model files not found — running in mock mode")

RISK_MAP = {
    "BENIGN": 1, "Bot": 8, "DDoS": 9,
    "DoS GoldenEye": 8, "DoS Hulk": 8,
    "DoS Slowhttptest": 7, "DoS slowloris": 7,
    "FTP-Patator": 6, "PortScan": 5,
    "SSH-Patator": 6,
    "Web Attack \ufffd Brute Force": 7,
    "Web Attack \ufffd XSS": 7,
}

app = FastAPI(
    title="Neural-Trace ML Classifier",
    version="1.0.0"
)

class FlowFeatures(BaseModel):
    features: Dict[str, float]

class PredictionResult(BaseModel):
    label: str
    risk_score: int
    confidence: float
    all_probabilities: Dict[str, float]

def compute_risk_score(label: str, confidence: float) -> int:
    base = RISK_MAP.get(label, 5)
    if label == "BENIGN":
        score = max(1, round(base * (1 - confidence) * 3))
    else:
        score = round(base * (0.5 + 0.5 * confidence))
    return int(np.clip(score, 1, 10))

@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": MODEL is not None,
        "model_classes": list(LE.classes_) if LE else []
    }

@app.get("/features")
def get_expected_features():
    if FEATURES is None:
        return {"features": [], "count": 0, "note": "Model not loaded"}
    return {"features": FEATURES, "count": len(FEATURES)}

@app.post("/predict", response_model=PredictionResult)
def predict(payload: FlowFeatures):
    
    # If model not loaded — return mock prediction
    if MODEL is None:
        import random
        mock_labels = ["SSH-Patator", "DDoS", "PortScan", "DoS Hulk", "BENIGN"]
        label = random.choice(mock_labels)
        confidence = round(random.uniform(0.75, 0.99), 4)
        return PredictionResult(
            label=label,
            risk_score=compute_risk_score(label, confidence),
            confidence=confidence,
            all_probabilities={label: confidence}
        )
    
    vector = np.array(
        [payload.features.get(f, 0.0) for f in FEATURES],
        dtype=np.float64
    ).reshape(1, -1)
    vector = np.nan_to_num(vector, nan=0.0, posinf=0.0, neginf=0.0)
    vector_scaled = SCALER.transform(vector)
    pred_class    = MODEL.predict(vector_scaled)[0]
    probabilities = MODEL.predict_proba(vector_scaled)[0]
    confidence    = float(probabilities.max())
    label         = LE.inverse_transform([pred_class])[0]
    all_probs = {
        LE.inverse_transform([i])[0]: round(float(p), 4)
        for i, p in enumerate(probabilities)
    }
    return PredictionResult(
        label=label,
        risk_score=compute_risk_score(label, confidence),
        confidence=round(confidence, 4),
        all_probabilities=all_probs
    )

@app.post("/predict/batch")
def predict_batch(payloads: list[FlowFeatures]):
    return [predict(p) for p in payloads]