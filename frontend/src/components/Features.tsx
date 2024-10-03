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
  );
}
