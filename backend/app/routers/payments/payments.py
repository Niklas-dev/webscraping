import os

from fastapi import APIRouter, Request
import stripe

router = APIRouter(
    prefix='/payments',
    tags=['payments']
)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@router.get("/")
async def get_payment(request: Request):
    return "Success"
