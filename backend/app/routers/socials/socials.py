import asyncio

from celery.result import AsyncResult
from fastapi import APIRouter, HTTPException, WebSocket
from sqlalchemy import case
from starlette import status

from celery_setup import celery_app
from .models import UserPostIdea
from .tasks import test_tasks
from .services import create_new_post
from .validators import CreatePostIdeaRequest
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
async def create_new_post_idea(user: user_dependency, db: db_dependency,
                               create_post_idea_request: CreatePostIdeaRequest):
    if user.subscription_status != "active":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No active subscription")

    if user.remaining_post_creations <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No post creations remaining.")

    result = create_new_post(niche=create_post_idea_request.niche, description=create_post_idea_request.description,
                             extra=create_post_idea_request.extra, user_id=user.id, db=db)
    return {"task_id": result.id, "detail": "You post idea is being generated."}


@router.get("/posts")
async def create_new_post_idea(user: user_dependency, db: db_dependency):
    posts = db.query(UserPostIdea).filter(UserPostIdea.user_id == user.id).order_by(UserPostIdea.is_finished == True,
                                                                                    UserPostIdea.id).all()
    return {"posts": posts}
