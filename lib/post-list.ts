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
