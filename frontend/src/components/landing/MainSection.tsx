import Image from "next/image";
export default function MainSection() {
  return (
    <div className="text-white relative flex flex-col items-center justify-center mt-56">
      <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center font-bold">
        <h1 className="">Want to never miss whats trending?</h1>
        <h2 className="text-xl md:text-2xl 2xl:text-3xl ">
          Your social brand agrees.
        </h2>
      </div>
      <div className="mt-8 px-14">
        <p className="text-base md:text-lg xl:text-xl text-center font-medium">
          Be up to date with growing content, ideas, music for your socials.
          <br className="md:block hidden" />
          Grow your social media with content that fits todays trends.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        <button className="mt-2 bg-white text-black rounded-lg w-36 h-14 text-xl font-bold hover:scale-105">
          Get Started
        </button>

        <div className="relative -translate-x-7 mt-2">
          <Image
            priority={true}
            src="/arrow.svg"
            width={200}
            height={200}
            alt="Follow us on Twitter"
          />
        </div>
      </div>
    </div>
  );
}
