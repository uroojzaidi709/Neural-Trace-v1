
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import db, models
from ..utils import verify_password, hash_password
from ..core.security import create_access_token, verify_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: dict, db_session: Session = Depends(db.get_db)):

    existing_user = db_session.query(models.User).filter(models.User.email_address == user_data['email']).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    hashed_password = hash_password(user_data['password'])
    
    new_user = models.User(
        full_name=user_data['full_name'],
        email_address=user_data['email'],
        phone_number=user_data.get('phone_number'),
        hashed_password=hashed_password,
        role=user_data.get('role', 'citizen')
    )

    db_session.add(new_user)
    db_session.commit()
    db_session.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }


@router.post("/login")
def login(user_credentials: dict, db_session: Session = Depends(db.get_db)): 

    user = db_session.query(models.User).filter(models.User.email_address == user_credentials['email']).first()

  
    if not user or not verify_password(user_credentials['password'], user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    
    access_token = create_access_token(data={
        "sub": str(user.id), 
        "role": user.role,
        "email": user.email_address
        })
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "full_name": user.full_name
        }

@router.get("/me")
def get_me(token: str, db_session: Session = Depends(db.get_db)):

    payload = verify_access_token(token)

    user_id = int(payload.get("sub"))

    user = db_session.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return{
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email_address,
        "role": user.role,
        "member_since": user.timestamp
    }



        