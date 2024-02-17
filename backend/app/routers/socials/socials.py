import asyncio

from celery.result import AsyncResult
from fastapi import APIRouter, HTTPException, WebSocket
from starlette import status

from celery_setup import celery_app
from .tasks import test_tasks
from .services import create_new_post
from ..auth.services import user_dependency
from ...db.database import db_dependency

router = APIRouter(
    prefix='/socials',
    tags=['socials']
)


@router.get("/process")
async def process_endpoint():
    result = test_tasks.delay()
    return {"task_id": result.id}


@router.websocket("/ws/task/{task_id}")
async def websocket_endpoint(websocket: WebSocket, task_id: str):
    await websocket.accept()

    # Get the task result asynchronously
    result = AsyncResult(task_id, app=celery_app)

    while True:
        if result.ready():
            break
        await websocket.send_text(result.state)
        await asyncio.sleep(1)

    # Task is ready, send the final result
    if result.successful():
        await websocket.send_text(str(result.state))
        await websocket.send_text(str(result.result))
        await websocket.close()
    else:
        await websocket.send_text(result.state)


@router.post("/create-new-post-idea")
async def create_new_post_idea(user: user_dependency, db: db_dependency):
    if user.subscription_status != "active":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No active subscription")
    return create_new_post(niche="", description="", extra="", user_id=user.id, db=db)
