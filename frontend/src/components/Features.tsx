import FadeInWrapper from "./FadeInWrapper";
import FeatureCard from "./FeatureCard";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div id="features" className="absolute -translate-y-24"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Powerful Features
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-gray-600 to-gray-900 font-bold">
            Everything you need <br /> for content creation success
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            TrendPilot gives you all the tools you need to generate, organize,
            and plan your content ideas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">
              AI-Powered Idea Generation
            </h4>
            <p className="text-gray-600 mb-4">
              Generate viral-worthy content ideas with a single click based on
              your niche and audience preferences.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Trending topic analysis
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Niche-specific ideas
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Engagement-optimized suggestions
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">
              Idea Collection Dashboard
            </h4>
            <p className="text-gray-600 mb-4">
              Organize and manage all your content ideas in one place with our
              intuitive dashboard.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Categorize by platform
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Tag and filter ideas
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Save favorites for later
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">
              Content Calendar Planning
            </h4>
            <p className="text-gray-600 mb-4">
              Plan your content schedule with our visual calendar to maintain
              consistency.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Drag-and-drop planning
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Keep track of planned ideas
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Optimal posting time suggestions
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">Multi-Platform Support</h4>
            <p className="text-gray-600 mb-4">
              Generate ideas optimized for each social media platform&apos;s
              unique audience.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Instagram, TikTok, YouTube
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Platform-specific formats
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Cross-platform content adaptation
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">Customization Options</h4>
            <p className="text-gray-600 mb-4">
              Tailor the idea generation to match your unique brand voice and
              style.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Brand voice settings
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Content type preferences
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Audience targeting options
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 space-y-2">
          <FadeInWrapper>
            <FeatureCard
              headline={
                <p>
                  Viral and awesome ideas <br /> just a click away.
                </p>
              }
              text="Generate your next viral ideas just with a button click and the niche of your choice. Our platform will do the rest for you."
              imageSrc="/showcase1.png"
            />
          </FadeInWrapper>

          <FadeInWrapper>
            <div className="flex justify-center">
              <Image
                src={"/connect-arr1.svg"}
                alt="connection arrow"
                width={30}
                height={30}
              />
            </div>
          </FadeInWrapper>

          <FadeInWrapper>
            <FeatureCard
              headline={
                <p>
                  Never forget any idea ever
                  <br /> again.
                </p>
              }
              text="Create a big collection of trending and viral ideas. Manage all of them in one place and never forget any of them again."
              imageSrc="/ideas.png"
            />
          </FadeInWrapper>

          <FadeInWrapper>
            <div className="flex justify-center">
              <Image
                src={"/connect-arr2.svg"}
                alt="connection arrow"
                width={30}
                height={30}
              />
            </div>
          </FadeInWrapper>

          <FadeInWrapper>
            <FeatureCard
              headline={
                <p>
                  Plan your content <br /> with our amazing roadmap.
                </p>
              }
              text="Never lose track of your newly created and awesome ideas. Plan your schedules and next steps with the TrendPilot roadmap."
              imageSrc="/roadmap.png"
            />
          </FadeInWrapper>
        </div>
      </div>
    </section>
  );
}
