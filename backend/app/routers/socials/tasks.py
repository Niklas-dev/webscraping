import time

from celery_setup import celery_app


@celery_app.task()
def test_tasks():
    time.sleep(60)
    return "test"
