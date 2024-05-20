import Link from "next/link";
import { FaArrowRight, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function page() {
  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold">
        Get started with your next awesome post ✨
      </h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2 "></div>
      <div className="flex flex-row flex-wrap gap-8 pt-4 ">
        <Link
          href={"/dashboard/create-post-idea?type=reel"}
          className="mt-2 h-96 w-[30rem] bg-gradient-to-tr from-[#3c1053] to-[#ad5389] rounded-xl flex flex-col justify-end p-8 drop-shadow-2xl relative group/card cursor-pointer hover:shadow-2xl transition-all duration-300"
        >
          <FaInstagram
            className="absolute top-4 left-4 group-hover/card:translate-x-1 group-hover/card:translate-y-1 transition-all"
            color="white"
            size={35}
          />
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-white font-bold text-2xl group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all">
              Awesome <br /> Instagram Reel
            </h3>
            <div className="bg-white px-6 py-2 rounded-full group-hover/card:-translate-x-1 group-hover/card:-translate-y-1 transition-all hover:scale-110">
              <FaArrowRight size={25} color="black" />
            </div>
          </div>
        </Link>
        <Link
          href={"/dashboard/create-post-idea?type=tiktok"}
          className="h-96 w-[30rem] bg-gradient-to-tr from-[#89216B] to-[#DA4453] rounded-xl flex flex-col justify-end p-8 relative group/card cursor-pointer hover:shadow-2xl transition-all duration-300"
        >
          <FaTiktok
            className="absolute top-4 left-4 group-hover/card:translate-x-1 group-hover/card:translate-y-1 transition-all"
            color="white"
            size={35}
          />
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-white font-bold text-2xl group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all">
              Stunning <br /> TikTok
            </h3>
            <div className="bg-white px-6 py-2 rounded-full group-hover/card:-translate-x-1 group-hover/card:-translate-y-1 transition-all hover:scale-110">
              <FaArrowRight size={25} color="black" />
            </div>
          </div>
        </Link>
        <Link
          href={"/dashboard/create-post-idea?type=short"}
          className="h-96 w-[30rem] bg-gradient-to-tr from-[#FF416C] to-[#FF4B2B] rounded-xl flex flex-col justify-end p-8 relative group/card cursor-pointer hover:shadow-2xl transition-all duration-300"
        >
          <FaYoutube
            className="absolute top-4 left-4 group-hover/card:translate-x-1 group-hover/card:translate-y-1 transition-all"
            color="white"
            size={35}
          />
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-white font-bold text-2xl group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all">
              Breathtaking <br /> Youtube Short
            </h3>
            <div className="bg-white px-6 py-2 rounded-full group-hover/card:-translate-x-1 group-hover/card:-translate-y-1 transition-all hover:scale-110">
              <FaArrowRight size={25} color="black" />
            </div>
          </div>
        </Link>
        <Link
          href={"/dashboard/create-post-idea?type=vid"}
          className="h-96 w-[30rem] bg-gradient-to-tr from-[#373B44] to-[#4286f4] rounded-xl flex flex-col justify-end p-8 relative group/card cursor-pointer hover:shadow-2xl transition-all duration-300"
        >
          <FaYoutube
            className="absolute top-4 left-4 group-hover/card:translate-x-1 group-hover/card:translate-y-1 transition-all"
            color="white"
            size={35}
          />
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-white font-bold text-2xl group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all">
              Awesome <br /> Youtube Video
            </h3>
            <div className="bg-white px-6 py-2 rounded-full group-hover/card:-translate-x-1 group-hover/card:-translate-y-1 transition-all hover:scale-110">
              <FaArrowRight size={25} color="black" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
