from typing import Optional

from pydantic import BaseModel, EmailStr


class CreateUserRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class GoogleUser(BaseModel):
    sub: int
    email: EmailStr
    name: str
    picture: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordReset(BaseModel):
    new_password: str
    token: str


class UserUpdateRequest(BaseModel):
    username: Optional[str] = None
    niche_preference: Optional[str] = None
    extra_preference: Optional[str] = None
    age: Optional[int] = None
