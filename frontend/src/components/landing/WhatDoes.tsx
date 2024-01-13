export default function WhatDoes() {
  return (
    <div className="w-full h-fit flex flex-col items-center text-white mt-20 pb-96">
      <h3 className="text-4xl font-bold">What are we doing?</h3>
      <div className="flex flex-col items-center w-full mt-32 ">
        <h4 className="text-5xl font-bold cursor-pointer">
          Solving your probably biggest{" "}
          <span className="bg-gradient-to-r from-pink-500 to-pink-600 p-0.5">
            problem
          </span>
          .
        </h4>
        <h4 className="text-3xl font-light">
          Finding and creating the right content.
        </h4>
      </div>
      <p className="text-3xl mt-8 w-[36rem] text-center">
        &quot;TrendPilot is a one-in-all platfrom for findings ideas and
        creating content, which comply with modern social media.&quot; <br /> -
        Niklas-dev
      </p>
    </div>
  );
}
