import { FaArrowRight } from "react-icons/fa";

export default function page() {
  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold">
        Get started with your next awesome post <sup>✨</sup>
      </h2>
      <div className=" flex flex-row flex-wrap gap-8 pt-4">
        <div className="h-96 w-[30rem] bg-gradient-to-tr from-[#3c1053] to-[#ad5389] rounded-xl flex flex-col justify-end p-8 drop-shadow-2xl">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-white font-bold text-2xl">
              Awesome <br /> Instagram Reel
            </h3>
            <FaArrowRight size={25} color="white" />
          </div>
        </div>
        <div className="h-96 w-[30rem] bg-gradient-to-tr from-[#89216B] to-[#DA4453] rounded-xl flex flex-col justify-end p-8">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-white font-bold text-2xl">
              Stunning <br /> TikTok
            </h3>
            <FaArrowRight size={25} color="white" />
          </div>
        </div>
        <div className="h-96 w-[30rem] bg-gradient-to-tr from-[#FF416C] to-[#FF4B2B] rounded-xl flex flex-col justify-end p-8">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-white font-bold text-2xl">
              Breathtaking <br /> Youtube Short
            </h3>
            <FaArrowRight size={25} color="white" />
          </div>
        </div>
        <div className="h-96 w-[30rem] bg-gradient-to-tr from-[#373B44] to-[#4286f4] rounded-xl flex flex-col justify-end p-8">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-white font-bold text-2xl">
              Awesome <br /> Youtube Video
            </h3>
            <FaArrowRight size={25} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
