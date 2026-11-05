# SEO, AI Visibility, Favicon and Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make ostromecki.dev identifiable and correctly described by search engines and AI assistants, add the missing icon set, and fix the performance items Lighthouse measured.

**Architecture:** One shared `lib/site.ts` holds identity facts. Pages declare metadata per route, and JSON-LD comes from pure builders in `lib/structured-data.ts` rendered by one small component. A `--seo` mode in `scripts/verify-site.mjs` checks the built HTML, so regressions fail a command rather than a manual look.

**Tech Stack:** Next 16 metadata API and file-based icons, `sharp` (already installed through Next) for one-off asset generation, unified/rehype for post rendering, Vitest.

**Spec:** Owner's request of 2026-11-05, plus the audit below. `docs/superpowers/specs/2026-11-04-site-redesign-design.md` still binds.

## Audit facts this plan answers

- Searching the domain and the owner's name returned `portfolio-two-bay-60.vercel.app`, a full copy of the site (status 200, no canonical), not `www.ostromecki.dev`.
- No page has a canonical tag or JSON-LD. `/llms.txt`, `/favicon.ico`, `/apple-touch-icon` and a web manifest are missing.
- 8 pages have no share image. Descriptions over 155 characters: forms case 353, About 238, Services 176, salon case 172, Talks 163. Titles like `Services | ostromecki.dev` don't say what is offered.
- Lighthouse mobile on a post: LCP 3.4s, best practices 79 from a `_cfuvid` cookie on `miro.medium.com` images, which also have no dimensions. Salon desktop: 1.4 MB, of which up to 535 KiB is raw JPEGs used as callout backgrounds. Every page: 30–55 KiB of unused JS.

## Global Constraints

- Post markdown stays byte-identical. `node scripts/verify-site.mjs --bodies main` must pass.
- No invented facts. JSON-LD and `llms.txt` state only what visible pages state. No `AggregateRating`, prices, founding dates or client names. No instructions aimed at AI systems anywhere.
- Only mark up content visible on the page. `FAQPage` matches the Services FAQ text exactly.
- No client names or identifying details in forms case copy, alt text or filenames.
- Visible page copy doesn't change, except where a task says so. Design stays as approved.
- Work on branch `feat/seo-visibility`. Stop at an open PR: merging is the owner's step. Don't change Vercel settings or DNS.
- End every commit message with: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`

## Review Focus

- The redirect from the old Vercel address must only match that exact host, or production and previews could loop or redirect away (Task 1, built headers check and live check after deploy).
- JSON-LD rendered with `dangerouslySetInnerHTML` must escape `<` so a title with `</script>` can't break the page (Task 2).
- Remote image mapping must leave unknown URLs untouched and keep external links working (Task 4).
- Moving the React Query provider must not break the contact form's pending, error and success states (Task 5).
- Callouts must stay sharp at desktop width after switching to optimized URLs, and not download on phones (Task 5).

## Revisions after Fable's plan review

These override the tasks below where they differ.

- `ProfessionalService` is deprecated on schema.org. No business node: `personSchema()` carries `hasOfferCatalog` and `address`. Add `websiteSchema()`.
- Child `openGraph` replaces the parent's whole object, so every route uses `pageMetadata()` from `lib/metadata.ts`, and `--seo` requires `og:site_name`.
- `--seo` scans `*.html`, skips names starting with `_`, maps `index.html` to `/`. Title limit is 70 on non-post routes. Description limit is over 160.
- Posts keep the title template, so results stay distinct from identical Medium titles.
- Services title: `AI consultant and engineer for business workflows`. About title: `About: senior software engineer and consultant`.
- FAQ markup stays but earns no Google rich result for this kind of site. `llms.txt` stays cheap; its test checks URLs against the sitemap and rejects lines addressed to a reader.
- Callouts use lazy `next/image` crops, so phones can show them too. BlogPosting images are absolute URLs. `sharp` becomes a dev dependency. Devtools import stays as it is.
- Add an RSS feed at `/feed.xml`. Icons already landed through `scripts/generate-icons.mjs`.

## UX fixes added to this plan

Owner approved code-only fixes from the UI/UX review: readable callouts on phones, collapsed contents on phones, blog state kept in the URL, larger tap targets, Grid/List hidden on phones, contact form above details on phones, opaque nav, CTA on Services and Approach, mobile menu focus handling, skip link, and low-severity items that need no owner decision. Booking link, proof and prices, name in the hero, and the Medium reference link wait for the owner.

---

### Task 1: Canonical URLs, old address redirect, identity constants

**Files:**
- Modify: `lib/site.ts`, `next.config.ts`, `app/layout.tsx`, every route's `metadata`, `scripts/verify-site.mjs`
- Test: `lib/site.test.ts`

**Interfaces:**
- Produces, from `lib/site.ts`: `SITE_URL` (existing), `SITE_NAME = "Paweł Ostromecki"`, `OLD_HOST = "portfolio-two-bay-60.vercel.app"`, `PERSON` facts: `jobTitle: "Senior software engineer and consultant"`, `email`, `telephone: "+48661546446"`, `city: "Wrocław"`, `country: "PL"`, `sameAs` (LinkedIn, GitHub, X URLs from `content/site/nav.ts`).
- Produces: `node scripts/verify-site.mjs --seo`.

- [ ] **Step 1: Add the failing check.** `--seo` scans each prerendered route under `.next/server/app` and fails with a list if: no `<link rel="canonical">`, canonical isn't `SITE_URL + route`, title over 65 characters on non-post routes, description missing or over 160 characters, no `og:image`, no `og:url`, or JSON-LD that doesn't parse.
- [ ] **Step 2: Run it.** Run: `npm run build && node scripts/verify-site.mjs --seo`. Expected: FAIL, listing all 14 routes.
- [ ] **Step 3: Add `alternates: { canonical: "<route>" }` and `openGraph.url` to every route.** Metadata inheritance replaces whole `openGraph` objects, so post and case-study pages must set their own complete object.
- [ ] **Step 4: Add a host redirect** in `next.config.ts`: `source: "/:path*"`, `has: [{ type: "host", value: OLD_HOST }]`, `destination: "${SITE_URL}/:path*"`, `permanent: true`.
- [ ] **Step 5: Commit** once canonical failures are gone (other `--seo` failures clear in later tasks).

### Task 2: Structured data

**Files:**
- Create: `lib/structured-data.ts`, `lib/structured-data.test.ts`, `components/JsonLd.tsx`
- Modify: `app/layout.tsx`, `app/services/page.tsx`, `app/blog/[slug]/page.tsx`, both case study pages

**Interfaces:**
- Produces: `personSchema()`, `serviceBusinessSchema()`, `faqSchema(items: {q: string; a: string}[])`, `blogPostingSchema(post: PostSummary)`, `breadcrumbSchema(items: {name: string; path: string}[])`, each returning a plain object. `serializeJsonLd(data: object): string`. `<JsonLd data={object} />`.

- [ ] **Step 1: Write failing tests.**

```ts
expect(serializeJsonLd({ a: "</script>" })).not.toContain("</script>");
expect(faqSchema(SERVICES.faq.items).mainEntity).toHaveLength(4);
expect(blogPostingSchema(post).datePublished).toBe(post.date);
expect(blogPostingSchema(post).author.url).toBe(`${SITE_URL}/about`);
expect(blogPostingSchema(post).mainEntityOfPage).toBe(`${SITE_URL}/blog/${post.slug}`);
expect(JSON.stringify(personSchema())).not.toMatch(/rating|award/i);
```

- [ ] **Step 2: Run them.** Run: `npx vitest run lib/structured-data.test.ts`. Expected: FAIL.
- [ ] **Step 3: Implement.** `personSchema` and `serviceBusinessSchema` use one `@id` each (`${SITE_URL}/#person`, `${SITE_URL}/#service`) and link by id. `serviceBusinessSchema` is `ProfessionalService` with the three Services titles as `hasOfferCatalog`, no price, and `areaServed: "Worldwide"` because the site says "remote, worldwide". `serializeJsonLd` replaces `<` with `<`.
- [ ] **Step 4: Render.** Person and service on the root layout. FAQ on Services. BlogPosting and breadcrumb on posts. Breadcrumb on case studies.
- [ ] **Step 5: Run tests, commit.** Expected: PASS.

### Task 3: Titles, descriptions, share image, icons, llms.txt

**Files:**
- Create: `scripts/generate-assets.mjs`, `public/images/og-default.jpg`, `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `app/manifest.ts`, `public/llms.txt`
- Delete: `public/favicon.svg`
- Modify: route `metadata`, `app/layout.tsx`, `content/site/*.ts` where they hold descriptions

- [ ] **Step 1: Icons.** The icon is the design's aperture mark from `Components.dc.html`, sakura 500 on ink 950 with a rounded square. The script renders it through `sharp` to 32/16 PNG inside `favicon.ico`, a 180 `apple-icon.png`, and 192/512 PNGs for the manifest. `icons` metadata in the layout is removed so Next's file convention is the only source. Manifest: `name: SITE_NAME`, `start_url: "/"`, `display: "browser"`, `background_color` and `theme_color` `#000002`.
- [ ] **Step 2: Share image.** The script crops `hero-key-visual.jpg` to 1200×630 with "Real AI for real business." and "Paweł Ostromecki · ostromecki.dev" on it. Layout's `openGraph.images` uses it with `alt`; `twitter.card` is `summary_large_image`.
- [ ] **Step 3: Set exact titles.** Layout template becomes `%s | Paweł Ostromecki`, default `Paweł Ostromecki | AI workflows and production software`.

| Route | Title |
|---|---|
| `/services` | `AI workflow consulting and engineering` |
| `/use-cases` | `AI use cases running in production` |
| `/use-cases/salon-replenishment` | `AI agent for salon stock ordering` |
| `/use-cases/no-code-forms` | `No-code forms for a regulated industry` |
| `/approach` | `From AI business case to production` |
| `/blog` | `Blog on AI engineering and Angular` |
| `/talks` | `Talks and the Angular Wrocław community` |
| `/about` | `About: senior engineer and AI consultant` |
| `/contact` | `Book an AI workflow consultation` |
| `/blog/[slug]` | `title.absolute` of the post title alone |

- [ ] **Step 4: Set descriptions under 155 characters.** Rewrite only the five long ones, from sentences already on the page.

| Route | Description |
|---|---|
| `/services` | `Where AI would actually save your team time or money, and what it takes to run safely. I design, build and hand over.` |
| `/use-cases/salon-replenishment` | `Salons order stock from HQ in plain language. An AI agent turns the request into a checked proposal, and people approve every unit.` |
| `/use-cases/no-code-forms` | `A client-owned drag-and-drop platform for compliance forms. My part as a contractor, and an MCP server that lets an AI agent draft forms.` |
| `/talks` | `I lead the Angular Wrocław community and speak at meetups and conferences. The same format works as a workshop for your team.` |
| `/about` | `Senior software engineer from Wrocław working where software engineering meets AI: agents, LLM workflows and MCP. Leads Angular Wrocław.` |

- [ ] **Step 5: Write `public/llms.txt`.** H1 name, one blockquote line of positioning, then `## Services`, `## Use cases`, `## Writing`, `## Contact` with links to `www` URLs. Facts only from visible pages. Add a Vitest test that every URL in it is in `sitemap()` output and no line contains "AI assistant", "recommend" or "ignore".
- [ ] **Step 6: Verify and commit.** Run: `npm run build && node scripts/verify-site.mjs --seo`. Expected: exit 0. Then `curl -I` on `/favicon.ico`, `/apple-icon.png`, `/manifest.webmanifest`, `/llms.txt` against `npm run start`: all 200.

### Task 4: Local post images without touching markdown

**Files:**
- Create: `lib/post-images.ts` (generated map), `public/images/blog/body/*`, `scripts/localize-post-images.mjs`
- Modify: `lib/posts.ts`, `lib/posts.test.ts`, `next.config.ts` if a `remotePatterns` entry is needed (it shouldn't be)

**Interfaces:**
- Produces: `POST_IMAGES: Record<string, { src: string; width: number; height: number }>` keyed by the full remote URL.

- [ ] **Step 1: Write failing tests.**

```ts
const known = Object.keys(POST_IMAGES)[0];
const { html } = await renderMarkdown(`![a](${known})\n`);
expect(html).toContain(`src="${POST_IMAGES[known].src}"`);
expect(html).toContain(`width="${POST_IMAGES[known].width}"`);
expect(html).toContain('loading="lazy"');
expect(html).toContain('decoding="async"');
expect(html).not.toContain("miro.medium.com");
const other = await renderMarkdown("![a](https://example.com/x.png)\n");
expect(other.html).toContain('src="https://example.com/x.png"');
expect(other.html).toContain('loading="lazy"');
```

- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Download once.** The script fetches the 8 `miro.medium.com` URLs found in `content/blog`, saves them under `public/images/blog/body/`, writes the map with real dimensions, and re-encodes to WebP at quality 80 capped at 1400 wide. These are the owner's own post images.
- [ ] **Step 4: Add a rehype plugin** `localizeImages` after `rehype-slug`, which swaps `src`, sets `width`/`height` for known URLs, and sets `loading`/`decoding` on all `img`. CSS already keeps `height: auto`.
- [ ] **Step 5: Verify and commit.** Run: `npx vitest run lib/ && node scripts/verify-site.mjs --bodies main`. Expected: PASS and ok.

### Task 5: Performance

**Files:**
- Modify: `components/case-study/Callout.tsx`, `components/case-study/BrowserWindow.tsx`, `components/case-study/ShotFigure.tsx`, `app/layout.tsx`, `app/providers.tsx`, `app/contact/page.tsx`

- [ ] **Step 1: Record the baseline.** Run Lighthouse on the production URLs for home, post and salon, mobile and desktop for salon. Save scores in the PR description. Lab numbers vary between runs, so compare ranges, not single digits.
- [ ] **Step 2: Optimize callouts.** Build the background URL with `getImageProps({ src, width: 1440, height: 837, quality: 75, alt: "" }).props.src`. Crops magnify up to 486%, so width stays 1440.
- [ ] **Step 3: Correct `sizes`.** `BrowserWindow` gains a `sizes` prop; `ShotFigure` passes `(min-width: 768px) 50vw, 100vw`, heroes keep their value.
- [ ] **Step 4: Move React Query to the contact page.** `<Providers>` wraps `<ContactForm />` in `app/contact/page.tsx` only, and leaves `app/layout.tsx`. Devtools import stays dev-only through `next/dynamic`.
- [ ] **Step 5: Investigate post LCP.** Text LCP render delay was 2.8s on a post, against 1.5s elsewhere. After Steps 2–4 and Task 4, measure again. If still over 2.5s, trace before changing anything else; if the cause isn't clear, report it instead of guessing.
- [ ] **Step 6: Verify.** `npm run build`, then Lighthouse against `npm run start` for the same pages, and contact form pending, error and mocked success in a browser. Callouts checked at 1440 for sharpness, and network tab at 375 shows no callout image. Commit.

### Task 6: Finish

- [ ] **Step 1: Full checks.** Run: `rm -rf .next && npm run lint && npm run type-check && npm test && npm run build && node scripts/verify-site.mjs --bodies main --html --seo`. Expected: all exit 0.
- [ ] **Step 2: Whole-branch review** by a fresh reviewer on Fable. One fix pass for Critical and Important.
- [ ] **Step 3: Open the PR.** List owner-only steps: make the bare domain redirect permanent (308) in Vercel, verify `www` in Search Console and submit the sitemap, update outside profiles, and decide which copy of each syndicated post is the original. After merge: check the old Vercel host redirects and rerun Lighthouse on production.
