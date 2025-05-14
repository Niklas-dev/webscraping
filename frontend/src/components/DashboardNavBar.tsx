"use client";
import {
  BiArchive,
  BiBlock,
  BiBulb,
  BiChart,
  BiCog,
  BiCreditCard,
  BiFolder,
  BiHeart,
  BiHome,
  BiLogOut,
  BiMap,
  BiMoney,
  BiSquareRounded,
  BiTime,
  BiTrendingUp,
  BiUser,
  BiUserX,
} from "react-icons/bi";
import SideNavElement from "./SideNavElement";
import Link from "next/link";
import { Turn as Hamburger } from "hamburger-react";
import { useContext, useState } from "react";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";

export default function DashboardNavBar() {
  const [isOpen, setOpen] = useState(true);
  const user = useContext(AuthContext);
  const router = useRouter();
  return (
    <div className={` ${isOpen ? "absolute md:relative z-20 " : "  "}`}>
      <div className="absolute z-20 p-2">
        <Hamburger size={30} toggled={isOpen} toggle={setOpen} />
      </div>
      <div className={`h-full pt-8 w-72 bg-gray-100 ${isOpen ? "" : "hidden"}`}>
        <div className="h-full w-full p-8 ">
          <Link
            href={"/"}
            className="text-2xl font-medium flex flex-row items-center gap-1 "
          >
            <Image
              className=""
              src={"/logo.svg"}
              alt="logo"
              width={35}
              height={35}
            />{" "}
            TrendPilot
          </Link>

          <div className="mt-12 flex flex-col ">
            <h4 className="font-medium text-gray-400">CONTENT CREATION</h4>
            <div className="flex flex-col gap-4 mt-2">
              <SideNavElement route="/dashboard/home" name="Home">
                <BiHome />
              </SideNavElement>
              <SideNavElement route="/dashboard/ideas" name="Ideas">
                <BiBulb />
              </SideNavElement>
              <SideNavElement route="/dashboard/roadmap" name="Roadmap">
                <BiMap />
              </SideNavElement>
              <SideNavElement
                route="/dashboard/trending"
                name="Trending (Soon)"
              >
                <BiTrendingUp />
              </SideNavElement>
              <SideNavElement route="/dashboard/liked-ideas" name="Liked Ideas">
                <BiHeart />
              </SideNavElement>
            </div>
            <h4 className="font-medium text-gray-400 mt-12">
              CONTENT MANAGEMENT
            </h4>
            <div className="flex flex-col gap-4 mt-2">
              <SideNavElement
                route="/dashboard/scheduled-uploads"
                name="Scheduled Posts"
              >
                <BiTime />
              </SideNavElement>
            </div>
            <h4 className="font-medium text-gray-400 mt-12">SETTINGS</h4>
            <div className="flex flex-col gap-4 mt-2">
              <SideNavElement
                route="/dashboard/settings/account"
                name="Account "
              >
                <BiUser />
              </SideNavElement>
              <SideNavElement
                route="/dashboard/settings/subscription"
                name="Subscription"
              >
                <BiCreditCard />
              </SideNavElement>{" "}
              <SideNavElement
                route="/dashboard/settings/idea-creation"
                name="Idea Creation"
              >
                <BiCog />
              </SideNavElement>
            </div>
          </div>
          <button
            onClick={() => {
              user.logout();
              router.push("/");
            }}
            className={
              "text-gray-900 w-full hover:bg-gray-200 p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2  transition-colors cursor-pointer mt-4"
            }
          >
            <BiLogOut /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
