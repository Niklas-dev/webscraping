import BlurColors from "@/components/BlurColors";
import Link from "next/link";

export default function page() {
  return (
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-gradient-to-b from-[#111111] to-black overflow-x-hidden">
      <div className="flex flex-col justify-start items-center">
        <BlurColors />
        <form
          action={`${process.env.NEXT_PUBLIC_BACKEND}/auth/google`}
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
              className="w-72 h-10 bg-[#222222] rounded-lg py-1 px-3 text-lg"
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
              className="w-72 h-10 bg-[#222222] rounded-lg py-1 px-3 text-lg"
              type="text"
              name="Password"
              placeholder="Password"
              id="password"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              type="button"
              className="bg-white rounded-lg py-1 px-3 font-medium text-lg "
            >
              Login
            </button>
            <button
              type="submit"
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
