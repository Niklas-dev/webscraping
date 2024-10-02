import NavBar from "@/components/NavBar";
import { Spotlight } from "@/components/ui/Spotlight";
import ActionButton from "@/components/ActionButton";
import RatingInfo from "@/components/RatingInfo";
import { FaStar } from "react-icons/fa";
import ContentImageInfo from "@/components/ContentImageInfo";
import Footer from "@/components/Footer";
import SocialMedia from "@/components/SocialMedia";
import Features from "@/components/Features";

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
              <div className="bg-white border  border-gray-200 rounded-full py-1 px-4 sm:px-8 text-sm md:text-lg text-gray-600 flex items-center justify-center space-x-3">
                <div className="animate-spin mb-1 flex justify-center items-center">
                  <FaStar className="w-4 h-4  text-gray-500 fill-gray-500" />
                </div>
                <div className="items-center justify-center hidden md:flex">
                  <span className="font-semibold text-gray-800">400+</span>
                  <span className="ml-1">created posts</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full hidden md:flex"></div>
                <div className="items-center justify-center hidden md:flex">
                  <span className="font-semibold text-gray-800 ">1mil+</span>
                  <span className="ml-1 text-nowrap">people reached</span>
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
      <SocialMedia />
      <Features />
      <Footer />
    </div>
  );
}
