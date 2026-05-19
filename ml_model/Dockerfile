
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir numpy==1.26.4 scipy==1.13.1
RUN pip install --no-cache-dir xgboost==2.1.1 --no-deps
RUN pip install --no-cache-dir \
    fastapi==0.115.0 \
    uvicorn==0.30.0 \
    joblib==1.4.2 \
    scikit-learn==1.5.2

COPY inference_api.py .

# FIX: model_output already mounted as volume — no COPY needed
# But we create the dir so it exists at startup
RUN mkdir -p /app/model_output

EXPOSE 8001

# FIX: rename "model (1).pkl" to "model.pkl" at container start if needed
CMD sh -c '\
  if [ -f "/app/model_output/model (1).pkl" ] && [ ! -f "/app/model_output/model.pkl" ]; then \
    cp "/app/model_output/model (1).pkl" "/app/model_output/model.pkl"; \
    echo "✓ Renamed model file"; \
  fi && \
  uvicorn inference_api:app --host 0.0.0.0 --port 8001'
