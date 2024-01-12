import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="w-screen h-screen relative bg-[#070707]">
      <div className="absolute w-full h-96 blur-[135px] flex justify-center -top-10 gap-2 ">
        <div className="w-44 h-44 bg-red-600 rounded-full"></div>
        <div className="w-44 h-44 bg-orange-600 rounded-full"></div>
        <div className="w-44 h-44 bg-yellow-400 rounded-full"></div>
        <div className="w-44 h-44 bg-green-600 rounded-full"></div>
        <div className="w-44 h-44 bg-blue-700 rounded-full"></div>
        <div className="w-44 h-44 bg-indigo-600 rounded-full"></div>
      </div>
      <NavBar />
      <Image
        className="absolute hidden md:block top-56 md:-left-10 lg:left-2 xl:left-32 scale-50 lg:scale-75 xl:scale-90 2xl:scale-100"
        src="/process.svg"
        width={400}
        height={400}
        alt="Follow us on Twitter"
      />
      <div className="text-white relative flex flex-col items-center justify-center mt-40">
        <div className="text-7xl text-center font-bold">
          <h1 className="">Missed an discount?</h1>
          <h2 className="text-3xl ">Won&apos;t happen again.</h2>
        </div>
        <div className="mt-8">
          <p className="text-xl text-center font-medium">
            Listen to price changes and discounts easily all possible with Eavy.{" "}
            <br />
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
