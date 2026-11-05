import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PageHeader } from "@/components/ui/PageHeader";
import { BLOG } from "@/content/site/blog";
import { getAllPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog on AI engineering and Angular",
  description: BLOG.intro,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="site-container">
      <PageHeader label={BLOG.label} title={BLOG.h1} intro={BLOG.intro} className="pb-14" />
      {posts[0] && <FeaturedPost post={posts[0]} />}
      <BlogExplorer posts={posts} />
    </div>
  );
}
