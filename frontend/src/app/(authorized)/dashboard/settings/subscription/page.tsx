import { ISubscription, IUserSubResponse } from "@/shared/interfaces";
import { capitalizeFirstChar } from "@/utils/utils";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function page() {
  const cookieStore = cookies();

  const getCurrentUserPlan = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/payments/get-user-subscription`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${cookieStore.get("access_token")!.value}`,
        },
      }
    );
    console.log(response.ok);

    if (!response.ok) {
      return null;
    }

    const data: IUserSubResponse = await response.json();

    console.log(data);

    return data;
  };

  const getBillingPortal = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/payments/create-billing-portal-session`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${cookieStore.get("access_token")!.value}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const url: string = await response.json();

    return url;
  };

  const url = await getBillingPortal();
  const userSubResponse = await getCurrentUserPlan();

  return (
    <div className="px-8">
      <div className="w-full h-full">
        <div className="flex flex-row justify-between items-center mt-20">
          <div>
            <h3 className="text-3xl font-bold ">Subscription</h3>
            <p className="text-gray-500 text-lg">
              Manage your plan and payments
            </p>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <a
              className="border-gray-300 text-gray-700 border-2 px-3 py-1.5 font-semibold rounded-lg shadow-sm cursor-pointer"
              href={url! === null ? "/pricing" : url!}
            >
              Manage Plan
            </a>
          </div>
        </div>

        <div className="mt-10">
          <div className="h-[2px] w-full bg-gray-200 mb-2"></div>

          <div className="flex flex-row items-center justify-between pb-2 lg:pb-0">
            <h3 className="text-lg font-bold text-gray-800">Current Plan</h3>
            <Link
              className="border-gray-300 text-gray-700 border-2 px-3 py-1.5 font-semibold rounded-lg shadow-sm"
              href={"/pricing"}
            >
              Change Plan
            </Link>
          </div>
          {userSubResponse?.subscription ? (
            <div className="flex flex-row gap-4 flex-wrap">
              <div className="w-96 h-32 border-2 border-gray-300 rounded-2xl px-6 flex flex-row items-center justify-between shadow-sm">
                <div className="flex flex-col text-base font-medium text-gray-500">
                  {userSubResponse?.subscription?.product.full_plan_name}
                  <div className="text-xl font-semibold text-black">
                    {userSubResponse?.subscription?.product.full_price_name}
                  </div>
                </div>
                <div
                  className={`bg-opacity-55 px-5 py-1.5 rounded-full text-black font-semibold ${
                    userSubResponse?.subscription?.status! === "active"
                      ? "bg-green-600 text-green-900"
                      : "bg-red-600"
                  }`}
                >
                  {capitalizeFirstChar(userSubResponse!.subscription?.status!)}
                </div>
              </div>
              <div className="w-96 h-32 border-2 border-gray-300 rounded-2xl px-6 flex flex-row items-center justify-between shadow-sm">
                <div className="flex flex-col text-base font-medium text-gray-500">
                  Last renew
                  <div className="text-xl font-semibold text-black">
                    {userSubResponse?.subscription?.current_period_start}
                  </div>
                </div>
                <div className="border-2 border-gray-300 bg-opacity-55 px-5 py-1.5 rounded-full text-gray-500  font-semibold">
                  Renewed
                </div>
              </div>
              <div className="w-96 h-32 border-2 border-gray-300 rounded-2xl px-6 flex flex-row items-center justify-between shadow-sm">
                <div className="flex flex-col text-base font-medium text-gray-500">
                  {userSubResponse?.subscription?.cancel_at_period_end
                    ? "Subscription ending at"
                    : "Renew at"}
                  <div className="text-xl font-semibold text-black">
                    {userSubResponse?.subscription?.current_period_end}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-lg">
                No subscription. Start you new subscription now and <b>grow</b>{" "}
                your channels.
              </p>

              <Link
                className="bg-[#1b1b1b] hover:bg-[#252525] p-2.5 px-8 w-fit h-fit font-bold text-xl rounded-lg text-white"
                href={"/pricing"}
              >
                Start now
              </Link>
            </div>
          )}
        </div>
        <div className="mt-10">
          <div>
            <h3 className="text-3xl font-bold ">Credits</h3>
            <p className="text-gray-500 text-lg">
              Check your aviable credits or buy more.
            </p>
          </div>
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="w-96 h-32 border-2 border-gray-300 rounded-2xl px-6 flex flex-row items-center justify-between shadow-sm">
              <div className="flex flex-col text-base font-medium text-gray-500">
                Your monthly credits (subscription)
                <div className="text-xl font-semibold text-black">
                  {userSubResponse?.credits.remaining_post_creations}
                </div>
              </div>
            </div>
            <div className="w-96 h-32 border-2 border-gray-300 rounded-2xl px-6 flex flex-row items-center justify-between shadow-sm">
              <div className="flex flex-col text-base font-medium text-gray-500">
                Your additonal credits (one time)
                <div className="text-xl font-semibold text-black">
                  {
                    userSubResponse?.credits
                      .remaining_post_creations_onetime_paid
                  }
                </div>
              </div>
            </div>
            <Link
              href={"/pricing#credits"}
              className="w-96 h-32 border-2 border-gray-300 rounded-2xl px-6 flex flex-row items-center justify-center shadow-sm group cursor-pointer"
            >
              <div className="flex flex-col   text-gray-700 font-bold text-xl  group-hover:text-lg transition-all">
                Buy more credits
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
