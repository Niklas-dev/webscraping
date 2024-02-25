"use client";
import Image from "next/image";
import ActionButton from "../ActionButton";
import { Spotlight } from "../ui/Spotlight";
import Link from "next/link";
import { InfoGrid } from "../InfoGrid";

import { useRef } from "react";

export default function MainSection() {
  return (
    <div className="h-screen overflow-y-scroll overflow-x-hidden">
      <div className="h-screen">
        <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-x-hidden pt-40 md:pt-80">
          <Spotlight
            className="-top-0 left-0 sm:-top-24 sm:-left-10 md:-left-18 md:-top-4 lg:left-[18%] lg:-top-16"
            fill="white"
          />
          <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Unique ideas, <br /> never came that easy.
            </h1>
            <p className="mt-4 font-normal text-lg text-neutral-300 max-w-lg text-center mx-auto">
              Empower your social media strategy with our powerful content
              ideas. Instantly generate multiple trending content ideas
              effortlessly, streamlining your content creation process like
              never before.
            </p>
          </div>
        </div>
      </div>
      <div className="pb-96 ">
        <InfoGrid />
      </div>
    </div>
  );
}
