import { describe, expect, it } from "vitest";
import { localePath, preferredLocale, stripLocale } from "./i18n";

describe("preferredLocale", () => {
  it.each([
    ["pl", "pl"],
    ["pl-PL,pl;q=0.9,en-US;q=0.8", "pl"],
    ["en-US,en;q=0.9,pl;q=0.8", "en"],
    ["de-DE,de;q=0.9", "en"],
    ["en;q=0.5,pl;q=0.9", "pl"],
    ["PL-pl", "pl"],
    ["*", "en"],
    ["", "en"],
    [null, "en"],
  ])("%s gives %s", (header, expected) => {
    expect(preferredLocale(header)).toBe(expected);
  });

  it("does not mistake other languages starting with pl", () => {
    expect(preferredLocale("plt")).toBe("en");
  });
});

describe("localePath", () => {
  it("leaves English paths alone", () => {
    expect(localePath("en", "/services")).toBe("/services");
  });

  it("prefixes Polish paths, keeping anchors and queries", () => {
    expect(localePath("pl", "/services#service-01")).toBe("/pl/services#service-01");
    expect(localePath("pl", "/blog?topic=Angular")).toBe("/pl/blog?topic=Angular");
  });

  it("maps the root", () => {
    expect(localePath("pl", "/")).toBe("/pl");
    expect(localePath("en", "/")).toBe("/");
  });

  it("leaves external, anchor and file links alone", () => {
    expect(localePath("pl", "https://x.com/a")).toBe("https://x.com/a");
    expect(localePath("pl", "mailto:a@b.co")).toBe("mailto:a@b.co");
    expect(localePath("pl", "#top")).toBe("#top");
    expect(localePath("pl", "/cv.pdf")).toBe("/cv.pdf");
  });
});

describe("stripLocale", () => {
  it("removes the Polish prefix", () => {
    expect(stripLocale("/pl/services")).toBe("/services");
    expect(stripLocale("/pl")).toBe("/");
    expect(stripLocale("/services")).toBe("/services");
    expect(stripLocale("/platform")).toBe("/platform");
  });

  it("removes the internal English prefix, which pages see while prerendering", () => {
    expect(stripLocale("/en/services")).toBe("/services");
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/engineering")).toBe("/engineering");
  });
});
