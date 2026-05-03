from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .database import models, db
from .api import auth, threats, ip_lookup, ml, forensics


@asynccontextmanager
async def lifespan(app: FastAPI):
    models.Base.metadata.create_all(bind=db.engine)
    print("✓ Database tables ready")
    yield


app = FastAPI(
    title="Neural-trace — CIFA API",
    description="Cyber Intelligence and Forensic Agency | Threat Intelligence & Digital Forensics",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(threats.router)
app.include_router(ip_lookup.router)
app.include_router(ml.router)
app.include_router(forensics.router)


@app.get("/")
def root():
    return {
        "message": "Neural-trace CIFA API is LIVE",
        "platform": "Cyber Intelligence and Forensic Agency",
        "status": "Secure",
        "version": "1.0.0"
    }