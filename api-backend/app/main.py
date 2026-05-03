from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio

from .database import models, db
from .api import auth, threats, ip_lookup, ml, forensics
from .services.cowrie_reader import cowrie_background_task
from .services.dionaea_reader import dionaea_background_task


@asynccontextmanager
async def lifespan(app: FastAPI):
    models.Base.metadata.create_all(bind=db.engine)
    print("✓ Database tables ready")

    asyncio.create_task(cowrie_background_task())
    asyncio.create_task(dionaea_background_task())
    print("✓ Cowrie + Dionaea log readers started")

    yield


app = FastAPI(
    title="CyShield — Neural-Trace API",
    description="Threat Intelligence & Digital Forensics Platform",
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
        "message": "Neural-Trace API is LIVE",
        "platform": "Threat Intelligence & Digital Forensics",
        "status": "Secure",
        "version": "1.0.0"
    }