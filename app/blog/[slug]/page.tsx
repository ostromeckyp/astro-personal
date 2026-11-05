import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { ARTICLE } from "@/content/site/blog";
import { formatPostDate } from "@/lib/format-date";
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/posts";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const morePosts = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <header className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="article-glow glow-burn absolute top-[-30%] right-[-10%] h-[160%] w-[70%]"
        />
        <div
          aria-hidden="true"
          className="absolute top-[30%] left-[-5%] h-px w-[130%] origin-top-left -rotate-6 bg-ink-0/8"
        />
        <div className="site-container relative flex flex-col gap-7 pt-[72px] pb-14">
          <Link href="/blog" className="inline-flex items-center gap-2 self-start text-sm text-ink-400 hover:text-ink-0">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            {ARTICLE.back}
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Tag className="border-sakura-500 text-sakura-500">{post.category}</Tag>
            <span className="font-mono text-xs text-ink-400">
              {formatPostDate(post.date, "long")} · about {post.readingMinutes} min read
            </span>
          </div>
          <ViewTransition name={`post-title-${post.slug}`}>
            <h1 className="max-w-[980px] text-[clamp(40px,5.4vw,80px)] leading-[0.98] font-semibold tracking-[-0.045em]">
              {post.title}
            </h1>
          </ViewTransition>
          <p className="max-w-[720px] text-xl leading-[1.55] text-ink-400">{post.excerpt}</p>
          <div className="flex items-center gap-3.5 pt-2">
            <Image
              src="/images/portrait.jpg"
              alt=""
              width={44}
              height={44}
              className="size-11 rounded-full object-cover object-[50%_25%]"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-medium">{ARTICLE.author}</span>
              <span className="text-[13px] text-ink-400">{ARTICLE.role}</span>
            </div>
          </div>
        </div>
      </header>

      <figure className="site-container pt-12">
        <ViewTransition name={`post-image-${post.slug}`}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-ink-600 bg-ink-900 md:aspect-[21/9]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(min-width: 1248px) 1200px, 100vw"
              style={{ objectPosition: post.imagePosition }}
              className="object-cover"
            />
          </div>
        </ViewTransition>
      </figure>

      <div className="site-container flex flex-col items-start gap-14 pt-16 pb-24 lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col gap-4 lg:sticky lg:top-28 lg:w-[260px]">
          {post.toc.length >= 2 && <TableOfContents items={post.toc} />}
          <div className="border-t border-ink-700 pt-4">
            <ShareLinks url={`https://ostromecki.dev/blog/${post.slug}`} title={post.title} />
          </div>
        </aside>
        <article
          className="article-prose w-full max-w-[720px] min-w-0"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>

      <div className="site-container pb-24">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-card border border-ink-600 bg-ink-900 p-6 md:p-10">
          <div className="flex flex-[1_1_420px] flex-wrap items-center gap-5">
            <Image
              src="/images/portrait.jpg"
              alt={ARTICLE.authorAlt}
              width={88}
              height={88}
              className="size-[88px] shrink-0 rounded-full object-cover object-[50%_25%]"
            />
            <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-1.5">
              <span className="text-xl font-semibold tracking-[-0.015em]">{ARTICLE.author}</span>
              <span className="text-[15px] leading-[1.55] text-ink-400">{ARTICLE.bio}</span>
            </div>
          </div>
          <Button href="/contact" size="lg">
            {ARTICLE.cta}
          </Button>
        </div>
      </div>

      {morePosts.length > 0 && (
        <section className="site-container flex flex-col gap-8 pb-32">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[32px] font-semibold tracking-[-0.03em]">{ARTICLE.more}</h2>
            <TextLink href="/blog">{ARTICLE.all}</TextLink>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
            {morePosts.map((p) => (
              <PostCard key={p.slug} post={p} showExcerpt={false} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
