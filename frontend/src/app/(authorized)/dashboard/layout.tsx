import DashboardNavBar from "@/components/DashboardNavBar";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-screen  flex flex-row">
      <DashboardNavBar />
      <div className="flex flex-col w-full h-full">
        <div className="bg-gray-300 w-full h-14 flex flex-row items-center justify-end"></div>
        {children}
      </div>
    </section>
  );
}
