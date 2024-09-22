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
    <div className="flex flex-row-reverse flex-wrap items-center gap-8 bg-gray-50 p-16 rounded-2xl shadow-inner">
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold">
          Unblock bottlenecks <br /> with scheduling queues.
        </h3>
        <p className="text-xl w-96 text-gray-600">
          Remove delays and decrease your time-to-offer with fast schedule
          queuing — making life easier for your recruiters and coordinators.
        </p>
      </div>
      <Image
        className="rounded-2xl shadow-sm"
        src={"/showcase1.png"}
        alt="Trendpilot"
        width={600}
        height={600}
      />
    </div>
  );
}
