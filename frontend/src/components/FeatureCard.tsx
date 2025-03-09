import React, { ReactElement } from "react";
import Image from "next/image";

export default function FeatureCard({
  headline,
  text,
  imageSrc,
}: {
  headline: ReactElement;
  text: string;
  imageSrc: string;
}) {
  return (
    <div className="flex flex-row-reverse flex-wrap md:flex-nowrap items-center justify-center gap-8 bg-gray-50 p-8 md:p-16 rounded-2xl shadow-inner">
      <div className="flex flex-col">
        <h3 className="text-2xl md:text-3xl font-bold">{headline}</h3>
        <p className="text-lg md:text-xl md:w-96 text-gray-600 ">{text}</p>
      </div>
      <Image
        priority
        className="rounded-2xl shadow-sm  w-2/3 min-w-60"
        src={imageSrc}
        alt="Trendpilot"
        width={1200}
        height={1200}
      />
    </div>
  );
}
