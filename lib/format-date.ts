const FORMATTERS = {
  long: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  short: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }),
};

/** Formats a `YYYY-MM-DD` post date. UTC throughout, so it reads the same in any timezone. */
export function formatPostDate(iso: string, style: "long" | "short"): string {
  return FORMATTERS[style].format(new Date(`${iso}T00:00:00Z`));
}
