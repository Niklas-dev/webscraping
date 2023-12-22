from fastapi import FastAPI, status, HTTPException

from db.database import engine, db_dependency


from routers.auth import auth
from dotenv import load_dotenv
from routers.auth import models as auth_models
import os

load_dotenv()

app = FastAPI()

app.include_router(auth.router)


auth_models.Base.metadata.create_all(bind=engine)




@app.get("/", status_code=status.HTTP_200_OK)
async def user(user: auth.user_dependency, db:db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed.")
    
    return {"user": user}

@app.get("/test", status_code=status.HTTP_200_OK)
async def test():
    print(os.getenv("SECRET_KEY"))
    return "test"