from typing import Optional

from pydantic import BaseModel


class Plan(BaseModel):
    id: str
    object: str
    active: bool
    aggregate_usage: Optional[str]
    amount: int
    amount_decimal: str
    billing_scheme: str
    created: int
    currency: str
    interval: str
    interval_count: int
    livemode: bool
    metadata: dict
    nickname: Optional[str]
    product: str
    tiers_mode: Optional[str]
    transform_usage: Optional[str]
    trial_period_days: Optional[int]
    usage_type: str

class Product(BaseModel):
    id: int
    price: str
    product_name: str
    product_id: str
    full_plan_name: str
    full_price_name: str


class CreateCheckoutRequest(BaseModel):
    price_id: str




class Subscription(BaseModel):
    id: str
    current_period_start: int | str
    current_period_end: int | str
    status: str
    created: int
    cancel_at_period_end: bool
    currency: str
    plan: Plan
    product: Product


