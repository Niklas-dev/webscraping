from celery_setup import celery_app


@celery_app.task()
def test_tasks():
    return "test"
