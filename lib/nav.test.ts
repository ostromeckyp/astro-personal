import { describe, expect, it } from "vitest";
import { isActive } from "./nav";

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
