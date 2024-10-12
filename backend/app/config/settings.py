import os

from dotenv import load_dotenv


class Settings:
    def __init__(self):
        load_dotenv()

        self.SECRET_KEY: str = os.getenv("SECRET_KEY")
        self.FRONTEND_URL: str = os.getenv("FRONTEND_URL")
        self.CORS_ORIGINS: list[str] = ["*"]
        self.ACCESS_TOKEN_EXPIRATION_DAYS: int = 7
        self.REFRESH_TOKEN_EXPIRATION_DAYS: int = 14
        self.GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID")
        self.GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET")
        self.GOOGLE_REDIRECT_URI: str = os.getenv("GOOGLE_REDIRECT_URI")


app_settings = Settings()


