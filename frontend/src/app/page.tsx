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

      <div className="text-white relative flex flex-col items-center justify-center mt-40">
        <div className="text-6xl text-center font-bold">
          <h1 className="">Missed an discount?</h1>
          <h2 className="text-3xl ">Won&apos;t happen again.</h2>
        </div>
        <div className="mt-8">
          <p className="text-lg text-center font-medium">
            Listen to price changes and discounts easily all possible with Eavy.{" "}
            <br />
            Track your products and receive a notice on price drop.
          </p>
        </div>
      </div>
    </div>
  );
}
