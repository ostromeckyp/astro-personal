import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

export interface PostSummary extends PostFrontmatter {
  slug: string;
}

export interface Post extends PostSummary {
  contentHtml: string;
}

function readPostFile(filePath: string): { data: PostFrontmatter; content: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return { data: parsed.data as PostFrontmatter, content: parsed.content };
}

export function getAllPosts(): PostSummary[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const { data } = readPostFile(path.join(POSTS_DIR, file));
    const slug = data.slug ?? file.replace(/\.(md|mdx)$/, "");
    return { ...data, slug } satisfies PostSummary;
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function markdownToHtml(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return String(file);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!fs.existsSync(POSTS_DIR)) return null;
  const files = fs.readdirSync(POSTS_DIR);
  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
    const { data, content } = readPostFile(path.join(POSTS_DIR, file));
    const fileSlug = data.slug ?? file.replace(/\.(md|mdx)$/, "");
    if (fileSlug === slug) {
      const contentHtml = await markdownToHtml(content);
      return { ...data, slug: fileSlug, contentHtml };
    }
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
