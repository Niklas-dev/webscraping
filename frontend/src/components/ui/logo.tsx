import Link from "next/link";
import { LightbulbIcon } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 mb-8 group">
      <div className="bg-yellow-500 p-2 rounded-lg shadow-md transition-transform group-hover:scale-105">
        <LightbulbIcon className="h-6 w-6 text-white" />
      </div>
      <span className="text-2xl font-bold text-black">TrendPilot</span>
    </Link>
  );
}
