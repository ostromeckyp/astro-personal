import type { MetadataRoute } from "next";
import { localePath } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

/**
 * When each page's copy last changed in substance (`YYYY-MM-DD`). Bump it with the copy, not on every deploy:
 * search engines stop trusting lastmod that changes without the page changing.
 */
const COPY_UPDATED = "2026-11-25";

const ROUTES: { path: string; changeFrequency: "monthly" | "weekly" | "yearly"; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/use-cases", changeFrequency: "monthly", priority: 0.9 },
  { path: "/use-cases/salon-replenishment", changeFrequency: "monthly", priority: 0.8 },
  { path: "/use-cases/no-code-forms", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/talks", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
];

// The root without a trailing slash, as in the page's canonical.
const url = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts();
  const newestPost = allPosts.map((p) => p.updated ?? p.date).sort().at(-1);
  const pages = ROUTES.flatMap(({ path, changeFrequency, priority }) => {
    const alternates = { languages: { en: url(path), pl: url(localePath("pl", path)), "x-default": url(path) } };
    // The blog index and the home page (which shows the latest post) change when a post does.
    const dates = [COPY_UPDATED, ...(path === "/blog" || path === "/" ? [newestPost ?? COPY_UPDATED] : [])];
    const lastModified = new Date(dates.sort().at(-1)!);
    return [
      { url: url(path), lastModified, changeFrequency, priority, alternates },
      { url: url(localePath("pl", path)), lastModified, changeFrequency, priority, alternates },
    ];
  });

  // Post text is English only, so the English URL is the one to index.
  const posts = allPosts.map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
