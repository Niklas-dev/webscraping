"use client";
import { useState, useEffect, useRef } from "react";

export default function FadeInWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing after triggering
        }
      },
      {
        threshold: 0.01, // Similar to the threshold in the original code
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect(); // Cleanup on component unmount
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`h-fit w-fit hidden-object ${inView && "show-object"}`}
    >
      {children}
    </div>
  );
}
