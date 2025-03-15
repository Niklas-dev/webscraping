import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-1" /> Start creating today
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Transform your social media presence with TrendPilot
              </h2>

              <p className="text-lg text-gray-300 mb-8">
                Join thousands of content creators who are saving time and
                growing their audience with AI-powered content ideas.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-yellow-500/20 p-2 rounded-full mr-4">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      Never run out of ideas
                    </h3>
                    <p className="text-gray-300">
                      Generate unlimited trending content ideas with one click
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-500/20 p-2 rounded-full mr-4">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      Save hours every week
                    </h3>
                    <p className="text-gray-300">
                      Focus on creating content, not brainstorming ideas
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-500/20 p-2 rounded-full mr-4">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      Grow your audience
                    </h3>
                    <p className="text-gray-300">
                      Create content that resonates and attracts new followers
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href={"/login"}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-fit"
                >
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-sm text-gray-400 mt-3">
                  Sign up for free • Free test phase available
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                <Image
                  src="/showcase1.png"
                  alt="TrendPilot Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              <Link
                href={"/login"}
                className="absolute -bottom-6 -right-6 bg-yellow-500 rounded-full p-4 shadow-lg"
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-50"></div>
                  <span className="relative text-2xl font-bold text-black">
                    Go
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
