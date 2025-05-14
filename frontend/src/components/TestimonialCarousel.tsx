"use client";
import Image from "next/image";
import { Star, CheckCircle, Clock, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

// Testimonials data with more realistic metrics
const testimonials = [
  {
    id: 1,
    name: "Sophie T.",
    role: "Small Creator",
    avatar: "/healthy.jpg",
    content:
      "TrendPilot helped me grow my small Instagram channel in almost no time. I had problems with finding ideas but thanks to TrendPilot I don't have to worry about the idea collection anymore.",
    platform: "Instagram",
    stats: "Grew from 500 to 3.2k followers in 3 months",
    growth: "540%",
    engagement: "78%",
  },
  {
    id: 2,
    name: "Alexy M.",
    role: "Influencer",
    avatar:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
    content:
      "Perfect for when you're stuck on what to post! The app offers fresh, trending ideas that have really boosted my engagement on social media. Super easy to use and totally worth it!",
    platform: "TikTok",
    stats: "Increased engagement by 85%",
    growth: "120%",
    engagement: "85%",
  },
  {
    id: 3,
    name: "Marcus J.",
    role: "YouTube Creator",
    avatar: "/creator.jpg",
    content:
      "I was spending 5+ hours researching video topics before TrendPilot. Now I get better ideas in minutes, which has allowed me to double my production rate. The predictive trend analysis has helped me create videos that continue to gain views months after posting.",
    platform: "YouTube",
    stats: "Monetized channel in just 2 months",
    growth: "230%",
    engagement: "67%",
  },
  {
    id: 4,
    name: "Priya K.",
    role: "Business Owner",
    avatar: "/business.jpg",
    content:
      "As someone who manages social media for my small business, TrendPilot has been a game-changer. The platform's suggestions have helped me create content that actually converts followers into customers. My ROI on social media marketing has tripled!",
    platform: "Instagram",
    stats: "2x increase in conversion rate",
    growth: "110%",
    engagement: "75%",
  },
  // New testimonials with realistic metrics
  {
    id: 5,
    name: "Emy R.",
    role: "Fitness Coach",
    avatar: "/fitness.jpg",
    content:
      "TrendPilot has transformed how I create content for my fitness audience. The AI suggestions are spot-on for my niche, and I've seen a significant increase in client inquiries since implementing their content strategy.",
    platform: "Instagram",
    stats: "Client inquiries up by 45%",
    growth: "95%",
    engagement: "62%",
  },
  {
    id: 6,
    name: "Mia L.",
    role: "Food Blogger",
    avatar: "/food.jpg",
    content:
      "Coming up with fresh recipe ideas was always my biggest challenge. TrendPilot helps me identify trending food topics before they go mainstream, giving me a competitive edge. My blog traffic has grown steadily since I started using it.",
    platform: "Pinterest",
    stats: "Monthly views increased by 125%",
    growth: "125%",
    engagement: "48%",
  },
  {
    id: 7,
    name: "Jordan T.",
    role: "Tech Reviewer",
    avatar: "/tech.jpg",
    content:
      "As a tech content creator, staying ahead of trends is crucial. TrendPilot's AI helps me identify which product reviews and topics will generate the most interest. My channel growth has been consistent and sustainable.",
    platform: "YouTube",
    stats: "Subscriber growth up 80% month-over-month",
    growth: "80%",
    engagement: "55%",
  },
];

// Key benefits highlighted in the featured testimonial
const keyBenefits = [
  {
    title: "Save Hours of Research Time",
    description: "Get trending content ideas in minutes instead of hours",
    icon: Clock,
  },
  {
    title: "Double Your Content Output",
    description: "Create more high-quality content in less time",
    icon: TrendingUp,
  },
  {
    title: "Increase Engagement & Growth",
    description: "Content that resonates with your audience and algorithms",
    icon: Award,
  },
];

export default function TestimonialSection() {
  // Featured testimonial (Marcus J.)
  const featuredTestimonial =
    testimonials.find((t) => t.id === 3) || testimonials[0];

  // Other testimonials
  const otherTestimonials = testimonials.filter((t) => t.id !== 3);

  // State to track screen size for responsive adjustments
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section id="reviews" className="py-12 md:py-20 bg-white -translate-y-2">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
            Success Stories
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#0f172a] mb-3 md:mb-4">
            Creators are getting results with TrendPilot
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of content creators who are growing their audience
            with our AI-powered idea generation
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex justify-center items-center gap-6 md:gap-12 mb-10 md:mb-16 flex-wrap">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <div>
              <span className="font-bold text-[#0f172a]">4.9/5</span>
              <span className="text-gray-500 ml-1">customer rating</span>
            </div>
          </div>
          <div>
            <span className="font-bold text-yellow-500">250+</span>
            <span className="text-gray-500 ml-1">created posts</span>
          </div>
          <div>
            <span className="font-bold text-yellow-500">5k+</span>
            <span className="text-gray-500 ml-1">people reached</span>
          </div>
        </div>

        {/* Featured testimonial - enhanced for conversion */}
        <div className="mb-10 md:mb-16">
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-6 md:p-10">
                <div className="flex items-start gap-4 mb-5 md:mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={featuredTestimonial.avatar || "/placeholder.svg"}
                        alt={featuredTestimonial.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0f172a]">
                      {featuredTestimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {featuredTestimonial.role}
                    </p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-base md:text-lg text-[#0f172a] mb-5 md:mb-6 leading-relaxed">
                  {featuredTestimonial.content}
                </blockquote>

                {/* Moderately sized featured testimonial stat */}
                <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium mb-5 md:mb-6 inline-block">
                  {featuredTestimonial.stats}
                </div>

                <div className="mb-5 md:mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-gray-600">Growth</div>
                    <div className="font-semibold text-[#0f172a]">
                      {featuredTestimonial.growth}
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>

                {/* Added content to fill the whitespace */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 "></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      Before: 1.2k subscribers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      After: 4k subscribers
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 md:p-10 flex flex-col">
                {/* Key benefits section - new conversion-focused element */}
                <div className="mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-[#0f172a] mb-4">
                    How TrendPilot Helps You Succeed
                  </h3>

                  <div className="space-y-4">
                    {keyBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 text-green-500 flex-shrink-0">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0f172a]">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">
                      Consistency
                    </div>
                    <div className="font-semibold text-[#0f172a]">
                      2x weekly uploads
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Time saved</div>
                    <div className="font-semibold text-[#0f172a]">
                      5+ hours per video
                    </div>
                  </div>
                </div>

                <div className="mt-auto w-full flex flex-col justify-center items-center">
                  <div className="text-center mb-3 text-sm text-gray-500">
                    Cancel anytime
                  </div>
                  <Link
                    href={"/register"}
                    className="bg-gradient-to-r text-center from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all text-black font-medium px-10 py-3 rounded-md text-lg w-full"
                  >
                    Try TrendPilot Free for 14 Days
                  </Link>

                  <div className="text-center mt-3 text-sm text-gray-500">
                    Join 10,000+ creators already using TrendPilot
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional testimonials - now with more influencers and moderately sized stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {otherTestimonials.slice(0, 6).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-[#0f172a]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-sm text-gray-600 mb-4 line-clamp-3">
                {testimonial.content}
              </blockquote>

              {/* Moderately sized stat badges */}
              <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium inline-block">
                {testimonial.stats}
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-10 md:mt-16 bg-amber-50 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#0f172a] text-center md:text-left">
              Ready to grow your audience?
            </h3>
            <p className="text-gray-600 text-center md:text-left">
              Join 10,000+ creators already using TrendPilot
            </p>
          </div>
          <Link
            href={"/pricing"}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium w-full md:w-auto px-6 md:px-8 py-2 md:py-3 rounded-lg text-base md:text-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </section>
  );
}
