from fastapi import FastAPI, status, HTTPException

from db.database import engine, db_dependency

from dotenv import load_dotenv

import os

from routers.auth.services import user_dependency
from routers.auth import models as auth_models
from routers.auth.auth import router as auth_router


load_dotenv()

app = FastAPI()

app.include_router(auth_router)


auth_models.Base.metadata.create_all(bind=engine)




@app.get("/", status_code=status.HTTP_200_OK)
async def user(user: user_dependency, db:db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed.")
    
    return {"user": user}

@app.get("/test", status_code=status.HTTP_200_OK)
async def test():
    print(os.getenv("SECRET_KEY"))
    return "test"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app="main:app", host="0.0.0.0", port=80, reload=True)