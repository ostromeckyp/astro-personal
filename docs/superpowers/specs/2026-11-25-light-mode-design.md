# Light mode — design

## Intent

The site is dark only. Add a light theme that visitors get automatically when their system is light, plus a sun/moon toggle in the nav that overrides the system and is remembered. The brand (lime accent, ink scale) stays recognisable in both themes.

## Goals

- Light and dark themes across the whole site (home, services, use cases, blog, talks, contact).
- Default follows `prefers-color-scheme`; the toggle flips between light and dark and saves the choice in `localStorage`.
- No flash of the wrong theme on load; pages stay statically generated.
- Text meets WCAG AA (4.5:1) in both themes.

## Non-goals

- No third "system" button: until the visitor clicks, the system decides; after a click, their choice does.
- No light versions of case-study screenshots or stage mockups.
- No theme in the URL, cookie or `proxy.ts`.

## Anti-goals

- Lime text on a light background (unreadable, 1.7:1).
- A white flash before hydration for dark-theme visitors, or the reverse.
- Touching component markup more than needed: colours go through tokens.

## Approaches

- **A. System preference only.** Least code, no toggle. Rejected: visitor can't choose.
- **B. System default + sun/moon toggle, choice in `localStorage`, inline script in `<head>`.** Picked by the author.
- **C. Dark default + toggle, ignoring the system.** Rejected: ignores visitor's preference.

## Decided

- Toggle is a sun/moon icon button: shows the sun in dark mode (switch to light), the moon in light mode.
- Darker accent for text in light mode: `#5c7300` (5.3:1 on `#fefefe`, 4.9:1 on `#f4f4f6`). Pure lime `#ccff00` stays for fills, bars, underlines and glows.

## How (builder's calls, marked as such)

- **Tokens** (`app/globals.css`): `:root[data-theme="light"]` redefines the `ink` scale inverted (950 ↔ 0 etc., light greys tuned for contrast) and sets `color-scheme: light`. Dark stays the `@theme` default.
- **Accent text**: new token `--color-accent` (dark: `#ccff00`, light: `#5c7300`); `text-sakura-*` used for text becomes `text-accent`. Fills keep `bg-sakura-*`.
- **Text on lime** (primary button): new fixed token `--color-on-accent` = near-black in both themes, so lime buttons keep dark text.
- **Inverse pills** (`bg-ink-0 text-ink-950`: skip link, blog filter, form submit) invert with the scale — dark pill on light page. Fine as is.
- **Hard-coded colours in `globals.css`**: case-study stages and window mockups stay dark in both themes (they depict screens). Lime glows get lower opacity in light. Prose/code: Shiki code blocks keep the dark theme.
- **No-flash script**: tiny inline script in `<head>` of `app/[lang]/layout.tsx` reads `localStorage.theme`, falls back to `matchMedia('(prefers-color-scheme: light)')`, sets `data-theme` on `<html>`. `<html>` gets `suppressHydrationWarning`.
- **Toggle component** `components/ThemeToggle.tsx`: client component, inline SVG sun/moon (no icon library in the project), `aria-label` from `COMMON` in `content/site/nav.ts` (EN) and `content/site/pl/nav.ts` (PL), always visible in the nav bar next to the language switch, 32px tap target like the language links.
- **Tests**: pure helper `lib/theme.ts` (resolve stored value + system preference → theme) with `lib/theme.test.ts`; dictionary shape test covers the new labels.

## Left to the builder

- Exact light values of the ink scale and glow opacities, checked visually and for AA.
- Whether any `text-sakura-*` usage is decorative enough to keep as is.
