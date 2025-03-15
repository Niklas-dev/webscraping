import DashboardNavBar from "@/components/DashboardNavBar";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaPlus, FaUserCircle } from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-screen  flex flex-row ">
      <DashboardNavBar />
      <div className="flex flex-col w-full h-full overflow-x-hidden md:pl-8 px-4">
        <nav className="flex flex-row justify-end py-4 px-10 drop-shadow-sm relative z-10 ">
          <div className="flex flex-row items-center gap-4">
            <Link
              href={"/dashboard/create-post-idea"}
              className="h-10 w-fit px-4 rounded-lg flex items-center justify-center border border-gray-300 gap-2 text-lg outline-none transition-colors hover:bg-gray-100"
            >
              <FaPlus size={"1rem"} />
              <span className="hidden md:flex">Create Post Idea</span>
            </Link>
            <div className="flex flex-row items-center gap-2">
              <Link href={"/dashboard/settings/account"}>
                <FaUserCircle
                  color="#adadad"
                  className="rounded-full h-10 w-10"
                />
              </Link>
            </div>
          </div>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
    </section>
  );
}
