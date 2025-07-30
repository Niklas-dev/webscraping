import type React from "react";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Blog Post";
  const description = searchParams.get("description") || "";

  const SubtleDot = ({ style }: { style: React.CSSProperties }) => (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        backgroundColor: "#FFD700", // Golden yellow
        opacity: 0.08, // Very subtle opacity
        ...style,
      }}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column", // Changed to column to center content vertically
          justifyContent: "center",
          alignItems: "center", // Center horizontally
          background: "linear-gradient(180deg, #FFFFFF 0%, #FDFDFD 100%)", // Very subtle white gradient
          fontFamily: "sans-serif",
          color: "#1F2937", // Dark gray for text
          overflow: "hidden",
          padding: "60px 80px", // Add padding to the main container
        }}
      >
        {/* Subtle dots in background */}
        <SubtleDot style={{ width: 10, height: 10, top: 50, left: 100 }} />
        <SubtleDot style={{ width: 8, height: 8, top: 180, left: 250 }} />
        <SubtleDot style={{ width: 12, height: 12, top: 300, left: 600 }} />
        <SubtleDot style={{ width: 9, height: 9, top: 100, left: 900 }} />
        <SubtleDot style={{ width: 7, height: 7, top: 450, left: 1100 }} />
        <SubtleDot style={{ width: 11, height: 11, top: 500, left: 200 }} />
        <SubtleDot style={{ width: 14, height: 14, top: 150, left: 400 }} />
        <SubtleDot style={{ width: 6, height: 6, top: 350, left: 800 }} />
        <SubtleDot style={{ width: 10, height: 10, top: 280, left: 100 }} />
        <SubtleDot style={{ width: 8, height: 8, top: 400, left: 500 }} />

        {/* Main content block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start", // Align content to the left
            width: "100%",
            maxWidth: "1000px",
            position: "relative",
            textAlign: "left", // Ensure text aligns left
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              marginBottom: "16px", // Reduced margin
              lineHeight: "1.2",
              color: "#1F2937", // Dark gray for title
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: "28px",
                color: "#4B5563", // Medium gray for description
                lineHeight: "1.4",
                marginBottom: "32px", // Reduced margin
              }}
            >
              {description}
            </p>
          )}
          <div
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#F59E0B", // Orange for branding
              letterSpacing: "0.5px",
            }}
          >
            TrendPilot | trendpilot.pro
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
