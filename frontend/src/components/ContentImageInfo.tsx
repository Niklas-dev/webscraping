"use client";
import { useState } from "react";
import Image from "next/image";

export default function ContentImageInfo() {
  const [selectedImage, setSelectedImage] = useState("/showcase1.png");
  return (
    <div className="w-full bg-[#fffdf7]">
      <div className="w-full flex flex-col items-center mt-10">
        <div className="px-4 w-full max-w-6xl mx-auto">
          <Image
            priority
            className="rounded-t-2xl mt-16 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] object-cover w-full"
            src={"/showcase1.png"}
            alt="Trendpilot"
            width={1200}
            height={800}
          />
        </div>
      </div>
      <div className="w-full h-20 bg-[#fffdf7] -translate-y-2 z-10 shadow-[0px_-1px_2px_rgba(0,0,0,0.05)]"></div>
    </div>
  );
}
