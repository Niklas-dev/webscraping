"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sophie T.",
    role: "Small Creator",
    avatar: "/healthy.jpg",
    content:
      "TrendPilot helped me grow my small Instagram channel in almost no time. I had problems with finding ideas but thanks to TrendPilot I don't have to worry about the idea collection anymore.",
    platform: "Instagram",
    stats: "Grew from 500 to 10k followers in 3 months",
  },
  {
    id: 2,
    name: "Alexy M.",
    role: "Influencer",
    avatar:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
    content:
      "Perfect for when you're stuck on what to post! The app offers fresh, trending ideas that have really boosted my engagement on social media. Super easy to use and totally worth it! Really awesome!",
    platform: "TikTok",
    stats: "Increased engagement by 215%",
  },
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="w-full py-20 bg-[#fffdf7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Creators are getting results with TrendPilot
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of content creators who are growing their audience
            with our AI-powered idea generation
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="flex-shrink-0 w-full border-none shadow-lg bg-white"
                >
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                          <Image
                            src={
                              testimonial.platform === "Instagram"
                                ? "/instagram.svg"
                                : testimonial.platform === "TikTok"
                                ? "/tiktok.png"
                                : "/youtube.png"
                            }
                            alt={testimonial.platform}
                            width={20}
                            height={20}
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6 px-4">
                        {`"${testimonial.content}"`}
                      </blockquote>

                      <div className="flex flex-col items-center">
                        <p className="font-bold text-gray-900">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-600">{testimonial.role}</p>
                        <span className="mt-4 inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          {testimonial.stats}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-50 z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-50 z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeIndex === index ? "bg-yellow-400" : "bg-gray-300"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
