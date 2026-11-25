import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./proxy";

const run = (path: string, headers: Record<string, string> = {}) =>
  proxy(new NextRequest(`https://www.ostromecki.dev${path}`, { headers }));
const rewriteTo = (res: Response) => res.headers.get("x-middleware-rewrite");

describe("proxy", () => {
  it("sends a Polish browser on the home page to /pl, keeping the query", () => {
    const res = run("/?ref=x", { "accept-language": "pl-PL,pl;q=0.9,en;q=0.8" });
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://www.ostromecki.dev/pl?ref=x");
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

  it("serves an English subpage in English even to a Polish browser, so the URL matches its canonical", () => {
    for (const path of ["/blog/code-became-cheap", "/services", "/blog?topic=Angular"]) {
      const res = run(path, { "accept-language": "pl-PL,pl;q=0.9" });
      expect(res.headers.get("location"), path).toBeNull();
      expect(rewriteTo(res), path).toContain(`/en${path.split("?")[0]}`);
    }
  });

  it("does not send a saved Polish choice away from an English subpage", () => {
    const res = run("/services", { "accept-language": "en", cookie: "lang=pl" });
    expect(res.headers.get("location")).toBeNull();
    expect(rewriteTo(res)).toContain("/en/services");
  });

  it("lets a saved English choice beat a Polish browser on the home page", () => {
    const res = run("/", { "accept-language": "pl", cookie: "lang=en" });
    expect(res.headers.get("location")).toBeNull();
    expect(rewriteTo(res)).toContain("/en");
  });

  it("lets a saved Polish choice beat an English browser on the home page", () => {
    expect(run("/", { "accept-language": "en", cookie: "lang=pl" }).headers.get("location")).toBe("https://www.ostromecki.dev/pl");
  });

  it("ignores a junk cookie", () => {
    expect(rewriteTo(run("/", { cookie: "lang=xx" }))).toContain("/en");
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
