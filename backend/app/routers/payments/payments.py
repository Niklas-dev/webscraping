import os
from fastapi import APIRouter, Request, HTTPException, Header
import stripe
from sqlalchemy import desc, asc
from sqlalchemy.orm import defer
from starlette import status
from stripe import InvalidRequestError
from app.db.database import db_dependency
from app.routers.auth.models import User
from app.routers.auth.services import user_dependency
from .models import Plan
from .validators import Subscription, Product, CreateCheckoutRequest

router = APIRouter(
    prefix='/payments',
    tags=['payments']
)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@router.get("/get-user-subscription")
def get_user_subscription(request: Request, user: user_dependency, db: db_dependency):
    if not user.subscription_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No subscription available.")

    subscription = stripe.Subscription.retrieve(user.subscription_id)

    selected_keys = ["id", "current_period_start", "current_period_end", "status", "created", "cancel_at_period_end",
                     "currency", "plan"]

    filtered_sub = {key: subscription[key] for key in selected_keys if key in subscription}

    product: dict = db.query(Plan).where(Plan.product_id == filtered_sub["plan"].product).first()
    print(filtered_sub["plan"].product)
    filtered_sub["product"] = Product(**product.__dict__)

    final_sub = Subscription(**filtered_sub)

    return final_sub

@router.get("/get-plans")
def get_user_subscription(request: Request, db: db_dependency):
    plans = db.query(Plan).order_by(asc(Plan.id)).all()
    return plans


@router.post("/create-checkout-session")
def create_checkout_session(request: Request, user: user_dependency, create_checkout_request: CreateCheckoutRequest):
    if user.subscription_status == "active":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You already have an ongoing subscription.")
    try:
        checkout_session = stripe.checkout.Session.create(
            client_reference_id=user.id,
            success_url=os.getenv("FRONTEND_URL") + "payments/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=os.getenv("FRONTEND_URL") + "payments/cancel",
            payment_method_types=["card", "paypal"],
            mode="subscription",
            metadata={
                "client_reference_id": user.id,
            },

            line_items=[
                {
                    "price": create_checkout_request.price_id,
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

        user = get_user_by_customer_id(session.customer, db)

        if not user:
            user = get_user_by_id(session.client_reference_id, db)

        subscription = stripe.Subscription.list(customer=session.customer).data[0]

        if subscription.id and subscription.status == "active":
            print(user.subscription_id)
            print(subscription.id)
            print(session.subscription)
            print(subscription.cancel_at_period_end)
            try:
                stripe.Subscription.modify(
                    user.subscription_id,
                    cancel_at_period_end=True,
                )

            except InvalidRequestError as e:
                print("Old subscription has already been canceled.")
                return "Old subscription has already been canceled."

            return "User already has an active subscription, old will be canceled."

        user.customer_id = session.customer
        user.subscription_id = session.subscription
        user.subscription_status = subscription.status
        user.subscription_last_renew = subscription.current_period_start
        user.subscription_next_renew = subscription.current_period_end

        db.commit()

    if event["type"] == "invoice.paid":
        pass

    if event["type"] == "invoice.payment_failed":
        user = get_user_by_customer_id(session.customer, db)

        if not user:
            user = get_user_by_subscription_id(session.subscription, db)

        if not user:
            return "User doesnt have an active subscription"

        subscription = stripe.Subscription.list(customer=session.customer).data[0]

        user.customer_id = session.customer
        user.subscription_id = session.subscription
        user.subscription_status = subscription.status

        db.commit()

    print("\n")


@router.get("/create-billing-portal-session")
def create_checkout_session(request: Request, user: user_dependency):
    domain_url = "http://localhost:3000/"
    session = stripe.billing_portal.Session.create(
        customer=user.customer_id,
        return_url=domain_url,
    )

    return session.url


def get_user_by_subscription_id(subscription_id, db):
    return db.query(User).filter(User.subscription_id == subscription_id).options(
        defer(User.hashed_password), defer(User.google_sub)).first()


def get_user_by_id(user_id, db):
    return db.query(User).filter(User.id == user_id).options(
        defer(User.hashed_password), defer(User.google_sub)).first()


def get_user_by_customer_id(customer_id, db):
    return db.query(User).filter(User.customer_id == customer_id).options(
        defer(User.hashed_password), defer(User.google_sub)).first()


def handle_session_completed(session, db):
    user = get_user_by_id(session.client_reference_id, db)
    print(user.username)


def handle_invoice_paid(session, db):
    user = "/"


def handle_invoice_payment_failed(session, db):
    user = "/"
