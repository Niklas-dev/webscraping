import { NextResponse } from "next/server";

export function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://fastlaunchapi.dev";

  const robotsTxt = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/blog/rss.xml

# Block AI crawlers (optional)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
