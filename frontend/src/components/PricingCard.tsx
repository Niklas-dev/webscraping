import React from "react";
import { FaCheck } from "react-icons/fa";
import { IFeature, ISubscription } from "@/shared/interfaces";
import clsx from "clsx";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  productId: string;
  priceId: string;
  features: IFeature[];
  accentColor: string;
  currentSubscription?: ISubscription;
  onPlanClick: (
    productId: string,
    priceId: string,
    currentSub?: ISubscription
  ) => void;
  buttonText?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  productId,
  priceId,
  features,
  accentColor,
  currentSubscription,
  onPlanClick,
  buttonText = "Get Started",
}) => {
  const isCurrentSubscription =
    currentSubscription?.product.product_id === productId ||
    currentSubscription?.product.product_name === productId;

  return (
    <div
      className={`h-fit w-72 lg:w-80 bg-gray-200 bg-opacity-100 rounded-3xl p-6 z-20 hover:ring-2 ring-${accentColor}-500 transition-all`}
    >
      <h3
        className={clsx("text-2xl font-medium", {
          "text-blue-500": accentColor === "blue",
          "text-yellow-500": accentColor === "yellow",
          "text-orange-500": accentColor === "orange",
        })}
      >
        {title}
      </h3>
      <p className="text-gray-800 mt-2">{description}</p>
      <div className="flex flex-row items-center text-2xl font-medium gap-2 py-4">
        € <p className="text-5xl font-semibold">{price}</p>
      </div>
      <button
        data-umami-event="Checkout Button"
        onClick={() => onPlanClick(productId, priceId, currentSubscription)}
        className={`w-full h-10 font-semibold text-lg rounded-lg transition-all ${
          isCurrentSubscription
            ? `text-gray-800 border-gray-800 border-2 hover:bg-gray-100 hover:text-black`
            : "bg-black text-white hover:border-gray-200 hover:bg-white hover:text-black border-2"
        }`}
      >
        {buttonText}
      </button>
      <ul className="mt-6 flex flex-col gap-3">
        {features.map((feature, index) => (
          <li key={index} className="flex flex-row gap-2 text-gray-800">
            <div className="w-fit h-fit p-0.5 rounded-full border border-[#555555]">
              <FaCheck color="#555555" size={"12.5px"} />
            </div>{" "}
            {feature.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
