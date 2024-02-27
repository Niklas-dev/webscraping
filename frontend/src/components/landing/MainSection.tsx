"use client";
import { Spotlight } from "../ui/Spotlight";
import { InfoGrid } from "../InfoGrid";
import Typewriter from "typewriter-effect";
import { Boxes } from "../ui/BackgroundBoxes";
import NavBar from "../NavBar";
export default function MainSection() {
  return (
    <div className="h-screen w-screen ">
      <div className="h-fit lg:h-screen">
        <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center  relative  pt-40 md:pt-80">
          <Spotlight
            className="-top-0 left-0 sm:-top-24 sm:-left-10 md:-left-18 md:-top-4 lg:left-[18%] lg:-top-16"
            fill="white"
          />
          <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 ">
              Unique ideas, <br /> never came that fast.
            </h1>
            <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg text-center mx-auto">
              Empower your social media strategy with our powerful content
              ideas. Instantly generate multiple trending content ideas
              effortlessly, streamlining your content creation process like
              never before.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-4 flex flex-col gap-4 px-4 overflow-x-hidden h-fit pb-40">
        <h3 className="text-xl md:text-2xl lg:text-4xl text-white font-bold text-center">
          One Platform, every niche <br /> Create unique post ideas on demand.
        </h3>
        <InfoGrid />
      </div>

      <div className="px-20 h-fit mt-56">
        <div className=" mt-20 h-96 md:mt-4 flex flex-col gap-4 px-4 overflow-x-hidden bg-[#070707] bg-grid-small-white/[0.2] rounded-t-[120px] ">
          <div className="relative overflow-hidden h-72">
            <div className="absolute w-full h-full flex justify-center items-center">
              <h3 className="text-xl md:text-2xl lg:text-4xl text-white font-bold text-center z-10">
                With awesome features <br /> that you will instantly love.
              </h3>
            </div>

            <Boxes />
          </div>
        </div>
      </div>
    </div>
  );
}
