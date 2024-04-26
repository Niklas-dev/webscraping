import {
  BiArchive,
  BiBlock,
  BiBulb,
  BiChart,
  BiCog,
  BiCreditCard,
  BiFolder,
  BiHome,
  BiMoney,
  BiSquareRounded,
  BiTrendingUp,
  BiUser,
  BiUserX,
} from "react-icons/bi";
import SideNavElement from "./SideNavElement";
import Link from "next/link";

export default function DashboardNavBar() {
  return (
    <div className="h-full w-72 bg-gray-100">
      <div className="h-full w-full p-8 ">
        <Link
          href={"/"}
          className="text-2xl font-medium flex flex-row items-center gap-1 "
        >
          <BiChart color="#00000" /> TrendPilot
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
            <SideNavElement route="/dashboard/trending" name="Trending (Soon)">
              <BiTrendingUp />
            </SideNavElement>
            <SideNavElement
              route="/dashboard/archived-ideas"
              name="Archived Ideas"
            >
              <BiFolder />
            </SideNavElement>
          </div>
          <h4 className="font-medium text-gray-400 mt-12">SETTINGS</h4>
          <div className="flex flex-col gap-4 mt-2">
            <SideNavElement route="/dashboard/settings/account" name="Account ">
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
      </div>
    </div>
  );
}
