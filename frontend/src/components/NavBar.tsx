import Link from "next/link";
import ActionButton from "./ActionButton";

export default function NavBar() {
  return (
    <nav className="h-20 w-[calc(100%-0.8rem)] bg-transparent text-white bg-red-500   flex flex-row justify-between  items-center px-10 md:px-28 sticky top-0 backdrop-blur-sm shadow-xl z-20 overflow-x-hidden ">
      <h4 className="text-xl md:text-3xl font-bold">TrendPilot</h4>
      <div className="flex flex-row items-center gap-4 text-xl font-medium">
        <Link href={""} className="hover:underline hidden md:flex">
          What do we do?
        </Link>
        <Link href={""} className="hover:underline hidden md:flex">
          How does it work?
        </Link>

        <Link href={"/pricing"} className="hover:underline hidden md:flex">
          Pricing
        </Link>
        <ActionButton className="w-28 h-11" />
      </div>
    </nav>
  );
}
