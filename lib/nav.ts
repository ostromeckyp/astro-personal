function normalize(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

/** True when `pathname` is `href` itself or one of its child routes. */
export function isActive(pathname: string, href: string): boolean {
  const current = normalize(pathname);
  const target = normalize(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

/** True when a menu link points at the page already shown, so no navigation will close the menu for us. */
export function menuClosesOnClick(pathname: string, href: string): boolean {
  return normalize(pathname) === normalize(href);
}
