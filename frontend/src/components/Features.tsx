import {
  CheckCircle,
  Clock,
  BarChart3,
  Users,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SocialMediaFeatures() {
  return (
    <div
      id="features"
      className="mt-20 md:mt-32 lg:mt-40 flex flex-col items-center gap-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden pb-16"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Award className="w-4 h-4 mr-1.5" /> Powerful Features
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-gray-600 to-gray-900 font-bold">
          The Ultimate Content Engine for <br className="hidden md:block" />
          <span className="text-yellow-500">All Your Social Platforms</span>
        </h3>
        <p className="text-base md:text-lg text-gray-600 text-center max-w-2xl mx-auto mt-4">
          Create viral-worthy, ultra-targeted content ideas in just 60 seconds.{" "}
          <span className="font-medium">Save 5+ hours every week</span> and
          never run out of engaging content again.
        </p>
      </div>

      {/* Platform Icons */}
      <div className="flex flex-row items-center justify-center gap-8 sm:gap-10 my-4">
        <div className="flex flex-col items-center">
          <img
            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
            src="/instagram.svg"
            alt="Instagram logo"
          />
        </div>
        <div className="flex flex-col items-center">
          <img
            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
            src="/tiktok.png"
            alt="TikTok logo"
          />
        </div>
        <div className="flex flex-col items-center">
          <img
            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
            src="/youtube.png"
            alt="YouTube logo"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full mt-8">
        {/* Feature 1 */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-yellow-600" />
          </div>
          <h4 className="text-xl font-bold mb-2">AI-Powered Idea Generation</h4>
          <p className="text-gray-600 mb-4">
            <span className="font-medium text-gray-800">
              Stop staring at blank screens.
            </span>{" "}
            Get unlimited viral-worthy content ideas tailored to your exact
            niche with just one click.
          </p>
          <div className="bg-yellow-50 p-3 rounded-lg mb-4 border border-yellow-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">
                Reclaim 5+ hours every week
              </span>
            </div>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Instant trending topic analysis
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Ultra-specific niche targeting
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Engagement-optimized suggestions
              </span>
            </li>
          </ul>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
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
          <h4 className="text-xl font-bold mb-2">Idea Collection Dashboard</h4>
          <p className="text-gray-600 mb-4">
            <span className="font-medium text-gray-800">
              Never lose brilliant ideas again.
            </span>{" "}
            Our intuitive dashboard keeps all your content gems organized and
            ready to deploy.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">
                Boost productivity by 35%
              </span>
            </div>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Smart platform categorization
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Advanced tagging & filtering system
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                One-click favorites for quick access
              </span>
            </li>
          </ul>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
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
          <h4 className="text-xl font-bold mb-2">Content Calendar Planning</h4>
          <p className="text-gray-600 mb-4">
            <span className="font-medium text-gray-800">
              Consistency is king.
            </span>{" "}
            Our visual calendar helps you maintain the perfect posting schedule
            that algorithms love.
          </p>
          <div className="bg-purple-50 p-3 rounded-lg mb-4 border border-purple-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">
                Grow audience 40% faster
              </span>
            </div>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Intuitive drag-and-drop planning
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Visual content pipeline tracking
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                AI-powered optimal posting times
              </span>
            </li>
          </ul>
        </div>

        {/* Feature 4 */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
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
            <span className="font-medium text-gray-800">
              Conquer every platform.
            </span>{" "}
            Create perfectly tailored content for each platform&apos;s unique
            algorithm and audience expectations.
          </p>
          <div className="bg-red-50 p-3 rounded-lg mb-4 border border-red-100">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium">
                Achieve 30% higher engagement
              </span>
            </div>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Instagram, TikTok & YouTube optimized
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Platform-specific format suggestions
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Cross-platform content adaptation
              </span>
            </li>
          </ul>
        </div>

        {/* Feature 5 */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
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
            <span className="font-medium text-gray-800">
              Stand out from the crowd.
            </span>{" "}
            Fine-tune every aspect of your content strategy to perfectly match
            your unique brand voice.
          </p>
          <div className="bg-orange-50 p-3 rounded-lg mb-4 border border-orange-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium">
                Increase brand recognition by 25%
              </span>
            </div>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Advanced brand voice calibration
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Content type preference controls
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Precision audience targeting tools
              </span>
            </li>
          </ul>
        </div>

        {/* Feature 6 - Time Savings Summary */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 sm:p-6 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-300">
          <div className="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-xl font-bold mb-2">Time-Saving Impact</h4>
          <p className="text-gray-700 mb-4">
            <span className="font-medium text-gray-800">
              Transform your workflow today.
            </span>{" "}
            Join thousands of creators who&apos;ve revolutionized their content
            strategy with our platform.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center bg-white p-3 rounded-lg border border-yellow-100">
              <div className="bg-green-100 p-1.5 rounded-full mr-3 flex-shrink-0">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <span className="font-medium">5+ hours saved weekly</span>
                <p className="text-xs text-gray-500">
                  Focus on creating, not brainstorming
                </p>
              </div>
            </li>
            <li className="flex items-center bg-white p-3 rounded-lg border border-yellow-100">
              <div className="bg-blue-100 p-1.5 rounded-full mr-3 flex-shrink-0">
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <span className="font-medium">30% higher engagement</span>
                <p className="text-xs text-gray-500">
                  Get more likes, comments & shares
                </p>
              </div>
            </li>
            <li className="flex items-center bg-white p-3 rounded-lg border border-yellow-100">
              <div className="bg-purple-100 p-1.5 rounded-full mr-3 flex-shrink-0">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <span className="font-medium">40% faster audience growth</span>
                <p className="text-xs text-gray-500">
                  Reach your follower goals sooner
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-3xl mx-auto mt-8 text-center ">
        <Link
          href={"/register"}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium px-10 py-4 rounded-md text-lg"
        >
          Start Creating Ideas Now
        </Link>
        <p className="text-gray-500 mt-6 text-sm">
          🔥 <span className="font-medium">Limited time offer:</span> Get 50%
          off your first month
        </p>
      </div>
    </div>
  );
}
