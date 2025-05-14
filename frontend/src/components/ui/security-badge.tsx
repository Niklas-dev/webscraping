import { ShieldCheck } from "lucide-react";

export function SecurityBadge() {
  return (
    <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mt-6">
      <ShieldCheck className="h-4 w-4 text-yellow-500" />
      <span>Secure, encrypted connection</span>
    </div>
  );
}
