import type { PostCategory, PostSummary } from "./posts";

export type Topic = "all" | PostCategory;

/**
 * Posts for the blog list, given newest first. Under "all" the newest is already in the
 * featured slot, so it's left out. A selected topic lists everything in it, featured included,
 * so a topic whose only post is the featured one doesn't read as empty.
 */
export function filterPosts(posts: PostSummary[], topic: Topic): PostSummary[] {
  return topic === "all" ? posts.slice(1) : posts.filter((p) => p.category === topic);
}

export type BlogView = "grid" | "list";
export type BlogState = { topic: Topic; view: BlogView };

const TOPICS: readonly string[] = ["all", "Artificial Intelligence", "Angular"];

/** Reads the blog's filter and view from a URL query, falling back to the defaults. */
export function parseBlogState(search: string): BlogState {
  const params = new URLSearchParams(search);
  const topic = params.get("topic") ?? "all";
  return {
    topic: TOPICS.includes(topic) ? (topic as Topic) : "all",
    view: params.get("view") === "list" ? "list" : "grid",
  };
}

/** The query for a state, empty for the defaults. */
export function blogSearch({ topic, view }: BlogState): string {
  const params = new URLSearchParams();
  if (topic !== "all") params.set("topic", topic);
  if (view !== "grid") params.set("view", view);
  const query = params.toString();
  return query ? `?${query}` : "";
}
