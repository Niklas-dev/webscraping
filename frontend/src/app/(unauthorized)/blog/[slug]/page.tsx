import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, ArrowLeft, Lightbulb } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { JSX } from "react";
import { getAllPosts, type BlogPost, getPostBySlug } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import NavBar from "@/components/NavBar";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPosts();
  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://trendpilot.pro"; // Updated URL
  return {
    title: `${post.title} | TrendPilot Blog`, // Updated title format
    description: post.description,
    authors: [{ name: post.author }],
    keywords: [
      ...post.tags,
      "content creation",
      "social media",
      "viral content",
      "marketing",
    ].join(", "), // Updated keywords
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "TrendPilot", // Updated siteName
      locale: "en_US",
      images: [
        {
          url: `${siteUrl}/api/og?title=${encodeURIComponent(
            post.title
          )}&description=${encodeURIComponent(post.description)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@TrendPilot", // Updated Twitter handle
      images: [
        {
          url: `${siteUrl}/api/og?title=${encodeURIComponent(
            post.title
          )}&description=${encodeURIComponent(post.description)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
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
}

async function getRelatedPosts(
  currentSlug: string,
  tags: string[]
): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts
    .filter((post: BlogPost) => post.slug !== currentSlug)
    .filter((post: BlogPost) =>
      post.tags.some((tag: string) => tags.includes(tag))
    )
    .slice(0, 3);
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  const htmlContent = await markdownToHtml(post.content);
  const relatedPosts = await getRelatedPosts(post.slug, post.tags);
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://trendpilot.pro";

  // Enhanced JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${siteUrl}/about`, // Assuming you have an about page
    },
    publisher: {
      // Added publisher information
      "@type": "Organization",
      name: "TrendPilot",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`, // Assuming you have a logo.png in your public folder
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  };
  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        {/* Main Header */}
        <NavBar />

        <article className="container mx-auto px-4 py-8 max-w-4xl pt-28">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-yellow-600">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-yellow-600">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium line-clamp-1">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-gray-600 hover:text-yellow-600 mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>

          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 font-medium rounded-full border border-yellow-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-gray-900">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              {post.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-yellow-600" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-4 w-4 text-yellow-600" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </header>

          <div
            className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-img:rounded-2xl prose-a:text-yellow-600 prose-a:hover:text-yellow-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-8 border-t border-yellow-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Related Articles
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost: BlogPost) => (
                  <article key={relatedPost.slug}>
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <div className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white/80 backdrop-blur-sm">
                        <h3 className="font-semibold mb-2 line-clamp-2 text-lg text-gray-900 hover:text-yellow-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
                          {relatedPost.description}
                        </p>
                        <div className="flex items-center mt-3 text-xs text-gray-500">
                          <time dateTime={relatedPost.date}>
                            {new Date(relatedPost.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </time>
                          <span className="mx-2">•</span>
                          <span>{relatedPost.readingTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Footer */}
        <footer className="mt-20 md:mt-24 pt-12 border-t border-yellow-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-6">
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
            <div className="pt-8 border-t border-yellow-200 text-left pb-12">
              <p className="text-sm text-gray-600">
                {
                  "© 2024 TrendPilot. All rights reserved. Built with ❤️ for content creators."
                }
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
