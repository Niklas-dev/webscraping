import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="h-20 w-full bg-transparent text-white z-10 relative flex flex-row justify-between  items-center px-28">
      <h4 className="text-3xl font-bold">Eavy</h4>
      <div className="flex flex-row items-center gap-4 text-xl font-medium">
        <Link href={""} className="hover:underline">
          How does it work?
        </Link>
        <Link href={""} className="hover:underline">
          About
        </Link>
        <Link href={""} className="hover:underline">
          Pricing
        </Link>
        <Link
          href={""}
          className=" bg-white text-black rounded-lg  py-1.5 px-2.5 text-xl font-bold hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
