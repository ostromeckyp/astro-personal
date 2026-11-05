import Image from "next/image";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { ViewTransition } from "react";
import type { BLOG } from "@/content/site/blog";
import { formatPostDate } from "@/lib/format-date";
import type { Locale } from "@/lib/i18n";
import type { PostSummary } from "@/lib/posts";

export function FeaturedPost({ post, copy, lang }: { post: PostSummary; copy: typeof BLOG; lang: Locale }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mb-14 grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] overflow-hidden rounded-card border border-ink-600 bg-ink-900 text-ink-0"
    >
      <ViewTransition name={`post-image-${post.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-950">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] motion-safe:group-hover:scale-[1.03]"
          />
        </div>
      </ViewTransition>
      <div className="flex flex-col justify-between gap-8 p-6 md:p-10">
        <div className="flex flex-col gap-[18px]">
          <span className="font-mono text-[11px] tracking-[0.04em] text-sakura-500 uppercase">{copy.latest} · {post.label}</span>
          <ViewTransition name={`post-title-${post.slug}`}>
            <span className="text-[clamp(28px,2.8vw,40px)] leading-[1.06] font-semibold tracking-[-0.03em] group-hover:text-white">
              {post.title}
            </span>
          </ViewTransition>
          <span className="text-base leading-[1.6] text-ink-400">{post.excerpt}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm text-ink-400">
          <span>
            {formatPostDate(post.date, "long", lang)} · {copy.readingTime.replace("{n}", String(post.readingMinutes))}
          </span>
          <span className="border-b-2 border-sakura-500 pb-[3px] text-ink-0">{copy.read}</span>
        </div>
      </div>
    </Link>
  );
}
