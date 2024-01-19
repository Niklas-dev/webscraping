"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { setCookie } from "cookies-next";
export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    return () => {
      setCookie("access_token", searchParams.get("access_token"), {
        maxAge: 60 * 6 * 24 * 7,
      });
      setCookie("refresh_token", searchParams.get("refresh_token"), {
        maxAge: 60 * 6 * 24 * 14,
      });

      router.push("/");
    };
  }, [searchParams, router]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-b from-[#111111] to-black"></div>
  );
}
