export const LOCALES = ["en", "pl"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "lang";

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/** Polish only when it's the browser's top language; everything else gets English. */
export function preferredLocale(acceptLanguage: string | null): Locale {
  const ranked = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);
  const top = ranked[0]?.tag ?? "";
  return top === "pl" || top.startsWith("pl-") ? "pl" : DEFAULT_LOCALE;
}

/** The URL of an internal path in a language. External links, anchors and files are left alone. */
export function localePath(lang: Locale, href: string): string {
  if (lang === DEFAULT_LOCALE || !href.startsWith("/") || /\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0])) return href;
  return href === "/" ? "/pl" : `/pl${href}`;
}

/** The path without a language prefix. English pages are prerendered under an internal /en route. */
export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(pl|en)(\/|$)/, "/");
}
