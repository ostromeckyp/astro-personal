import { NextResponse, type NextRequest } from "next/server";
import { isLocale, LOCALE_COOKIE, preferredLocale } from "./lib/i18n";

/**
 * English lives at plain URLs and Polish under /pl. A plain URL is rewritten to the internal /en route.
 * Only the home page picks a language for the visitor: the saved choice or browser language can send
 * it to /pl. Every other URL is served in the language it names, so a shared or crawled English link
 * always shows the English page its canonical points at.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname === "/pl" || pathname.startsWith("/pl/")) return NextResponse.next();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname !== "/") {
    url.pathname = `/en${pathname}`;
    return NextResponse.rewrite(url);
  }

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const lang = saved && isLocale(saved) ? saved : preferredLocale(request.headers.get("accept-language"));
  if (lang === "pl") {
    url.pathname = "/pl";
    url.search = search;
    const response = NextResponse.redirect(url, 307);
    response.headers.set("Vary", "Accept-Language, Cookie");
    return response;
  }

  url.pathname = "/en";
  const response = NextResponse.rewrite(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Pages only: not the API, build files, or anything with a file extension.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
