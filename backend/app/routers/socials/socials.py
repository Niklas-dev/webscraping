from fastapi import APIRouter, Request


router = APIRouter(
    prefix='/auth',
    tags=['auth']
)


@router.get("/login/google")
async def get_instagram(request: Request):
    return "Success"
