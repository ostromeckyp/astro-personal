"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import type { FAB } from "@/content/site/nav";
import { NEW_TAB } from "@/lib/external-link";
import { fabVisible } from "@/lib/fab";
import { stripLocale } from "@/lib/i18n";
import { PERSON } from "@/lib/site";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
/** Must match the fab-down duration in app/globals.css. */
const PANEL_CLOSE_MS = 300;
/** Scroll moves smaller than this don't change direction, so a jittery finger doesn't flicker the button. */
const SCROLL_THRESHOLD = 8;
/** Near the top of the page the button always shows. */
const TOP_ZONE = 80;

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      {children}
    </svg>
  );
}

const PROFILE_ICONS: Record<(typeof FAB)["profiles"][number]["id"], ReactNode> = {
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
};

const actionClass = "flex h-12 items-center gap-3 rounded-input px-3 text-[15px] font-medium text-ink-0 transition-colors hover:bg-ink-800";

/** Mobile quick contact: a round button bottom-right that unrolls a small panel of contact links upward. */
export function ContactFab({ copy }: { copy: typeof FAB }) {
  const path = stripLocale(usePathname() ?? "/");
  const [shown, setShown] = useState(false);
  const [closing, setClosing] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const refocus = useRef(true);

  const open = shown && !closing;
  // While the panel is open or focus is inside, the button stays put whatever the page does underneath,
  // so focus never drops to the body. The contact page still hides it.
  const pinned = shown || focusInside;
  const visible = fabVisible({ path, footerInView: footerInView && !pinned, scrollingDown: scrollingDown && !pinned });
  // Only keyboard-style focus pins it: a tap also focuses the button in some browsers, and that must not
  // keep it on screen for good. Focus can also vanish without a blur event (a focused link hidden with its
  // panel), so this re-checks whenever the page moves.
  const syncFocus = () => setFocusInside(!!rootRef.current?.querySelector(":focus-visible"));

  const close = (focusButton = true) => {
    refocus.current = focusButton;
    setClosing(true);
  };

  useEffect(() => {
    const footer = document.querySelector("body > footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => {
      setFooterInView(entry.isIntersecting);
      syncFocus();
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      syncFocus();
      const y = window.scrollY;
      if (y < TOP_ZONE) {
        lastY = y;
        setScrollingDown(false);
        return;
      }
      if (Math.abs(y - lastY) < SCROLL_THRESHOLD) return;
      setScrollingDown(y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!closing) return;
    const done = setTimeout(
      () => {
        setShown(false);
        setClosing(false);
        if (refocus.current) buttonRef.current?.focus();
      },
      reducedMotion ? 0 : PANEL_CLOSE_MS,
    );
    return () => clearTimeout(done);
  }, [closing, reducedMotion]);

  useEffect(() => {
    if (!shown) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    // A tap anywhere else closes the panel; focus stays where the reader tapped.
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    // Hidden from lg up, for example after rotating a tablet, so it must not stay open unseen.
    const wide = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (wide.matches) close(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    wide.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      wide.removeEventListener("change", onResize);
    };
  }, [shown]);

  return (
    <div
      id="contact-fab"
      ref={rootRef}
      onFocus={(e) => setFocusInside(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget)) setFocusInside(false);
      }}
      data-hidden={visible ? undefined : ""}
      data-open={open || undefined}
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 lg:hidden"
    >
      <div
        id="contact-fab-panel"
        role="group"
        aria-labelledby="contact-fab-title"
        hidden={!shown}
        data-closing={closing || undefined}
        className="absolute right-0 bottom-full mb-3 w-[min(18rem,calc(100vw-2rem))] rounded-card border border-ink-700 bg-ink-900 p-2 shadow-[0_12px_40px_rgb(0_0_2/0.35)]"
      >
        <p id="contact-fab-title" className="px-3 pt-2 pb-1 font-mono text-xs text-ink-400">
          {copy.panel}
        </p>
        <a ref={firstLinkRef} href={`tel:${PERSON.telephone}`} onClick={() => close()} className={actionClass}>
          <span className="text-accent">
            <Icon>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </Icon>
          </span>
          {copy.call}
        </a>
        <a href={`mailto:${PERSON.email}`} onClick={() => close()} className={actionClass}>
          <span className="text-accent">
            <Icon>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </Icon>
          </span>
          {copy.email}
        </a>
        <Link href="/contact" onClick={() => close(false)} className={actionClass}>
          <span className="text-accent">
            <Icon>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </Icon>
          </span>
          {copy.form}
        </Link>
        <div className="mt-2 grid grid-cols-3 gap-1 border-t border-ink-700 pt-2">
          {copy.profiles.map((p) => (
            <a
              key={p.href}
              href={p.href}
              {...NEW_TAB}
              onClick={() => close()}
              className="flex flex-col items-center gap-1.5 rounded-input py-2.5 text-xs text-ink-400 transition-colors hover:bg-ink-800 hover:text-ink-0"
            >
              <Icon>{PROFILE_ICONS[p.id]}</Icon>
              {p.label}
            </a>
          ))}
        </div>
      </div>

      <button
        ref={buttonRef}
        type="button"
        aria-controls="contact-fab-panel"
        aria-expanded={open}
        aria-label={open ? copy.close : copy.open}
        onClick={() => (open ? close() : (setClosing(false), setShown(true)))}
        className="relative flex size-14 items-center justify-center rounded-full bg-sakura-500 text-on-accent shadow-[0_8px_24px_rgb(0_0_2/0.35)] transition-colors hover:bg-sakura-300"
      >
        <svg aria-hidden="true" width="24" height="24" viewBox="40 40 48 48" fill="currentColor" className="fab-star absolute">
          <path d="M64 40Q67.36 60.64 88 64Q67.36 67.36 64 88Q60.64 67.36 40 64Q60.64 60.64 64 40Z" />
        </svg>
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="fab-x absolute">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
