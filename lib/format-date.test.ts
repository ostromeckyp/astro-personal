import { expect, it } from "vitest";
import { formatPostDate } from "./format-date";

it("formats a long date without timezone shift", () => {
  expect(formatPostDate("2026-08-08", "long")).toBe("8 August 2026");
});

it("formats a short date without timezone shift", () => {
  expect(formatPostDate("2026-03-12", "short")).toBe("12 Mar 2026");
});

it("formats dates in Polish", () => {
  expect(formatPostDate("2026-08-08", "long", "pl")).toBe("8 sierpnia 2026");
  expect(formatPostDate("2026-03-12", "short", "pl")).toBe("12.03.2026");
});
