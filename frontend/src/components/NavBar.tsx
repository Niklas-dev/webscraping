"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { Button } from "@/components/ui/button";
import { Menu, X, Lightbulb } from "lucide-react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // Get current pathname

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to determine if a link is active
  const isActive = (path: string) => {
    if (path === "/blog") {
      return pathname.startsWith("/blog");
    }
    // For other links, check if the path matches exactly or if it's the root and pathname is root
    return pathname === path || (path === "/" && pathname === "/");
  };

  return (
    <header
      className={`w-full h-16 md:h-20 border-b ${
        scrolled
          ? "border-gray-200 bg-white/95"
          : "border-transparent bg-transparent"
      } backdrop-blur-md fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-yellow-400 rounded-full p-1.5">
            <Lightbulb className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-xl text-gray-900">TrendPilot</span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className={`font-medium transition-colors ${
              isActive("/#features")
                ? "text-yellow-600 underline"
                : "text-gray-800 hover:text-black"
            }`}
          >
            Features
          </Link>
          <Link
            href="/#reviews"
            className={`font-medium transition-colors ${
              isActive("/#reviews")
                ? "text-yellow-600 underline"
                : "text-gray-800 hover:text-black"
            }`}
          >
            Reviews
          </Link>
          <Link
            href="/#pricing"
            className={`font-medium transition-colors ${
              isActive("/#pricing")
                ? "text-yellow-600 underline"
                : "text-gray-800 hover:text-black"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/#faq"
            className={`font-medium transition-colors ${
              isActive("/#faq")
                ? "text-yellow-600 underline"
                : "text-gray-800 hover:text-black"
            }`}
          >
            FAQ
          </Link>
          <Link
            href="/blog"
            className={`font-medium transition-colors ${
              isActive("/blog")
                ? "text-yellow-600 underline"
                : "text-gray-800 hover:text-black"
            }`}
          >
            Blog
          </Link>
        </nav>
        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-gray-800 hover:text-black font-medium transition-colors"
          >
            Log in
          </Link>
          <Link
            href={"/register"}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium px-6 py-2 rounded-md text-lg"
          >
            Get Started
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full z-50">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="#features"
              className={`font-medium py-2 transition-colors ${
                isActive("/#features")
                  ? "text-yellow-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#reviews"
              className={`font-medium py-2 transition-colors ${
                isActive("/#reviews")
                  ? "text-yellow-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Reviews
            </Link>
            <Link
              href="#pricing"
              className={`font-medium py-2 transition-colors ${
                isActive("/#pricing")
                  ? "text-yellow-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className={`font-medium py-2 transition-colors ${
                isActive("/#faq")
                  ? "text-yellow-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/blog"
              className={`font-medium py-2 transition-colors ${
                isActive("/blog")
                  ? "text-yellow-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Button
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
