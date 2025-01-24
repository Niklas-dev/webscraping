import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import OPENGRAPHIMAGE from "../../public/opengraph-image.png";
const league = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrendPilot | Find content ideas with ease",
  description:
    "Empower your social media strategy with our powerful content ideas. Instantly generate multiple trending content ideas effortlessly.",
  keywords:
    "trendpilot, content ideas, social media strategy, trending content, content generator",
  metadataBase: new URL("https://trendpilot.pro"),
  openGraph: {
    images: [
      {
        url: OPENGRAPHIMAGE.src,
        width: OPENGRAPHIMAGE.width,
        height: OPENGRAPHIMAGE.height,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: OPENGRAPHIMAGE.src,
        width: OPENGRAPHIMAGE.width,
        height: OPENGRAPHIMAGE.height,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={league.className}>
        <Toaster />
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
