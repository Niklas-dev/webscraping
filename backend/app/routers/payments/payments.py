import os

from fastapi import APIRouter, Request, HTTPException, Header
import stripe
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


@router.get("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    payload = await request.body()

    # Access payload as text
    payload_text = payload.decode('utf-8')

    # Access Stripe-Signature from headers
    sig_header = stripe_signature

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.getenv("WEBHOOK_SECRET")
        )

    except ValueError as e:
        # Invalid payload
        return "Invalid payload", 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return "Invalid signature", 400

    # Handle the checkout.session.completed event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]

        # Fulfill the purchase...
        handle_checkout_session(session)

    return "Success", 200


def handle_checkout_session(session):
    # here you should fetch the details from the session and save the relevant information
    # to the database (e.g. associate the user with their subscription)
    print("Subscription was successful.")
