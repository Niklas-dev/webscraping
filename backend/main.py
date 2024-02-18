from fastapi import FastAPI, status, HTTPException
from starlette.middleware.sessions import SessionMiddleware

from app.config.settings import app_settings
from app.db.database import engine, db_dependency
from dotenv import load_dotenv
import logging
import os

from app.routers.auth.services import user_dependency
from app.routers.auth import models as auth_models
from app.routers.payments import models as payments_models
from app.routers.socials import models as socials_models

from app.routers.auth.auth import router as auth_router
from app.routers.payments.payments import router as payments_router
from app.routers.socials.socials import router as socials_router
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=app_settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key=app_settings.SECRET_KEY)

app.include_router(auth_router)
app.include_router(payments_router)
app.include_router(socials_router)

auth_models.Base.metadata.create_all(bind=engine)
payments_models.Base.metadata.create_all(bind=engine)
socials_models.Base.metadata.create_all(bind=engine)


@app.get("/", status_code=status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
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
