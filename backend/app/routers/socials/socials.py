from fastapi import APIRouter, Request

from .services import create_new_post

router = APIRouter(
    prefix='/socials',
    tags=['socials']
)


@router.post("/create-new-post-idea")
async def create_new_post_idea(request: Request):
    return create_new_post(niche="", description="", extra="")
