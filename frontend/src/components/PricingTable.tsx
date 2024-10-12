"use client";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { cookies } from "next/headers";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ISubscription, IUserSubResponse } from "@/shared/interfaces";
interface IPlan {
  product_id: string;
  product_name: string;
  price: string;
  id: number;
}

export default function PricingTable() {
  const user = useContext(AuthContext);
  const router = useRouter();

  const [subscription, setSubscription] = useState<ISubscription>();

  const getPlans = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/payments/get-plans`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(response.ok);

    if (!response.ok) {
      return null;
    }

    const data: IPlan[] = await response.json();

    console.log(data);

    return data;
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
    console.log(response.ok);

    if (!response.ok) {
      return null;
    }

    const data: IUserSubResponse = await response.json();

    console.log(data?.subscription);

    setSubscription(data?.subscription);
  };

  useLayoutEffect(() => {
    getCurrentUserPlan();
    getPlans();
    return () => {};
  }, []);

  const onPlanClick = async (
    product: string,
    price_id: string,
    currentSub: ISubscription | undefined
  ) => {
    if (!user.username) {
      console.log("login pls");
      router.push("/login");
    }
    if (product === currentSub?.product.product_name) {
      toast.error("You are already subscribed to this plan.", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/payments/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        body: JSON.stringify({
          product_id: "prod_PSadtKPNwNOW6O",
          price_id: price_id,
        }),
      }
    );

    if (!response.ok) {
      const error: { detail: string } = await response.json();
      console.log(error);
      toast.error(error.detail, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    const data: string = await response.json();
    console.log(data);
    window.open(data, "_self");
  };

  return (
    <main className="flex flex-col lg:flex-row items-center lg:justify-center mt-10 relative z-10 gap-16 pb-16">
      <div className="absolute flex flex-row justify-center gap-20">
        <div className="blur-[120px] bg-blue-600 h-56 w-56 top-0 left-0 bg-opacity-30"></div>
        <div className="blur-[120px] bg-yellow-400 h-56 w-56 top-0 left-0 bg-opacity-30"></div>
        <div className="blur-[120px] bg-red-600 h-56 w-56 top-0 left-0 bg-opacity-30"></div>
      </div>
      <div className="h-fit w-72 bg-gray-100 bg-opacity-100 rounded-3xl p-6 z-20 hover:ring-2 ring-blue-500 transition-all">
        <h3 className="text-blue-500 text-2xl font-medium">Basic - Monthly</h3>
        <p className="text-gray-800 mt-2">
          Basic Plan - Just perfect for getting started.
        </p>
        <div className="flex flex-row items-center text-2xl font-medium gap-2 py-4">
          € <p className="text-5xl font-semibold">9,99</p>
        </div>

        <button
          onClick={() =>
            onPlanClick("Prod1", "price_1OdfSDGpk89JeyEsBnVx5cxc", subscription)
          }
          className={`w-full h-10 font-semibold text-lg rounded-lg transition-all  ${
            subscription?.product.product_name === "Prod1"
              ? "text-gray-800 border-gray-800 border-2 hover:bg-gray-100 hover:text-black"
              : "bg-black text-white hover:border-gray-200 hover:bg-white hover:text-black border-2 "
          }`}
        >
          {subscription?.product.product_name === "Prod1"
            ? "Currently subscribed"
            : "Get Started"}
        </button>
        <ul className="mt-6 flex flex-col gap-3">
          <li className="flex flex-row gap-2 text-gray-800 ">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]  ">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            14 Day Free Test Trial
          </li>
          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            Create 9 posts per week
          </li>
          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            Post backups for up to a month
          </li>
          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            Active customer support
          </li>
        </ul>
      </div>
      <div className="h-fit w-80 bg-gray-100 bg-opacity-100 rounded-3xl p-6 z-20 hover:ring-2 ring-yellow-300 transition-all">
        <h3 className="text-yellow-500 text-2xl font-medium">
          Pro Plan - Yearly
        </h3>
        <p className="text-gray-800 mt-2">
          Pro Plan - The best solution to bring your content to the next level.
        </p>
        <div className="flex flex-row items-center text-2xl font-medium gap-2 py-4">
          € <p className="text-5xl font-semibold">199,99</p>
        </div>
        <button
          onClick={() =>
            onPlanClick("Prod3", "price_1OdfTdGpk89JeyEsyUNAQiPc", subscription)
          }
          className={`w-full h-10 font-semibold text-lg rounded-lg transition-all  ${
            subscription?.product.product_name === "Prod3"
              ? "text-white border-white border-2 hover:bg-gray-100 hover:text-black"
              : "bg-black text-white hover:border-gray-200 hover:bg-white hover:text-black border-2 "
          }`}
        >
          {subscription?.product.product_name === "Prod3"
            ? "Currently subscribed"
            : "Get Started"}
        </button>
        <ul className="mt-6 flex flex-col gap-3">
          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]  ">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            15% cheaper per month
          </li>

          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            Create 18 posts per week
          </li>
          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            Post backups forever!
          </li>
          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            Personal customer support
          </li>
        </ul>
      </div>
      <div className="h-fit w-72 bg-gray-100 bg-opacity-100 rounded-3xl p-6 z-20 hover:ring-2 ring-orange-500 transition-all">
        <h3 className="text-orange-500 text-2xl font-medium">
          Pro Plan - Monthly
        </h3>
        <p className="text-gray-800 mt-2">
          Pro Plan - The best solution to bring your content to the next level.
        </p>
        <div className="flex flex-row items-center text-2xl font-medium gap-2 py-4">
          € <p className="text-5xl font-semibold">19,99</p>
        </div>
        <button
          onClick={() =>
            onPlanClick("Prod2", "price_1Obq5xGpk89JeyEsqb8Twsx3", subscription)
          }
          className={`w-full h-10 font-semibold text-lg rounded-lg transition-all ${
            subscription?.product.product_name === "Prod2"
              ? "text-white border-white border-2 hover:bg-gray-100 hover:text-black"
              : "bg-black text-white hover:border-gray-200 hover:bg-white hover:text-black border-2 "
          }`}
        >
          {subscription?.product.product_name === "Prod2"
            ? "Currently subscribed"
            : "Get Started"}
        </button>
        <ul className="mt-6 flex flex-col gap-3">
          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]  ">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            14 Day Free Test Trial
          </li>
          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            Create 18 posts per week
          </li>
          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            Post backups forever!
          </li>
          <li className="flex flex-row gap-2 text-gray-800">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-[#555555]">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            Personal customer support
          </li>
        </ul>
      </div>
    </main>
  );
}
