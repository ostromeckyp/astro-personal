import { describe, expect, it } from "vitest";
import { shouldShowSplash, SPLASH_KEY, SPLASH_SCRIPT } from "./splash";

describe("shouldShowSplash", () => {
  const base = { seen: null, reducedMotion: false, userAgent: "Mozilla/5.0 (iPhone)", webdriver: false };

  it("shows on a first human visit", () => expect(shouldShowSplash(base)).toBe(true));
  it("skips once seen", () => expect(shouldShowSplash({ ...base, seen: "1" })).toBe(false));
  it("skips with reduced motion", () => expect(shouldShowSplash({ ...base, reducedMotion: true })).toBe(false));
  it("skips automation", () => expect(shouldShowSplash({ ...base, webdriver: true })).toBe(false));
  it.each(["Googlebot/2.1", "bingbot/2.0", "Chrome-Lighthouse", "HeadlessChrome/120"])("skips %s", (ua) =>
    expect(shouldShowSplash({ ...base, userAgent: ua })).toBe(false));
});

interface Options {
  seen?: string;
  userAgent?: string;
  webdriver?: boolean;
  reducedMotion?: boolean;
  getItemThrows?: boolean;
  setItemThrows?: boolean;
}

function runScript({ seen, userAgent = "Mozilla/5.0 (iPhone)", webdriver = false, reducedMotion = false, getItemThrows = false, setItemThrows = false }: Options) {
  const dataset: Record<string, string> = {};
  const stored: Record<string, string> = {};
  const localStorage = {
    getItem(key: string) {
      if (getItemThrows) throw new Error("blocked");
      return key === SPLASH_KEY ? (seen ?? null) : null;
    },
    setItem(key: string, value: string) {
      if (setItemThrows) throw new Error("quota");
      stored[key] = value;
    },
  };
  const matchMedia = (query: string) => ({ matches: query === "(prefers-reduced-motion: reduce)" && reducedMotion });
  new Function("document", "localStorage", "matchMedia", "navigator", SPLASH_SCRIPT)(
    { documentElement: { dataset } },
    localStorage,
    matchMedia,
    { userAgent, webdriver },
  );
  return { dataset, stored };
}

describe("SPLASH_SCRIPT", () => {
  it("marks the page and remembers the visit on a first visit", () => {
    const { dataset, stored } = runScript({});
    expect(dataset.splash).toBe("1");
    expect(stored[SPLASH_KEY]).toBe("1");
  });
  it("does nothing for a returning visitor", () => expect(runScript({ seen: "1" }).dataset.splash).toBeUndefined());
  it("does nothing and doesn't throw when storage is blocked", () =>
    expect(runScript({ getItemThrows: true }).dataset.splash).toBeUndefined());
  it("does nothing for bots", () => expect(runScript({ userAgent: "Googlebot/2.1" }).dataset.splash).toBeUndefined());
  it("does nothing when storage reads but refuses writes (Safari private)", () =>
    expect(runScript({ setItemThrows: true }).dataset.splash).toBeUndefined());
  it.each([{ seen: "1" }, { userAgent: "Googlebot/2.1" }, { reducedMotion: true }, { webdriver: true }])(
    "writes no flag when it doesn't show (%o)", (opts) => expect(runScript(opts).stored).toEqual({}));
});
