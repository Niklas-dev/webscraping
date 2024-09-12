import CreditsPricingTable from "@/components/CreditsPricingTable";
import NavBar from "@/components/NavBar";
import PricingTable from "@/components/PricingTable";

export default function page() {
  return (
    <div className="h-screen w-fscreen relative selection:bg-orange-500  bg-white overflow-y-scroll overflow-x-hidden text-black">
      <NavBar />
      <div className="flex flex-col items-center mt-28">
        <h1 className="text-5xl font-bold text-white text-center">
          Our pricing, simple and fair
        </h1>
        <p className="text-2xl font-medium  text-center mt-4 text-gray-800">
          Get started with TrendPilot - Perfect social media posts by finding
          for you tailored content. <br /> Follow hyped trends and grow with
          wanted content.
        </p>
      </div>
      <PricingTable />
      <div id="credits" className="w-full flex justify-center">
        <h3 className="font-medium text-2xl text-center px-4 text-gray-800">
          or buy direct idea creation credits without starting a subscription.
        </h3>
      </div>
      <CreditsPricingTable />
    </div>
  );
}
