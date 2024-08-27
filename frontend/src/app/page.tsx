import NavBar from "@/components/NavBar";
import { InfoGrid } from "@/components/InfoGrid";

import { Spotlight } from "@/components/ui/Spotlight";
import dynamic from "next/dynamic";
import ActionButton from "@/components/ActionButton";
import RatingInfo from "@/components/RatingInfo";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import BlurColors from "@/components/BlurColors";

const BoxesClient = dynamic(
  () => import("../components/ui/BackgroundBoxes"),
  {}
);
export default function Home() {
  return (
    <div className="w-full h-screen relative bg-black bg-grid-white/[0.05] overflow-x-hidden overflow-y-scroll">
      <NavBar />
      <div className="h-fit">
        <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center  relative  pt-40 md:pt-60">
          <Spotlight
            className="-top-0 left-0 sm:-top-24 sm:-left-10 md:-left-18 md:-top-4 lg:left-[18%] lg:-top-12"
            fill="white"
          />
          <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
            <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 ">
              Unique ideas, <br /> never came that fast.
            </h1>
            <p className="mt-4 font-normal text-xl md:text-2xl text-neutral-300 max-w-lg text-center mx-auto">
              Empower your social media strategy with our powerful content
              ideas. Instantly generate multiple trending content ideas
              effortlessly, streamlining your content creation process like
              never before.
            </p>
            <div className="flex flex-row justify-center pt-8">
              <ActionButton className="w-28 h-11" />
            </div>
          </div>
        </div>
      </div>

      <RatingInfo />

      <div
        id="examples"
        className="mt-20 md:mt-48 flex flex-col items-center gap-4 px-4 overflow-x-hidden h-fit pb-40"
      >
        <h3 className="text-xl md:text-2xl lg:text-4xl text-white font-bold text-center">
          One Platform, every niche <br /> Create unique post ideas on demand.
        </h3>
        <p className="text-base md:text-lg lg:text-xl text-white font-medium text-center max-w-2xl">
          In whatever niche your content fits, TrendPilot will help you to
          generate viral and unique social media post ideas that will suit your
          requirements.
        </p>
        <InfoGrid />
      </div>

      <div id="features" className="px-4 h-fit mt-56">
        <div className=" mt-20 h-fit md:mt-4 flex flex-col gap-4  overflow-x-hidden bg-transparent   ">
          <div className="relative overflow-hidden h-72  bg-[#070707] rounded-[20px] xl:rounded-[40px]">
            <div className="absolute w-full h-full flex justify-center items-center pointer-events-none">
              <h3 className="text-2xl md:text-3xl lg:text-5xl text-white font-bold text-center z-10">
                With awesome features <br /> that you will instantly love.
              </h3>
            </div>

            <BoxesClient />
          </div>
          <div className="h-fit mt-20 flex flex-col gap-8">
            <div className="flex flex-col items-center gap-20 px-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl md:text-2xl lg:text-4xl text-white font-medium text-center z-10">
                  An perfect interface to create your next idea
                </h3>
                <Image
                  className="rounded-xl -skew-x-6 hover:skew-x-0 transition-all duration-400 cursor-pointer"
                  src={"/showcase2.png"}
                  alt="show"
                  width={1000}
                  height={1000}
                />
              </div>
              <FaArrowDown size={"40px"} color="white" />
              <div className="flex flex-col gap-4">
                <h3 className="text-xl md:text-2xl lg:text-4xl text-white font-medium text-center z-10 ">
                  Fast and easy to understand
                </h3>
                <Image
                  className="rounded-xl skew-x-6 hover:skew-x-0 transition-all duration-400 cursor-pointer"
                  src={"/showcase1.png"}
                  alt="show"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
            <div className="mt-20 flex flex-col items-center gap-8">
              <h3 className="text-2xl md:text-3xl lg:text-5xl text-white font-bold text-center z-10">
                Use Cases
              </h3>

              <div className="flex flex-wrap w-full xl:w-[56rem]">
                <div className="w-full md:w-1/2 h-96 p-4 ">
                  <div className="bg-[#0e0e0e] h-full rounded-xl p-4 flex flex-col hover:ring-4 ring-white transition-all">
                    <div className="border-2 rounded-full  w-10 h-10 flex justify-center items-center ">
                      <p className="text-center text-xl text-white font-medium translate-y-0.5">
                        1
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-grow -translate-y-2">
                      <div className="text-white text-xl text-center font-bold">
                        &quot;Niched down idea creation for your accounts.
                        Create awesome ideas from simple thoughts.&quot;
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 h-96 p-4 ">
                  <div className="bg-[#0e0e0e] h-full rounded-xl p-4 flex flex-col hover:ring-4 ring-white transition-all">
                    <div className="border-2 rounded-full  w-10 h-10 flex justify-center items-center ">
                      <p className="text-center text-xl text-white font-medium translate-y-0.5">
                        1
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-grow -translate-y-2">
                      <div className="text-white text-xl text-center font-bold">
                        &quot;Create complete ideas from nothing, or just from a
                        niche. Fast and reliable.&quot;
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-96 p-4 ">
                  <div className="bg-[#0e0e0e] h-full rounded-xl p-4 flex flex-col hover:ring-4 ring-white transition-all">
                    <div className="border-2 rounded-full  w-10 h-10 flex justify-center items-center ">
                      <p className="text-center text-xl text-white font-medium translate-y-0.5">
                        1
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-grow -translate-y-2">
                      <div className="text-white text-xl text-center font-bold">
                        &quot; Find trends to base your own ideas on and be up
                        to date with everything.&quot;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
