from fastapi import APIRouter, Depends, HTTPException
from datetime import timedelta, datetime
from typing import Annotated
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from database import SessionLocal
from models import User
from passlib.context import CryptContext
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError

router = APIRouter(
prefix='/auth',
tags = ['auth']
)

@router.get("/", )
async def auth():
    return "Test"