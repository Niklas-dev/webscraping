"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ContentImageInfo() {
  const [selectedImage, setSelectedImage] = useState("/showcase1.png");
  return (
    <div>
      <div className=" w-full flex flex-col items-center mt-10">
        <div className="flex flex-row  gap-4 z-10">
          <button
            onClick={() => setSelectedImage("/showcase1.png")}
            className={`${
              selectedImage === "/showcase1.png"
                ? "bg-gradient-to-b from-gray-800 to-gray-900  text-white"
                : "hover:bg-gray-100"
            } rounded-full px-4 py-2 text-lg font-medium transition-colors`}
          >
            Idea Creation
          </button>
          <button
            onClick={() => setSelectedImage("/showcase2.png")}
            className={`${
              selectedImage === "/showcase2.png"
                ? "bg-gradient-to-b from-gray-800 to-gray-900  text-white"
                : "hover:bg-gray-100"
            } rounded-full px-4 py-2 text-lg font-medium transition-colors`}
          >
            Dashboard
          </button>
          <button
            className={`${
              selectedImage === "/showcase3.png"
                ? "bg-gradient-to-b from-gray-800 to-gray-900  text-white"
                : "hover:bg-gray-100"
            } rounded-full px-4 py-2 text-lg font-medium transition-colors`}
          >
            Ideas
          </button>
          <button
            className={`${
              selectedImage === "/showcase4.png"
                ? "bg-gradient-to-b from-gray-800 to-gray-900  text-white"
                : "hover:bg-gray-100"
            } rounded-full px-4 py-2 text-lg font-medium transition-colors`}
          >
            Platforms
          </button>
        </div>

        <div className="px-4">
          <Image
            priority
            className="rounded-t-2xl   mt-16 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] object-cover"
            src={selectedImage}
            alt="Trendpilot"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <div className="w-full h-20 bg-white -translate-y-2 z-10 shadow-[0px_-1px_2px_rgba(0,0,0,0.05)]"></div>
    </div>
  );
}
