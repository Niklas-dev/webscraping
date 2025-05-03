"use client";

export default function ContentImageInfo() {
  return (
    <div className="w-full bg-[#fffdf7]">
      <div className="w-full flex flex-col items-center mt-10">
        <div className="px-4 w-full max-w-6xl mx-auto">
          <div className="rounded-2xl mt-16 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] overflow-hidden w-full bg-white">
            {/* Container with padding to create space for the iframe */}
            <div className="relative w-full pb-[56.25%]">
              {/* YouTube iframe with your specific video ID */}
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/GXSygTFxUu0?rel=0&modestbranding=1&color=white&iv_load_policy=3"
                title="TrendPilot Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* Increased height to ensure no overflow is visible */}
      <div className="w-full h-24 bg-[#fffdf7] -translate-y-2 z-10 shadow-[0px_-1px_2px_rgba(0,0,0,0.05)]"></div>
    </div>
  );
}
