import { describe, expect, it } from "vitest";
import { getAllPosts } from "./posts";
import { META } from "@/content/site/meta";
import { META as META_PL } from "@/content/site/pl/meta";
import { pageMetadata, postTitle, TITLE_BUDGET } from "./metadata";

describe("pageMetadata", () => {
  it("links both languages from either one", () => {
    const pl = pageMetadata({ lang: "pl", title: "T", description: "D", path: "/services" });
    expect(pl.alternates?.canonical).toBe("/pl/services");
    expect(pl.alternates?.languages).toEqual({ en: "/services", pl: "/pl/services", "x-default": "/services" });
    expect(pl.openGraph).toMatchObject({ url: "/pl/services", locale: "pl_PL" });
  });

  it("points an English-only post at its English URL", () => {
    const post = pageMetadata({ lang: "pl", title: "T", description: "D", path: "/blog/x", englishOnly: true });
    expect(post.alternates?.canonical).toBe("/blog/x");
    expect(post.alternates?.languages).toBeUndefined();
  });

  const meta = pageMetadata({ title: "T", description: "D", path: "/services" });

  it("sets a canonical and a feed link", () => {
    expect(meta.alternates?.canonical).toBe("/services");
    expect(meta.alternates?.types).toEqual({ "application/rss+xml": "/feed.xml" });
  });

  it("restates the whole Open Graph object, since a child replaces the parent's", () => {
    expect(meta.openGraph).toMatchObject({ siteName: "Paweł Ostromecki", type: "website", url: "/services", title: "T | Paweł Ostromecki", description: "D" });
    expect(JSON.stringify(meta.openGraph)).toContain("/images/og-default.jpg");
  });

  it("uses a given image and article fields", () => {
    const post = pageMetadata({ title: "P", description: "D", path: "/blog/x", image: "/a.jpg", imageAlt: "A", article: { publishedTime: "2026-08-08" } });
    expect(post.openGraph).toMatchObject({ type: "article", publishedTime: "2026-08-08", images: [{ url: "/a.jpg", alt: "A" }] });
  });

  it("supports an absolute title", () => {
    const home = pageMetadata({ title: { absolute: "Home" }, description: "D", path: "/" });
    expect(home.title).toEqual({ absolute: "Home" });
    expect(home.openGraph).toMatchObject({ title: "Home" });
  });
});

describe("share cards", () => {
  it("describe the default image in the page's language", () => {
    const alt = (lang: "en" | "pl") => JSON.stringify(pageMetadata({ lang, title: "T", description: "D", path: "/" }).openGraph);
    expect(alt("en")).toContain("lit by a band of light");
    expect(alt("pl")).toContain("w smudze światła");
  });

  it("name the X account and keep the large card, with the same title as Open Graph", () => {
    expect(pageMetadata({ title: "T", description: "D", path: "/services" }).twitter).toMatchObject({ card: "summary_large_image", site: "@ostromeckyp", creator: "@ostromeckyp", title: "T | Paweł Ostromecki" });
  });
});

describe("postTitle", () => {
  it("adds the site name only when the whole title fits", () => {
    expect(postTitle("Short post")).toBe("Short post");
    const long = "Code Became Cheap. Did Developer Knowledge Become Cheap Too?";
    expect(postTitle(long)).toEqual({ absolute: long });
  });

  it("keeps every published post's title within the budget once the suffix is decided", () => {
    for (const post of getAllPosts()) {
      const t = postTitle(post.title);
      const full = typeof t === "string" ? `${t} | Paweł Ostromecki` : t.absolute;
      expect(full.length <= TITLE_BUDGET || full === post.title, post.slug).toBe(true);
    }
  });
});

it("doesn't repeat the name the title template adds on the about page", () => {
  expect(META.about.title).not.toContain("Paweł Ostromecki");
  expect(META_PL.about.title).not.toContain("Paweł Ostromecki");
});
