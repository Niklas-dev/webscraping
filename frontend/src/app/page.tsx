import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="w-screen h-screen relative  bg-gradient-to-b from-[#111111] to-black">
      <div className="absolute w-full h-96 blur-[135px] flex justify-center -top-10 gap-2 ">
        <div className="w-44 h-44 bg-red-600 rounded-full"></div>
        <div className="w-44 h-44 bg-orange-600 rounded-full"></div>
        <div className="w-44 h-44 bg-yellow-400 rounded-full"></div>
        <div className="w-44 h-44 bg-green-600 rounded-full"></div>
        <div className="w-44 h-44 bg-blue-700 rounded-full"></div>
        <div className="w-44 h-44 bg-indigo-600 rounded-full"></div>
      </div>
      <NavBar />

      <div className="text-white relative flex flex-col items-center justify-center mt-40">
        <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center font-bold">
          <h1 className="">Missed an discount?</h1>
          <h2 className="text-xl md:text-2xl 2xl:text-3xl ">
            Won&apos;t happen again.
          </h2>
        </div>
        <div className="mt-8 px-14">
          <p className="text-base md:text-lg xl:text-xl text-center font-medium">
            Listen to price changes and discounts easily all possible with Eavy.
            <br className="md:block hidden" />
            Track your products and receive a notice on price drop.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-6">
          <button className="mt-2 bg-white text-black rounded-lg w-36 h-14 text-xl font-bold hover:scale-105">
            Get Started
          </button>

          <div className="relative -translate-x-7 mt-2">
            <Image
              src="/arrow.svg"
              width={200}
              height={200}
              alt="Follow us on Twitter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
