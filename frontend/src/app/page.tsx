import NavBar from "@/components/NavBar";
import BlurColors from "@/components/BlurColors";

import MainSection from "@/components/landing/MainSection";

export default function Home() {
  return (
    <div className="h-screen w-screen relative   bg-black overflow-y-scroll overflow-x-hidden">
      <div className="w-screen h-screen ">
        <NavBar />
        <MainSection />
      </div>
    </div>
  );
}
