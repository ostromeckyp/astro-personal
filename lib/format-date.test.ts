import { expect, it } from "vitest";
import { formatPostDate } from "./format-date";

it("formats a long date without timezone shift", () => {
  expect(formatPostDate("2026-08-08", "long")).toBe("8 August 2026");
});

it("formats a short date without timezone shift", () => {
  expect(formatPostDate("2026-03-12", "short")).toBe("12 Mar 2026");
});
