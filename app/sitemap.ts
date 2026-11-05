import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/use-cases`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/use-cases/salon-replenishment`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/use-cases/no-code-forms`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/approach`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/talks`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];

  const posts = getAllPosts().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts];
}
