import { expect, it } from "vitest";
import { GET } from "./route";

it("lists every post with escaped XML and www links", async () => {
  const res = GET();
  const xml = await res.text();
  expect(res.headers.get("content-type")).toContain("application/rss+xml");
  expect(xml).toContain("<link>https://www.ostromecki.dev/blog/code-became-cheap</link>");
  expect(xml.match(/<item>/g)).toHaveLength(4);
  expect(xml).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;)/);
  expect(xml).toContain("<pubDate>Sat, 08 Aug 2026 00:00:00 GMT</pubDate>");
});
