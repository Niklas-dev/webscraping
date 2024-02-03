import { getCookie } from "cookies-next";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { cookies } from "next/headers";
interface IPlan {
  product_id: string;
  product_name: string;
  price: string;
  id: number;
}

export default async function PricingTable() {
  const cookieStore = cookies();
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

  const createRedirects = async (data: IPlan[] | null) => {
    let redirectUrls: string[] = [];

    if (!data) {
      return null;
    }

    for (let i in data) {
      console.log(data[i]);
      const checkoutResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
          },
        }
      );

      if (!checkoutResponse.ok) {
        return null;
      }

      const checkoutUrl = await checkoutResponse.json();

      redirectUrls.push(checkoutUrl);
    }

    return redirectUrls;
  };

  const data: IPlan[] | null = await getPlans();
  const urls = await createRedirects(data);
  console.log(urls);

  return (
    <main className="flex flex-col lg:flex-row items-center lg:justify-center mt-10 relative z-10 gap-16 pb-16">
      <div className="absolute flex flex-row justify-center gap-20">
        <div className="blur-[120px] bg-blue-600 h-56 w-56 top-0 left-0 bg-opacity-50"></div>
        <div className="blur-[120px] bg-yellow-400 h-56 w-56 top-0 left-0 bg-opacity-50"></div>
        <div className="blur-[120px] bg-red-600 h-56 w-56 top-0 left-0 bg-opacity-50"></div>
      </div>
      <div className="h-fit w-72 bg-[#0c0c0c] bg-opacity-75 rounded-3xl p-6 z-10 hover:ring-2 ring-blue-500 transition-all">
        <h3 className="text-blue-500 text-2xl font-medium">Basic</h3>
        <p className="text-gray-300 mt-2">
          Basic Plan - Just perfect for getting started.
        </p>
        <div className="flex flex-row items-center text-2xl font-medium gap-2 py-4">
          € <p className="text-5xl font-semibold">9,99</p>
        </div>

        <button className="w-full h-10 font-semibold text-lg rounded-lg bg-white text-black">
          Get started
        </button>
        <ul className="mt-6 flex flex-col gap-3">
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white  ">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            14 Day Free Test Trial
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Create 9 posts per week
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Post backups for up to a month
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Active customer support
          </li>
        </ul>
      </div>
      <div className="h-fit w-80 bg-[#0c0c0c] bg-opacity-75 rounded-3xl p-6 z-10 hover:ring-2 ring-yellow-300 transition-all">
        <h3 className="text-yellow-300 text-2xl font-medium">
          Pro Plan - Yearly
        </h3>
        <p className="text-gray-300 mt-2">
          Pro Plan - The best solution to bring your content to the next level.
        </p>
        <div className="flex flex-row items-center text-2xl font-medium gap-2 py-4">
          € <p className="text-5xl font-semibold">199,99</p>
        </div>
        <button className="w-full h-10 font-semibold text-lg rounded-lg bg-white text-black">
          Get started
        </button>
        <ul className="mt-6 flex flex-col gap-3">
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white  ">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            15% cheaper per month
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white  ">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            14 Day Free Test Trial
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Create 18 posts per week
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Post backups forever!
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Personal customer support
          </li>
        </ul>
      </div>
      <div className="h-fit w-72 bg-[#0c0c0c] bg-opacity-75 rounded-3xl p-6 z-10 hover:ring-2 ring-orange-500 transition-all">
        <h3 className="text-orange-500 text-2xl font-medium">
          Pro Plan - Monthly
        </h3>
        <p className="text-gray-300 mt-2">
          Pro Plan - The best solution to bring your content to the next level.
        </p>
        <div className="flex flex-row items-center text-2xl font-medium gap-2 py-4">
          € <p className="text-5xl font-semibold">19,99</p>
        </div>
        <button className="w-full h-10 font-semibold text-lg rounded-lg bg-white text-black">
          Get started
        </button>
        <ul className="mt-6 flex flex-col gap-3">
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white  ">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            14 Day Free Test Trial
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Create 18 posts per week
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Post backups forever!
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Personal customer support
          </li>
        </ul>
      </div>
    </main>
  );
}
