import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const league = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrendPilot | Find content ideas with ease",
  description:
    "Empower your social media strategy with our powerful content ideas. Instantly generate multiple trending content ideas effortlessly.",
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
