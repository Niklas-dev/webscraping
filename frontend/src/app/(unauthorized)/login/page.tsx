"use client";
import BlurColors from "@/components/BlurColors";
import Link from "next/link";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { redirect, useRouter } from "next/navigation";
export default function Page() {
  const [formData, setFormData] = useState({
    username: "Test",
    password: "test",
  });

  const router = useRouter();
  const login = async (_formData: { username: string; password: string }) => {
    console.log(_formData);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams(_formData),
      }
    );
    console.log(response.ok);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    console.log(data);

    const { access_token, refresh_token } = data as {
      access_token: string;
      refresh_token: string;
    };

    setCookie("access_token", access_token, {
      maxAge: 60 * 6 * 24 * 7,
    });
    setCookie("refresh_token", refresh_token, {
      maxAge: 60 * 6 * 24 * 14,
    });

    router.push("/dashboard");
  };
  const loginGoogle = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND}/auth/google`);
  };
  return (
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-gradient-to-b from-[#111111] to-black overflow-x-hidden">
      <div className="flex flex-col justify-start items-center">
        <BlurColors />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(formData);
          }}
          className="flex flex-col gap-4  p-12 rounded-xl z-10 mt-60"
        >
          <h1 className="text-2xl text-white text-center font-bold">
            TrendPilot
          </h1>
          <div className="flex flex-col">
            <label className=" text-white" htmlFor="username">
              Username
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-72 h-10 bg-[#222222] rounded-lg py-1 px-3 text-lg text-white outline-none focus:ring-2"
              type="text"
              name="Username"
              placeholder="Username"
              id="username"
            />
          </div>
          <div className="flex flex-col">
            <label className=" text-white" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-72 h-10 bg-[#222222] rounded-lg py-1 px-3 text-lg text-white outline-none focus:ring-2"
              type="text"
              name="Password"
              placeholder="Password"
              id="password"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              type="submit"
              onClick={() => login(formData)}
              className="bg-white rounded-lg py-1 px-3 font-medium text-lg "
            >
              Login
            </button>
            <button
              onClick={() => loginGoogle()}
              type="button"
              className="border-white border-2 text-white rounded-lg py-1 px-3 font-medium text-lg "
            >
              Google
            </button>
          </div>
          <div className="h-[1px] bg-white w-full flex flex-row justify-center mt-4">
            <span className="text-white font-medium bg-[#080808] -translate-y-2.5 w-fit h-fit px-2">
              or
            </span>
          </div>
          <div className="w-full flex flex-row justify-center">
            <Link
              href={"/register"}
              className="text-lg text-white hover:underline w-fit"
            >
              create a new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
