"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function SideNavElement({
  route,
  name,
  children,
}: {
  route: string;
  name: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={route}
      className={`${
        pathname == route
          ? "text-white bg-[#1b1b1b] hover:bg-[#252525]"
          : "text-gray-500 hover:bg-gray-200"
      } p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2  transition-colors cursor-pointer`}
    >
      {children} {name}
    </Link>
  );
}
