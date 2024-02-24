import os

from dotenv import load_dotenv


class Settings:
    def __init__(self):
        load_dotenv()

        self.SECRET_KEY = os.getenv("SECRET_KEY")
        self.FRONTEND_URL = os.getenv("FRONTEND_URL")
        self.CORS_ORIGINS = ["*"]


app_settings = Settings()


