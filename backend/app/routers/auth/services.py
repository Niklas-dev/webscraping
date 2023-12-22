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