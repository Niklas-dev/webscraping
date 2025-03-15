"use client";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  IStripeProduct,
  IStripeProductsResponse,
  ISubscription,
  IUserSubResponse,
} from "@/shared/interfaces";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";

export default function PricingSection() {
  const [planType, setPlanType] = useState<"plans" | "credits">("plans");
  const user = useContext(AuthContext);
  const router = useRouter();

  const plans = {
    plans: [
      {
        name: "Starter",
        description: "For content creators that are getting started",
        price: { monthly: 19, annual: 15 },
        features: [
          { included: true, text: "Unlimited content ideas" },
          { included: true, text: "Advanced idea dashboard" },
          { included: true, text: "All social platforms" },
          { included: true, text: "AI-powered trend analysis" },
          { included: true, text: "Content calendar planning" },
          { included: false, text: "Priority support" },
        ],
        cta: "Start 7-Day Free Trial",
        popular: true,
      },
      {
        name: "Pro",
        description: "For agencies and teams",
        price: { monthly: 49, annual: 39 },
        features: [
          { included: true, text: "Unlimited content ideas" },
          { included: true, text: "Advanced idea dashboard" },
          { included: true, text: "All social platforms" },
          { included: true, text: "AI-powered trend analysis" },
          { included: true, text: "Content calendar planning" },
          { included: true, text: "Priority support" },
        ],
        cta: "Start Pro Plan",
        popular: false,
      },
    ],
    credits: [
      {
        name: "Starter Credits",
        description: "For serious content creators",
        price: { monthly: 19 },
        features: [
          { included: true, text: "Unlimited content ideas" },
          { included: true, text: "Advanced idea dashboard" },
          { included: true, text: "All social platforms" },
          { included: true, text: "AI-powered trend analysis" },
          { included: true, text: "Content calendar planning" },
          { included: false, text: "Priority support" },
        ],
        cta: "Get Credits Now",
        popular: false,
      },
      {
        name: "Advanced Credits",
        description: "For serious content creators",
        price: { monthly: 19 },
        features: [
          { included: true, text: "Unlimited content ideas" },
          { included: true, text: "Advanced idea dashboard" },
          { included: true, text: "All social platforms" },
          { included: true, text: "AI-powered trend analysis" },
          { included: true, text: "Content calendar planning" },
          { included: false, text: "Priority support" },
        ],
        cta: "Get Credits Now",
        popular: true,
      },
      {
        name: "Pro Credits",
        description: "For agencies and teams",
        price: { monthly: 49, annual: 39 },
        features: [
          { included: true, text: "Unlimited content ideas" },
          { included: true, text: "Advanced idea dashboard" },
          { included: true, text: "All social platforms" },
          { included: true, text: "AI-powered trend analysis" },
          { included: true, text: "Content calendar planning" },
          { included: true, text: "Priority support" },
        ],
        cta: "Get Credits Now",
        popular: false,
      },
    ],
  };

  const [plansStripe, setPlansStripe] = useState<IStripeProduct[]>([]);
  const [creditsStripe, setCreditsStripe] = useState<IStripeProduct[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [subscription, setSubscription] = useState<ISubscription>();
  const fetchStripeProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/payments/products?product_type=subscription`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Stripe products");
      }

      const data: IStripeProductsResponse = await response.json();
      setPlansStripe(data.products);
    } catch (error) {
      console.error("Error fetching Stripe products:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };
  const fetchStripeCredits = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/payments/products?product_type=one_time`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Stripe products");
      }

      const data: IStripeProductsResponse = await response.json();
      setCreditsStripe(data.products);
      console.log(data.products);
    } catch (error) {
      console.error("Error fetching Stripe products:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  const onPlanClick = async (
    product_id: string,
    price_id: string,
    currentSub: ISubscription | undefined
  ) => {
    if (!user.username) {
      router.push("/login");
      return;
    }

    if (product_id === currentSub?.product.product_id) {
      toast.error("You are already subscribed to this plan.", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      router.push("/dashboard/settings/subscription");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/payments/${
        planType === "credits"
          ? "create-checkout-session-onetime"
          : "create-checkout-session"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        body: JSON.stringify({
          product_id: product_id,
          price_id: price_id,
        }),
      }
    );

    if (!response.ok) {
      const error: { detail: string } = await response.json();
      console.log(error);
      toast.error(error.detail, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    const data: string = await response.json();
    window.open(data, "_self");
  };

  const getCurrentUserPlan = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/payments/get-user-subscription`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data: IUserSubResponse = await response.json();
    setSubscription(data?.subscription);
  };

  useEffect(() => {
    getCurrentUserPlan();
    fetchStripeProducts();
    fetchStripeCredits();

    return () => {};
  }, []);

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that&apos;s right for your content creation needs
          </p>

          <div className="flex items-center justify-center mt-8 ">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full mr-1">
              Save 20%
            </span>
            <Label
              htmlFor="billing-toggle"
              className={`mr-2 ${!(planType === "credits") ? "font-bold" : ""}`}
            >
              Monthly
            </Label>

            <Switch
              id="billing-toggle"
              checked={planType === "credits"}
              onCheckedChange={() =>
                setPlanType(planType === "plans" ? "credits" : "plans")
              }
            />
            <Label
              htmlFor="billing-toggle"
              className={`ml-2 ${planType === "credits" ? "font-bold" : ""}`}
            >
              Credits{" "}
            </Label>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full mr-1 invisible">
              Save 20%
            </span>
          </div>
        </div>

        <div
          className={`grid ${
            planType === "credits" ? "md:grid-cols-3" : "md:grid-cols-2"
          } gap-8 max-w-6xl mx-auto`}
        >
          {(planType === "credits" ? creditsStripe : plansStripe).map(
            (plan, index) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col h-full ${"border-yellow-400 shadow-xl"}`}
              >
                {planType === "credits"
                  ? index == 1
                  : index == 0 && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <span className="bg-yellow-400 text-black text-sm font-medium px-4 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      €{plan.price.unit_amount}
                    </span>
                    <span className="text-gray-500 ml-1">
                      /{planType === "credits" ? "once" : "month"}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className={"text-gray-700"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto">
                  <Button
                    onClick={() =>
                      onPlanClick(plan.id, plan.price.price_id, subscription)
                    }
                    className={`w-full ${
                      planType === "credits"
                        ? index == 1
                        : index == 0 &&
                          "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black"
                    }`}
                  >
                    {planType === "credits"
                      ? "Get Credits Now"
                      : "Start Plan Now"}
                  </Button>
                </CardFooter>
              </Card>
            )
          )}
        </div>

        <div className="text-center mt-10 text-gray-500">
          All plans include a 30-day money-back guarantee
        </div>
      </div>
    </section>
  );
}
