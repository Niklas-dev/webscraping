import React from "react";
import Image from "next/image";

export default function FeatureCard({
  headline,
  text,
  imageSrc,
}: {
  headline: string;
  text: string;
  imageSrc: string;
}) {
  return (
    <div className="flex flex-row-reverse flex-wrap md:flex-nowrap items-center justify-center gap-8 bg-gray-50 p-8 md:p-16 rounded-2xl shadow-inner">
      <div className="flex flex-col">
        <h3 className="text-2xl md:text-3xl font-bold">
          Unblock bottlenecks <br /> with scheduling queues.
        </h3>
        <p className="text-lg md:text-xl md:w-96 text-gray-600 ">
          Remove delays and decrease your time-to-offer with fast schedule
          queuing — making life easier for your recruiters and coordinators.
        </p>
      </div>
      <Image
        className="rounded-2xl shadow-sm  w-2/3 min-w-60"
        src={"/showcase1.png"}
        alt="Trendpilot"
        width={600}
        height={600}
      />
    </div>
  );
}
