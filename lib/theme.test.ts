import { describe, expect, it } from "vitest";
import { resolveTheme, revealRadius, THEME_KEY, THEME_SCRIPT } from "./theme";

describe("resolveTheme", () => {
  it("keeps a saved choice over the system", () => {
    expect(resolveTheme("light", false)).toBe("light");
    expect(resolveTheme("dark", true)).toBe("dark");
  });

  it("follows the system when nothing is saved", () => {
    expect(resolveTheme(null, true)).toBe("light");
    expect(resolveTheme(null, false)).toBe("dark");
  });

  it("ignores a value it doesn't know", () => {
    expect(resolveTheme("blue", true)).toBe("light");
  });
});

function runScript({ stored, systemLight, storageThrows = false }: { stored?: string; systemLight: boolean; storageThrows?: boolean }) {
  const root = { dataset: {} as Record<string, string> };
  const localStorage = {
    getItem(key: string) {
      if (storageThrows) throw new Error("blocked");
      return key === THEME_KEY ? (stored ?? null) : null;
    },
  };
  const matchMedia = (query: string) => ({ matches: query === "(prefers-color-scheme: light)" && systemLight });
  new Function("document", "localStorage", "matchMedia", THEME_SCRIPT)({ documentElement: root }, localStorage, matchMedia);
  return root.dataset.theme;
}

describe("THEME_SCRIPT", () => {
  it("applies the saved choice before paint", () => {
    expect(runScript({ stored: "light", systemLight: false })).toBe("light");
  });

  it("falls back to the system when storage is blocked", () => {
    expect(runScript({ systemLight: true, storageThrows: true })).toBe("light");
  });
});

describe("revealRadius", () => {
  it("reaches the farthest corner", () => {
    expect(revealRadius(0, 0, 300, 400)).toBe(500);
    expect(revealRadius(300, 0, 300, 400)).toBe(500);
    expect(revealRadius(150, 200, 300, 400)).toBe(250);
  });
});
