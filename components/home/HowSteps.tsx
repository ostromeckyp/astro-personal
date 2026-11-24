"use client";

import { Fragment, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { HOME } from "@/content/site/home";
import { cn } from "@/lib/cn";
import { autoAdvanceAllowed, nextStep, STEP_MS, stepForKey } from "@/lib/how-steps";

type Step = (typeof HOME.how.steps)[number];

// Tailwind only sees whole class names, so the column for each step button is spelled out.
const COLUMN = ["md:col-start-1", "md:col-start-2", "md:col-start-3", "md:col-start-4"];

/** Live media query, false until mounted so the server render never animates. */
function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/**
 * The four steps as an accordion: one open at a time. From md up the buttons sit in a row and
 * the open step advances on its own while in view, until the visitor picks a step themselves.
 */
export function HowSteps({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const wide = useMedia("(min-width: 768px)");
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");
  const root = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const auto = wide && !interacted && !reducedMotion;
  const running = autoAdvanceAllowed({ inView, paused, interacted, reducedMotion, wide });

  const pick = (i: number) => {
    setInteracted(true);
    setActive(i);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const to = stepForKey(e.key, i, steps.length);
    if (to === null) return;
    e.preventDefault();
    pick(to);
    buttons.current[to]?.focus();
  };

  return (
    <div
      ref={root}
      className="border-t border-ink-600 md:grid md:grid-cols-4 md:gap-x-6"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      {steps.map((s, i) => {
        const open = i === active;
        return (
          <Fragment key={s.n}>
            <button
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              id={`how-step-${s.n}`}
              aria-expanded={open}
              aria-controls={`how-panel-${s.n}`}
              onClick={() => pick(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "relative flex w-full items-baseline gap-4 border-b border-ink-700 py-5 text-left md:row-start-1 md:border-b-0 md:pt-7 md:pb-6",
                COLUMN[i],
              )}
            >
              <span className="font-mono text-xs text-sakura-500">{s.n}</span>
              <span className={cn("text-xl font-medium tracking-[-0.015em] transition-colors", open ? "text-ink-0" : "text-ink-400 hover:text-ink-0")}>
                {s.tab}
              </span>
              <span aria-hidden="true" className="absolute inset-x-0 -top-px hidden h-0.5 md:block">
                {open && (
                  <span
                    key={active}
                    className={cn("block h-full origin-left bg-sakura-500", auto && "how-progress")}
                    style={auto ? { animationDuration: `${STEP_MS}ms`, animationPlayState: running ? "running" : "paused" } : undefined}
                    onAnimationEnd={() => setActive((a) => nextStep(a, steps.length))}
                  />
                )}
              </span>
            </button>
            <div
              id={`how-panel-${s.n}`}
              role="region"
              aria-labelledby={`how-step-${s.n}`}
              inert={!open}
              data-open={open || undefined}
              className={cn(
                "how-panel flex max-w-[720px] flex-col gap-4 md:col-span-4 md:col-start-1 md:row-start-2 md:pt-2 md:pb-4",
                open ? "pt-1 pb-8" : "max-md:hidden md:invisible",
              )}
            >
              <h3 className="text-[clamp(26px,3vw,36px)] leading-[1.1] font-semibold tracking-[-0.03em]">{s.t}</h3>
              <p className="text-[17px] leading-[1.6] text-ink-400">{s.d}</p>
              <p className="flex items-start gap-3 text-[15px] leading-[1.55] text-ink-200">
                <span aria-hidden="true" className="mt-[11px] h-0.5 w-6 shrink-0 bg-sakura-500" />
                {s.rule}
              </p>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
