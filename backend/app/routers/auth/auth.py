import os

from fastapi import APIRouter, Depends, HTTPException
from datetime import timedelta
from typing import Annotated
from starlette import status
from fastapi.security import OAuth2PasswordRequestForm
import requests
from .models import Users
from .validators import CreateUserRequest, Token

from .services import create_access_token, authenticate_user, bcrypt_context
from db.database import db_dependency


router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

GOOGLE_CLIENT_ID = "969709362942-oqoriveq3lumcs940jio55uj54uet39u.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "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"
GOOGLE_REDIRECT_URI = "http://localhost/auth/google"

@router.get("/login/google")
async def login_google():
    return {
        "url": f"https://accounts.google.com/o/oauth2/auth?response_type=code&client_id={GOOGLE_CLIENT_ID}&redirect_uri={GOOGLE_REDIRECT_URI}&scope=openid%20profile%20email&access_type=offline"
    }

@router.get("/google")
async def auth_google(code: str):
    token_url = "https://accounts.google.com/o/oauth2/token"
    data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    response = requests.post(token_url, data=data)
    access_token = response.json().get("access_token")
    user_info = requests.get("https://www.googleapis.com/oauth2/v1/userinfo", headers={"Authorization": f"Bearer {access_token}"})
    return user_info.json()


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
