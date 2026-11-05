"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { NAV_CTA, NAV_LINKS } from "@/content/site/nav";
import { cn } from "@/lib/cn";
import { isActive } from "@/lib/nav";

function Logo() {
  return (
    <Link href="/" className="tap text-lg font-semibold tracking-[-0.02em] text-ink-0">
      ostromecki<span className="text-sakura-500">.</span>dev
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname() ?? "/";
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const barRef = useRef<HTMLElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    // Everything behind the menu leaves the tab order, and focus moves into it.
    const behind = [
      document.querySelector('a[href="#main-content"]'),
      barRef.current,
      document.querySelector("main"),
      document.querySelector("footer"),
    ];
    const opener = openRef.current;
    behind.forEach((el) => el?.toggleAttribute("inert", true));
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    // The menu is hidden from lg up, for example after rotating a tablet, so it must not stay open unseen.
    const wide = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (wide.matches) setOpenOn(null);
    };
    wide.addEventListener("change", onResize);
    return () => {
      wide.removeEventListener("change", onResize);
      behind.forEach((el) => el?.removeAttribute("inert"));
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700 bg-ink-950">
      <nav ref={barRef} aria-label="Primary" className="site-container flex items-center justify-between gap-8 py-[18px]">
        <Logo />

        <div className="hidden gap-7 text-[15px] lg:flex">
          {NAV_LINKS.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 py-1.5 transition-colors",
                  active ? "border-sakura-500 text-ink-0" : "border-transparent text-ink-400 hover:text-ink-0",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href={NAV_CTA.href}>{NAV_CTA.label}</Button>
          </div>
          <button
            ref={openRef}
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpenOn(pathname)}
            className="flex size-12 items-center justify-center rounded-full border border-ink-600 text-ink-0 lg:hidden"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        hidden={!open}
        className="fixed inset-0 z-50 overflow-y-auto bg-ink-950 lg:hidden"
      >
        <div className="site-container flex min-h-full flex-col py-[18px]">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="flex size-12 items-center justify-center rounded-full border border-ink-600 text-ink-0"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-10 flex flex-col">
            {NAV_LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "border-b border-ink-700 py-4 text-[28px] leading-tight font-semibold tracking-[-0.025em]",
                    active ? "text-sakura-500" : "text-ink-0",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
          <Button href={NAV_CTA.href} size="lg" className="mt-10 w-full">
            {NAV_CTA.label}
          </Button>
        </div>
      </div>
    </header>
  );
}
