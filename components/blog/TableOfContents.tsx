"use client";

import { useEffect, useState } from "react";
import { ARTICLE } from "@/content/site/blog";
import { cn } from "@/lib/cn";
import type { TocItem } from "@/lib/posts";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items.flatMap((item) => {
      const el = document.getElementById(item.id);
      return el ? [el] : [];
    });
    // Active section: the last heading that has entered the band under the sticky nav.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[visible.length - 1].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={ARTICLE.tocLabel} className="flex flex-col gap-3.5">
      <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{ARTICLE.toc}</span>
      <ol className="flex flex-col gap-2.5 border-l border-ink-600">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li
              key={item.id}
              className={cn("-ml-px border-l-2 pl-4 text-sm leading-[1.4]", active ? "border-sakura-500" : "border-transparent")}
            >
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={active ? "text-ink-0" : "text-ink-400 hover:text-ink-0"}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
