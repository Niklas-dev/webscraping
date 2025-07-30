import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: number;
  content: string;
  published: boolean;
}

const postsDirectory = path.join(process.cwd(), "content/blog");

// Memoized function to get all posts
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName: string) => fileName.endsWith(".md"))
    .map((fileName: string) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Calculate reading time (roughly 200 words per minute)
      const wordCount = content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        author: data.author || "Anonymous",
        tags: data.tags || [],
        readingTime,
        content,
        published: data.published !== false,
      } as BlogPost;
    })
    .filter((post: BlogPost) => post.published)
    .sort((a: BlogPost, b: BlogPost) =>
      new Date(a.date) < new Date(b.date) ? 1 : -1
    );

  return allPostsData;
});

// Memoized function to get a single post
export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    try {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      if (data.published === false) {
        return null;
      }

      const wordCount = content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        author: data.author || "Anonymous",
        tags: data.tags || [],
        readingTime,
        content,
        published: data.published !== false,
      };
    } catch (error) {
      console.error(`Error fetching post by slug "${slug}":`, error);
      return null;
    }
  }
);
