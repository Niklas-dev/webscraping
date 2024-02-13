from fastapi import APIRouter
from .services import create_new_post
from ..auth.services import user_dependency
from ...db.database import db_dependency

router = APIRouter(
    prefix='/socials',
    tags=['socials']
)


@router.post("/create-new-post-idea")
async def create_new_post_idea(user: user_dependency, db: db_dependency):
    return create_new_post(niche="", description="", extra="", user_id=user.id, db=db)
