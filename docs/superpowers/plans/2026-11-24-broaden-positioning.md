# Broaden Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition ostromecki.dev from "AI consultant" to "software for real business, AI included", cut duplicated content (`/approach`, `NextStepCta`, "co dostajesz"), add interactive "Jak pracuję" steps on the home page, and fix the mobile menu flash.

**Architecture:** All copy lives in typed dictionaries (`content/site/*.ts` EN, `content/site/pl/*.ts` PL typed `typeof EN`, wired in `lib/dictionary.ts`). Pages are server components in `app/[lang]/`; interactive bits are client components. Pure logic goes in `lib/*.ts` with vitest tests (node env, no DOM testing library); UI is verified in the browser.

**Tech Stack:** Next 16 App Router, React 19, Tailwind 4 (`@theme` tokens in `app/globals.css`), vitest.

**Spec:** `docs/superpowers/specs/2026-11-24-broaden-positioning-design.md`. Read it first; it holds the exact Polish copy. This plan repeats only what a task needs.

## Global Constraints

- Every copy change lands in both EN and PL; `lib/dictionary.test.ts` "same shape" test must pass.
- No new runtime dependencies. Logos are inline SVG paths from Simple Icons (CC0).
- Keep the visual system: dark, `sakura-500` accent, `reveal` / `rise-in` animations, `rounded-card`, mono meta labels.
- Every animation is off under `prefers-reduced-motion: reduce`.
- No horizontal page scroll at 390 px width.
- No invented numbers, certifications or promises ("opieram się na OWASP…", never "zgodne z").
- PL meta titles ≤ 70 chars incl. suffix, descriptions ≤ 160 (enforced by `lib/dictionary.test.ts`).
- Work on branch `feat/broaden-positioning`. The index already has unrelated staged files under `Claude outputs/`; never commit them. Commit with an explicit pathspec: `git commit -m "<msg>" -- <paths>`. End each commit message with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Before finishing: `npm run lint`, `npm run type-check`, `npm test`, `npm run build` all pass.

## Review Focus

1. Mobile menu: tapping the link of the page you are already on must still close the menu (otherwise it stays open forever). Pinned by `menuClosesOnClick` tests in Task 7.
2. Old URLs `/approach` and `/pl/approach` must 301 to the home section, not 404. Pinned by `next.config.test.ts` in Task 2.
3. Steps auto-advance must never steal focus or keep running after the visitor interacts; with reduced motion it must not run at all. Pinned by `autoAdvanceAllowed` tests in Task 6.
4. Long hero word „oprogramowanie” must not overflow at 390 px / 768 px. Checked in browser in Task 3 Step 4.
5. All 4 step texts must be in server HTML (crawlers, no-JS). Checked via `curl` in Task 6.

---

### Task 1: Remove `NextStepCta`

**Files:**
- Delete: `components/ui/NextStepCta.tsx`
- Modify: `content/site/nav.ts` (drop `NEXT_STEP`), `content/site/pl/nav.ts` (drop `NEXT_STEP` and its import alias `N`), `lib/dictionary.ts` (drop `NEXT_STEP` from both `en` and `pl`)
- Modify: `app/[lang]/services/page.tsx`, `app/[lang]/use-cases/page.tsx`, `app/[lang]/about/page.tsx`, `app/[lang]/approach/page.tsx` (remove import, destructuring, and the `<NextStepCta>` element)
- Test: `lib/dictionary.test.ts`

**Interfaces:** Produces: dictionaries without `NEXT_STEP`.

- [ ] **Step 1: Write the failing test** in `lib/dictionary.test.ts` inside `describe("dictionaries")`:

```ts
it("drop the next-step tile, the footer already asks", () => {
  expect("NEXT_STEP" in getDictionary("en")).toBe(false);
  expect("NEXT_STEP" in getDictionary("pl")).toBe(false);
});
```

- [ ] **Step 2: Run** `npx vitest run lib/dictionary.test.ts` → FAIL on the new test.
- [ ] **Step 3: Remove** as listed. Where the CTA was wrapped in `<div className="pb-32">`, delete the wrapper and give the last section `pb-32` if it has a smaller bottom padding (services: FAQ section `pb-20` → `pb-32`; about: last section; use-cases: CTA was inside the `pb-32` section, just delete it).
- [ ] **Step 4: Run** `npx vitest run && npm run type-check` → PASS.
- [ ] **Step 5: Commit** `fix: drop the next-step tile duplicated by the footer`.

### Task 2: Remove `/approach`, redirect to the home section

**Files:**
- Delete: `app/[lang]/approach/`, `content/site/approach.ts`, `content/site/pl/approach.ts`
- Modify: `lib/dictionary.ts` (drop `APPROACH`), `content/site/meta.ts` + `content/site/pl/meta.ts` (drop `approach`), `app/sitemap.ts` (drop route), `app/sitemap.test.ts` (move `"/approach"` from the "contains" list to `expect(urls).not.toContain("/approach")`), `content/site/nav.ts` + `content/site/pl/nav.ts` (drop the `/approach` link), `content/site/home.ts` + `content/site/pl/home.ts` (drop `how.all`), `app/[lang]/page.tsx` (drop `action` on the how `SectionHeading`), `public/llms.txt` (drop the `[Approach]` line), `next.config.ts`
- Create: `next.config.test.ts`

**Interfaces:** Produces: section anchor id `how-i-work` (Task 6 puts it on the section).

- [ ] **Step 1: Write the failing test** `next.config.test.ts`:

```ts
import { expect, it } from "vitest";
import config from "./next.config";

it("sends the removed approach page to the home section", async () => {
  const rules = await config.redirects!();
  expect(rules).toContainEqual({ source: "/approach", destination: "/#how-i-work", permanent: true });
  expect(rules).toContainEqual({ source: "/pl/approach", destination: "/pl#how-i-work", permanent: true });
});
```

Also update `app/sitemap.test.ts` as above.

- [ ] **Step 2: Run** `npx vitest run next.config.test.ts app/sitemap.test.ts` → FAIL.
- [ ] **Step 3: Implement**: add the two rules before the old-host rule in `next.config.ts`; delete/modify the files listed.
- [ ] **Step 4: Run** `npx vitest run && npm run type-check` → PASS (`lib/llms.test.ts` confirms llms.txt links no removed page).
- [ ] **Step 5: Commit** `feat: fold the approach page into the home page`.

### Task 3: Positioning copy

**Files:**
- Modify: `content/site/home.ts`, `content/site/pl/home.ts` (hero `h1`, `groups`, `captions`; `intro`)
- Modify: `content/site/meta.ts`, `content/site/pl/meta.ts` (`home`, `services`)
- Modify: `content/site/services.ts`, `content/site/pl/services.ts` (`h1`, `intro`)
- Modify: `content/site/nav.ts`, `content/site/pl/nav.ts` (`FOOTER.tag`)
- Modify: `public/llms.txt` (intro sentence)
- Modify if needed: `components/home/Hero.tsx` (`max-w-[560px]`)
- Test: `lib/dictionary.test.ts`

Copy: PL exactly as spec §1–2. EN:
- h1 `"Software for\nreal business."`; groups `["apps and\nwebsites\nbuilt to fit", "ai workflows\nfor real\nprocesses", "safe to run\nin production"]`; captions `["apps & websites", "ai workflows", "production-ready"]`
- intro `"I build apps, websites and AI workflows for companies, and I make sure they keep working in production."`
- services h1 `"Software for your business. AI where it pays off."`; intro `"Web and mobile apps, websites, AI workflows, audits and care after launch."`
- meta home title `"Paweł Ostromecki | Apps, websites and AI workflows"`, description `"I build web and mobile apps, websites and AI workflows for companies, plus audits and care after launch."`; meta services title `"Apps, websites, AI workflows and audits"`, description `"Web and mobile apps, websites, AI workflows, audits and maintenance. Start with a free 30-minute consultation."`
- footer tag `"apps & websites · ai workflows · audits & care"`
- llms.txt intro: replace "He brings AI into real business processes and builds the software around it: web and mobile apps, websites, audits and maintenance." with "He builds software for companies: web and mobile apps, websites and AI workflows, plus audits and maintenance."

- [ ] **Step 1: Write the failing test** in `lib/dictionary.test.ts`:

```ts
it("lead with software, not only AI", () => {
  expect(getDictionary("pl").HOME.hero.h1).toBe("Oprogramowanie\ndla prawdziwego biznesu.");
  expect(getDictionary("en").HOME.hero.h1).toBe("Software for\nreal business.");
});
```

- [ ] **Step 2: Run** `npx vitest run lib/dictionary.test.ts` → FAIL.
- [ ] **Step 3: Replace** the copy listed above.
- [ ] **Step 4: Browser check** (`npm run dev`, PL and EN home) at 390, 768, 1280, 1440 px: „oprogramowanie” stays inside the hero copy box. If it overflows, raise the container `max-w` in `Hero.tsx` (e.g. `max-w-[640px]`), never the font minimum.
- [ ] **Step 5: Run** `npx vitest run` → PASS.
- [ ] **Step 6: Commit** `feat: position the site around software, with AI as one part`.

### Task 4: Services in one carousel, cards without "co dostajesz"

**Files:**
- Modify: `content/site/services.ts`, `content/site/pl/services.ts` (remove `getLabel`, `fitLabel`, `groups`; from every item remove `group`, `get`, `fit`; order and `n` unchanged)
- Modify: `app/[lang]/services/page.tsx` (one `<section className="flex flex-col gap-8 pb-20">` with one `<Carousel label={SERVICES.label} …>` over all `SERVICES.items`; delete the `<details>` block)
- Modify: `content/site/home.ts`, `content/site/pl/home.ts` (delete `href` from item 03), `app/[lang]/page.tsx` (`href={`/services#service-${s.n}`}`), and remove the `href?` prop path if nothing else uses it
- Test: `lib/dictionary.test.ts`

- [ ] **Step 1: Write the failing test**:

```ts
it("list services as one set with compact cards", () => {
  const { SERVICES } = getDictionary("en");
  expect("groups" in SERVICES).toBe(false);
  for (const s of SERVICES.items) {
    expect("get" in s || "fit" in s || "group" in s, s.n).toBe(false);
  }
  expect(SERVICES.items.map((s) => s.n)).toEqual(["01", "02", "03", "04", "05", "06", "07"]);
});
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** as listed. Card keeps: number, meta, title, body, tags, price row (`mt-auto` moves to the price row so prices line up).
- [ ] **Step 4: Run** `npx vitest run && npm run type-check` → PASS. Browser: `/pl/services` shows 7 cards in one row, prev/next buttons work, home card 03 lands on `#service-03`.
- [ ] **Step 5: Commit** `feat: show all services in one carousel with compact cards`.

### Task 5: FAQ: tech stack with logos, concrete security answer

**Files:**
- Create: `components/ui/TechLogos.tsx`
- Modify: `content/site/services.ts`, `content/site/pl/services.ts` (faq items), `app/[lang]/services/page.tsx` (render logos)
- Test: `lib/dictionary.test.ts`

**Interfaces:**
- Produces: `export type Tech = "googlecloud" | "firebase" | "python" | "typescript" | "angular" | "react" | "nestjs";` and `export function TechLogos({ items }: { items: Tech[] }): JSX.Element` in `components/ui/TechLogos.tsx`; a `const LOGOS: Record<Tech, { name: string; path: string }>` holding Simple Icons `path` data (viewBox `0 0 24 24`) and display names `Google Cloud, Firebase, Python, TypeScript, Angular, React, NestJS`.
- FAQ item shape becomes `{ q: string; a: string; logos?: Tech[] }`. Add `logos` as optional on the EN type explicitly (e.g. type the array `as { q: string; a: string; logos?: Tech[] }[]`) so the shape test sees the same keys in EN and PL.

Copy: replace the two questions (models/tools and technologies) with one, at the position of the old models question:
- PL q „Z czego korzystasz?”, a „Ze sprawdzonych, popularnych narzędzi, żeby każdy dobry zespół mógł przejąć projekt: Google Cloud, Firebase, Python, TypeScript, Angular, React i NestJS.”
- EN q "What do you build with?", a "Proven, popular tools, so any good team can take the project over: Google Cloud, Firebase, Python, TypeScript, Angular, React and NestJS."
- `logos: ["googlecloud", "firebase", "python", "typescript", "angular", "react", "nestjs"]` in both.
- Security answer PL exactly as spec §5. EN: "I build on the OWASP Top 10 for LLM Applications: protection against prompt injection, data leaks and agents with too much power. An agent gets only the permissions it needs, and actions with real consequences wait for a person to approve them. On Firebase and Google Cloud I use the platform's own security: security rules, App Check, IAM and Secret Manager."

- [ ] **Step 1: Write the failing test**:

```ts
it("names the stack and the security standard", () => {
  for (const lang of ["en", "pl"] as const) {
    const faq = getDictionary(lang).SERVICES.faq.items;
    const stack = faq.find((f) => f.logos);
    expect(stack?.logos).toEqual(["googlecloud", "firebase", "python", "typescript", "angular", "react", "nestjs"]);
    for (const name of ["Google Cloud", "Firebase", "Python", "TypeScript", "Angular", "React", "NestJS"]) expect(stack?.a).toContain(name);
    expect(faq.some((f) => f.a.includes("OWASP Top 10 for LLM Applications") && f.a.includes("App Check"))).toBe(true);
    expect(faq.filter((f) => /Ionic|Capacitor/.test(f.a))).toEqual([]);
  }
});
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** copy and `TechLogos`: a wrapping `<ul>` (`flex flex-wrap gap-x-6 gap-y-4 pb-[22px]`), each `<li>` = `svg` (`size-7`, `fill="currentColor"`, `aria-hidden`) + visible name (`font-mono text-[11px] uppercase text-ink-400`), icons `text-ink-200`. In the FAQ `<details>`, render `<TechLogos items={f.logos} />` under the answer paragraph when `f.logos` is set. `faqSchema` is unchanged (gets `q`, `a`).
- [ ] **Step 4: Run** `npx vitest run && npm run type-check` → PASS. Browser: logos legible, wrap at 390 px.
- [ ] **Step 5: Commit** `feat: list the tech stack with logos and ground the security answer in OWASP`.

### Task 6: Interactive "Jak pracuję" steps

**Files:**
- Create: `lib/how-steps.ts`, `lib/how-steps.test.ts`, `components/home/HowSteps.tsx`
- Modify: `content/site/home.ts`, `content/site/pl/home.ts` (`how.steps` new shape), `app/[lang]/page.tsx` (replace the `<ol>` with `<HowSteps>`; section gets `id="how-i-work"` and `scroll-mt-24`), `app/globals.css` (progress + panel keyframes inside the existing `prefers-reduced-motion: no-preference` block)

**Interfaces:**
- Step shape: `{ n: string; tab: string; t: string; d: string; rule: string }`.
- `lib/how-steps.ts`:
  - `export const STEP_MS = 6000;`
  - `export function nextStep(index: number, count: number): number` (wraps).
  - `export function stepForKey(key: string, index: number, count: number): number | null` (`ArrowRight`/`ArrowDown` next with wrap, `ArrowLeft`/`ArrowUp` previous with wrap, `Home` 0, `End` count-1, else null).
  - `export function autoAdvanceAllowed(s: { inView: boolean; paused: boolean; interacted: boolean; reducedMotion: boolean; wide: boolean }): boolean` (true only when inView && wide && !paused && !interacted && !reducedMotion).
- `components/home/HowSteps.tsx`: `"use client"; export function HowSteps({ steps, label }: { steps: Step[]; label: string })`.

Copy PL: spec §7 table verbatim (`tab` column = zakładka). EN:

| n | tab | t | d | rule |
|---|---|---|---|---|
| 01 | Problem | We start from your problem | We start from the process that's giving you trouble, and the number you want to move. | Only what you need: no native app when a PWA will do, no platform when a workflow will do. You don't pay for extras. |
| 02 | Data | We prove it on your data | Within weeks you get a working slice and try it with the people who will use it. | AI proposes, I approve: AI speeds up the work, and I check every change before it reaches you. |
| 03 | Production | We ship to production | Tests, guardrails and monitoring before it reaches everyone. | The rules that matter live in code and tests, not in prompts. That's what keeps it all in check. |
| 04 | Handover | I hand it all to you | Code, docs and know-how go to you. I stay around, but you don't need me for it to run. | Metrics, monitoring and logs show whether it does its job. You know from data, not assumptions. |

- [ ] **Step 1: Write failing tests** `lib/how-steps.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { autoAdvanceAllowed, nextStep, stepForKey } from "./how-steps";

const ok = { inView: true, paused: false, interacted: false, reducedMotion: false, wide: true };

describe("how steps", () => {
  it("advances and wraps", () => {
    expect(nextStep(0, 4)).toBe(1);
    expect(nextStep(3, 4)).toBe(0);
  });
  it("moves with arrow keys, Home and End", () => {
    expect(stepForKey("ArrowRight", 3, 4)).toBe(0);
    expect(stepForKey("ArrowLeft", 0, 4)).toBe(3);
    expect(stepForKey("ArrowDown", 1, 4)).toBe(2);
    expect(stepForKey("Home", 2, 4)).toBe(0);
    expect(stepForKey("End", 0, 4)).toBe(3);
    expect(stepForKey("Enter", 1, 4)).toBeNull();
  });
  it("auto-advances only on a wide screen, in view, untouched, with motion allowed", () => {
    expect(autoAdvanceAllowed(ok)).toBe(true);
    for (const k of ["paused", "interacted", "reducedMotion"] as const) expect(autoAdvanceAllowed({ ...ok, [k]: true }), k).toBe(false);
    for (const k of ["inView", "wide"] as const) expect(autoAdvanceAllowed({ ...ok, [k]: false }), k).toBe(false);
  });
});
```

- [ ] **Step 2: Run** `npx vitest run lib/how-steps.test.ts` → FAIL (module missing).
- [ ] **Step 3: Implement** `lib/how-steps.ts`.
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Implement** `HowSteps` and content. Behaviour per spec §7:
  - Semantics at every width: WAI-ARIA accordion (button + region pairs, `aria-expanded`, `aria-controls`, `role="region"` + `aria-labelledby`), one open at a time. Tabs semantics are not used because buttons and panels interleave in the DOM, which a `tablist` forbids. Arrow/Home/End keys move focus and selection between step buttons via `stepForKey`.
  - Desktop (`md`+): buttons in a row (`n` in mono `sakura-500` + `tab`). Under the active tab a 2 px `sakura-500` bar fills over `STEP_MS` (CSS animation; restart via `key={active}`); `onAnimationEnd` → `nextStep`. All panels sit in the same grid cell (`md:row-start-2 md:col-start-1 md:col-span-4`) so the row takes the tallest panel's height and never jumps; inactive panels are `md:invisible` + `inert` (not `hidden`, which would drop them from layout). Active panel enters with fade + 8 px rise (~300 ms).
  - Phone (< `md`): same markup in DOM order button, panel, button, panel… stacks as an accordion; inactive panels collapse (`max-md:hidden` on inactive), the active one opens under its button with a short height/fade transition (one open at a time, default 01), no auto-advance (`wide: false`), no progress bar. Step text appears in the DOM once; on `md`+ the container is `md:grid md:grid-cols-4` with buttons in row 1 (`md:row-start-1`) and panels in the shared row-2 cell above.
  - State for `autoAdvanceAllowed`: `inView` via IntersectionObserver (`threshold: 0.5`), `paused` on pointerenter/focusin, cleared on pointerleave/focusout, `interacted` set forever on any click or key on a tab, `reducedMotion` and `wide` (`(min-width: 768px)`) via `matchMedia` with change listeners. Auto-advance never moves focus.
  - Rule line: short `h-0.5 w-6 bg-sakura-500` mark, then `text-[15px] text-ink-200`.
  - SSR: first step active; all panels rendered.
- [ ] **Step 6: Verify**: `npm run build && npm run start`, then `curl -s localhost:3000/pl | grep -c "Przekazuję Ci całość"` → `1` or more (all step text in HTML). Browser at 1280 px: auto-advance runs, hover pauses, click stops it, arrows move between tabs, height stable. At 390 px: accordion, no auto-advance, no horizontal scroll. With reduced motion (DevTools emulation): no bar, no auto-advance. `/pl/approach` lands on this section.
- [ ] **Step 7: Run** `npx vitest run && npm run type-check && npm run lint` → PASS.
- [ ] **Step 8: Commit** `feat: interactive how-I-work steps with the principles folded in`.

### Task 7: Mobile menu without the flash

**Files:**
- Modify: `lib/nav.ts`, `lib/nav.test.ts`, `components/Nav.tsx`, `app/globals.css`

**Interfaces:**
- `export function menuClosesOnClick(pathname: string, href: string): boolean` in `lib/nav.ts`: true when `normalize(pathname) === normalize(href)` (same page, nothing will navigate). Locale prefix is already stripped by the caller (`path` in `Nav`).

- [ ] **Step 1: Write failing tests** in `lib/nav.test.ts`:

```ts
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
```

- [ ] **Step 2: Run** `npx vitest run lib/nav.test.ts` → FAIL.
- [ ] **Step 3: Implement** `menuClosesOnClick`.
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Implement in `Nav.tsx`**:
  - Menu links and the menu CTA: `onClick={() => { if (menuClosesOnClick(path, l.href)) close(); }}`. The existing `openOn === pathname` check closes the menu once the new route renders.
  - Animated close: add `closing` state. `close()` sets `closing` when motion is allowed; the dialog stays rendered (not `hidden`) with a `data-closing` attribute running a 200 ms fade-out; `onAnimationEnd` sets `openOn(null)` and clears `closing`. With reduced motion, close at once. The pathname-change close (route rendered) also goes through the fade: track the previous pathname; when it changes while open, start `closing` instead of hiding immediately. `inert`, scroll lock and focus return release only when fully closed (keep them keyed on "visible", not on `open`).
  - Close button icon: on open, its two strokes rotate in from the burger's lines (CSS `@keyframes` on the `path`, ~250 ms).
  - CSS in the `prefers-reduced-motion: no-preference` block: `#mobile-menu[data-closing] { animation: fade-out 200ms ease-in both; }` plus `@keyframes fade-out { to { opacity: 0; } }`.
- [ ] **Step 6: Browser verify** at 390 px (PL and EN): open menu, tap each link: no moment shows the old page; menu fades out over the new page. Tap the current page's link: menu closes. Escape and the X close with the fade. Rotate to ≥1024 px while open: closes. Reduced motion: instant, no flash.
- [ ] **Step 7: Run** `npx vitest run && npm run type-check && npm run lint` → PASS.
- [ ] **Step 8: Commit** `fix: keep the mobile menu up until the next page renders`.

### Task 8: Final check

- [ ] **Step 1:** `npm run lint && npm run type-check && npm test && npm run build` → all pass.
- [ ] **Step 2:** `grep -rn "NEXT_STEP\|NextStepCta\|APPROACH\|getLabel\|fitLabel" app components lib content` → no matches.
- [ ] **Step 3:** Browser walk at 390 px and 1440 px, PL and EN: home (hero, steps), `/services` (carousel, FAQ logos, security answer), `/use-cases`, `/about` (no tile, footer CTA still there), `/approach` redirect.
- [ ] **Step 4:** Summarise for the owner in Polish what changed, per the 13 original points plus burger and services merge.
