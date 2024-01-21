"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function ActionButton({ className }: { className: string }) {
  const user = useContext(AuthContext);

  const router = useRouter();

  const onClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };
  return (
    <button
      onClick={onClick}
      className={`bg-white text-black rounded-lg w-32 h-10 text-lg flex justify-center items-center font-bold hover:scale-105 ${className}`}
    >
      Get Started
    </button>
  );
}
