import os
from typing import Optional

from fastapi import APIRouter, Request, HTTPException, Header
import stripe
from pydantic import BaseModel
from starlette import status
from starlette.responses import RedirectResponse

from app.routers.auth.services import user_dependency

router = APIRouter(
    prefix='/payments',
    tags=['payments']
)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@router.get("/create-checkout-session")
def create_checkout_session(request: Request, user: user_dependency):
    domain_url = "http://localhost:3000/"
    print(user)

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


class WebHookData(BaseModel):
    data: dict
    type: str


@router.post("/webhook")
async def stripe_webhook(event: dict, request: Request, stripe_signature=Header(None)):
    webhook_secret = os.getenv("WEBHOOK_SECRET")
    raw_body = await request.body()
    try:
        event = stripe.Webhook.construct_event(
            raw_body, stripe_signature, webhook_secret
        )

    except ValueError as e:
        # Invalid payload
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid payload.")

    except stripe.error.SignatureVerificationError as e:
        # Invalid signature

        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid signature.")

    # Handle the checkout.session.completed event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]

        # Fulfill the purchase...
        pass

    if event["type"] == "checkout.session.paid":
        session = event["data"]["object"]

        # Fulfill the purchase...
        pass

    if event["type"] == "checkout.session.payment_failed":
        session = event["data"]["object"]

        # Fulfill the purchase...
        handle_checkout_session(session)

    return "Success"


def handle_checkout_session(session):
    # here you should fetch the details from the session and save the relevant information
    # to the database (e.g. associate the user with their subscription)
    print("Subscription was successful.")
