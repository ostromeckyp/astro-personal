import type { MetadataRoute } from "next";
import { localePath } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

const ROUTES: { path: string; changeFrequency: "monthly" | "weekly" | "yearly"; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/use-cases", changeFrequency: "monthly", priority: 0.9 },
  { path: "/use-cases/salon-replenishment", changeFrequency: "monthly", priority: 0.8 },
  { path: "/use-cases/no-code-forms", changeFrequency: "monthly", priority: 0.8 },
  { path: "/approach", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/talks", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
];

const url = (path: string) => `${SITE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ROUTES.flatMap(({ path, changeFrequency, priority }) => {
    const alternates = { languages: { en: url(path), pl: url(localePath("pl", path)) } };
    return [
      { url: url(path), changeFrequency, priority, alternates },
      { url: url(localePath("pl", path)), changeFrequency, priority, alternates },
    ];
  });

  // Post text is English only, so the English URL is the one to index.
  const posts = getAllPosts().map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
