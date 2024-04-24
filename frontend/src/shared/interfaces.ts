export interface ISubscription {
  id: string;
  current_period_start: number | string;
  current_period_end: number | string;
  status:
    | "canceled"
    | "active"
    | "trialing"
    | "past_due"
    | "unpaid"
    | "incomplete"
    | "incomplete_expired";
  created: number;
  cancel_at_period_end: boolean;
  currency: string;
  plan: {
    id: string;
    object: "plan";
    active: boolean;
    amount: number;
    billing_scheme: "per_unit" | "tiered" | "volume";
    created: number;
    currency: string;
    interval: "day" | "week" | "month" | "year";
    interval_count: number;
    livemode: boolean;
    metadata: Record<string, any>;
    product: string;
    trial_period_days: number | null;
    usage_type: "licensed" | "metered";
  };
  product: {
    id: number;
    price: string;
    product_name: string;
    product_id: string;
    full_plan_name: string;
    full_price_name: string;
  };
}

export interface IPostIdea {
  id: number;
  is_finished: boolean;
  video_description: string;
  user_id: number;
  title: string;
  description: string;
  hashtags: string | null;
}
