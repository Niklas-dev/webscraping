import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export default function PricingTable() {
  return (
    <main className="flex flex-row justify-center mt-10 relative z-10 gap-16">
      <div className="absolute flex flex-row justify-center gap-20">
        <div className="blur-[120px] bg-blue-600 h-56 w-56 top-0 left-0 bg-opacity-50"></div>
        <div className="blur-[120px] bg-yellow-400 h-56 w-56 top-0 left-0 bg-opacity-50"></div>
        <div className="blur-[120px] bg-red-600 h-56 w-56 top-0 left-0 bg-opacity-50"></div>
      </div>
      <div className="h-96 w-72 bg-[#0c0c0c] bg-opacity-75 rounded-3xl p-6 z-10 hover:ring-2">
        <h3 className="text-yellow-300 text-2xl font-medium">Basic</h3>
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
            Create 2 posts per day
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Create 2 posts per day
          </li>
          <li className="flex flex-row gap-2 text-[#e6e6e6]">
            <div className=" w-fit h-fit p-0.5 rounded-full border border-white">
              <FaCheck color="#e6e6e6" size={"12.5px"} />
            </div>{" "}
            Create 2 posts per day
          </li>
        </ul>
      </div>
      <div className="h-96 w-72 bg-[#0c0c0c] bg-opacity-75 rounded-3xl p-6 z-10">
        <h3 className="text-yellow-300 text-2xl font-medium">Basic</h3>
        <p className="text-gray-300 mt-2">
          Basic Plan - Just perfect for getting started.
        </p>
        <div className="flex flex-row items-center text-2xl font-medium gap-2 py-4">
          € <p className="text-5xl font-semibold">9,99</p>
        </div>
        <button className="w-full h-10 font-semibold text-lg rounded-lg bg-white text-black">
          Get started
        </button>
      </div>
      <div className="h-96 w-72 bg-[#0c0c0c] bg-opacity-75 rounded-3xl p-6 z-10">
        <h3 className="text-yellow-300 text-2xl font-medium">Basic</h3>
        <p className="text-gray-300 mt-2">
          Basic Plan - Just perfect for getting started.
        </p>
        <div className="flex flex-row items-center text-2xl font-medium gap-2 py-4">
          € <p className="text-5xl font-semibold">9,99</p>
        </div>
        <button className="w-full h-10 font-semibold text-lg rounded-lg bg-white text-black">
          Get started
        </button>
      </div>
    </main>
  );
}
