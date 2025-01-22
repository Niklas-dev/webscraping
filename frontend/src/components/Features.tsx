import React from "react";
import FadeInWrapper from "./FadeInWrapper";
import FeatureCard from "./FeatureCard";
import Image from "next/image";

export default function Features() {
  return (
    <div className="mt-24 md:mt-64 flex flex-col items-center gap-4 px-4 overflow-x-hidden h-fit pb-40">
      <div id="features" className="absolute -translate-y-64"></div>
      <h3 className="text-2xl md:text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-gray-600 to-gray-900  font-bold text-center">
        Everything you need <br /> for the next brilliant idea.
      </h3>

      <div className="flex flex-col items-center  gap-4 mt-8 overflow-hidden px-4">
        <FadeInWrapper>
          <FeatureCard
            headline={
              <p>
                Viral and awesome ideas <br /> just a click away.
              </p>
            }
            text="Generate your next viral ideas just with a button click and the niche of your choice. Our platform will do the rest for you."
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
            headline={
              <p>
                Never forget any idea ever
                <br /> again.
              </p>
            }
            text="Create a big colletion of trending and viral ideas. Manage all of them in on place and never forget any of them again."
            imageSrc="/ideas.png"
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
            headline={
              <p>
                Plan your content <br /> with our amazing roadmap.
              </p>
            }
            text="Never loose track of your newly created and awesome ideas. Plan your schedules and next steps with the TrendPilot roadmap."
            imageSrc="/roadmap.png"
          />
        </FadeInWrapper>
      </div>
    </div>
  );
}
