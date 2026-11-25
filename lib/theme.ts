export type Theme = "light" | "dark";

/** localStorage key for the visitor's choice. Absent until they use the toggle. */
export const THEME_KEY = "theme";

export const LIGHT_QUERY = "(prefers-color-scheme: light)";

/** A saved choice wins; anything else falls back to the system. */
export function resolveTheme(stored: string | null, systemLight: boolean): Theme {
  if (stored === "light" || stored === "dark") return stored;
  return systemLight ? "light" : "dark";
}

/**
 * Runs in <head> before first paint, so the page never flashes the other theme.
 * Same rule as resolveTheme, inlined because it can't import anything.
 */
export const THEME_SCRIPT = `(function(){var s=null;try{s=localStorage.getItem(${JSON.stringify(THEME_KEY)})}catch(e){}document.documentElement.dataset.theme=s==="light"||s==="dark"?s:matchMedia(${JSON.stringify(LIGHT_QUERY)}).matches?"light":"dark"})()`;

/** Distance from (x, y) to the farthest corner of a width x height viewport. */
export function revealRadius(x: number, y: number, width: number, height: number): number {
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
}
