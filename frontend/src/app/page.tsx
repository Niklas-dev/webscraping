import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-gradient-to-b from-[#111111] to-black overflow-y-scroll overflow-x-hidden">
      <div className="w-screen h-screen ">
        <div className="absolute w-full h-96 blur-[135px] flex justify-center -top-10 gap-2 ">
          <div className="w-44 h-44 bg-red-600 rounded-full"></div>
          <div className="w-44 h-44 bg-orange-600 rounded-full"></div>
          <div className="w-44 h-44 bg-yellow-400 rounded-full"></div>
          <div className="w-44 h-44 bg-green-600 rounded-full"></div>
          <div className="w-44 h-44 bg-blue-700 rounded-full"></div>
          <div className="w-44 h-44 bg-indigo-600 rounded-full"></div>
        </div>
        <NavBar />

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
                src="/arrow.svg"
                width={200}
                height={200}
                alt="Follow us on Twitter"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col items-center text-white mt-20 pb-96">
        <h3 className="text-4xl font-bold">What are we doing?</h3>
        <div className="flex flex-col items-center w-full mt-32 ">
          <h4 className="text-5xl font-bold cursor-pointer">
            Solving your probably biggest{" "}
            <span className="bg-gradient-to-r from-pink-500 to-pink-600 p-0.5">
              problem
            </span>
            .
          </h4>
          <h4 className="text-3xl font-light">
            Finding and creating the right content.
          </h4>
        </div>
        <p className="text-3xl mt-8 w-[36rem] text-center">
          &quot;TrendPilot is a one-in-all platfrom for findings ideas and
          creating content, which comply with modern social media.&quot; <br />{" "}
          - Niklas-dev
        </p>
      </div>
      <div className="w-full h-fit flex flex-col items-center text-white mt-20">
        <h3 className="text-4xl font-bold">How does it work?</h3>
        <div className="flex flex-row  justify-center w-full gap-40 mt-12 ">
          <div className="flex flex-col gap-6">
            <div className="text-2xl ">
              We find the newest and hottest trends
            </div>
            <Image
              className="h-56"
              src="/finding-content.svg"
              width={300}
              height={300}
              alt="Follow us on Twitter"
            />
            <p className="text-xl mt-2 w-96 ">
              Our search engine will scrape Instagram and TikTok for the hottest
              trends just for you. We find top performing content, which is
              suited for you brand, person or whatsoever you need. Exactly that
              you need to grow your awesome socials.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-2xl">
              You get perfect content for your brand
            </div>
            <Image
              className="h-56"
              src="/finding-ideas.svg"
              width={300}
              height={300}
              alt="Follow us on Twitter"
            />
            <p className="text-xl mt-2  w-96 ">
              Our idea production system will work on creating content ideas and
              ship them directly to you. No need to spend hours researching,
              whats loved by the users. We also help to find booming headlines
              and hashtags thats will compliment yours already awesome posts.
            </p>
          </div>
        </div>
        <p className="text-xl mt-8 w-96 text-center">test</p>
      </div>
    </div>
  );
}
