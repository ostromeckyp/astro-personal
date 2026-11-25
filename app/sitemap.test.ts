import { expect, it } from "vitest";
import sitemap from "./sitemap";

it("lists every route and no removed ones", () => {
  const urls = sitemap().map((e) => e.url.replace("https://www.ostromecki.dev", "") || "/");
  for (const route of [
    "/",
    "/services",
    "/use-cases",
    "/use-cases/salon-replenishment",
    "/use-cases/no-code-forms",
    "/blog",
    "/talks",
    "/about",
    "/contact",
    "/blog/code-became-cheap",
  ]) {
    expect(urls).toContain(route);
  }
  expect(urls).not.toContain("/resume");
  expect(urls).not.toContain("/approach");
  expect(urls).toContain("/pl");
  expect(urls).toContain("/pl/services");
  expect(urls).not.toContain("/pl/blog/code-became-cheap");
});

it("writes the root as the canonical does, without a trailing slash", () => {
  expect(sitemap()[0].url).toBe("https://www.ostromecki.dev");
});

it("dates every entry and links x-default like the pages' hreflang", () => {
  for (const entry of sitemap()) expect(entry.lastModified, entry.url).toBeInstanceOf(Date);
  const services = sitemap().find((e) => e.url === "https://www.ostromecki.dev/services")!;
  expect(services.alternates?.languages).toEqual({
    en: "https://www.ostromecki.dev/services",
    pl: "https://www.ostromecki.dev/pl/services",
    "x-default": "https://www.ostromecki.dev/services",
  });
});
