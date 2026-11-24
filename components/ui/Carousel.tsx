"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Horizontal scroll-snap track with previous/next buttons. Works as a plain swipeable
 * row without JavaScript; the buttons only add paging on top of native scrolling.
 */
export function Carousel({ children, label, prevLabel, nextLabel }: { children: ReactNode; label: string; prevLabel: string; nextLabel: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    const resize = new ResizeObserver(update);
    resize.observe(el);
    return () => resize.disconnect();
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const hidden = edges.start && edges.end;

  return (
    <div className="flex flex-col gap-6">
      <ul
        ref={track}
        onScroll={update}
        aria-label={label}
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto overscroll-x-contain px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <div className={cn("flex gap-3", hidden && "hidden")}>
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => page(dir)}
            disabled={dir === -1 ? edges.start : edges.end}
            aria-label={dir === -1 ? prevLabel : nextLabel}
            className="grid size-12 place-items-center rounded-full border border-ink-600 font-mono text-lg text-ink-0 transition-colors hover:border-sakura-500 disabled:pointer-events-none disabled:opacity-30"
          >
            <span aria-hidden="true">{dir === -1 ? "←" : "→"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
