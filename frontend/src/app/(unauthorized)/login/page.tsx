import BlurColors from "@/components/BlurColors";

export default function page() {
  return (
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-gradient-to-b from-[#111111] to-black overflow-y-scroll overflow-x-hidden">
      <div className="w-screen h-screen flex justify-center items-center">
        <BlurColors />
        <form action="" className="flex flex-col gap-4">
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
        </form>
      </div>
    </div>
  );
}
