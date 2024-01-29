import NavBar from "@/components/NavBar";
import PricingTable from "@/components/PricingTable";

export default function page() {
  return (
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-gradient-to-b from-[#111111] to-black overflow-y-scroll overflow-x-hidden text-white">
      <NavBar />
      <div className="flex flex-col items-center mt-28">
        <h1 className="text-5xl font-bold text-white text-center">
          Our pricing, simple and fair
        </h1>
        <p className="text-xl text-gray-300 text-center mt-4">
          Get started with TendPilot - Perfect social media posts by finding for
          you tailored content. <br /> Follow hyped trends and grow with wanted
          content.
        </p>
      </div>
      <PricingTable />
    </div>
  );
}
