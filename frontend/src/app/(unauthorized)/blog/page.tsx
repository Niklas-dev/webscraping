import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  User,
  ArrowRight,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Users,
  Star,
  Zap,
  Play,
  Instagram,
  Youtube,
  Hash,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { type BlogPost, getAllPosts } from "@/lib/blog";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "TrendPilot Blog - Content Creation Insights & Social Media Tips",
  description:
    "Discover the latest content creation strategies, social media trends, viral content tips, and platform-specific insights. Learn how to grow your audience and create engaging content with TrendPilot.",
  keywords: [
    "content creation",
    "social media",
    "viral content",
    "Instagram",
    "TikTok",
    "YouTube",
    "content strategy",
    "influencer marketing",
    "social media growth",
  ],
  openGraph: {
    title: "TrendPilot Blog",
    description:
      "Discover the latest content creation strategies, social media trends, and viral content tips from TrendPilot.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://trendpilot.pro"}/blog`,
    siteName: "TrendPilot",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TrendPilot Blog Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendPilot Blog",
    description:
      "Discover the latest content creation strategies, social media trends, and viral content tips from TrendPilot.",
    creator: "@TrendPilot",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TrendPilot Blog Twitter Image",
      },
    ],
  },
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_BASE_URL || "https://trendpilot.pro"
    }/blog`,
    types: {
      "application/rss+xml": [
        { url: "/blog/rss.xml", title: "TrendPilot Blog RSS Feed" },
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function BlogPage() {
  const posts: BlogPost[] = await getAllPosts();
  const siteUrl: string =
    process.env.NEXT_PUBLIC_BASE_URL || "https://trendpilot.pro";

  // JSON-LD for Blog page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "TrendPilot Blog",
    description:
      "Content creation insights, social media trends, and viral content strategies",
    url: `${siteUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "TrendPilot",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        {/* Main Header */}
        <NavBar />

        <div className="container mx-auto px-6 py-20 md:py-24">
          {/* Hero Section - Left Aligned */}
          <header className="mb-20 md:mb-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium border border-yellow-200">
                <Lightbulb className="h-4 w-4" />✨ New AI-Powered Content Ideas
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="text-gray-900">Content Creator</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  Knowledge Hub
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
                Never run out of{" "}
                <span className="font-semibold text-yellow-600">
                  viral content ideas
                </span>{" "}
                again. Learn the latest strategies, trends, and tips to grow
                your audience across all social platforms.
              </p>

              {/* Social Platform Icons */}
              <div className="flex items-center justify-start gap-6 mb-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                  <Instagram className="h-6 w-6" />
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-black text-white">
                  <Hash className="h-6 w-6" />
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-600 text-white">
                  <Youtube className="h-6 w-6" />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-start mb-16">
                <Link href="/#pricing" className="hover:opacity-90">
                  <Button
                    size="lg"
                    className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 font-semibold shadow-lg"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Start Creating Ideas
                  </Button>
                </Link>
                <Link href="/#demo" className="hover:opacity-90">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50 px-8 py-3 font-semibold bg-transparent"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
                <div className="p-6 rounded-md bg-white/80 backdrop-blur-sm border border-yellow-200 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">
                      250+
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Created posts</p>
                </div>
                <div className="p-6 rounded-md bg-white/80 backdrop-blur-sm border border-yellow-200 shadow-sm">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">
                      5k+
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">People reached</p>
                </div>
                <div className="p-6 rounded-md bg-white/80 backdrop-blur-sm border border-yellow-200 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">
                      4.9/5
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Customer rating</p>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Topics */}
          <section className="mb-20 md:mb-24">
            <div className="max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                What You&apos;ll Learn
              </h2>
              <p className="text-lg text-gray-600 mb-10 max-w-2xl">
                Master the art of content creation with our comprehensive guides
                covering every aspect of social media success
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Viral Content", color: "from-pink-500 to-rose-500" },
                  {
                    name: "Instagram Growth",
                    color: "from-purple-500 to-indigo-500",
                  },
                  { name: "TikTok Trends", color: "from-blue-500 to-cyan-500" },
                  {
                    name: "YouTube Strategy",
                    color: "from-red-500 to-pink-500",
                  },
                  {
                    name: "Content Planning",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    name: "Audience Building",
                    color: "from-yellow-500 to-orange-500",
                  },
                  { name: "Analytics", color: "from-indigo-500 to-purple-500" },
                  {
                    name: "Monetization",
                    color: "from-emerald-500 to-teal-500",
                  },
                ].map((topic) => (
                  <Badge
                    key={topic.name}
                    variant="outline"
                    className="px-4 py-3 rounded-md text-sm font-medium border-2 border-gray-200 hover:border-yellow-300 transition-colors bg-white/50 backdrop-blur-sm"
                  >
                    {topic.name}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts */}
          <section>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                  Latest Articles
                </h2>
                <p className="text-lg text-gray-600">
                  Stay ahead of the curve with the latest content creation
                  strategies and social media insights
                </p>
              </div>
              {posts.length > 6 && (
                <Button
                  variant="outline"
                  className="rounded-full mt-4 sm:mt-0 border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                >
                  View All Posts
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>

            {posts.length === 0 ? (
              <div className="max-w-2xl">
                <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-yellow-200 shadow-sm">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-yellow-100 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Amazing Content Coming Soon!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We&apos;re crafting viral content strategies, trending topic
                    insights, and platform-specific tips to help you dominate
                    social media. Check back soon for game-changing content
                    creation guides.
                  </p>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Get started with TrendPilot while you wait:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-start">
                      <Link href="/">
                        <Button className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white">
                          <Zap className="h-4 w-4 mr-2" />
                          Try TrendPilot
                        </Button>
                      </Link>
                      <Link href="/features">
                        <Button
                          variant="outline"
                          className="rounded-full border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Explore Features
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <Card className="h-full border-2 border-gray-200 hover:border-yellow-300 hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col bg-white/80 backdrop-blur-sm">
                        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                          <img
                            src={`/api/og?width=400&height=200&title=${encodeURIComponent(
                              post.title || "Blog Post"
                            )}`}
                            alt={`Placeholder image for ${post.title}`}
                            width={400}
                            height={200}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <CardHeader className="pb-4 flex-grow">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 font-medium rounded-full border border-yellow-200"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge
                                variant="secondary"
                                className="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 font-medium rounded-full border border-yellow-200"
                              >
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="line-clamp-2 text-xl font-semibold mb-2 group-hover:text-yellow-600 transition-colors text-gray-900">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3 text-sm text-gray-600 leading-relaxed">
                            {post.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 px-6 pb-6">
                          {/* Meta Information */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <User className="h-3.5 w-3.5" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{post.readingTime} min read</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                              <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <CalendarDays className="h-3.5 w-3.5" />
                                <time dateTime={post.date}>
                                  {new Date(post.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </time>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-yellow-600 group-hover:text-yellow-700 transition-colors font-medium">
                                <span>Read more</span>
                                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Footer */}
          <footer className="mt-20 md:mt-24 pt-12 border-t border-yellow-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-4 flex items-center text-gray-900">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                  TrendPilot
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The ultimate content engine for all your social platforms.
                  Create viral-worthy, ultra-targeted content ideas in just 60
                  seconds.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/features"
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reviews"
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      Reviews
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="mailto:support@trendpilot.pro"
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-yellow-200 text-left">
              <p className="text-sm text-gray-600">
                {
                  "© 2024 TrendPilot. All rights reserved. Built with ❤️ for content creators."
                }
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
