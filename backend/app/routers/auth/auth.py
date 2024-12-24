import bcrypt
from authlib.integrations.base_client import OAuthError
from authlib.oauth2.rfc6749 import OAuth2Token
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from datetime import timedelta
from typing import Annotated

from sqlalchemy.exc import IntegrityError
from starlette import status
from fastapi.security import OAuth2PasswordRequestForm
from .models import User
from .validators import CreateUserRequest, GoogleUser, Token, RefreshTokenRequest, UserUpdateRequest
from .services import create_access_token, authenticate_user, create_refresh_token, \
    create_user_from_google_info, get_user_by_google_sub, token_expired, decode_token, user_dependency, \
    generate_verification_token, send_verification_email, verify_token, pwd_context
from ...config.settings import app_settings
from ...db.database import db_dependency
from .services import oauth
from fastapi import Request
from fastapi.responses import RedirectResponse

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)


@router.get("/google")
async def login_google(request: Request):
    return await oauth.google.authorize_redirect(request, app_settings.GOOGLE_REDIRECT_URI)


@router.get("/callback/google")
async def auth_google(request: Request, db: db_dependency):
    try:
        user_response: OAuth2Token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")

    user_info = user_response.get("userinfo")

    print(user_info)

    google_user = GoogleUser(**user_info)

    existing_user = get_user_by_google_sub(google_user.sub, db)

    if existing_user:
        print("Existing user")
        user = existing_user
    else:
        print("Creating user")
        user = create_user_from_google_info(google_user, db)

    access_token = create_access_token(user.username, user.id,
                                       timedelta(days=app_settings.ACCESS_TOKEN_EXPIRATION_DAYS))
    refresh_token = create_refresh_token(user.username, user.id,
                                         timedelta(days=app_settings.REFRESH_TOKEN_EXPIRATION_DAYS))

    return RedirectResponse(
        f"{app_settings.FRONTEND_URL}/auth?access_token={access_token}&refresh_token={refresh_token}")


@router.post("/create-user", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest, background_tasks: BackgroundTasks):
    existing_user = db.query(User).filter(User.username == create_user_request.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken.")

    hashed_password = pwd_context.hash(create_user_request.password)
    try:
        user = User(username=create_user_request.username, email=create_user_request.email,
                    hashed_password=hashed_password)
        db.add(user)
        db.commit()
    except IntegrityError as e:
        raise HTTPException(status_code=400, detail="Email already taken.")

    token = generate_verification_token(create_user_request.username)

    background_tasks.add_task(send_verification_email, create_user_request.email, token)

    return {"message": "User created. Please check your email to verify your account."}


@router.get("/verify-email")
async def verify_email(db: db_dependency, token: str):
    payload = verify_token(token)
    email = payload["sub"]

    user = db.query(User).filter(User.username == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.is_verified:
        raise HTTPException(status_code=400, detail="User already verified")

    # Mark the user as verified
    user.is_verified = True
    db.commit()

    return RedirectResponse(f"{app_settings.FRONTEND_URL}/login?detail=email_verified")


@router.get("/get-user", status_code=status.HTTP_201_CREATED)
async def get_user(db: db_dependency, user: user_dependency):
    return user


@router.post("/token", response_model=Token, status_code=status.HTTP_200_OK)
async def login_for_access_token(db: db_dependency, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user.")

    if not user.is_verified:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You must verify your email first. Check "
                                                                             "your email inbox.")

    access_token = create_access_token(user.username, user.id,
                                       timedelta(days=app_settings.ACCESS_TOKEN_EXPIRATION_DAYS))
    refresh_token = create_refresh_token(user.username, user.id,
                                         timedelta(days=app_settings.REFRESH_TOKEN_EXPIRATION_DAYS))

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


@router.post("/refresh", response_model=Token)
async def refresh_access_token(db: db_dependency, refresh_token_request: RefreshTokenRequest):
    token = refresh_token_request.refresh_token

    if token_expired(token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token is expired.")

    user = decode_token(token)
    print(user)
    print(f"Refreshed token for {user["sub"]}")

    access_token = create_access_token(user["sub"], user["id"], timedelta(
        days=app_settings.ACCESS_TOKEN_EXPIRATION_DAYS))
    refresh_token = create_refresh_token(user["sub"], user["id"], timedelta(
        days=app_settings.REFRESH_TOKEN_EXPIRATION_DAYS))

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


@router.patch("/update-user", response_model=UserUpdateRequest)
def update_user(user: user_dependency, db: db_dependency, user_update_request: UserUpdateRequest):
    # Get the user from the database
    user = db.query(User).filter(User.id == user.id).first()
    print(user)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Example of restricted fields that should not be updated
    restricted_fields = ['id', 'created_at', 'is_admin', 'hashed_password', 'google_sub']

    # Convert the user_update to a dictionary, excluding unset fields
    update_data = user_update_request.dict(exclude_unset=True)

    # Check if any restricted fields are in the update request
    for field in restricted_fields:
        if field in update_data:
            raise HTTPException(status_code=400, detail=f"Field '{field}' cannot be updated.")

    # Update only the fields that are allowed and provided
    print(update_data.items())
    for key, value in update_data.items():
        setattr(user, key, value)
    print(user.niche_preference)
    # Commit the changes to the database
    db.commit()
    db.refresh(user)

    return user
