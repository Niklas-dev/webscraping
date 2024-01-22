import Link from "next/link";

export default function SideNavElement({
  route,
  name,
  children,
}: {
  route: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={route}
      className=" text-gray-500 p-3 rounded-xl text-lg font-semibold flex flex-row items-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer"
    >
      {children} {name}
    </Link>
  );
}
