import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { POST_IMAGES } from "./post-images";
import { getAllPosts, getPostBySlug, parsePostDate, renderMarkdown } from "./posts";

describe("getAllPosts", () => {
  const posts = getAllPosts();

  it("returns real posts newest first", () => {
    expect(posts.map((p) => p.slug)).toEqual([
      "code-became-cheap",
      "you-dont-need-another-state-management-library2",
      "mastering-angular-host-property",
      "you-dont-need-another-state-management-library",
    ]);
  });

  it("uses local covers", () => {
    expect(posts.every((p) => p.image.startsWith("/images/blog/"))).toBe(true);
  });

  it("uses the two filter categories", () => {
    expect(new Set(posts.map((p) => p.category))).toEqual(new Set(["Artificial Intelligence", "Angular"]));
  });

  it("computes reading time from word count", () => {
    expect(posts[0].readingMinutes).toBeGreaterThan(9);
  });
});

describe("getPostBySlug", () => {
  it("returns html and a table of contents", async () => {
    const post = await getPostBySlug("code-became-cheap");
    expect(post?.contentHtml).toContain("<h2");
    expect(post?.toc.length).toBeGreaterThan(1);
  });

  it("returns null for an unknown slug", async () => {
    expect(await getPostBySlug("nope")).toBeNull();
  });
});

describe("renderMarkdown", () => {
  it("collects h2s, including setext and bold ones", async () => {
    const { toc } = await renderMarkdown("**Bold title**\n---\n\ntext\n\n## Second `code`\n");
    expect(toc).toEqual([
      { id: "bold-title", text: "Bold title" },
      { id: "second-code", text: "Second code" },
    ]);
  });

  it("renders indented code as a block", async () => {
    expect((await renderMarkdown("    indented code\n")).html).toContain("<pre");
  });

  it("labels fenced code with its language", async () => {
    expect((await renderMarkdown("```ts\nconst a = 1;\n```\n")).html).toContain('data-language="ts"');
  });

  it("highlights keywords with the design's colors", async () => {
    expect((await renderMarkdown("```ts\nconst a = 1;\n```\n")).html.toLowerCase()).toContain("#ff6ab0");
  });

  it("opens external links in a new tab", async () => {
    const { html } = await renderMarkdown("[out](https://medium.com/x)\n");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noreferrer"');
  });

  it("keeps same-site and anchor links in the same tab", async () => {
    const { html } = await renderMarkdown("[a](https://ostromecki.dev/blog) [b](/about) [c](#top) [d](mailto:a@b.co)\n");
    expect(html).not.toContain("target=");
  });

  it("serves known remote images locally, with dimensions", async () => {
    const known = Object.keys(POST_IMAGES)[0];
    const { html } = await renderMarkdown(`![a](${known})\n`);
    expect(html).toContain(`src="${POST_IMAGES[known].src}"`);
    expect(html).toContain(`width="${POST_IMAGES[known].width}"`);
    expect(html).toContain(`height="${POST_IMAGES[known].height}"`);
    expect(html).not.toContain("miro.medium.com");
  });

  it("lazy loads images, and leaves unknown ones where they are", async () => {
    const { html } = await renderMarkdown("![a](https://example.com/x.png)\n");
    expect(html).toContain('src="https://example.com/x.png"');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('decoding="async"');
  });

  it("has a local copy of every remote image in the posts", () => {
    const remote = fs
      .readdirSync("content/blog")
      .flatMap((f) => [...fs.readFileSync(`content/blog/${f}`, "utf8").matchAll(/!\[[^\]]*\]\((https:\/\/miro\.medium\.com[^)\s]+)/g)].map((m) => m[1]));
    expect(remote.length).toBe(8);
    expect(remote.filter((u) => !POST_IMAGES[u])).toEqual([]);
  });

  it("does not fail on an unknown language", async () => {
    await expect(renderMarkdown("```not-a-language\nx\n```\n")).resolves.toBeDefined();
  });
});

describe("parsePostDate", () => {
  it("rejects a malformed date", () => {
    expect(() => parsePostDate("20256-08-08")).toThrow();
  });

  it("parses a valid date", () => {
    expect(parsePostDate("2026-08-08")).toBe(Date.UTC(2026, 7, 8));
  });
});
