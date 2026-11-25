/** localStorage flag set on the first visit. Once present, the splash never shows again. */
export const SPLASH_KEY = "splash-seen";

/** Crawlers and audit tools must see the page, not the splash. */
export const BOT_PATTERN = /bot|crawl|spider|slurp|lighthouse|pagespeed|headlesschrome|google-inspectiontool/i;

/** Only a first-time human visitor who hasn't asked for reduced motion gets the splash. */
export function shouldShowSplash(input: {
  seen: string | null;
  reducedMotion: boolean;
  userAgent: string;
  webdriver: boolean;
}): boolean {
  return input.seen === null && !input.reducedMotion && !input.webdriver && !BOT_PATTERN.test(input.userAgent);
}

/**
 * Runs in <head> before first paint and sets data-splash on <html> when the splash should play.
 * Same rule as shouldShowSplash, inlined because it can't import anything. It writes the flag
 * before the attribute, and any storage error leaves the page untouched.
 */
export const SPLASH_SCRIPT = `(function(){try{var k=${JSON.stringify(SPLASH_KEY)};if(localStorage.getItem(k)!==null||matchMedia("(prefers-reduced-motion: reduce)").matches||navigator.webdriver||new RegExp(${JSON.stringify(BOT_PATTERN.source)},"i").test(navigator.userAgent))return;localStorage.setItem(k,"1");document.documentElement.dataset.splash="1"}catch(e){}})()`;
