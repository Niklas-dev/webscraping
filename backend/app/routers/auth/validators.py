from pydantic import BaseModel

class CreateUserRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class GoogleUser(BaseModel):
    id: int
    email: str
    name: str
    picture: str