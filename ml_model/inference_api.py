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

# ── Load model artifacts at startup (not per-request) ──────────────────────
MODEL   = joblib.load("./model_output/model.pkl")
SCALER  = joblib.load("./model_output/scaler.pkl")
LE      = joblib.load("./model_output/label_encoder.pkl")
FEATURES = joblib.load("./model_output/feature_list.pkl")  # ordered list of 30 feature names

# Risk base scores per label
RISK_MAP = {
    "BENIGN":                        1,
    "Bot":                           8,
    "DDoS":                          9,
    "DoS GoldenEye":                 8,
    "DoS Hulk":                      8,
    "DoS Slowhttptest":              7,
    "DoS slowloris":                 7,
    "FTP-Patator":                   6,
    "PortScan":                      5,
    "SSH-Patator":                   6,
    "Web Attack \ufffd Brute Force":  7,
    "Web Attack \ufffd XSS":          7,
}

app = FastAPI(
    title="Neural-Trace ML Classifier",
    description="Classifies network flows and returns attack label + risk score",
    version="1.0.0"
)


# ── Request/Response schemas ────────────────────────────────────────────────
class FlowFeatures(BaseModel):
    """
    The Forensic Engine sends extracted network flow features as a flat dict.
    Keys must match the feature names used during training (returned by /features).
    Any missing features will be filled with 0.
    """
    features: Dict[str, float]


class PredictionResult(BaseModel):
    label: str
    risk_score: int         # 1–10
    confidence: float       # 0.0–1.0
    all_probabilities: Dict[str, float]


# ── Helper ───────────────────────────────────────────────────────────────────
def compute_risk_score(label: str, confidence: float) -> int:
    base = RISK_MAP.get(label, 5)
    if label == "BENIGN":
        score = max(1, round(base * (1 - confidence) * 3))
    else:
        score = round(base * (0.5 + 0.5 * confidence))
    return int(np.clip(score, 1, 10))


# ── Endpoints ────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok", "model_classes": list(LE.classes_)}


@app.get("/features")
def get_expected_features():
    """Returns the exact feature list the model expects — use this to align the Forensic Engine."""
    return {"features": FEATURES, "count": len(FEATURES)}


@app.post("/predict", response_model=PredictionResult)
def predict(payload: FlowFeatures):
    """
    Input : dict of flow features from the Forensic Engine
    Output: attack label, risk score (1-10), confidence, all class probabilities
    """
    # Build feature vector in the correct order, fill missing with 0
    vector = np.array(
        [payload.features.get(f, 0.0) for f in FEATURES],
        dtype=np.float64
    ).reshape(1, -1)

    # Replace any inf/nan (corrupt input)
    vector = np.nan_to_num(vector, nan=0.0, posinf=0.0, neginf=0.0)

    # Scale
    vector_scaled = SCALER.transform(vector)

    # Predict
    pred_class   = MODEL.predict(vector_scaled)[0]
    probabilities = MODEL.predict_proba(vector_scaled)[0]
    confidence   = float(probabilities.max())
    label        = LE.inverse_transform([pred_class])[0]

    # Build probability dict for all classes
    all_probs = {
        LE.inverse_transform([i])[0]: round(float(p), 4)
        for i, p in enumerate(probabilities)
    }

    risk_score = compute_risk_score(label, confidence)

    return PredictionResult(
        label=label,
        risk_score=risk_score,
        confidence=round(confidence, 4),
        all_probabilities=all_probs
    )


@app.post("/predict/batch")
def predict_batch(payloads: list[FlowFeatures]):
    """Batch prediction for processing multiple flows at once."""
    results = [predict(p) for p in payloads]
    return results
