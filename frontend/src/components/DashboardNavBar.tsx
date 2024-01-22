import {
  BiArchive,
  BiBlock,
  BiChart,
  BiHome,
  BiSquareRounded,
} from "react-icons/bi";
import SideNavElement from "./SideNavElement";

export default function DashboardNavBar() {
  return (
    <div className="h-full w-72 bg-gray-100">
      <div className="h-full w-full p-8 ">
        <h3 className="text-2xl font-medium flex flex-row items-center gap-1">
          <BiChart color="#00000" /> TrendPilot
        </h3>

        <div className="mt-12 flex flex-col ">
          <h4 className="font-medium text-gray-400">CONTENT CREATION</h4>
          <div className="flex flex-col gap-4 mt-2">
            <SideNavElement route="/dashboard/home" name="Home">
              <BiArchive />
            </SideNavElement>
            <SideNavElement route="/dashboard/ideas" name="Ideas">
              <BiArchive />
            </SideNavElement>
            <SideNavElement route="/dashboard/trending" name="Trending">
              <BiArchive />
            </SideNavElement>
            <SideNavElement
              route="/dashboard/archived-ideas"
              name="Archived Ideas"
            >
              <BiArchive />
            </SideNavElement>
          </div>
          <h4 className="font-medium text-gray-400 mt-12">SETTINGS</h4>
          <div className="flex flex-col gap-4 mt-2">
            <SideNavElement route="/dashboard/archived-ideas" name="Account ">
              <BiArchive />
            </SideNavElement>
            <SideNavElement
              route="/dashboard/archived-ideas"
              name="Idea Creation"
            >
              <BiArchive />
            </SideNavElement>
          </div>
        </div>
      </div>
    </div>
  );
}
