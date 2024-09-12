import Link from "next/link";
import ActionButton from "./ActionButton";

export default function NavBar() {
  return (
    <nav className="h-20 w-[calc(100%-0.8rem)] bg-transparent text-black    flex flex-row justify-between  items-center px-10 md:px-28 sticky top-0 backdrop-blur-sm shadow-sm z-20 overflow-x-hidden ">
      <Link href={"/"} className="text-xl md:text-3xl font-bold">
        TrendPilot
      </Link>
      <div className="flex flex-row items-center gap-4 text-xl font-medium">
        <Link href={"/#examples"} className="hover:underline hidden md:flex">
          Examples
        </Link>
        <Link href={"/#features"} className="hover:underline hidden md:flex">
          Features
        </Link>

        <Link href={"/pricing"} className="hover:underline hidden md:flex">
          Pricing
        </Link>
        <ActionButton className="w-32 h-12" />
      </div>
    </nav>
  );
}
