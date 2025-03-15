"use client";
import BlurColors from "@/components/BlurColors";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/providers/AuthProvider";
export default function Page() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user.username) {
      router.push("/dashboard");
    }
    const detail = searchParams.get("detail");
    if (detail === "email_verified") {
      toast.success("Your email has been verified.", {
        duration: 4000,
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }

    return () => {};
  }, [searchParams, user.username]);

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
      const data = await response.json();
      console.log(data);
      toast.error(data.detail, {
        duration: 4000,

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
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-white overflow-x-hidden">
      <div className="flex flex-col justify-start items-center">
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
            <label className=" text-gray-800" htmlFor="username">
              Username
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              defaultValue={formData.username}
              className="w-72 h-10 bg-gray-100 rounded-lg py-1 px-3 text-lg text-black outline-none focus:ring-2"
              type="text"
              name="Username"
              placeholder="Username"
              id="username"
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
              defaultValue={formData.password}
              className="w-72 h-10 bg-gray-100 rounded-lg py-1 px-3 text-lg text-black outline-none focus:ring-2"
              type="password"
              name="Password"
              placeholder="Password"
              id="password"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Link
              className="hover:underline text-gray-800"
              href={"/forgot-password"}
            >
              Forgot password
            </Link>
            <button
              data-umami-event="Signin Email button"
              type="submit"
              onClick={() => login(formData)}
              className="bg-black border-2 border-black text-white rounded-lg py-1 px-3 font-medium text-lg "
            >
              Login
            </button>
            <button
              data-umami-event="Signin Google button"
              onClick={() => loginGoogle()}
              type="button"
              className="border-black border-2 text-black rounded-lg py-1 px-3 font-medium text-lg "
            >
              Login With Google
            </button>
          </div>
          <div className="h-[1px] bg-black w-full flex flex-row justify-center mt-4">
            <span className="text-black font-medium bg-white -translate-y-2.5 w-fit h-fit px-2">
              or
            </span>
          </div>
          <div className="w-full flex flex-row justify-center">
            <Link
              href={"/register"}
              className="text-lg text-gray-800 hover:underline w-fit"
            >
              create a new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
