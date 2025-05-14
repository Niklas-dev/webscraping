"use client";

import { useEffect, useRef } from "react";

export default function BlurBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Create gradient blobs with TrendPilot colors
    const blobs = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.2,
        radius: 300,
        color: "rgba(255, 206, 86, 0.15)",
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.3,
        radius: 250,
        color: "rgba(255, 159, 64, 0.15)",
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.7,
        radius: 350,
        color: "rgba(255, 99, 132, 0.1)",
      },
    ];

    // Draw blobs
    const drawBlobs = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob) => {
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );

        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    drawBlobs();

    // Animate blobs very subtly
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.001;

      blobs.forEach((blob, index) => {
        blob.x += Math.sin(time + index) * 0.2;
        blob.y += Math.cos(time + index) * 0.2;
      });

      drawBlobs();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  );
}
