"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** The overlay's own exit animation. Its end is the only signal that the splash is over. */
const EXIT_ANIMATION = "circle-open";
/** When the hole starts opening on its own; from then on, skipping would only slow it down. */
const OPEN_AT_MS = 1800;
/** How long after mount to double-check, in case an animationend event never arrives. */
const SAFETY_MS = 2800;

type Anim = Animation & { animationName?: string };

function exitAnimation(overlay: HTMLElement): Anim | undefined {
  if (typeof overlay.getAnimations !== "function") return undefined;
  return overlay.getAnimations().find((a: Anim) => a.animationName === EXIT_ANIMATION);
}

/** True once every splash animation has run. Unknown (no getAnimations) counts as still playing. */
function allFinished(overlay: HTMLElement) {
  if (typeof overlay.getAnimations !== "function") return false;
  return overlay.getAnimations({ subtree: true }).every((a) => a.playState === "finished");
}

/** Starts the short exit: children jump to their end pose and the hole opens over 400 ms. */
function startExit(overlay: HTMLElement) {
  if (overlay.hasAttribute("data-splash-exit")) return;
  const running = exitAnimation(overlay);
  const now = running?.currentTime;
  // Already opening: let it finish rather than restart it.
  if (typeof now === "number" && now >= OPEN_AT_MS) return;
  overlay.setAttribute("data-splash-exit", "");
  document.body.style.overflow = "";
  // The new duration and delay apply to the same running animation, so it has to be rewound,
  // or a skip at 0.2 s would start half open and a skip at 1 s would cut straight to the end.
  const exit = exitAnimation(overlay);
  if (exit) exit.currentTime = 0;
}

/**
 * First-visit intro. Always in the markup; CSS shows it only while <html data-splash> is set,
 * which the head script does before first paint. CSS also plays it to the end, so this
 * component only locks the page behind it, handles skipping, and clears the attribute.
 */
export function Splash({ skip, label }: { skip: string; label: string }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const overlay = overlayRef.current;
    if (!overlay || !root.hasAttribute("data-splash")) return;

    // Hydrated after the intro had already played out: just drop the attribute.
    if (allFinished(overlay)) {
      root.removeAttribute("data-splash");
      return;
    }

    // Everything behind the overlay (skip link, nav, main, footer, contact button) leaves the tab order.
    const behind = [...document.body.children].filter((el) => el !== overlay && !el.hasAttribute("inert"));
    behind.forEach((el) => el.setAttribute("inert", ""));
    document.body.style.overflow = "hidden";
    skipRef.current?.focus();

    let safety: ReturnType<typeof setTimeout>;
    const release = () => {
      clearTimeout(safety);
      behind.forEach((el) => el.removeAttribute("inert"));
      document.body.style.overflow = "";
      overlay.removeEventListener("animationstart", onStart);
      overlay.removeEventListener("animationend", onEnd);
      window.removeEventListener("keydown", onKey);
    };
    const finish = () => {
      release();
      root.removeAttribute("data-splash");
    };
    // Child animations bubble up here too, so only the overlay's own exit counts.
    const isExit = (e: AnimationEvent) => e.target === overlay && e.animationName === EXIT_ANIMATION;
    // Scrollbars come back as the hole opens, not after, so the revealed page doesn't jump at the end.
    const onStart = (e: AnimationEvent) => {
      if (isExit(e)) document.body.style.overflow = "";
    };
    const onEnd = (e: AnimationEvent) => {
      if (isExit(e)) finish();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") startExit(overlay);
    };
    const check = () => {
      if (allFinished(overlay) || typeof overlay.getAnimations !== "function") finish();
      else safety = setTimeout(check, 500);
    };

    overlay.addEventListener("animationstart", onStart);
    overlay.addEventListener("animationend", onEnd);
    window.addEventListener("keydown", onKey);
    safety = setTimeout(check, SAFETY_MS);
    return release;
  }, []);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={() => overlayRef.current && startExit(overlayRef.current)}
      className="splash fixed inset-0 z-[70] grid place-items-center overflow-hidden bg-ink-950"
    >
      <div aria-hidden="true" className="splash-laptop w-[min(76vw,340px)] [grid-area:1/1]">
        {/* The lid is its own <svg> so its 3D turn isn't flattened, as it would be on an inner <g>. */}
        <div className="splash-hinge mx-auto w-[84%]">
          <svg viewBox="0 0 300 196" className="splash-lid stay-dark block w-full overflow-visible">
            <defs>
              <radialGradient id="splash-glow" cx="50%" cy="50%" r="60%">
                <stop offset="0" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.2 }} />
                <stop offset="1" style={{ stopColor: "var(--color-accent)", stopOpacity: 0 }} />
              </radialGradient>
            </defs>
            <rect x="0.75" y="0.75" width="298.5" height="194.5" rx="13" className="fill-ink-800 stroke-ink-600" strokeWidth="1.5" />
            <circle cx="150" cy="5.5" r="1.6" className="fill-ink-600" />
            <rect x="10" y="10" width="280" height="176" rx="4" className="fill-ink-950" />
            <rect x="10" y="10" width="280" height="176" rx="4" fill="url(#splash-glow)" className="splash-glow" />
            <svg x="94" y="42" width="112" height="112" viewBox="0 0 128 128" overflow="visible">
              <g fill="none" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="64" className="stroke-accent">
                <path d="M38 40L18 64L38 88" className="splash-bracket" />
                <path d="M90 40L110 64L90 88" className="splash-bracket splash-bracket-r" />
              </g>
              <path
                d="M64 40Q67.36 60.64 88 64Q67.36 67.36 64 88Q60.64 67.36 40 64Q60.64 60.64 64 40Z"
                className="splash-star fill-accent"
              />
            </svg>
          </svg>
        </div>
        <svg viewBox="0 0 360 14" className="block w-full">
          <path d="M6 0H354a6 6 0 0 1 6 6v1c0 4-4 7-10 7H10C4 14 0 11 0 7V6a6 6 0 0 1 6-6z" className="fill-ink-600" />
          <path d="M150 0h60v2a3 3 0 0 1-3 3h-54a3 3 0 0 1-3-3z" fill="#000" fillOpacity="0.25" />
        </svg>
      </div>

      {/* Same images as the nav logo (same URLs, so already cached), a little larger. */}
      <div aria-hidden="true" className="splash-wordmark [grid-area:1/1]">
        <Image src="/images/logo-dark.png" alt="" width={1200} height={135} className="only-dark h-[24px] w-auto sm:h-[30px]" />
        <Image src="/images/logo-light.png" alt="" width={1200} height={135} className="only-light h-[24px] w-auto sm:h-[30px]" />
      </div>

      <button
        ref={skipRef}
        type="button"
        className="splash-skip absolute right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] min-h-11 rounded-full border border-ink-600 px-5 text-sm text-ink-400 transition-colors hover:text-ink-0 sm:right-8 sm:bottom-8"
      >
        {skip}
      </button>
    </div>
  );
}
