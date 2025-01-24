"use client";
import { getCookie } from "cookies-next";
import { FaCheck } from "react-icons/fa";
import { useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  IStripeProduct,
  IStripeProductsResponse,
  ISubscription,
  IUserSubResponse,
} from "@/shared/interfaces";
import PricingCard from "@/components/PricingCard";

export default function PricingTable() {
  const user = useContext(AuthContext);
  const router = useRouter();

  const [subscription, setSubscription] = useState<ISubscription>();
  const [products, setProducts] = useState<IStripeProduct[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const colorMap = ["blue", "yellow", "orange"];

  // Function to fetch products from Stripe
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
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching Stripe products:", error);
      toast.error("Failed to load pricing plans", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
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

  useLayoutEffect(() => {
    getCurrentUserPlan();
    fetchStripeProducts();
  }, []);

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
      `${process.env.NEXT_PUBLIC_BACKEND}/payments/create-checkout-session`,
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

  return (
    <main className="flex flex-col lg:flex-row items-start lg:justify-center mt-10 relative z-10 gap-16 pb-16">
      <div className="absolute flex flex-row justify-center gap-20">
        <div className="blur-[120px] bg-blue-600 h-56 w-56 top-0 left-0 bg-opacity-30"></div>
        <div className="blur-[120px] bg-yellow-400 h-56 w-56 top-0 left-0 bg-opacity-30"></div>
        <div className="blur-[120px] bg-red-600 h-56 w-56 top-0 left-0 bg-opacity-30"></div>
      </div>

      {loading ? (
        // Show skeleton loader when data is loading
        <div className="flex flex-wrap justify-center gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-72 h-96 bg-gray-200 rounded-3xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        // Render pricing cards after loading
        products.map((product, index) => (
          <PricingCard
            key={product.id}
            title={product.name}
            description={product.description || ""}
            price={product.price.unit_amount}
            productId={product.id}
            priceId={product.price.price_id}
            features={product.features}
            accentColor={colorMap[index % colorMap.length]}
            currentSubscription={subscription}
            onPlanClick={onPlanClick}
          />
        ))
      )}
    </main>
  );
}
