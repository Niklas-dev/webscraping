from fastapi import APIRouter, HTTPException
from starlette import status

from .services import create_new_post
from ..auth.services import user_dependency
from ...db.database import db_dependency

router = APIRouter(
    prefix='/socials',
    tags=['socials']
)


@router.post("/create-new-post-idea")
async def create_new_post_idea(user: user_dependency, db: db_dependency):
    if user.subscription_status != "active":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No active subscription")
    return create_new_post(niche="", description="", extra="", user_id=user.id, db=db)
