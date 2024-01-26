import os
from typing import Optional

from fastapi import APIRouter, Request, HTTPException, Header
import stripe
from pydantic import BaseModel
from sqlalchemy.orm import defer
from starlette import status
from starlette.responses import RedirectResponse

from app.db.database import db_dependency
from app.routers.auth.models import User
from app.routers.auth.services import user_dependency
from app.routers.payments.models import StripeCustomer

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
            client_reference_id=user.id,

            success_url=domain_url + "payments/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=domain_url + "payments/cancel",
            payment_method_types=["card", "paypal"],
            mode="subscription",
            metadata={
                "client_reference_id": user.id,
            },
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


@router.post("/webhook")
async def stripe_webhook(db: db_dependency, event: dict, request: Request, stripe_signature=Header(None)):
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
    session = event["data"]["object"]

    if not session:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid session.")

    if event["type"] == "checkout.session.completed":
        handle_session_completed(session, db)

    if event["type"] == "invoice.paid":
        handle_invoice_paid(session, db)

    if event["type"] == "invoice.payment_failed":
        handle_invoice_payment_failed(session, db)

    return "Success"


def get_user_by_id(user_id, db):
    return db.query(User).filter(User.id == user_id).options(
        defer(User.hashed_password), defer(User.google_sub)).first()


def handle_session_completed(session, db):
    user = get_user_by_id(session.client_reference_id, db)

    customer_id, subscription_id = session.customer, session.subscription
    customer = db.query(StripeCustomer).where(StripeCustomer.customer_id == customer_id).first()

    if not customer:
        create_stripe_customer_model = StripeCustomer(
            user=user,
            customer_id=customer_id,
            subscription_id=subscription_id,
            subscription_status="active"
        )

        db.add(create_stripe_customer_model)
        db.commit()
    else:
        customer.subscription_status = "active"


def handle_invoice_paid(session, db):
    user = "/"  # get real user here

    customer_id, subscription_id = session.customer, session.subscription
    customer = db.query(StripeCustomer).where(StripeCustomer.customer_id == customer_id).first()

    if not customer:
        create_stripe_customer_model = StripeCustomer(
            user=user,
            customer_id=customer_id,
            subscription_id=subscription_id,
            subscription_status="active"
        )

        db.add(create_stripe_customer_model)
        db.commit()
    else:
        customer.subscription_status = "active"


def handle_invoice_payment_failed(session, db):
    user = "/"  # get real user here

    customer_id, subscription_id = session.customer, session.subscription
    customer = db.query(StripeCustomer).where(StripeCustomer.customer_id == customer_id).first()

    if not customer:
        create_stripe_customer_model = StripeCustomer(
            user=user,
            customer_id=customer_id,
            subscription_id=subscription_id,
            subscription_status="unpaid"
        )

        db.add(create_stripe_customer_model)
        db.commit()
    else:
        customer.subscription_status = "unpaid"
