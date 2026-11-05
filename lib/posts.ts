import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Element, Root } from "hast";
import { toString as hastToString } from "hast-util-to-string";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { ThemeRegistrationRaw } from "shiki";
import { unified } from "unified";
import { isExternalUrl } from "./external-link";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

export type PostCategory = "Artificial Intelligence" | "Angular";

export interface PostSummary {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  category: PostCategory;
  label: string;
  slug: string;
  readingMinutes: number;
}

export interface TocItem {
  id: string;
  text: string;
}

export interface Post extends PostSummary {
  contentHtml: string;
  toc: TocItem[];
}

/** Colors from the Article board's code figure. */
const CODE_TOKENS = [
  { settings: { foreground: "#E4E4E8" } },
  { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#5B5B66" } },
  {
    scope: ["keyword", "storage", "storage.type", "storage.modifier", "constant.language", "variable.language"],
    settings: { foreground: "#FF6AB0" },
  },
  { scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: "#9AD1FF" } },
];

// Shiki reads `settings`; rehype-pretty-code only recognises a custom theme by `tokenColors`.
const CODE_THEME: ThemeRegistrationRaw = {
  name: "spotlight",
  type: "dark",
  colors: { "editor.foreground": "#E4E4E8", "editor.background": "#00000000" },
  settings: CODE_TOKENS,
  tokenColors: CODE_TOKENS,
};

/** Parses a `YYYY-MM-DD` date to a timestamp. Throws so a typo fails the build instead of sorting wrongly. */
export function parsePostDate(value: string): number {
  const time = /^\d{4}-\d{2}-\d{2}$/.test(value) ? Date.parse(`${value}T00:00:00Z`) : Number.NaN;
  if (Number.isNaN(time)) throw new Error(`Invalid post date: "${value}"`);
  return time;
}

function collectToc(toc: TocItem[]) {
  return (tree: Root) => {
    for (const node of tree.children) {
      if (node.type !== "element" || node.tagName !== "h2") continue;
      const heading = node as Element;
      toc.push({ id: String(heading.properties.id), text: hastToString(heading) });
    }
  };
}

function openExternalLinksInNewTab() {
  const visit = (node: Root | Element) => {
    for (const child of node.children) {
      if (child.type !== "element") continue;
      const href = child.properties.href;
      if (child.tagName === "a" && typeof href === "string" && isExternalUrl(href)) {
        child.properties.target = "_blank";
        child.properties.rel = ["noreferrer"];
      }
      visit(child);
    }
  };
  return visit;
}

export async function renderMarkdown(md: string): Promise<{ html: string; toc: TocItem[] }> {
  const toc: TocItem[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(openExternalLinksInNewTab)
    .use(rehypeSlug)
    .use(() => collectToc(toc))
    .use(rehypePrettyCode, { theme: CODE_THEME, keepBackground: false })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return { html: String(file), toc };
}

function readPostFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
      const words = content.trim().split(/\s+/).length;
      const summary: PostSummary = {
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        image: data.image,
        imageAlt: data.imageAlt,
        imagePosition: data.imagePosition,
        category: data.category,
        label: data.label,
        slug: data.slug ?? file.replace(/\.md$/, ""),
        readingMinutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
      };
      return { summary, content };
    });
}

export function getAllPosts(): PostSummary[] {
  return readPostFiles()
    .map((p) => p.summary)
    .sort((a, b) => parsePostDate(b.date) - parsePostDate(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const found = readPostFiles().find((p) => p.summary.slug === slug);
  if (!found) return null;
  const { html, toc } = await renderMarkdown(found.content);
  return { ...found.summary, contentHtml: html, toc };
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
