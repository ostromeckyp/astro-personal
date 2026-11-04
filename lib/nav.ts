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
