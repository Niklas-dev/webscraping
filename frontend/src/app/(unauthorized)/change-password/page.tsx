"use client";
import BlurColors from "@/components/BlurColors";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { BiInfoCircle, BiInfoSquare } from "react-icons/bi";
import { FaInfo, FaInfoCircle } from "react-icons/fa";

const useTokenFromUrl = () => {
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
      // Optionally, remove the token from the URL
      const newUrl = window.location.href.split("?")[0];
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [searchParams]);

  return token;
};
export default function Page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = useTokenFromUrl();
  const router = useRouter();
  const updatePassword = async (password: string) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        icon: "🤔",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_password: password, token: token }),
      }
    );

    if (!response.ok) {
      toast.error("Failed to reset password.", {
        icon: "🤔",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return null;
    }

    const data = await response.json();

    console.log(data);

    toast.success(data["detail"], {
      icon: "🤔",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    router.push("/login");
  };

  return (
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-white overflow-x-hidden flex justify-center items-start">
      <div className="flex flex-col justify-center items-center max-w-sm">
        <BlurColors />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col gap-4  p-12 rounded-xl z-10 mt-60"
        >
          <Link
            href={"/"}
            className="text-2xl text-black text-center font-bold"
          >
            TrendPilot
          </Link>

          <div className="flex flex-col">
            <label className=" text-gray-800" htmlFor="password">
              New Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              defaultValue={password}
              className="w-72 h-10 bg-gray-100 rounded-lg py-1 px-3 text-lg text-black outline-none focus:ring-2"
              type="password"
              name="Password"
              placeholder="Password"
              id="password"
            />
          </div>
          <div className="flex flex-col">
            <label className=" text-gray-800" htmlFor="confirmpassword">
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              defaultValue={confirmPassword}
              className="w-72 h-10 bg-gray-100 rounded-lg py-1 px-3 text-lg text-black outline-none focus:ring-2"
              type="password"
              name="confirmPassword"
              placeholder="Password"
              id="confirmpassword"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              type="submit"
              onClick={() => updatePassword(password)}
              className="bg-black border-2 border-black text-white rounded-lg py-1 px-3 font-medium text-lg "
            >
              Save new password
            </button>
          </div>
          <div className="h-[1px] bg-black w-full flex flex-row justify-center mt-4">
            <span className="text-black font-medium bg-white -translate-y-2.5 w-fit h-fit px-2">
              or
            </span>
          </div>
          <div className="w-full flex flex-row justify-center">
            <Link
              href={"/dashboard"}
              className="text-lg text-gray-800 hover:underline w-fit"
            >
              go to dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
