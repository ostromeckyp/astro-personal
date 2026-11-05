import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PageHeader } from "@/components/ui/PageHeader";
import { BLOG } from "@/content/site/blog";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG.intro,
};

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
