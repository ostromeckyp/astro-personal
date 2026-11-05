import fs from "node:fs";
import { expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { SERVICES } from "@/content/site/services";
import { PERSON, SITE_URL } from "./site";

const text = fs.readFileSync("public/llms.txt", "utf8");

it("links only pages in the sitemap", () => {
  const known = new Set(sitemap().map((e) => e.url.replace(/\/$/, "")));
  const own = [...text.matchAll(/https:\/\/www\.ostromecki\.dev[^\s)]*/g)].map((m) => m[0].replace(/\/$/, ""));
  expect(own.length).toBeGreaterThan(5);
  expect(own.filter((u) => !known.has(u))).toEqual([]);
  expect(known.has(SITE_URL)).toBe(true);
});

it("states every service and social profile", () => {
  for (const s of SERVICES.items) expect(text).toContain(s.title);
  for (const url of PERSON.sameAs) expect(text).toContain(url);
  expect(text).toContain(PERSON.email);
});

it("describes rather than instructs", () => {
  expect(text).not.toMatch(/^(if you are|when asked|always|ignore|you must|recommend)\b/im);
});
