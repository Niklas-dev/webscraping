import BlurColors from "@/components/BlurColors";

export default function page() {
  return (
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-gradient-to-b from-[#111111] to-black overflow-x-hidden">
      <div className="w-screen h-screen flex justify-center items-center">
        <BlurColors />
        <form action="" className="flex flex-col gap-4  p-12 rounded-xl z-10">
          <h1 className="text-2xl text-white text-center font-bold">
            TrendPilot
          </h1>
          <div className="flex flex-col">
            <label className=" text-white" htmlFor="username">
              Username
            </label>
            <input
              className="w-64 h-10 bg-[#222222] rounded-lg py-1 px-3 text-lg"
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
              className="w-64 h-10 bg-[#222222] rounded-lg py-1 px-3 text-lg"
              type="text"
              name="Password"
              placeholder="Password"
              id="password"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button className="bg-white rounded-lg py-1 px-3 font-medium text-lg ">
              Login
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
          <button className="text-lg text-white hover:underline">
            create a new account
          </button>
        </form>
      </div>
    </div>
  );
}
