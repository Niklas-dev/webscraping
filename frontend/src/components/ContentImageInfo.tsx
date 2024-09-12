"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ContentImageInfo() {
  const [selectedImage, setSelectedImage] = useState("/showcase1.png");
  return (
    <div>
      <div className=" w-full flex flex-col items-center mt-10">
        <div className="flex flex-row  gap-4">
          <div
            onClick={() => setSelectedImage("/showcase1.png")}
            className="bg-gradient-to-b from-gray-800 to-gray-900  text-white rounded-full px-4 py-2 text-lg font-medium"
          >
            Idea Creation
          </div>
          <div className="  text-black rounded-full px-4 py-2 text-lg font-medium">
            Dashboard
          </div>
          <div className=" text-black rounded-full px-4 py-2 text-lg font-medium">
            Ideas
          </div>
          <div className=" text-black rounded-full px-4 py-2 text-lg font-medium">
            Platforms
          </div>
        </div>
        <Image
          className="rounded-t-2xl mt-16 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
          src={selectedImage}
          alt="Trendpilot"
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-full h-20 bg-white -translate-y-2 z-10 shadow-[0px_-1px_2px_rgba(0,0,0,0.05)]"></div>
    </div>
  );
}
