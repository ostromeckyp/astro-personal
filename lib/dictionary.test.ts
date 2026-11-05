import { describe, expect, it } from "vitest";
import { getDictionary, localizePost } from "./dictionary";
import type { PostSummary } from "./posts";
import { getAllPosts } from "./posts";

type Json = string | number | boolean | undefined | Json[] | { [key: string]: Json };

/** Differences in keys and list lengths between the two languages. */
function shapeDiff(a: Json, b: Json, path = ""): string[] {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return [`${path}: ${a.length} vs ${b.length} items`];
    return a.flatMap((item, i) => shapeDiff(item, b[i], `${path}[${i}]`));
  }
  if (a && b && typeof a === "object" && typeof b === "object" && !Array.isArray(a) && !Array.isArray(b)) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    return [...keys].flatMap((k) => (k in a && k in b ? shapeDiff(a[k], b[k], `${path}.${k}`) : [`${path}.${k}: missing`]));
  }
  return typeof a === typeof b ? [] : [`${path}: type differs`];
}

const strings = (v: Json): string[] =>
  typeof v === "string" ? [v] : Array.isArray(v) ? v.flatMap(strings) : v && typeof v === "object" ? Object.values(v).flatMap(strings) : [];

describe("dictionaries", () => {
  const en = getDictionary("en") as unknown as Json;
  const pl = getDictionary("pl") as unknown as Json;

  it("have the same shape, so nothing is missing in Polish", () => {
    expect(shapeDiff(en, pl)).toEqual([]);
  });

  it("contain no bracketed placeholders from the design", () => {
    expect(strings(pl).filter((s) => /\[[^\]]*\]/.test(s))).toEqual([]);
  });

  it("keep titles and descriptions within search limits", () => {
    const meta = getDictionary("pl").META;
    for (const [key, page] of Object.entries(meta)) {
      const suffix = key === "home" ? 0 : " | Paweł Ostromecki".length;
      expect(page.title.length + suffix, key).toBeLessThanOrEqual(70);
      expect(page.description.length, key).toBeLessThanOrEqual(160);
    }
  });

  it("translate visible copy rather than repeating English", () => {
    const { HOME: a } = getDictionary("en");
    const { HOME: b } = getDictionary("pl");
    expect(b.hero.h1).not.toBe(a.hero.h1);
    expect(b.intro).not.toBe(a.intro);
  });
});

describe("localizePost", () => {
  const post = getAllPosts()[0];

  it("changes the summary in Polish and keeps the title", () => {
    const pl = localizePost(post, "pl");
    expect(pl.excerpt).not.toBe(post.excerpt);
    expect(pl.title).toBe(post.title);
  });

  it("leaves English as it is", () => {
    expect(localizePost(post, "en")).toEqual(post);
  });

  it("has Polish copy for every post", () => {
    for (const p of getAllPosts()) expect(localizePost(p as PostSummary, "pl").excerpt, p.slug).not.toBe(p.excerpt);
  });
});
