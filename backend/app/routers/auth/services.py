from fastapi import APIRouter, Depends, HTTPException
from datetime import timedelta, datetime
from typing import Annotated

from starlette import status
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

import os
from jose import jwt, JWTError

from .validators import GoogleUser
from .models import Users





ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")
    


def authenticate_user(username: str, password: str, db: type[Session]):
    user: Users = db.query(Users).filter(Users.username == username).first()

    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {"sub": username, "id": user_id}

    expires = datetime.utcnow() + expires_delta

    encode.update({"exp": expires})

    return jwt.encode(encode, os.getenv("SECRET_KEY"), algorithm=ALGORITHM)



async def get_current_user(token: Annotated[str, Depends(oauth_bearer)]):
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=ALGORITHM)
        username: str = payload.get("sub")
        user_id: int = payload.get("id")

        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user.")
        return {"username": username, "id": user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user.")
    

def get_user_by_google_id(google_id: str, db: Session):
    return db.query(Users).filter(Users.google_id == str(google_id)).first()

def create_user_from_google_info(google_user: GoogleUser, db: Session):
    google_id = google_user.id
    email = google_user.email
    name = google_user.name

    existing_user = db.query(Users).filter(Users.email == email).first()

    if existing_user:
        
        existing_user.google_id = google_id
        db.commit()
        return existing_user
    else:
        
        new_user = Users(
            username=email,  
            email=email,
            google_id=google_id,

        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    
user_dependency = Annotated[dict, Depends(get_current_user)]