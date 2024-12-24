"use client";

import BlurColors from "@/components/BlurColors";
import { setCookie } from "cookies-next";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const register = async (_formData: {
    username: string;
    password: string;
  }) => {
    console.log(_formData);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(_formData),
      }
    );
    console.log(response.ok);

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      toast.error(data.detail, {
        duration: 8000,
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      //setFormData({ username: "", email: "", password: "" });
      return null;
    }

    const data = await response.json();

    console.log(data);

    toast.success(
      "Account has been created. Check your emails to verify your account.",
      {
        duration: 12000,
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
    router.refresh();
  };
  const registerGoogle = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND}/auth/google`);
  };
  return (
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-white overflow-x-hidden">
      <div className="flex flex-col justify-start items-center mt-60">
        <BlurColors />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register(formData);
          }}
          className="flex flex-col gap-4  p-12 rounded-xl z-10"
        >
          <Link
            href={"/"}
            className="text-2xl text-black text-center font-bold"
          >
            TrendPilot
          </Link>
          <div className="flex flex-col">
            <label className=" text-gray-800" htmlFor="username">
              Username
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              value={formData.username}
              className="w-72 h-10 bg-gray-100 rounded-lg py-1 px-3 text-lg text-black outline-none focus:ring-2"
              type="text"
              name="Username"
              placeholder="Username"
              id="username"
            />
          </div>
          <div className="flex flex-col">
            <label className=" text-gray-800" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              className="w-72 h-10 bg-gray-100 rounded-lg py-1 px-3 text-lg text-black outline-none focus:ring-2"
              type="email"
              name="Email"
              placeholder="Email"
              id="email"
            />
          </div>
          <div className="flex flex-col">
            <label className=" text-gray-800" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              className="w-72 h-10 bg-gray-100 rounded-lg py-1 px-3 text-lg text-black outline-none focus:ring-2"
              type="password"
              name="Password"
              placeholder="Password"
              id="password"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              type="submit"
              className="bg-black text-white border-black border-2 rounded-lg py-1 px-3 font-medium text-lg "
            >
              Register
            </button>
            <button
              onClick={() => registerGoogle()}
              type="button"
              className="border-black border-2 text-black rounded-lg py-1 px-3 font-medium text-lg "
            >
              Google
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
              login to existing account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
