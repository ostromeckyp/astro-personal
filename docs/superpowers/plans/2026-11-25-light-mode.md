# Light Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Light theme for the whole site, following the system by default, with a sun/moon toggle in the nav that remembers the choice.

**Architecture:** Dark stays the `@theme` default. `<html data-theme="light">` redefines the colour tokens, so components keep their classes. An inline script in `<head>` sets `data-theme` before first paint from `localStorage` or `prefers-color-scheme`. A client `ThemeToggle` flips and saves it.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4 (`@theme` in `app/globals.css`), Vitest.

**Spec:** `docs/superpowers/specs/2026-11-25-light-mode-design.md`

## Global Constraints

- Light accent text colour: `#5c7300`. Lime `#ccff00` stays for fills, bars, borders, glows.
- Text on lime fills is near-black in both themes.
- Storage key: `localStorage["theme"]`, values `"light" | "dark"`. No cookie, no `proxy.ts` change; pages stay static.
- Toggle shows the sun in dark mode, the moon in light mode. Inline SVG, no new dependency.
- Case-study stages/window mockups and Shiki code blocks stay dark in both themes.
- Text ≥ 4.5:1 contrast in both themes.
- Copy changes go to both `content/site/nav.ts` and `content/site/pl/nav.ts` (`lib/dictionary.test.ts` checks shape).
- Do not commit unless the author asks.

## Review Focus

- `localStorage` throws (Safari private mode, blocked storage): page must still render with the system theme, toggle must still flip for the session. → test in Task 1.
- Garbage stored value (`"blue"`): treated as no choice, falls back to system. → test in Task 1.
- Visitor changes system theme while the page is open and has never clicked: page follows. → listener in Task 3, manual check in Task 4.
- Toggle markup on first render must not cause a hydration mismatch (server doesn't know the theme). → Task 3 renders both icons, CSS picks one.
- Lime-filled elements (primary button, step progress bar, active dots) keep dark text/contrast in light mode. → manual check in Task 4.

---

### Task 1: Theme logic

**Files:**
- Create: `lib/theme.ts`
- Test: `lib/theme.test.ts`

**Interfaces:**
- Produces:
  - `type Theme = "light" | "dark"`
  - `THEME_KEY = "theme"`
  - `resolveTheme(stored: string | null, systemLight: boolean): Theme`
  - `THEME_SCRIPT: string` — self-contained JS for `<head>`; reads `localStorage[THEME_KEY]` inside `try`, falls back to `matchMedia("(prefers-color-scheme: light)")`, sets `document.documentElement.dataset.theme`.

- [ ] **Step 1: Write failing tests** in `lib/theme.test.ts`, style as `lib/nav.test.ts`:
  - `resolveTheme("light", false)` → `"light"`; `resolveTheme("dark", true)` → `"dark"`
  - `resolveTheme(null, true)` → `"light"`; `resolveTheme(null, false)` → `"dark"`
  - `resolveTheme("blue", true)` → `"light"`
  - `THEME_SCRIPT` run via `new Function("document", "localStorage", "matchMedia", THEME_SCRIPT)` with fakes:
    - stored `"light"`, system dark → `dataset.theme === "light"`
    - `localStorage.getItem` throws, system light → `dataset.theme === "light"` and no throw
- [ ] **Step 2:** `npx vitest run lib/theme.test.ts` → FAIL (module not found).
- [ ] **Step 3:** Implement `lib/theme.ts`. `THEME_SCRIPT` must reference only the globals `document`, `localStorage`, `matchMedia` (so the test can inject them) and inline its own copy of the resolve rule; keep it one short IIFE.
- [ ] **Step 4:** `npx vitest run lib/theme.test.ts` → PASS.

### Task 2: Light tokens and accent classes

**Files:**
- Modify: `app/globals.css` (tokens at top, `html` base rule, `.article-glow`, `.stage-glow`, focus outline, prose rules ~lines 390–445, stage/window rules ~lines 120–280)
- Modify: every file using `text-sakura-*` (20 files: `grep -rlE "text-sakura-[0-9]+" app components`)
- Modify: `components/ui/Button.tsx:31`

**Interfaces:**
- Produces Tailwind utilities `text-accent`, `bg-accent`, `text-on-accent` and the `.stay-dark` class.

- [ ] **Step 1: Tokens.** In `@theme` add `--color-accent: #ccff00` and `--color-on-accent: #000002`. Add:
  ```css
  :root[data-theme="light"] {
    color-scheme: light;
    --color-ink-950: #fefefe; --color-ink-900: #f7f7f9; --color-ink-800: #f0f0f3;
    --color-ink-700: #e4e4e9; --color-ink-600: #d3d3da; --color-ink-500: #9a9aa6;
    --color-ink-400: #5b5b66; --color-ink-200: #1d1d24; --color-ink-100: #131318;
    --color-ink-0: #0a0a0f;
    --color-accent: #5c7300;
    --color-danger-500: #d0182b; --color-danger-300: #b3121f;
  }
  ```
  Values are starting points; adjust visually but keep ≥ 4.5:1 for `ink-400` and `accent` on `ink-950`/`ink-800`. Move `color-scheme: dark` off the `html` rule into `:root` so the light rule can override it.
- [ ] **Step 2: Accent text.** Replace `text-sakura-500` and `text-sakura-300` with `text-accent` (and `hover:text-sakura-*` with `hover:text-accent`). Leave `bg-/border-/decoration-sakura-*`. In `globals.css`, `color: var(--color-sakura-*)` in prose/stage rules → `var(--color-accent)`; focus `outline` → `var(--color-accent)`.
- [ ] **Step 3: Text on lime.** `Button.tsx` primary: `text-ink-950` → `text-on-accent`. Same for any other text sitting on `bg-sakura-*` (check `ContactForm.tsx:41`, the use-case pages).
- [ ] **Step 4: Stay dark.** Add `.stay-dark` that re-declares the dark ink values and `--color-accent: #ccff00` plus `color-scheme: dark`. Put it on the case-study stage root(s) (find the `.stage` element in `components/case-study/`). Shiki blocks: confirm they render with fixed colours; if their background uses an ink token, add `.stay-dark` to `pre` via the prose rule.
- [ ] **Step 5: Glows.** Under `:root[data-theme="light"]` lower `.article-glow`/`.stage-glow` lime alpha (start at half) — the stage glow sits inside `.stay-dark`, so check it only if it's outside.
- [ ] **Step 6:** `npm run type-check && npm test && npm run lint` → clean. `grep -rE "text-sakura-" app components` → no output.

### Task 3: Toggle and no-flash script

**Files:**
- Create: `components/ThemeToggle.tsx`
- Modify: `app/[lang]/layout.tsx` (head script, `suppressHydrationWarning` on `<html>`)
- Modify: `components/Nav.tsx` (place toggle)
- Modify: `content/site/nav.ts`, `content/site/pl/nav.ts` (`COMMON`)

**Interfaces:**
- Consumes: `THEME_KEY`, `THEME_SCRIPT`, `Theme` from Task 1.
- Produces: `ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string })`.

- [ ] **Step 1: Copy.** Add to `COMMON`: EN `themeToLight: "Switch to light mode"`, `themeToDark: "Switch to dark mode"`; PL `themeToLight: "Włącz jasny motyw"`, `themeToDark: "Włącz ciemny motyw"`. Run `npx vitest run lib/dictionary.test.ts` → PASS.
- [ ] **Step 2: Script.** In `layout.tsx`, add `<head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head>` and `suppressHydrationWarning` on `<html>`. Check `node_modules/next/dist/docs/` for the current guidance on inline scripts in the root layout before writing it.
- [ ] **Step 3: Toggle.** Client component, a `<button type="button">` styled like the language links (`inline-flex h-8 min-w-8 items-center justify-center rounded-md text-ink-400 hover:text-ink-0`). Render both a sun and a moon SVG; CSS shows the sun when `data-theme` is not `light` and the moon when it is (e.g. `[data-theme=light] .theme-sun{display:none}` rules in `globals.css`), so server and client markup match. Click: read current `document.documentElement.dataset.theme`, flip it, set it, save to `localStorage` in `try/catch`. `aria-label` must match the action; keep it in state read after mount (`useSyncExternalStore` over a `MutationObserver` on `data-theme`, server snapshot `"dark"` → label `toLight`). While no choice is stored, subscribe to the `prefers-color-scheme` media query and apply its changes.
- [ ] **Step 4: Nav.** In `Nav.tsx` put `<ThemeToggle toLight={copy.themeToLight} toDark={copy.themeToDark} />` in the right-hand group before the language switch, visible at all widths (not inside the `hidden sm:block` wrappers).
- [ ] **Step 5:** `npm run type-check && npm test && npm run lint` → clean.

### Task 4: Verify in the browser

- [ ] **Step 1:** `npm run build` → success; `node scripts/verify-site.mjs --bodies main --html --seo` → passes.
- [ ] **Step 2:** `npm run dev`. With system dark: home, services, a use case, blog list, a post, talks, contact, 404 — no flash, dark as before.
- [ ] **Step 3:** Click toggle → light. Same pages: readable text, accent `#5c7300` on step numbers/labels/links, primary button lime with dark text, HowSteps progress bar visible, stages and code blocks dark, focus ring visible.
- [ ] **Step 4:** Reload → stays light. Clear `localStorage`, set system light → loads light with no flash; switch system to dark while open → follows.
- [ ] **Step 5:** Mobile width (375px): toggle visible in the bar, tap target ≥ 32px; open the mobile menu in light mode, check its colours.
- [ ] **Step 6:** Report to the author with screenshots of home + a post in both themes; commit only if asked.
