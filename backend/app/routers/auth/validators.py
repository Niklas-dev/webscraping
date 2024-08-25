from typing import Optional

from pydantic import BaseModel


class CreateUserRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class GoogleUser(BaseModel):
    sub: int
    email: str
    name: str
    picture: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class UserUpdateRequest(BaseModel):
    niche_preference: Optional[str] = None
    extra_preference: Optional[str] = None
    age: Optional[int] = None
