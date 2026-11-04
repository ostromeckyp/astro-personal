import fs from "node:fs";
import path from "node:path";
import { expect, it } from "vitest";

function* sourceFiles(dir: string): Generator<string> {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(full);
    else if (full.endsWith(".tsx")) yield full;
  }
}

it("uses no ink 500 text, which is not an approved pair on the dark ground", () => {
  const offenders = [...sourceFiles("app"), ...sourceFiles("components")].filter((f) =>
    /text-ink-500/.test(fs.readFileSync(f, "utf8")),
  );
  expect(offenders).toEqual([]);
});
