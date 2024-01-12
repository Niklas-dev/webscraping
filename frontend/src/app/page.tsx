import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="w-screen h-screen relative bg-[#070707]">
      <div className="absolute w-full h-96 blur-[135px] flex justify-center -top-10 gap-2 opacity-90">
        <div className="w-40 h-40 bg-red-600"></div>
        <div className="w-40 h-40 bg-orange-600"></div>
        <div className="w-40 h-40 bg-yellow-400"></div>
        <div className="w-40 h-40 bg-green-600"></div>
        <div className="w-40 h-40 bg-blue-700"></div>
        <div className="w-40 h-40 bg-indigo-700"></div>
      </div>
      <NavBar />
    </div>
  );
}
