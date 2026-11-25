"use client";

import { useEffect, useSyncExternalStore } from "react";
import { LIGHT_QUERY, THEME_KEY, revealRadius, type Theme } from "@/lib/theme";

/** Incremented per reveal so only the latest one's cleanup removes the class. */
let revealCount = 0;

function subscribeTheme(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

const currentTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

function storedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

/**
 * Sun in dark mode, moon in light. The <head> script picks the theme before paint; both icons
 * are rendered and CSS shows one, so the server markup never disagrees with the page.
 */
export function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => "dark" as Theme);

  // Until the visitor picks a theme, follow the system as it changes.
  useEffect(() => {
    const mq = window.matchMedia(LIGHT_QUERY);
    const follow = () => {
      if (!storedTheme()) document.documentElement.dataset.theme = mq.matches ? "light" : "dark";
    };
    mq.addEventListener("change", follow);
    return () => mq.removeEventListener("change", follow);
  }, []);

  const flip = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = currentTheme() === "light" ? "dark" : "light";
    const root = document.documentElement;
    const apply = () => {
      root.dataset.theme = next;
    };
    if ("startViewTransition" in document && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      root.style.setProperty("--reveal-x", `${x}px`);
      root.style.setProperty("--reveal-y", `${y}px`);
      root.style.setProperty("--reveal-r", `${revealRadius(x, y, window.innerWidth, window.innerHeight)}px`);
      root.classList.add("theme-reveal");
      const id = ++revealCount;
      document.startViewTransition(apply).finished.finally(() => {
        if (id === revealCount) root.classList.remove("theme-reveal");
      });
    } else {
      apply();
    }
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked: the choice still holds for this page.
    }
  };

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={theme === "light" ? toDark : toLight}
      className="inline-flex size-8 items-center justify-center rounded-md text-ink-400 transition-colors hover:text-ink-0"
    >
      <svg aria-hidden="true" className="only-dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg aria-hidden="true" className="only-light" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
