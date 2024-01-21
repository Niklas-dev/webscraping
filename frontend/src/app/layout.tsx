import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

const league = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrendPilot | Growth",
  description: "Grow your social brand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={league.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
