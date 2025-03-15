import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircleIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
  ArrowRightIcon,
  CalendarIcon,
  AlertCircleIcon,
} from "lucide-react";
import type { IUserSubResponse } from "@/shared/interfaces";
import { capitalizeFirstChar } from "@/utils/utils";

// Helper function to format date from timestamp
const formatDate = (timestamp: number | string): string => {
  if (typeof timestamp === "number") {
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getDate()}, ${date.getFullYear()}`;
  }
  return timestamp as string;
};

// Helper to calculate progress percentage in billing period
const calculateBillingProgress = (
  startDate: number | string,
  endDate: number | string
): number => {
  let start, end;

  if (typeof startDate === "number") {
    start = new Date(startDate * 1000).getTime();
  } else {
    start = new Date(startDate).getTime();
  }

  if (typeof endDate === "number") {
    end = new Date(endDate * 1000).getTime();
  } else {
    end = new Date(endDate).getTime();
  }

  const now = Date.now();
  const totalDuration = end - start;
  const elapsed = now - start;

  return Math.min(
    Math.max(Math.round((elapsed / totalDuration) * 100), 0),
    100
  );
};

export default async function SubscriptionPage() {
  const cookieStore = await cookies();

  // Original fetch logic for getting user's subscription plan
  const getCurrentUserPlan = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/payments/get-user-subscription`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data: IUserSubResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user plan:", error);
      return null;
    }
  };

  // Original fetch logic for getting billing portal URL
  const getBillingPortal = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/payments/create-billing-portal-session`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const url: string = await response.json();
      return url;
    } catch (error) {
      console.error("Error creating billing portal:", error);
      return null;
    }
  };

  const billingPortalUrl = await getBillingPortal();
  const userSubResponse = await getCurrentUserPlan();

  // Calculate usage percentage for monthly credits if data is available
  const totalMonthlyCredits = 100; // This would ideally come from your plan details
  const monthlyCreditsPercentage = userSubResponse?.credits
    ? Math.round(
        ((totalMonthlyCredits -
          userSubResponse.credits.remaining_post_creations) /
          totalMonthlyCredits) *
          100
      )
    : 0;

  // Calculate billing period progress if subscription data is available
  const billingProgress = userSubResponse?.subscription
    ? calculateBillingProgress(
        userSubResponse.subscription.current_period_start,
        userSubResponse.subscription.current_period_end
      )
    : 0;

  return (
    <div className="md:px-8 mt-20 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Subscription</h1>
          <p className="text-gray-500 mt-1">Manage your plan and payments</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black"
            asChild
            size={"lg"}
          >
            <a
              href={billingPortalUrl === null ? "/#pricing" : billingPortalUrl}
            >
              Manage Billing
              <ExternalLinkIcon className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Current Plan Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Current Plan</h2>

        {userSubResponse?.subscription ? (
          <div className="border rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col gap-5">
                {/* Plan Header */}
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-3">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    {capitalizeFirstChar(userSubResponse.subscription.status)}
                  </div>
                  {userSubResponse.subscription.cancel_at_period_end && (
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 ml-2">
                      <AlertCircleIcon className="h-4 w-4 mr-1" />
                      Cancels at period end
                    </div>
                  )}
                  <h3 className="text-2xl font-bold">
                    {userSubResponse.subscription.product.full_plan_name}
                  </h3>
                  <p className="text-2xl font-bold  text-yellow-500 mt-1">
                    €{userSubResponse.subscription.product.full_price_name}
                  </p>
                </div>

                {/* Plan Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Billing Period</p>
                    <p className="font-medium">
                      {formatDate(
                        userSubResponse.subscription.current_period_start
                      )}{" "}
                      -{" "}
                      {formatDate(
                        userSubResponse.subscription.current_period_end
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subscription ID</p>
                    <p className="font-medium">
                      {userSubResponse.subscription.id}
                    </p>
                  </div>
                </div>

                {/* Improved Billing Period Info */}
                <div className="bg-gray-50 p-5 rounded-lg">
                  <p className="text-sm text-gray-500 mb-3">
                    Current billing period
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center text-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mb-1" />
                      <p className="font-medium">
                        {formatDate(
                          userSubResponse.subscription.current_period_start
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Start date</p>
                    </div>

                    <div className="flex-1 flex justify-center items-center px-4">
                      <div className="h-0.5 bg-gray-200 w-full relative">
                        <div
                          className="absolute inset-0 bg-yellow-500"
                          style={{
                            width: `${billingProgress}%`,
                          }}
                        ></div>
                      </div>
                      <ArrowRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0 mx-2" />
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mb-1" />
                      <p className="font-medium">
                        {formatDate(
                          userSubResponse.subscription.current_period_end
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">End date</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Next billing date</p>
                      <p className="font-medium">
                        {formatDate(
                          userSubResponse.subscription.current_period_end
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
                <p className="text-sm text-gray-500">
                  Subscribed since{" "}
                  {formatDate(userSubResponse.subscription.created)}
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="default" asChild>
                    <Link href="/#pricing">View Plans</Link>
                  </Button>
                  <Button
                    size="default"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                    asChild
                  >
                    <a
                      href={
                        billingPortalUrl === null
                          ? "/#pricing"
                          : billingPortalUrl
                      }
                    >
                      Manage Billing
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-6">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  No Active Subscription
                </h3>
                <p className="text-gray-700">
                  Start your new subscription now and{" "}
                  <span className="font-bold text-yellow-500">grow</span> your
                  channels with AI-powered content ideas.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  asChild
                  size={"lg"}
                >
                  <Link href="/#pricing">Start now</Link>
                </Button>
                <Button variant="outline" asChild size={"lg"}>
                  <Link href="/#features">Watch Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Credits Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Credits</h2>
          <p className="text-gray-500 mt-1">
            Check your available credits or buy more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Monthly Credits Card */}
          <div className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-gray-500 mb-1">Monthly Credits</p>
                <div className="flex items-end gap-1">
                  <h3 className="text-3xl font-bold">
                    {userSubResponse?.credits?.remaining_post_creations || 0}
                  </h3>
                  <p className="text-gray-500 mb-1">/ {totalMonthlyCredits}</p>
                </div>
              </div>
              <div className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
                  <path d="m13 12-3 5h4l-3 5" />
                </svg>
              </div>
            </div>

            <div className="w-full mt-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Usage</span>
                <span className="text-sm font-medium">
                  {monthlyCreditsPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full"
                  style={{ width: `${monthlyCreditsPercentage}%` }}
                ></div>
              </div>
              {userSubResponse?.subscription && (
                <p className="text-sm text-gray-500 mt-3">
                  Resets on{" "}
                  {formatDate(userSubResponse.subscription.current_period_end)}
                </p>
              )}
            </div>
          </div>

          {/* Additional Credits Card */}
          <div className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-gray-500 mb-1">Additional Credits</p>
                <div className="flex items-end gap-1">
                  <h3 className="text-3xl font-bold">
                    {userSubResponse?.credits
                      ?.remaining_post_creations_onetime_paid || 0}
                  </h3>
                  <p className="text-gray-500 mb-1">remaining</p>
                </div>
              </div>
              <div className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mt-3">
              <p className="text-sm">
                One-time credits never expire and are used after your monthly
                credits are depleted.
              </p>
            </div>
          </div>

          {/* Buy More Credits Card */}
          <div className="border rounded-lg p-6 hover:border-yellow-500 transition-all group cursor-pointer">
            <Link
              href="/#pricing"
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="text-yellow-500 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
                  <path d="m13 12-3 5h4l-3 5" />
                </svg>
              </div>
              <span className="text-xl font-bold group-hover:text-yellow-600 transition-colors mb-1">
                Buy more credits
              </span>
              <p className="text-sm text-center text-gray-500">
                Get additional credits for your content ideas
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
