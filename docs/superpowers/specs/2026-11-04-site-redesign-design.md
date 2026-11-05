# ostromecki.dev redesign

Date: 2026-11-04
Design source: https://claude.ai/code/artifact/a74fb461-0283-4d9e-ae92-e4ab4850ddaa (canvas "ostromecki.dev — Redesign", "Website" and "Design system & use cases" pages)

## Intent

Replace the current personal portfolio (green, Poppins, light/dark, resume-led) with a consultancy site that sells one thing: AI workflows and production-ready software, with "book a consultation" as the single primary action. The design system is called Spotlight: dark, one pink accent, and one light effect.

This is a full rework of what visitors see. What must survive is the blog: the markdown posts carry over and old post URLs keep working.

## Goals

- Every page in the design's "Website" canvas exists and matches it visually, built with this repo's stack and conventions rather than the design's inline styles.
- All 4 existing posts render in the new article layout from their existing markdown.
- The contact form keeps sending real email.
- The site runs on current stable Next and React, with the canary workaround gone.
- Every page works at phone width.

## Non-goals

- Polish at launch. English only, decided by the owner. The design's PL/EN switch is not built and no i18n library is added. A later project can add Polish; its copy stays in the design artifact.
- A light theme. The theme toggle and bootstrap script are removed.
- New blog content, CMS, comments, analytics or newsletter.
- Migrating the Medium images inside post bodies.
- Cleaning up leftover tool folders (`.junie`, `.bolt`, `.codesandbox`, `.aiassistant`, `prompt/`).
- Production deployment. Work ends in a pull request; going live is the owner's step.

## Anti-goals (a failure even if everything else works)

- A bracketed placeholder such as `[from — price]` or `[year]` visible on the site.
- An invented number, price, quote or claim filling a placeholder.
- The bracketed sentence in the forms case study's disclosure being filled in. It is cut.
- A post body changed, or an old `/blog/<slug>` URL broken.

## Constraints

- Stay on Next.js (decided by the owner; the folder name `astro-personal` is historical).
- Upgrade Next 15.5.15 → current 16.x (16.4.5 at time of writing) and React canary → stable 19.x (19.3.1 at time of writing), and Tailwind to current 4.x.
- The GitHub repo is public, so anything committed is published.
- Existing conventions stay: App Router, Tailwind 4 with `@theme` tokens, `cn()`, `@/` imports, react-hook-form + zod + TanStack Query for the form, Resend in `app/api/contact/route.ts`, `gray-matter` + unified in `lib/posts.ts`.

## Pages and routes

Copy comes from the English strings in the matching board; the board's layout and spacing are the reference. Boards live under `project/` in the artifact.

| Route | Board | Notes |
|---|---|---|
| `/` | `Home.dc.html` | Hero with key visual, glow and line animations, services, use cases, approach, about strip, latest post |
| `/services` | `Services.dc.html` | Service rows, ways to work together, FAQ using native `details` |
| `/use-cases` | `UseCases.dc.html` | List and "next one could be yours" CTA |
| `/use-cases/salon-replenishment` | `UseCase.dc.html` | Fixed 1440 board in the design; must be made responsive. The owner confirmed BarberHQ is theirs and live with real salons, so branding, screenshots and the "Real systems with real users" intro ship as drawn |
| `/use-cases/no-code-forms` | `UseCaseForms.dc.html` | Fixed 1440 board; must be made responsive. Ships at launch, see below |
| `/approach` | `Approach.dc.html` | |
| `/blog` | `Blog.dc.html` | Featured latest post, topic filter, grid/list toggle, empty state |
| `/blog/[slug]` | `Article.dc.html` | See "Blog" |
| `/talks` | `Talks.dc.html` | |
| `/about` | `About.dc.html` | "Download CV" links existing `public/cv.pdf` |
| `/contact` | `Contact.dc.html` | |

`/resume` is removed and permanently redirects to `/about`. `app/sitemap.ts`, page metadata and the 404 page are updated to the new routes and look. The site description in `app/layout.tsx` is rewritten to the new positioning.

Shared: `Nav.dc.html` and `Footer.dc.html`. The nav drops the PL/EN control. The current repo's mobile menu pattern (open/close, Escape, body scroll lock) is kept and restyled, because the design only wraps the links. Active state applies to child routes too (for example `/use-cases/*`).

## Design system

Foundations are defined in `Main.dc.html` and components in `Components.dc.html`. Translate them to Tailwind `@theme` tokens, replacing the current green/Poppins tokens:

- Color: ink scale (950 `#000002`, 900 `#0A0A0F`, 800 `#131318`, 700 `#1D1D24`, 600 `#2B2B34`, 500 `#5B5B66`, 400 `#9A9AA6`, 200 `#E4E4E8`, 100 `#F4F4F6`, 0 `#FEFEFE`) and sakura scale (700 `#A8004F`, 600 `#D6006E`, 500 `#FA0980`, 300 `#FF6AB0`, 100 `#FFE3F0`). Text on pink is always ink 950.
- Type: Geist (300–600) and Geist Mono via `next/font/google`. Mono is only for labels, indices, tags and code.
- Radius: 4 tags, 10 inputs, 16 cards, pill buttons. Container: 1248 max width, 24 gutter.
- Light effect: the pink glow appears at most once per page and is never a background wash. Hero animations stop under `prefers-reduced-motion`.
- The global `p { text-justify }` and the old leading overrides in `globals.css` go.

Repeated patterns become shared components (button, tag, section heading, card, page header, post card). Their exact shape is left to the builder.

## Blog

**Markdown stays the source of truth.** Files stay in `content/blog/` with the same slugs. Everything below the frontmatter stays byte-identical; `git diff` must show frontmatter changes only.

Frontmatter changes:

- `code-became-cheap.md` date: `20256-08-08` → `2026-08-08`. The post's commit is dated 2026-08-08, and only 2026 makes it the "latest" post, as the design treats it. **The design's displayed "8 August 2025" is wrong and is not copied.**
- `image`: point to local covers from the design, replacing Medium hotlinks.
- `excerpt`: use the design's text. The current host-property excerpt describes the wrong article.
- `category`: `Artificial Intelligence` or `Angular`, which drive the filter. Additional display fields, such as the design's `angular · state` label and cover alt text, may be added.
- Vol. 2's title stays as it is in the file. Blog card titles come from frontmatter, not from the design's reworded versions.

Rendering:

- Listing data comes from `lib/posts.ts`, not hard-coded arrays. The featured post is the newest by date. Under "All" it appears only in the featured slot, with the rest in the grid/list. A selected topic lists all its matching posts, including the featured one, so the AI topic isn't falsely empty. Home's "latest post" block uses the same source.
- Reading time is computed from word count (about 200 wpm).
- Topic filter and view toggle are client state. The grid is the default. Remembering the choice is not required.
- The article page has a header, cover, sticky table of contents with active section, share links (LinkedIn, X, copy link), author card with CTA, and "more from the blog".
- Table of contents is generated from `h2`s (add heading ids in the markdown pipeline). If a post has fewer than 2 `h2`s, the table of contents is hidden and share links remain.
- Standard markdown gets the design's article styles: headings, lists with pink dash markers, links, inline code, blockquote, tables if present. Code blocks get the design's framed look with a language label and syntax highlighting at build time; these are the design's colors, approximated by a Shiki theme.
- The design's stat callout, captioned code figure and second blockquote style are design-only examples. They are **not** added to posts, and no MDX is introduced.
- Remote images in post bodies stay as they are.

## Placeholder handling

Facts the design left unknown are hidden, not filled. The rule: **the surrounding element disappears cleanly, with no gap or dangling label.** The owner can add them later as ordinary content edits.

| Where | Placeholder | At launch |
|---|---|---|
| Services, ways to work | `[from — price]`, `[day rate]` | Price line removed from the cards |
| Talks, community card | `[ — ]` meetups, members, since | Stats row removed |
| Talks, list | `[year]` | Year omitted; 2026 for DevFest stays |
| Talks, photos | `[venue, date]`, `[venue]`, `[Podcast / live stream name]` | Bracket text cut. Captions that become empty are removed; "Same talk, different room." stays |
| Salon case study | outcome numbers, `[estimated native build cost] saved` | Outcomes section removed; that phrase removed from the list |
| Forms case study | outcome numbers, `[Shown with the client's permission.]` | Outcomes section removed; sentence cut, rest of disclaimer stays |
| Contact intro | `[two working days]` | Sentence becomes "I reply with next steps or a time for a short call." |
| Contact form | `[Privacy note…]` | Replaced by: "Your message is sent to my inbox and used only to reply." (builder's wording; **owner should check it**) |

`Components.dc.html` has a testimonial slot; it is not used by any page and is not built.

## Forms case study

The page describes a client's product as part of the owner's contribution, using screenshots the owner prepared as marketing images with the brand removed. It ships at launch.

- Page, card and sitemap entry ship as ordinary committed content. Home and `/use-cases` show both cases as designed.
- The ownership disclosure and the footer line ship as drawn, except that the bracketed sentence is cut.
- Use only the design's images. Don't add client names or other identifying details to copy, alt text, filenames or commit messages.
- The About page's "Form builder for a registry platform" line under CSHARK stays. It is generic, and a fuller version is already public on `/resume`. (Builder's call; owner may object.)

## Contact

- `lib/contact-schema.ts` gains `topic` (enum of the 4 design options, default AI workflow) and optional `company`. Both appear in the email sent by the route, with the existing escaping.
- Existing behavior stays: honeypot, validation messages, error display, `RESEND_API_KEY`, sender and recipient.
- On success the form is replaced by the design's confirmation state. Submit shows a pending state, and errors stay visible with the form's contents preserved.
- The design's phone number, email and social links appear as drawn.

## Upgrade

Do the upgrade first, on the current site, as its own commit so that any breakage is separable from the redesign. Check the official Next 16 upgrade guide rather than relying on memory; `next lint` no longer being available is a known item, so the `lint` script needs replacing.

**Builder's call, owner may veto:** remove the blog-morph view transitions, `experimental.viewTransition`, `react-canary.d.ts` and the `unstable_ViewTransition` usage. The design doesn't include them, and they exist only to work around the canary build.

## Removed

`ThemeToggle`, `lib/theme`, `app/resume`, and any component that no page uses after the rework (likely `SocialsFloat`, `SkillCard`, `TimelineCard`, `Card`, `ScrollToTop`). Old images in `public/` are removed if unused; `cv.pdf` and the favicon stay. The favicon stays as it is unless the owner supplies a new one.

## Assets

Images are in the design artifact's asset store (`/_blob/<id>`, referenced from the boards). Download only those a built page references, give them readable names under `public/`, and serve them with `next/image`. Check the Salon case study's phone crops and callouts survive, since those use exact pixel offsets and background crops against the source images.

The case studies' composed "stages" (tilted window, floating callout, status pill) are part of the look at desktop width. At phone width, tilt and callouts may be dropped and windows shown flat and stacked, as long as nothing overflows.

## Accessibility

Keep what the design specifies: real buttons and links, labelled inputs, focus ring on inputs, alt text from the boards, decorative lines `aria-hidden`, text contrast from the approved pairs. Add a visible keyboard focus style for links and buttons, which the boards don't draw.

## Done means

- `npm run build`, type-check and lint pass.
- Each route is compared against its board at 1440 and 375 wide in a browser, with no horizontal scroll.
- A search of the built pages finds no `[` placeholder text from the table above and no `/_blob/` URLs.
- `git diff` on `content/blog/` shows frontmatter changes only, and all 4 old post URLs load.
- `/resume` redirects, and both case studies load and appear on Home, `/use-cases` and in `sitemap.xml`.
- A contact submission works against a test key or a mocked send, and validation and error states are checked. A real send to the owner's inbox needs their go-ahead.

## Left to the builder

Component breakdown and file layout, how page copy is organized in code, Shiki theme, table-of-contents scroll tracking, exact mobile layouts where boards don't specify, image sizes and formats, and whether to add a test runner (the repo has none; not required).
