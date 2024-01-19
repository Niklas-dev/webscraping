"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { setCookie } from "cookies-next";
export default function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    return () => {
      second;
    };
  }, [third]);

  return (
    <div>
      {searchParams.get("access_token")} {searchParams.get("refresh_token")}
    </div>
  );
}
