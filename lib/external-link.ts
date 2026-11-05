/** True for http(s) links that leave this site. */
export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//.test(href) && !/^https?:\/\/(www\.)?ostromecki\.dev(\/|$)/.test(href);
}

/** Props that make an anchor open in a new tab. */
export const NEW_TAB = { target: "_blank", rel: "noreferrer" } as const;
