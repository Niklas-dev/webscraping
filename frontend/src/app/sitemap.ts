import { getAllPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

// Define the Post type (adjust properties based on your actual post structure)
type Post = {
  slug: string;
  date: string;
  // Add other properties as needed
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const siteUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://fastlaunchapi.dev";

  const blogPosts = posts.map((post: Post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogPosts,
  ];
}
