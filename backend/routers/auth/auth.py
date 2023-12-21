from fastapi import APIRouter, Depends, HTTPException
from datetime import timedelta, datetime
from typing import Annotated
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from database import SessionLocal
from models import Users
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
import os
from .validators import CreateUserRequest, Token
from database import db_dependency
router = APIRouter(
prefix='/auth',
tags = ['auth']
)

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
    
    
user_dependency = Annotated[dict, Depends(get_current_user)]
    

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    create_user_model = Users(
        username=create_user_request.username, 
        hashed_password=bcrypt_context.hash(create_user_request.password)
    )
        
    db.add(create_user_model)
    db.commit()
    
@router.post("/token", response_model=Token)
async def login_for_access_token(db: db_dependency, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user.")

    token = create_access_token(user.username, user.id, timedelta(days=3))

    return {"access_token": token, "token_type": "bearer"}

