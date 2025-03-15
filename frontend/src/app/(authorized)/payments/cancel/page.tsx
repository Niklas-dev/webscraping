"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/#pricing");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-3xl font-medium">
        Your checkout has been canceled.
      </div>
      <div className="text-lg">You are being redirected...</div>
    </div>
  );
}
