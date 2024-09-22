import NavBar from "@/components/NavBar";
import { InfoGrid } from "@/components/InfoGrid";

import { Spotlight } from "@/components/ui/Spotlight";
import dynamic from "next/dynamic";
import ActionButton from "@/components/ActionButton";
import RatingInfo from "@/components/RatingInfo";
import Image from "next/image";
import { FaArrowDown, FaStar } from "react-icons/fa";
import BlurColors from "@/components/BlurColors";
import ContentImageInfo from "@/components/ContentImageInfo";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import FadeInWrapper from "@/components/FadeInWrapper";

const BoxesClient = dynamic(
  () => import("../components/ui/BackgroundBoxes"),
  {}
);
export default function Home() {
  return (
    <div className="w-full h-screen relative bg-white bg-grid-white/[0.05] overflow-x-hidden overflow-y-scroll">
      <NavBar />
      <div className="h-fit">
        <div className="h-fit w-full rounded-md flex md:items-center md:justify-center mt-10 md:mt-20">
          <Spotlight
            className="-top-0 left-0 sm:-top-24 sm:-left-10 md:-left-18 md:-top-4 lg:left-[18%] lg:-top-12 absolute"
            fill="yellow"
          />

          <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-4 md:pt-0">
            <div className="w-fit mx-auto pb-8 ">
              <div className="bg-white border  border-gray-200 rounded-full py-1 px-8 text-sm md:text-lg text-gray-600 flex items-center justify-center space-x-3">
                <div className="animate-spin mb-1 flex justify-center items-center">
                  <FaStar className="w-4 h-4  text-gray-500 fill-gray-500" />
                </div>
                <div className="flex items-center justify-center">
                  <span className="font-semibold text-gray-800">400+</span>
                  <span className="ml-1">created posts</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div>
                  <span className="font-semibold text-gray-800 text-">
                    1mil+
                  </span>
                  <span className="ml-1">people reached</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div>
                  <span className="font-semibold text-gray-800">5/5</span>
                  <span className="ml-1">customer rating</span>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-600 to-gray-900  ">
              Unique ideas, <br /> never came that fast.
            </h1>
            <p className="mt-4 font-normal text-xl md:text-2xl text-gray-800 max-w-lg text-center mx-auto">
              Empower your social media strategy with our powerful content
              ideas. Instantly generate multiple trending content ideas
              effortlessly.
            </p>
            <div className="flex flex-row justify-center pt-6">
              <ActionButton className="w-32 h-12" />
            </div>
          </div>
        </div>
      </div>
      <ContentImageInfo />
      <RatingInfo />

      <div
        id="examples"
        className="mt-20 md:mt-48 flex flex-col items-center gap-4 px-4 overflow-x-hidden h-fit pb-40"
      >
        <h3 className="text-xl md:text-2xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-gray-600 to-gray-900  font-bold text-center">
          One App, all big social media platforms, <br /> every niche and
          awesome ideas.
        </h3>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-2xl">
          Generate niched down ideas for you social media account in seconds.
        </p>
        <div className="flex flex-row items-center gap-10">
          <Image
            priority
            src={"/instagram.svg"}
            alt="instagram"
            width={70}
            height={70}
          />
          <Image
            priority
            src={"/tiktok.png"}
            alt="instagram"
            width={100}
            height={100}
          />
          <Image
            priority
            src={"/youtube.png"}
            alt="instagram"
            width={150}
            height={150}
          />
        </div>
      </div>
      <div
        id="examples"
        className="mt-12 flex flex-col items-center gap-4 px-4 overflow-x-hidden h-fit pb-40"
      >
        <h3 className="text-xl md:text-2xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-gray-600 to-gray-900  font-bold text-center">
          Everything you need <br /> for the next brilliant idea.
        </h3>

        <div className="flex flex-col items-center  gap-4 mt-8 overflow-hidden">
          <FadeInWrapper>
            <FeatureCard
              headline="Unblock bottlenecks <br /> with scheduling queues."
              text="Remove delays and decrease your time-to-offer with fast schedule
                queuing — making life easier for your recruiters and
                coordinators."
              imageSrc="/showcase1.png"
            />
          </FadeInWrapper>

          <FadeInWrapper>
            <Image
              src={"/connect-arr1.svg"}
              alt="instagram"
              width={30}
              height={30}
            />
          </FadeInWrapper>
          <FadeInWrapper>
            <FeatureCard
              headline="Unblock bottlenecks <br /> with scheduling queues."
              text="Remove delays and decrease your time-to-offer with fast schedule
                queuing — making life easier for your recruiters and
                coordinators."
              imageSrc="/showcase1.png"
            />
          </FadeInWrapper>
          <FadeInWrapper>
            <Image
              src={"/connect-arr2.svg"}
              alt="instagram"
              width={30}
              height={30}
            />
          </FadeInWrapper>

          <FadeInWrapper>
            <FeatureCard
              headline="Unblock bottlenecks <br /> with scheduling queues."
              text="Remove delays and decrease your time-to-offer with fast schedule
                queuing — making life easier for your recruiters and
                coordinators."
              imageSrc="/showcase1.png"
            />
          </FadeInWrapper>
        </div>
      </div>
      <Footer />
    </div>
  );
}
