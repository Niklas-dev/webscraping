from celery import Celery

from app.config.settings import app_settings

celery_app = Celery('tasks', broker=f'redis://:yourpassword@{app_settings.REDIS_HOST}:6379', backend=f'redis://:yourpassword@{app_settings.REDIS_HOST}:6379', include=["app.routers.socials.tasks"])

