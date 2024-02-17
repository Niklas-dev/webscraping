from celery import Celery

celery_app = Celery('tasks', broker='redis://:yourpassword@192.168.178.50:6379', backend='redis://:yourpassword@192.168.178.50:6379', include=["app.routers.socials.tasks"])

