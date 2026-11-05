"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useSyncExternalStore } from "react";
import { PostCard } from "@/components/blog/PostCard";
import type { BLOG as Copy } from "@/content/site/blog";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { blogSearch, filterPosts, parseBlogState, type BlogState } from "@/lib/post-list";
import type { PostSummary } from "@/lib/posts";

const SEARCH_CHANGED = "blog-search-changed";

// The filter and view live in the URL, so returning from a post restores them.
// Read outside React state because useSearchParams would drop the post list from the prerendered HTML.
function subscribeToSearch(onChange: () => void) {
  window.addEventListener(SEARCH_CHANGED, onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener(SEARCH_CHANGED, onChange);
    window.removeEventListener("popstate", onChange);
  };
}

/**
 * Next's own navigation, such as the nav's Blog link, changes the URL without an event to listen to.
 * This renders nothing, so its Suspense boundary keeps the post list in the prerendered HTML.
 */
function SearchSync() {
  const search = useSearchParams().toString();
  useEffect(() => {
    window.dispatchEvent(new Event(SEARCH_CHANGED));
  }, [search]);
  return null;
}

function ViewButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 w-9 items-center justify-center rounded-full transition-colors",
        pressed ? "bg-ink-700 text-ink-0" : "text-ink-400 hover:text-ink-0",
      )}
    >
      {children}
    </button>
  );
}

export function BlogExplorer({ posts, copy: BLOG, lang }: { posts: PostSummary[]; copy: typeof Copy; lang: Locale }) {
  const { topic, view } = parseBlogState(useSyncExternalStore(subscribeToSearch, () => window.location.search, () => ""));
  const update = (change: Partial<BlogState>) => {
    const query = blogSearch({ topic, view, ...change });
    window.history.replaceState(null, "", `${window.location.pathname}${query}`);
    window.dispatchEvent(new Event(SEARCH_CHANGED));
  };
  const visible = filterPosts(posts, topic);
  // A topic view can repeat the featured post, whose transition names are already taken.
  const featuredSlug = posts[0]?.slug;

  return (
    <>
      <Suspense fallback={null}>
        <SearchSync />
      </Suspense>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-600 pb-8">
        <div role="group" aria-label={BLOG.filterLabel} className="flex flex-wrap gap-2">
          {BLOG.topics.map((t) => {
            const pressed = t.value === topic;
            return (
              <button
                key={t.value}
                type="button"
                aria-pressed={pressed}
                onClick={() => update({ topic: t.value })}
                className={cn(
                  "h-11 rounded-full border px-[18px] text-sm transition-colors",
                  pressed ? "border-ink-0 bg-ink-0 text-ink-950" : "border-ink-600 text-ink-200 hover:border-ink-500",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <div role="group" aria-label={BLOG.viewLabel} className="hidden gap-1 rounded-full border border-ink-600 p-1 md:flex">
          <ViewButton label={BLOG.grid} pressed={view === "grid"} onClick={() => update({ view: "grid" })}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </ViewButton>
          <ViewButton label={BLOG.list} pressed={view === "list"} onClick={() => update({ view: "list" })}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 6h12M9 12h12M9 18h12" />
              <rect x="3" y="4" width="3" height="4" rx="1" />
              <rect x="3" y="10" width="3" height="4" rx="1" />
              <rect x="3" y="16" width="3" height="4" rx="1" />
            </svg>
          </ViewButton>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="pt-10 pb-32 text-[15px] text-ink-400">{BLOG.empty}</p>
      ) : view === "grid" ? (
        <section
          key={topic}
          aria-label={BLOG.postsLabel}
          className="fade-in grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-x-6 gap-y-8 pt-10 pb-32"
        >
          {visible.map((p) => (
            <PostCard key={p.slug} post={p} morph={p.slug !== featuredSlug} lang={lang} readingTime={BLOG.readingTime} />
          ))}
        </section>
      ) : (
        <section key={topic} aria-label={BLOG.postsLabel} className="fade-in flex flex-col pb-32">
          {visible.map((p) => (
            <PostCard key={p.slug} post={p} variant="list" morph={p.slug !== featuredSlug} lang={lang} readingTime={BLOG.readingTime} />
          ))}
        </section>
      )}
    </>
  );
}
