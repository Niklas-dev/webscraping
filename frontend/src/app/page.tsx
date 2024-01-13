import NavBar from "./components/NavBar";
import MainSection from "./components/landing/MainSection";
import BlurColors from "./components/landing/BlurColors";
import WhatDoes from "./components/landing/WhatDoes";
import HowDoes from "./components/landing/HowDoes";

export default function Home() {
  return (
    <div className="h-screen w-screen relative selection:bg-orange-500  bg-gradient-to-b from-[#111111] to-black overflow-y-scroll overflow-x-hidden">
      <div className="w-screen h-screen ">
        <BlurColors />
        <NavBar />

        <MainSection />
      </div>
      <WhatDoes />
      <HowDoes />
    </div>
  );
}
