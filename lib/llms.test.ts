import fs from "node:fs";
import { expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { ABOUT } from "@/content/site/about";
import { HOME } from "@/content/site/home";
import { ABOUT as ABOUT_PL } from "@/content/site/pl/about";
import { HOME as HOME_PL } from "@/content/site/pl/home";
import { SERVICES } from "@/content/site/services";
import { getAllPosts } from "./posts";
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

it("names the same focus industries as the home and about pages, in both languages", () => {
  const industries = ["fintech", "regtech", "e-commerce"];
  const pages = [HOME.introBody, HOME_PL.introBody, ABOUT.facts.items[1].v, ABOUT_PL.facts.items[1].v, text];
  for (const page of pages) for (const industry of industries) expect(page.toLowerCase()).toContain(industry);
  for (const page of pages) expect(page).not.toMatch(/automotive|motoryzac|logistic|logisty|travel|turysty|energ/i);
});

it("quotes the same starting prices as the services FAQ, in both currencies", () => {
  const faq = SERVICES.faq.items.find((i) => i.q === "How much does it cost?")!.a;
  for (const price of faq.match(/\$\d+(,\d{3})*/g)!) expect(text).toContain(price);
  for (const price of ["1,900 PLN", "9,000 PLN", "99 PLN"]) expect(text).toContain(price);
});

it("lists every blog post", () => {
  for (const post of getAllPosts()) expect(text).toContain(`${SITE_URL}/blog/${post.slug})`);
});
