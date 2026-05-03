
from fastapi import APIRouter, HTTPException
import requests
import os 

router = APIRouter(prefix="/ml", tags=["ML Classifier"])

ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://localhost:8001")

@router.get("/health")
def ml_health_check():

    try:
        response = requests.get(
            f"{ML_SERVICE_URL}/health",
            timeout=5
        )

        return {
            "ml_server": "online",
            "ml_url": ML_SERVICE_URL,
            "details": response.json()
        }
    
    except Exception:      
        return {
            "ml_server": "offline",
            "ml_url": ML_SERVICE_URL,
            "details": "ML service not reachable"
        }
    
@router.get("/features")
def get_features():

    try:

        response = requests.get(
            f"{ML_SERVICE_URL}/features",
            timeout=5
        )    
        return response.json()
    except Exception:
        raise HTTPException(
            status_code=503,
            detail="ML service offline - cannot get features"
        )
    
@router.post("/classify")
def classify_attack(features: dict):

    try:
        response = requests.post(
            f"{ML_SERVICE_URL}/predict",
            json={"features": features},
            timeout=10
        )    

        if response.status_code != 200:
            raise HTTPException(
                status_code=502,
                detail="ML service returned an error"
            )
        
        ml_result = response.json()

        return {
            "predicted_attack": ml_result["label"],
            "confidence": ml_result["confidence"],
            "risk_score": ml_result["risk_score"],
            "all_probabilities": ml_result.get("all_probabilities", {}),
            "model_status": "active"
        }
    
    except HTTPException:
        raise
    except Exception as e:

        import random
        attack_types = [
             "SSH-Patator", "DDoS", "PortScan",
            "DoS Hulk", "FTP-Patator", "BENIGN"
        ]

        predicted = random.choice(attack_types)
        confidence = round(random.uniform(0.75, 0.99), 2)

        risk_weights = {
            "DDoS": 9, "DoS Hulk": 8,
            "SSH-Patator": 7, "FTP-Patator": 6,
            "PortScan": 5, "BENIGN": 1
        }
       
        base = risk_weights.get(predicted, 5)
        risk_score = round(base * (0.5 + 0.5 * confidence))
        
        return {
            "predicted_attack": predicted,
            "confidence": confidence,
            "risk_score": min(risk_score, 10),
            "all_probabilities": {},
            "model_status": "mock_mode — ML service offline"
        }

@router.post("/classify/batch")
def classify_batch(batch: list):

    try:

        response = requests.post(
            f"{ML_SERVICE_URL}/predict/batch",
            json=[{"features": f} for f in batch],
            timeout=30
        )

        results = response.json()

        return [
            {
                "predicted_attack": r["label"],
                "confidence": r["confidence"],
                "risk_score": r["risk_score"]
            }
            for r in results
        ]
    
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Batch classification failed: {str(e)}"
        )

