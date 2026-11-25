# Motion pass, mobile FAB and service copy — design

## Intent

The site works but feels static at the moments that carry the brand: first arrival, switching theme, opening the menu. This pass adds one signature moment (a first-visit splash built around the `< ✦ >` mark), makes the theme switch and the mobile menu feel physical, and gives mobile visitors a one-tap way to reach Paweł (FAB "toolbox"). It also rewrites the service cards and two headings so the offer reads sharper.

The splash is meant to be the biggest flourish on the site, but must never stand between a client and the content: short, skippable, once.

## Goals

- First-visit splash: laptop opens, `< ✦ >` appears on its screen, full "ostromecki.dev" wordmark, smooth hand-off to the page. ~2.4 s, skippable, shown once per browser.
- Theme toggle: the new theme spreads as a circle from the toggle button until it fills the screen.
- Mobile menu: a roller blind. It slides down from the top covering the screen, and rolls back up when closing.
- Mobile FAB that expands into quick actions (call, email, contact form) and profile links (GitHub, Instagram, LinkedIn), each icon + label.
- Copy changes on home services, use cases and talks pages (list below), in Polish and English.
- All motion shares one easing family, respects `prefers-reduced-motion`, and keeps the current look and tone.

## Non-goals

- No new runtime dependencies (no Lottie, no Three.js, no animation library).
- No FAB on desktop (`lg` and up), where the nav CTA is always visible.
- No change to page structure or routing. The only SEO-metadata change is adding Instagram to `PERSON.sameAs`.

## Anti-goals

- Splash delays or hides content from crawlers, or flashes for returning visitors.
- Splash longer than ~2.5 s or impossible to skip.
- FAB covering CTAs, form fields, the footer, or the last lines of content.
- Animations that stutter on a mid-range phone, or that ignore reduced motion.

## Constraints

- Next.js 16 App Router, pages statically generated; components in `components/`, copy in `content/site/*.ts` (EN) and `content/site/pl/*.ts` (PL). `lib/dictionary.test.ts` requires both languages to have the same shape.
- Theme is set by an inline `<head>` script (`lib/theme.ts` `THEME_SCRIPT`) before paint; tokens in `app/globals.css` (`--color-accent` #ccff00 dark / #5c7300 light, `--color-ink-*`).
- Existing motion vocabulary in `app/globals.css`: easing `cubic-bezier(0.2, 0.7, 0.2, 1)` for entrances, `cubic-bezier(0.4, 0, 0.2, 1)` for view transitions, `drawr` (a scaleX underline wipe — the splash needs its own stroke-dashoffset keyframes); global reduced-motion block near the end of the file.
- Mobile menu logic in `components/Nav.tsx`: menu stays up until the next page renders, then leaves over it (`MENU_FADE_MS` = CSS duration).
- The `< ✦ >` mark exists as SVG in `app/icon.svg` (two polylines + star path) — reuse its geometry.
- Contact data: `content/site/contact.ts` (`email`, `phoneHref`, profile links). Instagram: `https://www.instagram.com/ostromecki.dev/` (new; not yet on the site).

## Approaches (splash)

Considered three; Paweł picked **A**.

- **A. CSS + inline SVG (chosen).** Laptop and mark drawn in SVG, animated with CSS keyframes (3D lid rotate, stroke-dashoffset draw, star scale/rotate, clip-path circle exit). Zero dependencies, a few KB, theme colours via CSS variables, easy reduced-motion handling.
- **B. Lottie.** Richer motion, but needs an After Effects source, ~60 KB player, and theme colours are awkward to swap.
- **C. Three.js.** Real 3D laptop with lighting; 150 KB+, GPU cost, slower interactivity on weak phones — overkill for a 2.4 s moment and against "don't overwhelm".

## Design

### 1. Splash (`components/Splash.tsx` + CSS)

Timeline (~2.4 s total):

```
0.0–0.6s  laptop lid opens (rotateX with perspective), screen glows on
0.6–1.2s  < > draw in (stroke-dashoffset), ✦ pops in with a slight rotation (accent colour)
1.2–1.8s  laptop dims away, "ostromecki.dev" wordmark appears
1.8–2.4s  a circular hole opens from the centre of the overlay, revealing the page (same direction as the theme reveal)
```

- Full-screen fixed overlay on `--color-ink-950`, above everything (above the nav's z-50).
- Shown once per browser: a `localStorage` flag (e.g. `splash-seen`). Any landing page, not only home.
- No flash for returning visitors and no hydration mismatch: an inline `<head>` script (same pattern as `THEME_SCRIPT`) decides before first paint, setting e.g. `data-splash` on `<html>`; CSS shows the overlay only when that attribute is present. The flag is written when the splash starts, so a reload mid-splash doesn't replay it.
- Skippable: visible "Pomiń" / "Skip" button (focused on show), click/tap anywhere, `Esc`. Skipping runs the exit (short) rather than cutting.
- While shown: page behind is `inert` and not scrollable; afterwards focus returns to normal document order.
- `prefers-reduced-motion: reduce`: no splash at all (head script doesn't set the attribute).
- Bots and automation get no splash (agreed with Paweł): the head script skips it when `navigator.webdriver` is true or the user agent matches a bot pattern (Googlebot, Bingbot, Lighthouse/PageSpeed, HeadlessChrome, generic `bot|crawl|spider`). This keeps the rendered snapshot and LCP measurements clean.
- Storage blocked (private mode throws): no splash, so it can't repeat on every page.
- Content stays in the HTML underneath; no-JS visitors and crawlers see the page.
- Wordmark: the existing logo images (`/images/logo-dark.png` / `logo-light.png`, matched to theme) or SVG text — builder's call, must match the nav logo.

### 2. Theme toggle circular reveal (`components/ThemeToggle.tsx` + CSS)

- On click, if `document.startViewTransition` exists and motion is allowed: start a view transition that flips `data-theme`, then animate `::view-transition-new(root)` `clip-path: circle(0 at x y)` → `circle(r at x y)`, where (x, y) is the toggle button's centre and r the distance to the farthest viewport corner.
- Duration ~500 ms, easing from the existing family. Old snapshot stays still underneath (no cross-fade).
- Must not disturb the existing page-morph view transitions (card → page): scope the reveal, e.g. a class on `<html>` during the theme transition that the CSS keys on.
- Fallback (no API or reduced motion): instant switch as today.
- Splash exit reuses the same circle idea, so the two read as one family.

### 3. Mobile menu roller blind (`components/Nav.tsx` + CSS)

- Replace `fade-in`/`fade-out` on `#mobile-menu` with a top-down reveal: `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)` (or `translateY(-100%)` → 0); closing reverses it, rolling up.
- Open ~360 ms with entrance easing; close ~280 ms. Link `rise-in` stagger and the `menu-x` icon animation stay.
- Keep the current behaviour that the menu leaves only after the next page renders; rename `MENU_FADE_MS` to match the new close duration and keep it in sync with CSS.
- Reduced motion: instant open/close (current behaviour).

### 4. Mobile FAB "toolbox" (`components/ContactFab.tsx`)

```
                       ┌──────────────────────┐
                       │ 📞 Zadzwoń           │
                       │ ✉  Wyślij wiadomość  │
                       │ 📝 Formularz kontaktowy │
                       │ ── GitHub  IG  in ── │
                       └──────────────────────┘
                                          (✦)  ← 56px, bottom-right
```

- Only below `lg`. Round 56 px button, bottom-right with safe-area inset (`env(safe-area-inset-bottom)`), accent background, ✦ icon that rotates into × when open.
- Panel unrolls upward from the button (mirror of the menu blind, same easing). Items: Call (`tel:` from `CONTACT.phoneHref`), Send a message (`mailto:` contact email), Contact form (locale-aware link to `/contact`), then a row of GitHub, Instagram, LinkedIn — each icon with a visible label.
- Not covering content:
  - hides while scrolling down, returns on scroll up;
  - hidden on `/contact` (form lives there) and while the footer is in view (IntersectionObserver);
  - hidden while the mobile menu or splash is open;
  - closes on outside tap, `Esc`, or choosing an item.
- Accessibility: `aria-expanded`/`aria-controls` on the button, labelled panel, focus moves into the panel on open and back on close.
- Copy for labels lives in the dictionaries (both languages); profile URLs reuse existing entries plus the new Instagram link.
- Instagram (`https://www.instagram.com/ostromecki.dev/`) is added everywhere LinkedIn and GitHub already appear (agreed with Paweł): FAB, `FOOTER.socials`, `CONTACT.socials` (both languages), `PERSON.sameAs` in `lib/site.ts`, and `public/llms.txt` if it lists profiles. Update affected tests (`structured-data.test.ts`, `llms.test.ts`).
- Reduced motion: panel appears/disappears without the unroll; hide-on-scroll still works but without sliding.

### 5. Copy changes

Polish wording is Paweł's, verbatim. English versions are my translations (marked *).

Services page (`/services`, `/pl/services`) (`content/site/pl/services.ts`, `content/site/services.ts`; `lib/structured-data.ts` offers read from here too). Agreed with Paweł: these 7 cards change here; the home page keeps its 3-card layout (`content/site/*/home.ts` `services.items`), and only its "AI w realnych przypadkach biznesowych" card body takes the new text (PL verbatim, EN as below).

| Card | PL body | PL chips | EN body* | EN chips* |
|---|---|---|---|---|
| Workflowy AI | unchanged | Mniej ręcznej pracy · Human in the loop | unchanged | Less manual work · Human in the loop |
| AI w realnych przypadkach biznesowych | Bierzemy realny proces z Twojej firmy i usprawniamy go z pomocą AI, od pierwszego prototypu po działające rozwiązanie na produkcji. | Realny proces · Prototyp · Produkcja | We take a real process from your business and improve it with AI, from the first prototype to a working solution in production. | Real process · Prototype · Production |
| Aplikacje webowe | unchanged | Panele i systemy · Mniej arkuszy · Integracje | unchanged | Panels and systems · Fewer spreadsheets · Integrations |
| Aplikacje mobilne | Aplikacje na iOS i Androida, jako część większego systemu albo samodzielne, wdrożone do App Store i Google Play. | iOS i Android · PWA | iOS and Android apps, as part of a larger system or standalone, shipped to the App Store and Google Play. | iOS and Android · PWA |
| Strony internetowe | Szybkie strony, które w kilka sekund mówią, co robisz, i zamieniają odwiedziny w zapytania. Widoczne zarówno w wyszukiwarkach, jak i dla AI. | SEO · GEO | Fast websites that say in seconds what you do and turn visits into inquiries. Visible in search engines and to AI alike. | SEO · GEO |
| Audyt aplikacji | unchanged | Raport · Checklista priorytetów · Bezpieczeństwo i wydajność | unchanged | Report · Priority checklist · Security and performance |
| Utrzymanie i rozwój | Poprawki, aktualizacje, monitoring i nowe funkcje przez cały cykl życia systemu. | Stałe wsparcie · Nowe funkcje | Fixes, updates, monitoring and new features across the system's whole lifecycle. | Ongoing support · New features |

Use cases (`use-cases.ts`): h1 PL "AI na produkcji, nie na demo." · EN* "AI in production, not in a demo."

Talks (`talks.ts`): gallery heading PL "W drodze" → "Za kulisami"; label "poza sceną" stays. EN* heading "Out and about" → "Behind the scenes"; label "off stage" stays.

Check whether the same service tags/bodies are repeated elsewhere (services page, `public/llms.txt`, structured data) and keep them consistent.

### 6. Copy review and AI/search visibility (added by Paweł)

Two passes after the build, in this order:

1. **Humanizer pass** (`/humanizer` skill) over the site copy in `content/site/*.ts` and `content/site/pl/*.ts` (page copy, not blog posts), both languages. Output is a list of proposed rewrites for Paweł to approve; nothing is applied without approval. The Polish wording Paweł gave in this spec (section 5) is excluded from rewrites — it may only be flagged. Approved changes keep EN/PL in the same shape.
2. **SEO + AI visibility audit** (`/small-business:seo-ai-visibility` skill) against the built site (local production build, then live after deploy if needed): crawlability, rendering without JS, `llms.txt`, schema.org, titles/descriptions. It runs after the humanizer so it audits final copy. Findings come back as a prioritised list; fixes are applied only after Paweł picks them.

### Motion system

- Entrances: `cubic-bezier(0.2, 0.7, 0.2, 1)`; exits/reveals: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Durations: UI 280–500 ms; splash 2.4 s total.
- Animate only `transform`, `opacity`, `clip-path`, `stroke-dashoffset`.
- All new animations live inside the existing `@media (prefers-reduced-motion: no-preference)` block or have explicit reduced-motion fallbacks.

## Testing

- Unit (Vitest, beside code in `lib/`): splash decision rule (seen flag, reduced motion, storage blocked) as a pure function used by the head script; reveal radius from button rect + viewport; FAB visibility rule (path, footer visible, scroll direction, menu open).
- Existing tests stay green, including `dictionary.test.ts`, `llms.test.ts`.
- `npm run lint`, `type-check`, `test`, `build`, then `node scripts/verify-site.mjs --bodies main --html --seo`.
- Manual check in a browser: first visit vs reload, skip paths, both themes, mobile widths, reduced motion on.

## Left to the builder

- Exact SVG laptop drawing and keyframe percentages within the timeline above.
- Wordmark as image vs SVG text (must match nav logo).
- FAB icon set (inline SVG, stroke style matching the existing nav icons).
- Scroll-direction threshold for hiding the FAB.
