import { describe, expect, it } from "vitest";
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
