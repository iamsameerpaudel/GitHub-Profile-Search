"use client"
import DisplayInfo from "./components/DisplayInfo";

export default function Home() {
  return (
    <div className="flex justify-center w-full h-screen overflow-auto md:pt-30 bg-[#0c0c0c]" >
      <DisplayInfo />
    </div>
  );
}
