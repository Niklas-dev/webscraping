import asyncio
import logging

from celery.result import AsyncResult
from fastapi import APIRouter, HTTPException, WebSocket
from sqlalchemy import desc
from starlette import status

from celery_setup import celery_app
from .models import UserPostIdea
from .tasks import test_tasks
from .services import create_new_post
from .validators import CreatePostIdeaRequest, ChangeLikePostIdeaRequest, ChangeStatusPostIdeaRequest
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
async def create_new_post_idea(
    user: user_dependency,
    db: db_dependency,
    create_post_idea_request: CreatePostIdeaRequest
):
    logging.info(f"User {user.id} requested a new post idea.")
    print(create_post_idea_request)

    # Check if user has an active subscription or enough one-time credits
    if user.subscription_status != "active" and user.remaining_post_creations_onetime_paid < 1:
        logging.warning(f"User {user.id} has no active subscription or credits left.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active subscription or one-time credits available."
        )

    # Deduct the correct type of credits
    if user.remaining_post_creations >= 1:
        user.remaining_post_creations -= 1
    elif user.remaining_post_creations_onetime_paid >= 1:
        user.remaining_post_creations_onetime_paid -= 1
    else:
        logging.error(f"User {user.id} ran out of credits despite checks.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No credits remaining. Consider upgrading your subscription."
        )

    # Generate the post idea with enhanced inputs
    result = create_new_post(
        niche=create_post_idea_request.niche,
        post_goal=create_post_idea_request.post_goal,
        target_audience=create_post_idea_request.target_audience,
        content_format=create_post_idea_request.content_format,
        extra=create_post_idea_request.extra,
        tone=create_post_idea_request.tone,
        user_id=user.id,
        db=db
    )

    logging.info(f"Post idea task {result.id} successfully created for user {user.id}.")

    return {
        "task_id": result.id,
        "detail": "Your post idea is being generated."
    }


@router.get("/posts")
async def create_new_post_idea(user: user_dependency, db: db_dependency):
    posts = db.query(UserPostIdea).filter(UserPostIdea.user_id == user.id, UserPostIdea.is_deleted == False).order_by(
        UserPostIdea.is_finished == True,
        desc(UserPostIdea.created_at)).all()
    return {"posts": posts}


@router.get("/posts/{idea_id}")
async def get_new_post_idea(user: user_dependency, db: db_dependency, idea_id: int):
    post: UserPostIdea = db.query(UserPostIdea).filter(UserPostIdea.user_id == user.id,
                                                       UserPostIdea.id == idea_id).order_by(
        UserPostIdea.is_finished == True,
        UserPostIdea.created_at).first()
    return {"post": post}


@router.delete("/posts/{idea_id}")
async def delete_new_post_idea(user: user_dependency, db: db_dependency, idea_id: int):
    post: UserPostIdea = db.query(UserPostIdea).filter(UserPostIdea.user_id == user.id,
                                                       UserPostIdea.id == idea_id).first()
    post.is_deleted = True

    db.commit()
    return {"detail": "Post idea deleted"}


@router.get("/liked-posts")
async def get_liked_new_post_idea(user: user_dependency, db: db_dependency):
    liked_posts = (db.query(UserPostIdea).filter(UserPostIdea.user_id == user.id, UserPostIdea.is_liked == True,
                                                 UserPostIdea.is_deleted == False).order_by(
        UserPostIdea.created_at).all())
    return {"liked_posts": liked_posts}


@router.post("/change-like-post-idea")
async def change_like_new_post_idea(user: user_dependency, db: db_dependency,
                                    change_like_post_idea_request: ChangeLikePostIdeaRequest):
    post = db.query(UserPostIdea).filter(UserPostIdea.id == change_like_post_idea_request.id).first()
    post.is_liked = change_like_post_idea_request.is_liked
    db.commit()
    db.refresh(post)

    return {"post": post}


@router.post("/change-status-post-idea")
async def change_status_new_post_idea(user: user_dependency, db: db_dependency,
                                      change_status_post_idea_request: ChangeStatusPostIdeaRequest):
    print(change_status_post_idea_request)
    post = db.query(UserPostIdea).filter(UserPostIdea.id == change_status_post_idea_request.id).first()
    post.status = change_status_post_idea_request.status
    db.commit()
    db.refresh(post)

    return {"post": post}
