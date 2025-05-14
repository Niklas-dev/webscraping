export interface ScheduledPost {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  platforms: string[];
  thumbnail?: string;
}

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
  status: "unadded" | "used" | "planned" | "dropoff";

  // New fields added
  created_at: Date;
  seo_keywords: string; // List of high-ranking SEO keywords
  best_posting_times: string; // Recommended posting times
  engagement_strategy: string; // Strategy for engagement
  engagement_suggestions: string; // Suggestions to boost engagement
  platform_adaptation: string; // How to adapt content for the platform
  editing_suggestions: string; // Suggestions for editing visuals and transitions
  suggested_script: string; // Suggested script lines for the video
  relevant_data: string; // Relevant statistics or facts to include
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

export interface IStripeProduct {
  id: string; // The product's unique identifier
  name: string; // The name of the product
  description: string; // The description of the product (defaults to "No description")
  active: boolean; // Whether the product is active or not
  images: string[]; // Array of images associated with the product
  livemode: boolean; // Whether the product is in live mode or test mode
  created: number; // The timestamp when the product was created (UNIX timestamp)
  updated: number; // The timestamp when the product was last updated (UNIX timestamp)
  features: IFeature[];
  price: {
    price_id: string;
    unit_amount: string;
    currency: string;
    recurring: {
      interval: string; // Monthly subscription
      interval_count: number; // Every month
    };
  };
}
export interface IFeature {
  name: string;
}

export interface IStripeProductsResponse {
  products: IStripeProduct[];
}
