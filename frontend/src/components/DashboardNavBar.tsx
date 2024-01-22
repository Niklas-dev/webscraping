import {
  BiArchive,
  BiBlock,
  BiChart,
  BiHome,
  BiSquareRounded,
} from "react-icons/bi";

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
            <div className="bg-[#222222] text-white p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2">
              <BiArchive /> Dashboard
            </div>
            <div className=" text-gray-500 p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer">
              <BiArchive /> Ideas
            </div>
            <div className=" text-gray-500 p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2">
              <BiArchive /> Trending
            </div>
            <div className=" text-gray-500 p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2">
              <BiArchive /> Archived Ideas
            </div>
          </div>
          <h4 className="font-medium text-gray-400 mt-12">SETTINGS</h4>
          <div className="flex flex-col gap-4 mt-2">
            <div className=" text-gray-500 p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2">
              <BiArchive /> Dashboard
            </div>
            <div className=" text-gray-500 p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2">
              <BiArchive /> Ideas
            </div>
            <div className=" text-gray-500 p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2">
              <BiArchive /> Trending
            </div>
            <div className=" text-gray-500 p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2">
              <BiArchive /> Archived Ideas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
