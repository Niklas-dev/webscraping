import os

from dotenv import load_dotenv


class Settings:
    def __init__(self):
        load_dotenv()

        self.SECRET_KEY = os.getenv("SECRET_KEY")
        self.CORS_ORIGINS = ["*"]


app_settings = Settings()


