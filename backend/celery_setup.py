from celery import Celery

from app.config.settings import app_settings

celery_app = Celery('tasks', broker=app_settings.REDIS_DSN, backend=app_settings.REDIS_DSN, include=["app.routers.socials.tasks"])

