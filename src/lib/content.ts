import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { MDXFrontmatter } from "@/types/content";
import type { TOCHeading } from "@/components/layout/TOC";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PageContent {
  frontmatter: MDXFrontmatter;
  source: string;
  headings: TOCHeading[];
}

export function getPageContent(
  domain: string,
  topic: string,
  section: string
): PageContent | null {
  const topicDir = path.join(CONTENT_DIR, domain, topic);

  let filePath: string | null = null;

  // Try exact match first: "overview.mdx"
  const exact = path.join(topicDir, `${section}.mdx`);
  if (fs.existsSync(exact)) {
    filePath = exact;
  } else {
    // Try numbered prefix: "01-overview.mdx"
    try {
      const files = fs.readdirSync(topicDir);
      const match = files.find(
        (f) => f.endsWith(".mdx") && f.replace(/^\d+-/, "").replace(/\.mdx$/, "") === section
      );
      if (match) filePath = path.join(topicDir, match);
    } catch {
      return null;
    }
  }

  if (!filePath) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      frontmatter: data as MDXFrontmatter,
      source: content,
      headings: extractHeadings(content),
    };
  } catch {
    return null;
  }
}

function extractHeadings(source: string): TOCHeading[] {
  const headings: TOCHeading[] = [];
  for (const line of source.split("\n")) {
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    const text = m[2].trim().replace(/`[^`]+`/g, (s) => s.slice(1, -1));
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    headings.push({ id, text, depth });
  }
  return headings;
}
