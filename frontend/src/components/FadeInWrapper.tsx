"use client";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface FadeInWrapperProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeInWrapper({
  children,
  delay = 0,
  duration = 500,
  className = "",
}: FadeInWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Wait for the specified delay before showing the element
          setTimeout(() => {
            setIsVisible(true);
          }, delay);

          // Once it's visible, we don't need to observe it anymore
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        // Element is considered visible when 10% of it is in the viewport
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDuration: `${duration}ms`,
        transitionProperty: "opacity, transform",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
