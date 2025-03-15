import os
from fastapi import APIRouter, Request, HTTPException, Header, Query
import stripe
from sqlalchemy import asc
from sqlalchemy.orm import defer
from starlette import status
from stripe import InvalidRequestError
from app.db.database import db_dependency
from app.routers.auth.models import User
from app.routers.auth.services import user_dependency
from .models import Plan, TokenPackage
from .validators import Subscription, Product, CreateCheckoutRequest, Credits
from ...config.settings import app_settings
from datetime import datetime, UTC

router = APIRouter(
    prefix='/payments',
    tags=['payments']
)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
FRONTEND_URL = app_settings.FRONTEND_URL


def get_user_by_subscription_id(subscription_id, db):
    return db.query(User).filter(User.subscription_id == subscription_id).options(
        defer(User.hashed_password), defer(User.google_sub)).first()


def get_user_by_id(user_id, db):
    return db.query(User).filter(User.id == user_id).options(
        defer(User.hashed_password), defer(User.google_sub)).first()


def get_user_by_customer_id(customer_id, db):
    return db.query(User).filter(User.customer_id == customer_id).options(
        defer(User.hashed_password), defer(User.google_sub)).first()


def get_plan_by_product_id(prod_id, db):
    return db.query(Plan).filter(Plan.product_id == prod_id).first()


def handle_session_completed(session, db):
    user = get_user_by_id(session.client_reference_id, db)
    print(user.username)


def handle_invoice_paid(session, db):
    user = "/"


def handle_invoice_payment_failed(session, db):
    user = "/"


def format_price(unit_amount: int) -> str:
    if unit_amount is None:
        return "0.00"
    # Convert cents to dollars and format as a string with 2 decimals
    return f"{unit_amount / 100:.2f}"


# Endpoint to fetch Stripe products based on type

@router.get("/products/")
async def get_products(product_type: str = Query(..., regex="^(one_time|subscription)$")):
    try:
        # Fetch all Stripe products
        stripe_products = stripe.Product.list()
        filtered_products = []

        for product in stripe_products["data"]:
            # Fetch associated pricing for each product
            prices = stripe.Price.list(product=product["id"])
            for price in prices["data"]:
                product_info = {
                    "id": product["id"],
                    "name": product["name"],
                    "description": product["description"] or "No description",
                    "active": product["active"],
                    "images": product["images"],
                    "livemode": product["livemode"],
                    "created": product["created"],
                    "updated": product["updated"],
                    "features": product["marketing_features"] or [],
                    "price": None  # Placeholder for the price data
                }


                # Add price details
                if price["type"] == "one_time" and product_type == "one_time":
                    product_info["price"] = {
                        "price_id": price["id"],  # Add price ID
                        "unit_amount": format_price(price.get("unit_amount", None)),
                        "currency": price.get("currency", ""),
                        "recurring": None
                    }
                    filtered_products.append(product_info)
                elif price["type"] == "recurring" and product_type == "subscription":
                    product_info["price"] = {
                        "price_id": price["id"],  # Add price ID
                        "unit_amount": format_price(price.get("unit_amount", None)),
                        "currency": price.get("currency", ""),
                        "recurring": {
                            "interval": price["recurring"]["interval"],
                            "interval_count": price["recurring"]["interval_count"]
                        }
                    }
                    filtered_products.append(product_info)

        return {"products": filtered_products}

    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=f"Stripe API error: {e.user_message}")


@router.get("/get-user-subscription")
def get_user_subscription(user: user_dependency, db: db_dependency):
    credit_data = Credits(**{
        "remaining_post_creations": user.remaining_post_creations,
        "remaining_post_creations_onetime_paid": user.remaining_post_creations_onetime_paid
    })

    if not user.subscription_id:
        return {"subscription": None, "credits": credit_data}

    subscription = stripe.Subscription.retrieve(user.subscription_id)

    selected_keys = ["id", "current_period_start", "current_period_end", "status", "created", "cancel_at_period_end",
                     "currency", "plan"]

    filtered_sub = {key: subscription[key] for key in selected_keys if key in subscription}

    product: dict = db.query(Plan).where(Plan.product_id == filtered_sub["plan"].product).first()

    filtered_sub["product"] = Product(**product.__dict__)

    print(filtered_sub["current_period_start"])
    print(filtered_sub["current_period_end"])

    period_start = datetime.fromtimestamp(filtered_sub["current_period_start"], UTC)
    period_end = datetime.fromtimestamp(filtered_sub["current_period_end"], UTC)

    filtered_sub["current_period_start"] = period_start.strftime("%d. %b %Y")
    filtered_sub["current_period_end"] = period_end.strftime("%d. %b %Y")

    final_sub = Subscription(**filtered_sub)

    return {"subscription": final_sub, "credits": credit_data}


@router.get("/get-plans")
def get_user_subscription(db: db_dependency):
    plans = db.query(Plan).order_by(asc(Plan.id)).all()
    return plans


@router.delete("/cancel-subscription")
def get_user_subscription(user: user_dependency):
    stripe.Subscription.modify(
        user.subscription_id,
        cancel_at_period_end=True,
    )

    return {"detail": "Subscription is canceled and will stop at period end"}


@router.post("/create-checkout-session")
def create_checkout_session(request: Request, user: user_dependency, create_checkout_request: CreateCheckoutRequest, db: db_dependency):
    if user.subscription_status == "active":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You already have an ongoing "
                                                                            "subscription. Cancel it first.")

    stripe_customer_id = user.customer_id

    if not stripe_customer_id:
        stripe_customer = stripe.Customer.create(
            email=user.email,
            metadata={
                "user_id": user.id
            }
        )

        user.customer_id = stripe_customer.id
        stripe_customer_id = stripe_customer.id
        db.commit()

    try:
        checkout_session = stripe.checkout.Session.create(
            customer=stripe_customer_id,
            client_reference_id=user.id,
            success_url=FRONTEND_URL + "payments/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=FRONTEND_URL + "payments/cancel",
            payment_method_types=["card"],
            mode="subscription",
            subscription_data={
                "trial_period_days": 14,
            },
            metadata={
                "client_reference_id": user.id,
            },
            allow_promotion_codes=True,
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


@router.post("/create-checkout-session-onetime")
def create_checkout_session(request: Request, user: user_dependency, create_checkout_request: CreateCheckoutRequest, db: db_dependency):
    try:
        stripe_customer_id = user.customer_id

        if not stripe_customer_id:
            stripe_customer = stripe.Customer.create(
                email=user.email,
                metadata={
                    "user_id": user.id
                }
            )

            user.customer_id = stripe_customer.id
            stripe_customer_id = stripe_customer.id
            db.commit()
        print(create_checkout_request)
        checkout_session = stripe.checkout.Session.create(
            customer=stripe_customer_id,
            payment_method_types=["card"],
            client_reference_id=user.id,
            line_items=[
                {
                    "price": create_checkout_request.price_id,
                    "quantity": 1,
                }
            ],
            allow_promotion_codes=True,
            metadata={"product_id": create_checkout_request.product_id},
            mode="payment",
            success_url=FRONTEND_URL + "payments/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=FRONTEND_URL + "payments/cancel",
        )
        return checkout_session.url
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)


@router.post("/webhook")
async def stripe_webhook(db: db_dependency, request: Request, stripe_signature=Header(None)):
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
        print("Checkout session completed")
        if session["mode"] == "subscription":

            user = get_user_by_id(session.client_reference_id, db)

            subscription = stripe.Subscription.list(customer=session.customer).data[0]

            if user.subscription_id and user.subscription_status == "active":
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

            plan_id = subscription["items"].data[0].price.product
            print(plan_id)
            if not plan_id:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Plan not found.")

            plan = db.query(Plan).filter(Plan.product_id == plan_id).first()

            user.plan_id = plan.id
            user.remaining_post_creations = plan.monthly_uses

            db.commit()
        elif session["mode"] == "payment":
            product_id = session["metadata"]["product_id"]
            print(product_id)

            token_package: TokenPackage = db.query(TokenPackage).filter(TokenPackage.product_id == product_id).first()

            user = get_user_by_id(session.client_reference_id, db)

            user.remaining_post_creations_onetime_paid = (user.remaining_post_creations_onetime_paid +
                                                          token_package.uses_amount)

            db.commit()

    if event["type"] == "invoice.paid":
        user: User = get_user_by_customer_id(session.customer, db)

        prod_id = session.subscription.items.data[0].price.product
        plan: Plan = get_plan_by_product_id(prod_id, db)

        user.remaining_post_creations = plan.monthly_uses
        print(f"Invoice paid: {prod_id} - {session.customer}")

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
def create_checkout_session(user: user_dependency):
    if not user.customer_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No active plan.")
    session = stripe.billing_portal.Session.create(
        customer=user.customer_id,
        return_url=f"{os.getenv("FRONTEND_URL")}/dashboard/settings/subscription",
    )

    return session.url
