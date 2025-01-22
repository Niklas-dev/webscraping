"use client";
import BlurColors from "@/components/BlurColors";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiInfoCircle, BiInfoSquare } from "react-icons/bi";
import { FaInfo, FaInfoCircle } from "react-icons/fa";

export default function Page() {
  const [email, setEmail] = useState("");

  const requestPasswordReset = async (email: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/request-password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      toast.error("Failed to reset email.", {
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

    toast.error(data["detail"], {
      icon: "🤔",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
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
          <div className="w-full flex flex-col gap-2">
            <BiInfoCircle size={"18px"} className=" text-gray-600" />{" "}
            <p className="w-full text-gray-600">
              If an account exists with this email, the account connected to
              this email will receive an email to reset the password.
            </p>
          </div>
          <div className="flex flex-col">
            <label className=" text-gray-800" htmlFor="email">
              Account Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
              className="w-72 h-10 bg-gray-100 rounded-lg py-1 px-3 text-lg text-black outline-none focus:ring-2"
              type="email"
              name="Email"
              placeholder="Email"
              id="email"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              type="submit"
              onClick={() => requestPasswordReset(email)}
              className="bg-black border-2 border-black text-white rounded-lg py-1 px-3 font-medium text-lg "
            >
              Request Reset
            </button>
          </div>
          <div className="h-[1px] bg-black w-full flex flex-row justify-center mt-4">
            <span className="text-black font-medium bg-white -translate-y-2.5 w-fit h-fit px-2">
              or
            </span>
          </div>
          <div className="w-full flex flex-row justify-center">
            <Link
              href={"/login"}
              className="text-lg text-gray-800 hover:underline w-fit"
            >
              go back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
