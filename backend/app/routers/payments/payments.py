import os

from fastapi import APIRouter, Request, HTTPException
import stripe
from starlette import status
from starlette.responses import RedirectResponse

router = APIRouter(
    prefix='/payments',
    tags=['payments']
)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@router.get("/create-checkout-session")
def create_checkout_session(request: Request):
    domain_url = "http://localhost:3000/"

    try:
        checkout_session = stripe.checkout.Session.create(
            # you should get the user id here and pass it along as 'client_reference_id'
            #
            # this will allow you to associate the Stripe session with
            # the user saved in your database
            #
            # example: client_reference_id=user.id,

            success_url=domain_url + "payments/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=domain_url + "payments/cancel",
            payment_method_types=["card", "paypal"],
            mode="subscription",
            line_items=[
                {
                    "price": "price_1Obq5xGpk89JeyEsqb8Twsx3",
                    "quantity": 1,
                }
            ]
        )
        return checkout_session.url
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
