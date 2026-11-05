import { describe, expect, it } from "vitest";
import { pageMetadata } from "./metadata";

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
    expect(meta.openGraph).toMatchObject({ siteName: "Paweł Ostromecki", type: "website", url: "/services", title: "T", description: "D" });
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
