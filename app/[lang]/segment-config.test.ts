import fs from "node:fs";
import path from "node:path";
import { expect, it } from "vitest";

// The layout imports next/font, so read the segment config from source instead of importing it.
const source = (file: string) => fs.readFileSync(path.join(__dirname, file), "utf8");

it("404s any [lang] that isn't prerendered, so /index.html or /ads.txt can't render with an unknown language (500)", () => {
  expect(source("layout.tsx")).toMatch(/export const dynamicParams = false;/);
});

it("keeps unknown paths under a real language reaching the catch-all's in-layout 404", () => {
  expect(source("[...rest]/page.tsx")).toMatch(/export const dynamicParams = true;/);
});
