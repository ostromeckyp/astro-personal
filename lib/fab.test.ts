import { describe, expect, it } from "vitest";
import { fabVisible } from "./fab";

describe("fabVisible", () => {
  const base = { path: "/", footerInView: false, scrollingDown: false };
  it("shows by default", () => expect(fabVisible(base)).toBe(true));
  it("hides on the contact page", () => expect(fabVisible({ ...base, path: "/contact" })).toBe(false));
  it("hides while the footer is on screen", () => expect(fabVisible({ ...base, footerInView: true })).toBe(false));
  it("hides while scrolling down", () => expect(fabVisible({ ...base, scrollingDown: true })).toBe(false));
});
