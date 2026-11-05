import type { Locale } from "./i18n";

const UTC = { timeZone: "UTC" } as const;
const FORMATTERS = {
  en: {
    long: new Intl.DateTimeFormat("en-GB", { ...UTC, day: "numeric", month: "long", year: "numeric" }),
    short: new Intl.DateTimeFormat("en-GB", { ...UTC, day: "numeric", month: "short", year: "numeric" }),
  },
  pl: {
    long: new Intl.DateTimeFormat("pl-PL", { ...UTC, day: "numeric", month: "long", year: "numeric" }),
    short: new Intl.DateTimeFormat("pl-PL", { ...UTC, day: "2-digit", month: "2-digit", year: "numeric" }),
  },
};

/** Formats a `YYYY-MM-DD` post date. UTC throughout, so it reads the same in any timezone. */
export function formatPostDate(iso: string, style: "long" | "short", lang: Locale = "en"): string {
  return FORMATTERS[lang][style].format(new Date(`${iso}T00:00:00Z`));
}
