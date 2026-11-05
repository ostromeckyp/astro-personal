import type { Metadata } from "next";
import { DEFAULT_LOCALE, localePath, type Locale } from "./i18n";
import { OG_DEFAULT, OG_DEFAULT_ALT, SITE_NAME } from "./site";

type PageMetadata = {
  lang?: Locale;
  title: string | { absolute: string };
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  article?: { publishedTime: string };
  /** The text exists only in English, so the English URL is the canonical one. */
  englishOnly?: boolean;
};

/** Next replaces a parent's `openGraph` wholesale, so every route states the full object. */
export function pageMetadata({ lang = DEFAULT_LOCALE, title, description, path, image, imageAlt, article, englishOnly }: PageMetadata): Metadata {
  const url = localePath(lang, path);
  return {
    title,
    description,
    alternates: {
      canonical: englishOnly ? path : url,
      types: { "application/rss+xml": "/feed.xml" },
      ...(englishOnly ? {} : { languages: { en: path, pl: localePath("pl", path), "x-default": path } }),
    },
    openGraph: {
      siteName: SITE_NAME,
      url,
      locale: lang === "pl" ? "pl_PL" : "en_US",
      title: typeof title === "string" ? title : title.absolute,
      description,
      images: [{ url: image ?? OG_DEFAULT, alt: imageAlt ?? (image ? "" : OG_DEFAULT_ALT) }],
      ...(article ? { type: "article", publishedTime: article.publishedTime } : { type: "website" }),
    },
  };
}
