import NavBar from "@/components/NavBar";
import BlurColors from "@/components/BlurColors";

import MainSection from "@/components/landing/MainSection";

export default function Home() {
  return (
    <div className="w-screen relative bg-black bg-grid-white/[0.05] overflow-y-scroll overflow-x-hidden">
      <NavBar />
      <MainSection />
    </div>
  );
}
