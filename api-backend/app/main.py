from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .database import models, db 
from .utils import hash_password

@asynccontextmanager
async def lifespan(app: FastAPI):
    models.Base.metadata.create_all(bind=db.engine)
    yield

app = FastAPI(title="Neural-Trace API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Neural-Trace API is LIVE", "status": "Secure"}

@app.post("/register", status_code=status.HTTP_201_CREATED)
def create_user(user_data: dict, db_session: Session = Depends(db.get_db)):
    existing_user = db_session.query(models.User).filter(
        models.User.email_address == user_data['email']
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pwd = hash_password(user_data['password'])
    new_user = models.User(
        full_name=user_data['full_name'],
        email_address=user_data['email'],
        phone_number=user_data.get('phone'),
        hashed_password=hashed_pwd,
        role=user_data.get('role', 'citizen')
    )
    db_session.add(new_user)
    db_session.commit()
    db_session.refresh(new_user)
    return {"message": "User registered successfully", "user_id": new_user.id}