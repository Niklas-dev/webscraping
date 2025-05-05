import NavBar from "@/components/NavBar";
import { Spotlight } from "@/components/ui/Spotlight";
import RatingInfo from "@/components/RatingInfo";
import { Star } from "lucide-react";
import ContentImageInfo from "@/components/ContentImageInfo";
import Footer from "@/components/Footer";
import SocialMedia from "@/components/SocialMedia";
import Features from "@/components/Features";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import PricingSection from "@/components/PricingSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#fffdf7] overflow-x-hidden">
      <NavBar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="w-full rounded-md flex md:items-center md:justify-center mt-10 md:mt-20 relative">
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:-left-40 absolute"
            fill="yellow"
          />

          <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-4 md:pt-0">
            {/* Hero Stats Banner */}
            <div className="w-fit mx-auto pb-8">
              <div className="bg-white border border-gray-200 rounded-full py-2 px-4 sm:px-8 text-sm md:text-base text-gray-600 flex items-center justify-center space-x-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-2" />
                  <span className="font-semibold text-gray-800">250+</span>
                  <span className="ml-1">created posts</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div>
                  <span className="font-semibold text-gray-800">5k+</span>
                  <span className="ml-1">people reached</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div>
                  <span className="font-semibold text-gray-800">4.9/5</span>
                  <span className="ml-1">customer rating</span>
                </div>
              </div>
            </div>

            {/* New Badge */}
            <div className="flex justify-center mb-6">
              <Badge
                variant="outline"
                className="bg-yellow-50/50 text-yellow-700 border-yellow-200 px-3 py-1"
              >
                <Sparkles className="w-3 h-3 mr-1" /> New AI-Powered Content
                Ideas
              </Badge>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-gray-900">
              Never run out of <br />
              <span className="text-yellow-500">viral content ideas</span>{" "}
              again.
            </h1>

            {/* Hero Subheadline */}
            <p className="mt-6 text-xl text-gray-600 max-w-2xl text-center mx-auto">
              TrendPilot helps content creators generate{" "}
              <span className="text-gray-900">trending ideas</span> that grow
              your audience and{" "}
              <span className="text-gray-900">save hours</span> of brainstorming
              time.
            </p>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center mt-6 gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1.5 text-green-500" /> Used
                by 50+ creators
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1.5 text-green-500" /> Cancel
                subscription anytime
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <Link
                href={"/login"}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 justify-center"
              >
                Start Creating Ideas <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-8 py-6 text-lg rounded-full"
                >
                  Watch Demo
                </Button>
              </a>
            </div>

            {/* Limited Time Offer */}
            <div className="mt-6 text-center">
              <span className="inline-flex items-center bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-sm font-medium">
                🔥 Limited time: Get 50% off your first month
              </span>
            </div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section className="mt-20">
          <ContentImageInfo />
        </section>

        <TestimonialCarousel />
        <Features />
        <PricingSection />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
