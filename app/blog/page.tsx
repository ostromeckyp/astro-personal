import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No posts yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              image={post.image}
              category={post.category}
              date={post.date}
              slug={post.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
