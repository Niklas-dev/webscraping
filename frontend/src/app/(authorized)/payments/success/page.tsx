"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-3xl font-medium">You subscribed to a plan.</div>
      <div className="text-lg">
        Thank you for your purchase. We are redirecting you...
      </div>
    </div>
  );
}
