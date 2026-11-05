import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary, localizePost } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const { META } = getDictionary(lang);
  return pageMetadata({ lang, ...META.blog, path: "/blog" });
}

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const { BLOG } = getDictionary(lang);
  const posts = getAllPosts().map((post) => localizePost(post, lang));

  return (
    <div className="site-container">
      <PageHeader label={BLOG.label} title={BLOG.h1} intro={BLOG.intro} className="pb-14" />
      {posts[0] && <FeaturedPost post={posts[0]} copy={BLOG} lang={lang} />}
      <BlogExplorer posts={posts} copy={BLOG} lang={lang} />
    </div>
  );
}
