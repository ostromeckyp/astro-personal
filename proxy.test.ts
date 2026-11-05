import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./proxy";

const run = (path: string, headers: Record<string, string> = {}) =>
  proxy(new NextRequest(`https://www.ostromecki.dev${path}`, { headers }));
const rewriteTo = (res: Response) => res.headers.get("x-middleware-rewrite");

describe("proxy", () => {
  it("sends a Polish browser to the Polish page, keeping the query", () => {
    const res = run("/blog?topic=Angular", { "accept-language": "pl-PL,pl;q=0.9,en;q=0.8" });
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://www.ostromecki.dev/pl/blog?topic=Angular");
    expect(res.headers.get("vary")).toContain("Accept-Language");
  });

  it("sends the Polish root to /pl", () => {
    expect(run("/", { "accept-language": "pl" }).headers.get("location")).toBe("https://www.ostromecki.dev/pl");
  });

  it("serves English at plain URLs to other browsers and to crawlers", () => {
    expect(rewriteTo(run("/services", { "accept-language": "en-US,pl;q=0.5" }))).toContain("/en/services");
    expect(rewriteTo(run("/services"))).toContain("/en/services");
    expect(rewriteTo(run("/"))).toContain("/en");
  });

  it("lets a saved English choice beat a Polish browser", () => {
    const res = run("/services", { "accept-language": "pl", cookie: "lang=en" });
    expect(rewriteTo(res)).toContain("/en/services");
  });

  it("lets a saved Polish choice beat an English browser", () => {
    expect(run("/services", { "accept-language": "en", cookie: "lang=pl" }).headers.get("location")).toContain("/pl/services");
  });

  it("ignores a junk cookie", () => {
    expect(rewriteTo(run("/services", { cookie: "lang=xx" }))).toContain("/en/services");
  });

  it("leaves Polish URLs alone, even for an English browser", () => {
    const res = run("/pl/services", { "accept-language": "en" });
    expect(res.headers.get("location")).toBeNull();
    expect(rewriteTo(res)).toBeNull();
  });

  it("does not treat similar paths as Polish", () => {
    expect(rewriteTo(run("/platform", { "accept-language": "en" }))).toContain("/en/platform");
  });

  it("redirects internal /en URLs to plain ones", () => {
    const res = run("/en/services");
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://www.ostromecki.dev/services");
  });
});
