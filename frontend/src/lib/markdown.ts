import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown (tables, task lists, strikethrough)
import rehypeRaw from "rehype-raw"; // To parse raw HTML embedded directly in markdown
import rehypeCodeTitles from "rehype-code-titles"; // To add titles to code blocks (e.g., \`\`\`js title="My Code")
import rehypeExternalLinks from "rehype-external-links"; // To automatically add target="_blank" and rel="noopener noreferrer" to external links

// Define the BlogPost interface as it's used in your page.tsx
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
  readingTime: number;
  content: string; // Markdown content
}

/**
 * Converts markdown string to HTML with syntax highlighting for code blocks.
 * @param markdown The markdown string to convert.
 * @returns A promise that resolves to the HTML string.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    // Parse markdown into an AST (Abstract Syntax Tree)
    .use(remarkParse)
    // Add support for GitHub Flavored Markdown (tables, task lists, strikethrough)
    .use(remarkGfm)
    // Convert the markdown AST to an HTML AST.
    // allowDangerousHtml: true is crucial here if you have raw HTML blocks in your markdown
    // that you want rehype-raw to process later.
    .use(remarkRehype, { allowDangerousHtml: true })
    // Parse raw HTML nodes (from remarkRehype) into the HTML AST,
    // allowing other rehype plugins to process them.
    .use(rehypeRaw)
    // Add IDs to headings (e.g., <h2 id="my-heading">)
    .use(rehypeSlug)
    // Wrap headings with an anchor link to their ID
    .use(rehypeAutolinkHeadings, {})
    // Add titles to code blocks. This plugin should run before rehypeHighlight.
    // It looks for `title="My Title"` after the language specifier.
    .use(rehypeCodeTitles)
    // Apply syntax highlighting to code blocks
    .use(rehypeHighlight, {
      detect: true, // Attempt to auto-detect language if not specified
      ignoreMissing: true, // Don't throw errors for unknown languages
    })
    // Add target="_blank" and rel="noopener noreferrer" to all external links
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    // Convert the HTML AST back to an HTML string.
    // allowDangerousHtml: true is needed here if the HTML AST contains potentially dangerous HTML
    // that you explicitly want to render.
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}

// Extract headings for table of contents
export function extractHeadings(markdown: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({
      level,
      text,
      slug,
    });
  }

  return headings;
}
