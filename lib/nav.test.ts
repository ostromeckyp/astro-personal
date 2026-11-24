import { describe, expect, it } from "vitest";
import { isActive, menuClosesOnClick } from "./nav";

describe("isActive", () => {
  it("marks a section active on its child routes", () => {
    expect(isActive("/use-cases/no-code-forms", "/use-cases")).toBe(true);
  });

  it("ignores a trailing slash", () => {
    expect(isActive("/use-cases/", "/use-cases")).toBe(true);
  });

  it("does not match a different section", () => {
    expect(isActive("/blog", "/use-cases")).toBe(false);
  });

  it("does not match a route that only shares a prefix", () => {
    expect(isActive("/approachable", "/approach")).toBe(false);
  });
});

describe("menuClosesOnClick", () => {
  it("closes at once for the page you are on", () => {
    expect(menuClosesOnClick("/services", "/services")).toBe(true);
    expect(menuClosesOnClick("/services/", "/services")).toBe(true);
    expect(menuClosesOnClick("/", "/")).toBe(true);
  });

  it("waits for navigation to another page", () => {
    expect(menuClosesOnClick("/services", "/blog")).toBe(false);
    expect(menuClosesOnClick("/blog/some-post", "/blog")).toBe(false);
  });
});
