import { BiArchive } from "react-icons/bi";

export default function SideNavElement() {
  return (
    <div className=" text-gray-500 p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer">
      <BiArchive /> Ideas
    </div>
  );
}
