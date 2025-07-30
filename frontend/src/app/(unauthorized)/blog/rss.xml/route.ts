import { getAllPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

// Define the Post type (adjust properties based on your actual post structure)
type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  // Add other properties as needed
};

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yoursite.com";

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Your Site Name Blog</title>
    <description>Latest blog posts from Your Site Name</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post: Post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
