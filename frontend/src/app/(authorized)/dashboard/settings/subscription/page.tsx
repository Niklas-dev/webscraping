import { cookies } from "next/headers";
import Link from "next/link";

export default async function page() {
  const cookieStore = cookies();

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

  return (
    <div className="p-4">
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
          test
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Current Plan</h3>
            <Link
              className="border-gray-300 text-gray-700 border-2 px-3 py-1.5 font-semibold rounded-lg shadow-sm"
              href={""}
            >
              Change Plan
            </Link>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-96 h-32 border-2 border-gray-300 rounded-2xl px-6 flex flex-row items-center justify-between shadow-sm">
              <div className="flex flex-col text-base font-medium text-gray-500">
                {"Pro Plan Monthly"}
                <div className="text-xl font-semibold text-black">
                  {"19,99€ / Month"}
                </div>
              </div>
              <div className="bg-green-600 bg-opacity-55 px-5 py-1.5 rounded-full text-green-900 font-semibold">
                Active
              </div>
            </div>
            <div className="w-96 h-32 border-2 border-gray-300 rounded-2xl px-6 flex flex-row items-center justify-between shadow-sm">
              <div className="flex flex-col text-base font-medium text-gray-500">
                Last renew
                <div className="text-xl font-semibold text-black">
                  {"1. Sep 2024"}
                </div>
              </div>
              <div className="border-2 border-gray-300 bg-opacity-55 px-5 py-1.5 rounded-full text-gray-500  font-semibold">
                Renewed
              </div>
            </div>
            <div className="w-96 h-32 border-2 border-gray-300 rounded-2xl px-6 flex flex-row items-center justify-between shadow-sm">
              <div className="flex flex-col text-base font-medium text-gray-500">
                Renew at
                <div className="text-xl font-semibold text-black">
                  {"20. Oct 2025"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
