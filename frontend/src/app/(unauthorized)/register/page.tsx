import BlurColors from "@/components/BlurColors";
import Link from "next/link";

export default function Page() {
  const register = async () => {
    const response = fetch("", {});
  };
  return (
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-gradient-to-b from-[#111111] to-black overflow-x-hidden">
      <div className="flex flex-col justify-start items-center mt-60">
        <BlurColors />
        <form className="flex flex-col gap-4  p-12 rounded-xl z-10">
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
            <label className=" text-white" htmlFor="email">
              Email
            </label>
            <input
              className="w-72 h-10 bg-[#222222] rounded-lg py-1 px-3 text-lg"
              type="text"
              name="Email"
              placeholder="Email"
              id="email"
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
            <button className="bg-white rounded-lg py-1 px-3 font-medium text-lg ">
              Register
            </button>
            <button className="border-white border-2 text-white rounded-lg py-1 px-3 font-medium text-lg ">
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
              href={"/login"}
              className="text-lg text-white hover:underline w-fit"
            >
              login to existing account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
