# Motion pass, mobile FAB and service copy — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** First-visit splash with the `< ✦ >` mark, circular theme reveal, roller-blind mobile menu, mobile contact FAB, new service/heading copy, then a humanizer pass and an SEO/AI-visibility audit.

**Architecture:** Decisions that must happen before paint (splash) live in pure functions plus an inline `<head>` script string, tested the same way as `THEME_SCRIPT` in `lib/theme.test.ts`. Visual motion is CSS in `app/globals.css` keyed on attributes/classes set by small client components. Copy stays in `content/site/*.ts` (EN) and `content/site/pl/*.ts` (PL).

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4 (CSS-first), Vitest. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-25-motion-fab-copy-design.md`

## Global Constraints

- No new runtime dependencies.
- Entrance easing `cubic-bezier(0.2, 0.7, 0.2, 1)`; exit/reveal easing `cubic-bezier(0.4, 0, 0.2, 1)`.
- Animate only `transform`, `opacity`, `clip-path`, `stroke-dashoffset`.
- Every new animation sits inside `@media (prefers-reduced-motion: no-preference)` or has an explicit reduced-motion fallback.
- Polish copy from spec section 5 is Paweł's and is used verbatim; EN is the spec's translation.
- EN and PL dictionaries keep the same shape (`lib/dictionary.test.ts`).
- Instagram URL: `https://www.instagram.com/ostromecki.dev/`.
- Splash ~2.4 s; theme reveal ~500 ms; menu open ~360 ms / close ~280 ms.
- FAB only below `lg` (1024 px).
- Before writing Next code, read the relevant guide in `node_modules/next/dist/docs/` (AGENTS.md rule).
- Work on branch `feat/motion-fab-copy`, never on `main`.

## Review Focus

1. Returning visitor reloads any page → no splash, not even one frame (head script reads flag before paint). Pinned in Task 2 tests.
2. Storage blocked (Safari private, throwing `localStorage`) → no splash and no script error. Pinned in Task 2 tests.
3. Slow connection: JS hydrates after the 2.4 s timeline ended → splash has already left via CSS alone, page usable, nothing inert. Manual check (DevTools slow 3G) in Task 3.
4. Visitor skips the splash immediately (tap / Esc in the first 200 ms) → page usable at once: nothing left `inert`, scroll unlocked, `data-splash` removed. Manual check in Task 3.
5. Theme toggle clicked twice quickly, or a card→page morph right after a theme switch → final theme matches the last click, morph animation unchanged. `theme-reveal` class removed on `transition.finished`. Manual check in Task 4.
6. Short pages on a phone (e.g. 404, contact) → FAB never sits over the footer CTA or the form. Pinned in Task 6 `fabVisible` tests.

---

### Task 0: Branch and spec

- [ ] **Step 1:** `git switch -c feat/motion-fab-copy`
- [ ] **Step 2:** Commit the spec and this plan.

```bash
git add docs/superpowers/specs/2026-11-25-motion-fab-copy-design.md docs/superpowers/plans/2026-11-25-motion-fab-copy.md
git commit -m "docs: spec and plan for motion pass, FAB and service copy"
```

### Task 1: Copy changes and Instagram

**Files:**
- Modify: `content/site/services.ts`, `content/site/pl/services.ts` (items 01–07 `body`/`tags` per spec table)
- Modify: `content/site/home.ts`, `content/site/pl/home.ts` (`services.items[1].body` only)
- Modify: `content/site/use-cases.ts`, `content/site/pl/use-cases.ts` (`h1`)
- Modify: `content/site/talks.ts`, `content/site/pl/talks.ts` (`gallery.heading`)
- Modify: `content/site/contact.ts`, `content/site/pl/contact.ts`, `content/site/nav.ts`, `content/site/pl/nav.ts` (`socials`: add `{ href: INSTAGRAM, label: "Instagram" }` after GitHub)
- Modify: `lib/site.ts` (`PERSON.sameAs`; export `INSTAGRAM_URL`), `public/llms.txt` (add `- Instagram: …` under GitHub)
- Test: `lib/structured-data.test.ts`

**Interfaces:**
- Produces: `INSTAGRAM_URL: string` in `lib/site.ts` (used by Task 6).

- [ ] **Step 1: Failing test** in `lib/structured-data.test.ts`:

```ts
it("lists Instagram among the person's profiles", () => {
  expect(PERSON.sameAs).toContain("https://www.instagram.com/ostromecki.dev/");
});
```

- [ ] **Step 2:** `npx vitest run lib/structured-data.test.ts` → FAIL.
- [ ] **Step 3:** Add `INSTAGRAM_URL` and append it to `sameAs`. Run `npx vitest run lib/llms.test.ts` → FAIL (llms.txt lacks it); add the line to `public/llms.txt`.
- [ ] **Step 4:** Apply all copy edits exactly as in spec section 5 (PL verbatim; EN from the table; home card 02 body = the new "AI w realnych…" text in each language; use-cases h1 PL `"AI na produkcji, nie na demo."`, EN `"AI in production, not in a demo."`; talks heading PL `"Za kulisami"`, EN `"Behind the scenes"`; labels unchanged). Add Instagram to the four `socials` lists.
- [ ] **Step 5:** `grep -rn "Człowiek zatwierdza\|bez zatrudniania\|W drodze\|AI w pracy" content/site` → only the use-cases tags (`"Człowiek zatwierdza"` in `pl/use-cases.ts` tags is not in scope — leave it). Also check `public/llms.txt` for old service wording and align it.
- [ ] **Step 6:** `npm test` → all PASS (incl. `dictionary.test.ts`, `llms.test.ts`).
- [ ] **Step 7:** Commit `feat(copy): new service cards, headings and Instagram profile`.

### Task 2: Splash decision rule and head script

**Files:**
- Create: `lib/splash.ts`, `lib/splash.test.ts`
- Modify: `app/[lang]/layout.tsx` (second inline `<head>` script after `THEME_SCRIPT`)

**Interfaces:**
- Produces:
  - `SPLASH_KEY = "splash-seen"`
  - `BOT_PATTERN: RegExp` — `/bot|crawl|spider|slurp|lighthouse|pagespeed|headlesschrome|google-inspectiontool/i`
  - `shouldShowSplash(input: { seen: string | null; reducedMotion: boolean; userAgent: string; webdriver: boolean }): boolean` — true only when `seen` is null, no reduced motion, not webdriver, UA doesn't match `BOT_PATTERN`.
  - `SPLASH_SCRIPT: string` — inlined IIFE, same rule; on show it **first** writes `localStorage[SPLASH_KEY] = "1"`, **then** sets `document.documentElement.dataset.splash = "1"`; any storage exception (read or write) → do nothing.

- [ ] **Step 1: Failing tests** in `lib/splash.test.ts`, mirroring the `runScript` harness from `lib/theme.test.ts` (inject `document`, `localStorage`, `matchMedia`, `navigator` via `new Function`):

```ts
describe("shouldShowSplash", () => {
  const base = { seen: null, reducedMotion: false, userAgent: "Mozilla/5.0 (iPhone)", webdriver: false };
  it("shows on a first human visit", () => expect(shouldShowSplash(base)).toBe(true));
  it("skips once seen", () => expect(shouldShowSplash({ ...base, seen: "1" })).toBe(false));
  it("skips with reduced motion", () => expect(shouldShowSplash({ ...base, reducedMotion: true })).toBe(false));
  it("skips automation", () => expect(shouldShowSplash({ ...base, webdriver: true })).toBe(false));
  it.each(["Googlebot/2.1", "bingbot/2.0", "Chrome-Lighthouse", "HeadlessChrome/120"])("skips %s", (ua) =>
    expect(shouldShowSplash({ ...base, userAgent: ua })).toBe(false));
});

describe("SPLASH_SCRIPT", () => {
  it("marks the page and remembers the visit on a first visit", () => {
    const { dataset, stored } = runScript({});
    expect(dataset.splash).toBe("1");
    expect(stored[SPLASH_KEY]).toBe("1");
  });
  it("does nothing for a returning visitor", () => expect(runScript({ seen: "1" }).dataset.splash).toBeUndefined());
  it("does nothing and doesn't throw when storage is blocked", () =>
    expect(runScript({ storageThrows: true }).dataset.splash).toBeUndefined());
  it("does nothing for bots", () => expect(runScript({ userAgent: "Googlebot/2.1" }).dataset.splash).toBeUndefined());
  it("does nothing when storage reads but refuses writes (Safari private)", () =>
    expect(runScript({ setItemThrows: true }).dataset.splash).toBeUndefined());
  it.each([{ seen: "1" }, { userAgent: "Googlebot/2.1" }, { reducedMotion: true }, { webdriver: true }])(
    "writes no flag when it doesn't show (%o)", (opts) => expect(runScript(opts).stored).toEqual({}));
});
```

Harness differs from `lib/theme.test.ts:20`: `runScript({ seen?, userAgent?, webdriver?, reducedMotion?, getItemThrows?, setItemThrows? })` injects `document` (`{ documentElement: { dataset } }`), `localStorage` (`getItem`/`setItem` backed by a `stored` record, each optionally throwing), `matchMedia` answering `(prefers-reduced-motion: reduce)`, and `navigator` (`{ userAgent, webdriver }`); returns `{ dataset, stored }`. Rename the earlier `storageThrows` case to `getItemThrows`.

```ts
```

- [ ] **Step 2:** `npx vitest run lib/splash.test.ts` → FAIL.
- [ ] **Step 3:** Implement `lib/splash.ts` (build `SPLASH_SCRIPT` with `JSON.stringify` for key and `BOT_PATTERN.source`, like `THEME_SCRIPT`). Add `<script dangerouslySetInnerHTML={{ __html: SPLASH_SCRIPT }} />` in layout `<head>`.
- [ ] **Step 4:** `npx vitest run lib/splash.test.ts` → PASS.
- [ ] **Step 5:** Commit `feat(splash): first-visit decision and head script`. (Don't deploy this commit without Task 3 — it would burn the flag with no splash.)

### Task 3: Splash overlay and animation

**Files:**
- Create: `components/Splash.tsx` (client)
- Modify: `app/[lang]/layout.tsx` (render `<Splash skip={COMMON.skipSplash} />` first in `<body>`), `app/globals.css`, `content/site/nav.ts` + `pl/nav.ts` (`COMMON.skipSplash`: EN `"Skip"`, PL `"Pomiń"`)

**Interfaces:**
- Consumes: `data-splash` on `<html>` from Task 2.
- Produces: CSS keyframe `circle-open` (clip-path hole from centre), reused conceptually by Task 4.

- [ ] **Step 1:** Markup: fixed full-screen `div.splash` (`z-[70]`, `bg-ink-950`) with `role="dialog" aria-modal="true" aria-label={label}` (add `COMMON.splashLabel`: EN `"Welcome"`, PL `"Powitanie"`); `aria-hidden` only on the decorative SVG and wordmark images. Laptop: the lid is its **own `<svg>` element** inside a `<div>` with `perspective` (3D transforms on inner SVG `<g>` are flattened in Safari/Firefox); base and screen content are sibling layers. Content with the `< ✦ >` geometry from `app/icon.svg` on its screen, the wordmark (same logo images as `Nav`'s `Logo`, theme-matched with `only-dark`/`only-light`), and a "Pomiń" button.
- [ ] **Step 2:** CSS: `html:not([data-splash]) .splash { display: none }`. **CSS owns the end state** so the page works without JS: the overlay's exit keyframe `circle-open` ends with `visibility: hidden; pointer-events: none`, `animation-fill-mode: forwards`. `[data-splash-exit]` sets child animations to `animation: none` (end pose) so nothing keeps moving while the hole opens. Inside the no-preference block, keyframes for the timeline: lid `rotateX` 0–0.6 s with `perspective`, brackets `stroke-dashoffset` draw 0.6–1.2 s, star scale+rotate pop, laptop dim + wordmark in 1.2–1.8 s, overlay `clip-path` hole opening from centre 1.8–2.4 s (`circle-open`). Use the global easings.
- [ ] **Step 3:** Behaviour in `Splash.tsx`: on mount, if `data-splash` is absent → render nothing further. If present and `overlay.getAnimations({ subtree: true }).every(a => a.playState === "finished")` (hydrated late) → remove `data-splash` immediately, no lock. Otherwise → set `inert` on every `body > *` except the overlay (covers skip link and `#contact-fab`), `overflow: hidden` on body, focus the skip button. Finish only on `animationend` where `e.target === overlay && e.animationName === "circle-open"` (child `animationend` events bubble). Skip (button, click on overlay, `Esc`) → add `data-splash-exit` (400 ms circle-open), then the same finish: remove `data-splash`, inert and overflow lock.
- [ ] **Step 4:** Manual check (`npm run dev`, mobile and desktop widths, both themes): first visit plays once; reload → none; skip at 0.2 s → page fully usable (Review Focus 4); DevTools slow 3G with cache disabled → splash still exits and page usable (Review Focus 3); reduced motion in devtools → none; clear `splash-seen` to replay; axe/Lighthouse a11y has no aria-hidden-focus violation.
- [ ] **Step 5:** `npm run lint && npm run type-check && npm test` → clean.
- [ ] **Step 6:** Commit `feat(splash): laptop and mark intro on first visit`.

### Task 4: Circular theme reveal

**Files:**
- Modify: `lib/theme.ts`, `lib/theme.test.ts`, `components/ThemeToggle.tsx`, `app/globals.css`

**Interfaces:**
- Produces: `revealRadius(x: number, y: number, width: number, height: number): number` — distance from (x, y) to the farthest viewport corner.

- [ ] **Step 1: Failing test:**

```ts
describe("revealRadius", () => {
  it("reaches the farthest corner", () => {
    expect(revealRadius(0, 0, 300, 400)).toBe(500);
    expect(revealRadius(300, 0, 300, 400)).toBe(500);
    expect(revealRadius(150, 200, 300, 400)).toBe(250);
  });
});
```

- [ ] **Step 2:** `npx vitest run lib/theme.test.ts` → FAIL. Implement with `Math.hypot(Math.max(x, w - x), Math.max(y, h - y))`. → PASS.
- [ ] **Step 3:** `flip()` in `ThemeToggle`: if `document.startViewTransition` exists and reduced motion is off, set `--reveal-x/--reveal-y/--reveal-r` (px) on `<html>`, add class `theme-reveal`, call `startViewTransition(apply)`, remove the class on `transition.finished` **only if no newer reveal started** (module-level counter; a second click skips the first transition and its `finished` must not strip the class from the second). Otherwise apply directly.
- [ ] **Step 4:** CSS: `.theme-reveal::view-transition-old(root) { animation: none }`, `.theme-reveal::view-transition-new(root) { animation: theme-reveal 500ms cubic-bezier(0.4, 0, 0.2, 1) }` with `clip-path: circle(0 at var(--reveal-x) var(--reveal-y))` → `circle(var(--reveal-r) at …)`. Also `.theme-reveal::view-transition-old(root), .theme-reveal::view-transition-new(root) { mix-blend-mode: normal; }` (UA default `plus-lighter` washes the circle out). Existing card→page rules untouched (React 19 sets `view-transition-name` only during its own transitions, so a manual `startViewTransition` snapshots root only).
- [ ] **Step 5:** Manual: toggle in both directions on mobile and desktop; double-click fast (second reveal still animates as a circle); open a use-case card right after a switch (Review Focus 5); reduced motion → instant switch.
- [ ] **Step 6:** Commit `feat(theme): circular reveal from the toggle`.

### Task 5: Roller-blind mobile menu

**Files:**
- Modify: `components/Nav.tsx` (rename `MENU_FADE_MS` → `MENU_CLOSE_MS = 280`), `app/globals.css` (replace the `#mobile-menu` fade rules)

- [ ] **Step 1:** CSS in the no-preference block: `#mobile-menu:not([hidden])` → `menu-down 360ms cubic-bezier(0.2, 0.7, 0.2, 1)` (`clip-path: inset(0 0 100% 0)` → `inset(0)`); `#mobile-menu[data-closing]` → `menu-up 280ms cubic-bezier(0.4, 0, 0.2, 1)` (reverse). Keep link `rise-in` and `.menu-x`. Comment that `MENU_CLOSE_MS` must match.
- [ ] **Step 2:** Rename constant and its uses; keep the "close after next page renders" logic as is.
- [ ] **Step 3:** Manual: open/close via button, Esc, link to another page (rolls up over the new page), link to current page; reduced motion → instant.
- [ ] **Step 4:** `npm run lint && npm run type-check` → clean. Commit `feat(nav): roller-blind mobile menu`.

### Task 6: Mobile contact FAB

**Files:**
- Create: `lib/fab.ts`, `lib/fab.test.ts`, `components/ContactFab.tsx` (client)
- Modify: `content/site/nav.ts`, `content/site/pl/nav.ts` (new `FAB` export), `lib/dictionary.ts` (expose `FAB`), `app/[lang]/layout.tsx` (render after `<Footer>`), `components/Nav.tsx` (add `#contact-fab` to the `behind` inert list), `app/globals.css`

**Interfaces:**
- Consumes: `INSTAGRAM_URL` (Task 1), `PERSON.telephone`/`PERSON.email` (`lib/site.ts`), `isActive` (`lib/nav.ts`).
- Produces:
  - `fabVisible(input: { path: string; footerInView: boolean; scrollingDown: boolean }): boolean`
  - `FAB` copy: `{ open, close, panel, call, email, form, profiles: { href: string; label: string }[] }` — EN `"Open quick contact"`, `"Close quick contact"`, `"Quick contact"`, `"Call"`, `"Send an email"`, `"Contact form"`; PL `"Otwórz szybki kontakt"`, `"Zamknij szybki kontakt"`, `"Szybki kontakt"`, `"Zadzwoń"`, `"Wyślij wiadomość"`, `"Formularz kontaktowy"`; profiles GitHub, Instagram, LinkedIn (in that order).

- [ ] **Step 1: Failing tests** in `lib/fab.test.ts`:

```ts
const base = { path: "/", footerInView: false, scrollingDown: false };
it("shows by default", () => expect(fabVisible(base)).toBe(true));
it("hides on the contact page", () => expect(fabVisible({ ...base, path: "/contact" })).toBe(false));
it("hides while the footer is on screen", () => expect(fabVisible({ ...base, footerInView: true })).toBe(false));
it("hides while scrolling down", () => expect(fabVisible({ ...base, scrollingDown: true })).toBe(false));
```

(`path` is already locale-stripped, as in `Nav`.) The spec's "hidden while menu or splash open" is covered by stacking, not by this rule: menu `z-50` and splash `z-[70]` sit above FAB `z-40`, and both make `#contact-fab` inert.

- [ ] **Step 2:** `npx vitest run lib/fab.test.ts` → FAIL. Implement. → PASS.
- [ ] **Step 3:** `ContactFab.tsx`: `id="contact-fab"`, `lg:hidden`, `fixed right-4 z-40`, bottom `calc(1rem + env(safe-area-inset-bottom))`. 56 px round accent button with the ✦ path from `app/icon.svg`, rotating into × when open; `aria-expanded`, `aria-controls`. Panel above it: three action links (`tel:`, `mailto:`, `LocaleLink href="/contact"`) and a row of three profile links with inline stroke icons and visible labels, `NEW_TAB` on external ones. Footer observed with IntersectionObserver; scroll direction from `scrollY` deltas with a ~8 px threshold. Hidden state = `translateY` + `opacity` transition plus `visibility: hidden` toggled after the slide (`transition: …, visibility 0s 300ms`) so the hidden button isn't a tab stop; don't add `viewport-fit=cover` (safe-area inset is 0 without it — fine); closes on outside tap, `Esc`, item click; focus into panel on open, back to button on close.
- [ ] **Step 4:** CSS (no-preference block): panel `fab-up` 300 ms entrance easing (`clip-path: inset(100% 0 0 0)` → `inset(0)`), reverse on close.
- [ ] **Step 5:** Manual at 375 px: home, services, blog post, 404, `/contact` (no FAB), scroll to footer (FAB gone), open burger (FAB covered and inert), splash (covered).
- [ ] **Step 6:** `npm run lint && npm run type-check && npm test` → clean. Commit `feat(fab): mobile quick-contact toolbox`.

### Task 7: Full verification

- [ ] **Step 1:** `npm run lint && npm run type-check && npm test && npm run build` → all clean.
- [ ] **Step 2:** `npm start` in background, then `node scripts/verify-site.mjs --bodies main --html --seo` → passes.
- [ ] **Step 3:** LCP check at 375 px (Performance panel, first visit with splash): LCP element is still hero content, not the splash wordmark; wordmark stays nav-logo size with no extra `preload`.
- [ ] **Step 4:** Browser pass (Claude in Chrome) over home, services, use cases, talks, contact in PL and EN, light/dark, 375 px and 1440 px; screenshot splash mid-play and FAB open for Paweł.

### Task 8: Humanizer pass (proposals only)

- [ ] **Step 1:** Run `/humanizer` over page copy in `content/site/*.ts` and `content/site/pl/*.ts` (not blog posts). Exclude spec section 5 Polish lines from rewrites; flag only.
- [ ] **Step 2:** Present proposed rewrites to Paweł as a before/after list per file. Stop and wait.
- [ ] **Step 3:** Apply only approved changes, keeping EN/PL shape; `npm test`; commit `copy: humanizer pass`.

### Task 9: SEO + AI visibility audit (proposals only)

- [ ] **Step 1:** Run `/small-business:seo-ai-visibility` against the local production build (`npm run build && npm start`), covering crawlability, no-JS rendering, `llms.txt`, schema.org, titles/descriptions. Confirm the splash is absent for bot user agents.
- [ ] **Step 2:** Present prioritised findings. Stop and wait for Paweł's picks.
- [ ] **Step 3:** Apply picked fixes with tests where code changes (`lib/*.test.ts`), run Task 7 Step 1, commit `seo: fixes from AI-visibility audit`.
- [ ] **Step 4:** Summarise all changes to Paweł in Polish (as requested in the original brief).
