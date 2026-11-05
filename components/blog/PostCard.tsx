import Image from "next/image";
import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { formatPostDate } from "@/lib/format-date";
import type { PostSummary } from "@/lib/posts";

const META = "flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase";

/** Names an element so it morphs into the post page. Off, it renders the element untouched. */
function Morph({ name, enabled, children }: { name: string; enabled: boolean; children: ReactNode }) {
  return enabled ? <ViewTransition name={name}>{children}</ViewTransition> : <>{children}</>;
}

function Cover({ post, className, sizes }: { post: PostSummary; className?: string; sizes: string }) {
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden border border-ink-600 bg-ink-900", className)}>
      <Image
        src={post.image}
        alt={post.imageAlt}
        fill
        sizes={sizes}
        style={{ objectPosition: post.imagePosition }}
        className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] motion-safe:group-hover:scale-[1.03]"
      />
    </div>
  );
}

export function PostCard({
  post,
  variant = "grid",
  showExcerpt = true,
  morph = true,
}: {
  post: PostSummary;
  variant?: "grid" | "list";
  showExcerpt?: boolean;
  /** Turn off when this post is on the page twice: transition names must be unique. */
  morph?: boolean;
}) {
  const href = `/blog/${post.slug}`;
  const date = formatPostDate(post.date, "short");
  const read = `about ${post.readingMinutes} min`;

  if (variant === "list") {
    return (
      <Link
        href={href}
        className="group grid grid-cols-1 items-center gap-5 border-b border-ink-700 py-7 text-ink-0 md:grid-cols-[240px_minmax(0,1fr)_auto] md:gap-8"
      >
        <Morph name={`post-image-${post.slug}`} enabled={morph}>
          <Cover post={post} className="rounded-[10px]" sizes="(min-width: 768px) 240px, 100vw" />
        </Morph>
        <div className="flex min-w-0 flex-col gap-2">
          <div className={META}>
            <span className="text-sakura-500">{post.label}</span>
            <span>{date}</span>
          </div>
          <Morph name={`post-title-${post.slug}`} enabled={morph}>
            <span className="text-2xl leading-[1.2] font-medium tracking-[-0.02em] text-ink-200 group-hover:text-white">
              {post.title}
            </span>
          </Morph>
          <span className="max-w-[720px] text-[15px] leading-[1.55] text-ink-400">{post.excerpt}</span>
        </div>
        <span className="text-sm whitespace-nowrap text-ink-400">{read}</span>
      </Link>
    );
  }

  return (
    <Link href={href} className="group flex flex-col gap-[18px] text-ink-0">
      <Morph name={`post-image-${post.slug}`} enabled={morph}>
        <Cover post={post} className="rounded-xl" sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" />
      </Morph>
      <div className="flex flex-col gap-2.5">
        <div className={META}>
          <span className="text-sakura-500">{post.label}</span>
          <span>{date}</span>
          <span>{read}</span>
        </div>
        <Morph name={`post-title-${post.slug}`} enabled={morph}>
          <span className="text-[22px] leading-[1.2] font-semibold tracking-[-0.02em] text-ink-200 group-hover:text-white">
            {post.title}
          </span>
        </Morph>
        {showExcerpt && <span className="text-[15px] leading-[1.55] text-ink-400">{post.excerpt}</span>}
      </div>
    </Link>
  );
}
