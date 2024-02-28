import DashboardNavBar from "@/components/DashboardNavBar";
import Image from "next/image";
import { FaBell, FaChevronDown, FaPlus, FaSearch } from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-screen  flex flex-row">
      <DashboardNavBar />
      <div className="flex flex-col w-full h-full overflow-x-hidden">
        <nav className="flex flex-row justify-end py-6 px-10 drop-shadow-sm relative z-10 ">
          <div className="flex flex-row items-center gap-4">
            <button className="h-10 w-fit px-4 rounded-lg flex items-center justify-center border border-gray-300 gap-2 text-lg outline-none transition-colors hover:bg-gray-100">
              <FaPlus size={"1rem"} />
              <span className="hidden md:flex">Create Post Idea</span>
            </button>

            <button className="h-10 w-10 rounded-full flex items-center justify-center border border-gray-300 transition-colors hover:bg-gray-100">
              <FaSearch size={"1.2rem"} />
            </button>
            <div className="flex flex-row items-center gap-2">
              <Image
                className="rounded-full h-10 w-10"
                height={100}
                width={100}
                alt="avatar"
                src={"/cloth.jpg"}
              />
              <FaChevronDown />
            </div>
          </div>
        </nav>
        {children}
      </div>
    </section>
  );
}
