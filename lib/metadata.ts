import type { Metadata } from "next";
import { OG_DEFAULT, OG_DEFAULT_ALT, SITE_NAME } from "./site";

type PageMetadata = {
  title: string | { absolute: string };
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  article?: { publishedTime: string };
};

/** Next replaces a parent's `openGraph` wholesale, so every route states the full object. */
export function pageMetadata({ title, description, path, image, imageAlt, article }: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, types: { "application/rss+xml": "/feed.xml" } },
    openGraph: {
      siteName: SITE_NAME,
      url: path,
      title: typeof title === "string" ? title : title.absolute,
      description,
      images: [{ url: image ?? OG_DEFAULT, alt: imageAlt ?? (image ? "" : OG_DEFAULT_ALT) }],
      ...(article ? { type: "article", publishedTime: article.publishedTime } : { type: "website" }),
    },
  };
}
