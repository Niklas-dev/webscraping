import React from "react";
import Image from "next/image";

export default function SocialMedia() {
  return (
    <div
      id="socialmedia"
      className="mt-20 md:mt-48 flex flex-col items-center gap-4 px-4 overflow-x-hidden h-fit"
    >
      <h3 className="text-2xl md:text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-gray-600 to-gray-900  font-bold text-center">
        One App, all big social media platforms,{" "}
        <br className="hidden md:flex" /> every niche and awesome ideas.
      </h3>
      <p className="text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-2xl">
        Generate niched down ideas for you social media account in seconds.
      </p>
      <div className="flex flex-row items-center gap-10">
        <Image
          className="h-10 w-10 md:h-16 md:w-16 object-contain"
          priority
          src={"/instagram.svg"}
          alt="instagram"
          width={100}
          height={100}
        />
        <Image
          className="h-14 w-14 md:h-20 md:w-20 object-contain"
          priority
          src={"/tiktok.png"}
          alt="instagram"
          width={100}
          height={100}
        />
        <Image
          className="h-16 w-16 md:h-20 md:w-20 object-contain"
          priority
          src={"/youtube.png"}
          alt="instagram"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
