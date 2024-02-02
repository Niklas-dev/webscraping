import Link from "next/link";
import ActionButton from "./ActionButton";

export default function NavBar() {
  return (
    <nav className="h-20 w-full bg-transparent text-white z-10 relative flex flex-row justify-between  items-center px-28">
      <h4 className="text-3xl font-bold">TrendPilot</h4>
      <div className="flex flex-row items-center gap-4 text-xl font-medium">
        <Link href={""} className="hover:underline">
          What do we do?
        </Link>
        <Link href={""} className="hover:underline">
          How does it work?
        </Link>

        <Link href={"/pricing"} className="hover:underline">
          Pricing
        </Link>
        <ActionButton className="w-28 h-11" />
      </div>
    </nav>
  );
}
