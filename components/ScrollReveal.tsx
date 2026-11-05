"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const MAX_STAGGER_MS = 240;
const STAGGER_STEP_MS = 60;

/**
 * Animates `.reveal` elements as they scroll into view. Hiding only starts once this runs,
 * so without JavaScript, and for crawlers, all content stays visible. Anything on screen when
 * it runs is shown at once, which keeps page load and page morphs unaffected.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((entry) => entry.isIntersecting);
        entering.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.setProperty("--reveal-delay", `${Math.min(i * STAGGER_STEP_MS, MAX_STAGGER_MS)}ms`);
          el.classList.add("is-revealed");
          observer.unobserve(el);
        });
      },
      { threshold: 0.1 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-revealed):not(.is-shown):not([data-reveal-watched])").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-shown");
        } else {
          el.setAttribute("data-reveal-watched", "");
          observer.observe(el);
        }
      });
    };

    scan();
    document.documentElement.classList.add("reveal-ready");

    // Picks up content that appears later, such as blog results after changing a filter.
    const changes = new MutationObserver(scan);
    changes.observe(document.body, { childList: true, subtree: true });

    return () => {
      changes.disconnect();
      observer.disconnect();
      document.querySelectorAll("[data-reveal-watched]").forEach((el) => el.removeAttribute("data-reveal-watched"));
    };
  }, [pathname]);

  return null;
}
