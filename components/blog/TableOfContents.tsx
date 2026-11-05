"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { TocItem } from "@/lib/posts";

function Links({ items, activeId, onNavigate }: { items: TocItem[]; activeId?: string; onNavigate?: () => void }) {
  return (
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
              onClick={onNavigate}
              aria-current={active ? "location" : undefined}
              className={cn("block py-1 lg:py-0", active ? "text-ink-0" : "text-ink-400 hover:text-ink-0")}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export function TableOfContents({ items, heading, label }: { items: TocItem[]; heading: string; label: string }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const collapsed = useRef<HTMLDetailsElement>(null);

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
    <nav aria-label={label}>
      {/* Phones: collapsed, so the post starts near the top. */}
      <details ref={collapsed} className="group rounded-input border border-ink-600 lg:hidden">
        <summary className="flex min-h-11 list-none items-center justify-between gap-4 px-4 font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase [&::-webkit-details-marker]:hidden">
          {heading}
          <span aria-hidden="true" className="text-sm text-sakura-500 group-open:hidden">+</span>
          <span aria-hidden="true" className="hidden text-sm text-sakura-500 group-open:inline">−</span>
        </summary>
        <div className="px-4 pb-4">
          <Links items={items} activeId={activeId} onNavigate={() => collapsed.current?.removeAttribute("open")} />
        </div>
      </details>

      <div className="hidden flex-col gap-3.5 lg:flex">
        <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{heading}</span>
        <Links items={items} activeId={activeId} />
      </div>
    </nav>
  );
}
