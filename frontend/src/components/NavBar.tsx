import Link from "next/link";
import ActionButton from "./ActionButton";

export default function NavBar() {
  return (
    <nav className="h-20 w-screen bg-transparent text-white z-50  flex flex-row justify-between  items-center px-10 md:px-28 fixed backdrop-blur-sm shadow-xl">
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
