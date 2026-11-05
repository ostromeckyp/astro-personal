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
    "/approach",
    "/blog",
    "/talks",
    "/about",
    "/contact",
    "/blog/code-became-cheap",
  ]) {
    expect(urls).toContain(route);
  }
  expect(urls).not.toContain("/resume");
});
