import type { Topic } from "@/lib/post-list";

export const BLOG = {
  label: "blog",
  h1: "Notes from the work.",
  intro: "On AI in real engineering, Angular, and managing state without reaching for another library.",
  read: "Read",
  filterLabel: "Filter posts by topic",
  viewLabel: "View",
  grid: "Grid",
  list: "List",
  postsLabel: "Posts",
  empty: "No posts in this topic yet.",
  topics: [
    { value: "all", label: "All" },
    { value: "Artificial Intelligence", label: "Artificial intelligence" },
    { value: "Angular", label: "Angular" },
  ] satisfies { value: Topic; label: string }[],
};

export const ARTICLE = {
  back: "All posts",
  author: "Paweł Ostromecki",
  role: "Senior software engineer, Wrocław",
  toc: "in this post",
  tocLabel: "Table of contents",
  shareLinkedIn: "Share on LinkedIn",
  shareX: "Share on X",
  copy: "Copy link",
  copied: "Copied",
  copyFailed: "Couldn't copy",
  authorAlt: "Portrait of Paweł Ostromecki",
  bio: "Senior software engineer and consultant. I bring AI into real business processes and build it to run safely in production. I lead Angular Wrocław.",
  cta: "Let's talk",
  more: "More from the blog",
  all: "All posts",
};
