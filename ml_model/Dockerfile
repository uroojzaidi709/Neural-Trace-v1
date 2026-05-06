

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
RUN mkdir -p /app/model_output

EXPOSE 8001

CMD ["uvicorn", "inference_api:app", "--host", "0.0.0.0", "--port", "8001"]