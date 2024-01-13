import Image from "next/image";
export default function HowDoes() {
  return (
    <div className="w-full h-fit flex flex-col items-center text-white mt-20">
      <h3 className="text-4xl font-bold">How does it work?</h3>
      <div className="flex flex-row  justify-center w-full gap-40 mt-12 ">
        <div className="flex flex-col gap-6">
          <div className="text-2xl ">We find the newest and hottest trends</div>
          <Image
            className="h-56"
            src="/finding-content.svg"
            width={300}
            height={300}
            alt="Follow us on Twitter"
          />
          <p className="text-xl mt-2 w-96 ">
            Our search engine will scrape Instagram and TikTok for the hottest
            trends just for you. We find top performing content, which is suited
            for you brand, person or whatsoever you need. Exactly that you need
            to grow your awesome socials.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-2xl">You get perfect content for your brand</div>
          <Image
            className="h-56"
            src="/finding-ideas.svg"
            width={300}
            height={300}
            alt="Follow us on Twitter"
          />
          <p className="text-xl mt-2  w-96 ">
            Our idea production system will work on creating content ideas and
            ship them directly to you. No need to spend hours researching, whats
            loved by the users. We also help to find booming headlines and
            hashtags thats will compliment yours already awesome posts.
          </p>
        </div>
      </div>
      <p className="text-xl mt-8 w-96 text-center">test</p>
    </div>
  );
}
