import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from datetime import timedelta, datetime, UTC
from typing import Annotated
import random
import string
from passlib.context import CryptContext
from starlette import status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session, defer
from authlib.integrations.starlette_client import OAuth, OAuthError
import os
from jose import jwt, JWTError
from starlette.config import Config
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from .validators import GoogleUser
from .models import User
from ...config.settings import app_settings
from ...db.database import db_dependency
import resend

resend.api_key = app_settings.RESEND_API_KEY
ALGORITHM = "HS256"

oauth_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

GOOGLE_CLIENT_ID = app_settings.GOOGLE_CLIENT_ID or None
GOOGLE_CLIENT_SECRET = app_settings.GOOGLE_CLIENT_SECRET or None
SENDGRID_API_KEY = app_settings.SENDGRID_API_KEY or None

if GOOGLE_CLIENT_ID is None or GOOGLE_CLIENT_SECRET is None:
    raise Exception('Missing env variables')

config_data = {'GOOGLE_CLIENT_ID': GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_SECRET': GOOGLE_CLIENT_SECRET}
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
starlette_config = Config(environ=config_data)

oauth = OAuth(starlette_config)

oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)


def authenticate_user(username: str, password: str, db: type[Session]):
    user: User = db.query(User).filter(User.username == username).first()

    if not user:
        return False

    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user


def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {"sub": username, "id": user_id}

    expires = datetime.now(UTC) + expires_delta

    encode.update({"exp": expires})

    return jwt.encode(encode, app_settings.SECRET_KEY, algorithm=ALGORITHM)


def create_reset_token(email, expires_delta: timedelta):
    encode = {"email": email}

    expires = datetime.now(UTC) + expires_delta

    encode.update({"exp": expires})

    return jwt.encode(encode, app_settings.SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(username: str, user_id: int, expires_delta: timedelta):
    return create_access_token(username, user_id, expires_delta)


def decode_token(token):
    return jwt.decode(token, app_settings.SECRET_KEY, algorithms=ALGORITHM)


def get_current_user(token: Annotated[str, Depends(oauth_bearer)], db: db_dependency) -> User:
    try:
        payload = jwt.decode(token, app_settings.SECRET_KEY, algorithms=ALGORITHM)
        username: str = payload.get("sub")
        user_id: int = payload.get("id")

        user: User = db.query(User).filter(User.username == str(username)).options(
            defer(User.hashed_password), defer(User.google_sub)).first()

        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user.")
        return user
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user.")


def token_expired(token: Annotated[str, Depends(oauth_bearer)]):
    try:
        payload = decode_token(token)
        if not datetime.fromtimestamp(payload.get('exp'), UTC) > datetime.now(UTC):
            return True
        return False

    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user.")


def get_user_by_google_sub(google_sub: int, db: Session):
    return db.query(User).filter(User.google_sub == str(google_sub)).first()


def get_unique_username(base_username, db):
    username = base_username
    counter = 1

    while db.query(User).filter(User.username == username).first():
        username = f"{base_username}{counter}"  # Append a number to make it unique
        counter += 1

    return username


def create_user_from_google_info(google_user: GoogleUser, db: Session):
    google_sub = google_user.sub
    email = google_user.email
    name = google_user.name

    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:

        existing_user.google_id = google_sub
        db.commit()
        return existing_user
    else:
        # get the first part of the email as the username
        base_username = email.split("@")[0]

        unique_username = get_unique_username(base_username, db)
        new_user = User(
            username=unique_username,
            email=email,
            google_sub=google_sub,
            is_oauth=True

        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user


def generate_verification_token(email: str):
    expiration_time = datetime.now() + timedelta(minutes=30)
    payload = {
        "sub": email,
        "exp": expiration_time
    }
    token = jwt.encode(payload, app_settings.SECRET_KEY, algorithm=ALGORITHM)
    return token


def verify_token(token: str):
    try:
        payload = jwt.decode(token, app_settings.SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=400, detail="Invalid token")


async def send_verification_email(email: str, token: str):
    verification_link = f"{app_settings.BACKEND_URL}/auth/verify-email?token={token}"
    subject = "Confirm Your Email - TrendPilot"

    html_content = f"""
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
            }}
            .container {{
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }}
            .logo {{
                font-size: 24px;
                font-weight: bold;
                color: #111;
                margin-bottom: 20px;
            }}
            .button {{
                display: inline-block;
                padding: 12px 20px;
                font-size: 16px;
                font-weight: bold;
                color: #ffffff;
                background-color: #ffbe00;
                text-decoration: none;
                border-radius: 6px;
                margin-top: 20px;
            }}
            .footer {{
                margin-top: 30px;
                font-size: 12px;
                color: #777;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">TrendPilot</div>
            <h2>Verify Your Email</h2>
            <p>Welcome to TrendPilot! To get started, please verify your email address.</p>
            <a href="{verification_link}" class="button">Verify Email</a>
            <p>This link will expire in a couple of minutes.</p>
            <div class="footer">
                <p>If you did not sign up for TrendPilot, you can ignore this email.</p>
                <p>Need help? Contact us at <a href="mailto:niklas.developers@gmail.com">niklas.developers@gmail.com</a></p>
            </div>
        </div>
    </body>
    </html>
    """

    try:
        params = {
            "from": "support@trendpilot.pro",
            "to": [email],
            "subject": subject,
            "html": html_content,
        }

        email_response = resend.Emails.send(params)
        print(f"Email sent successfully: {email_response}")
    except Exception as e:
        print(f"Error sending email: {e}")

    print(f"Verification email sent to {email}")



async def send_password_reset_email(email: str, token: str):
    reset_link = f"{app_settings.FRONTEND_URL}/change-password?token={token}"
    subject = "Request to reset your TrendPilot Password"
    html_content = f"""
    <html>
        <body>
            <h1>Password Reset</h1>
            <p>Click the link below to reset your password:</p>
            <a href="{reset_link}">Reset Password</a>
            <p>This link is valid for x minutes.</p>
        </body>
    </html>
    """
    try:
        params = {
            "from": "support@trendpilot.pro",
            "to": [email],
            "subject": subject,
            "html": html_content,
        }

        email_response = resend.Emails.send(params)
        print(f"Email sent successfully: {email_response}")
    except Exception as e:
        print(f"Error sending email: {e}")
    print(f"Password reset email sent to {email}")


user_dependency = Annotated[dict, Depends(get_current_user)]
