from datetime import timedelta

from celery import Celery
from celery.schedules import crontab

from app.config.settings import app_settings

celery_app = Celery(
    'tasks',
    broker=app_settings.REDIS_DSN,
    backend=app_settings.REDIS_DSN,
    include=[
        "app.routers.socials.tasks",
        "app.routers.trending.tasks"
    ]
)

celery_app.conf.beat_schedule = {
    'fetch-trending-data': {
        'task': 'app.routers.trending.tasks.fetch_all_trending_data',
        'schedule': timedelta(seconds=30),  # every 30 seconds
        'options': {'queue': 'trending_queue'}
    },
    'cleanup-old-trends': {
        'task': 'app.routers.trending.tasks.cleanup_old_trends',
        'schedule': timedelta(minutes=1),  # every 1 minute
        'options': {'queue': 'cleanup_queue'}
    },
}

# Set timezone for beat scheduler
celery_app.conf.timezone = 'UTC'

# Configure task routes to use specific queues
celery_app.conf.task_routes = {
    'app.routers.trending.tasks.fetch_all_trending_data': {'queue': 'trending_queue'},
    'app.routers.trending.tasks.cleanup_old_trends': {'queue': 'cleanup_queue'},
}

# Optional: Configure worker to consume from all queues
celery_app.conf.task_default_queue = 'default'
celery_app.conf.task_create_missing_queues = True