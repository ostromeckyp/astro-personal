import { describe, expect, it } from "vitest";
import { filterPosts } from "./post-list";
import type { PostSummary } from "./posts";

const post = (slug: string, category: PostSummary["category"]) => ({ slug, category }) as PostSummary;
const slugs = (list: PostSummary[]) => list.map((p) => p.slug);

describe("filterPosts", () => {
  const posts = [
    post("ai", "Artificial Intelligence"),
    post("angular1", "Angular"),
    post("angular2", "Angular"),
    post("angular3", "Angular"),
  ];

  it("leaves the newest post out of All, since it is featured", () => {
    expect(slugs(filterPosts(posts, "all"))).toEqual(["angular1", "angular2", "angular3"]);
  });

  it("keeps the featured post in its own topic", () => {
    expect(slugs(filterPosts(posts, "Artificial Intelligence"))).toEqual(["ai"]);
  });

  it("lists every post of a topic", () => {
    expect(slugs(filterPosts(posts, "Angular"))).toEqual(["angular1", "angular2", "angular3"]);
  });

  it("handles no posts", () => {
    expect(filterPosts([], "all")).toEqual([]);
  });
});
