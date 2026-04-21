
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import db, models
from ..utils import verify_password
from ..core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login")
def login(user_credentials: dict, db_session: Session = Depends(db.get_db)): 

    user = db_session.query(models.User).filter(models.User.email_address == user_credentials['email']).first()

  
    if not user or not verify_password(user_credentials['password'], user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    
    access_token = create_access_token(data={"sub": str(user.id), "role": user.role})
    
    return {"access_token": access_token, "token_type": "bearer"}