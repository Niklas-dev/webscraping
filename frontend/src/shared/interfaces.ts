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

export interface IUserSubResponse {
  credits: {
    remaining_post_creations: number;
    remaining_post_creations_onetime_paid: number;
  };
  subscription: ISubscription;
}

export interface IPostIdea {
  id: number;
  is_finished: boolean;
  is_liked: boolean;
  user_id: number;
  title: string;
  description: string;
  video_creation_instructions: string;
  hashtags: string | null;
}

export interface IFullUserData {
  email: string | null;
  remaining_post_creations: number;
  created_posts_all_time: number;
  customer_id: string | null;
  plan_id: string | null;
  subscription_id: string | null;
  subscription_last_renew: string | null;
  niche_preference: string | null;
  username: string;
  id: number;
  remaining_post_creations_onetime_paid: number;
  subscription_status: string | null;
  subscription_next_renew: string | null;
  extra_preference: string | null;
}
