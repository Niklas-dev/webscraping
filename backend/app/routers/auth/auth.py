from fastapi import APIRouter, Depends, HTTPException
from datetime import timedelta, datetime
from typing import Annotated
from sqlalchemy.orm import Session
from starlette import status
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from db.database import db_dependency
import os

from .models import Users
from .validators import CreateUserRequest, Token
from .services import get_current_user, create_access_token, authenticate_user

router = APIRouter(
prefix='/auth',
tags = ['auth']
)

ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")
    
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

