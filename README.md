# ostromecki.dev

Consultancy site + blog — Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · React Query · react-hook-form + zod · Resend.

## Stack

- **Next.js 16** (App Router, SSR by default; blog pages statically generated)
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme` CSS-first config, Spotlight design tokens in `app/globals.css`)
- **@tanstack/react-query** for server-state / HTTP mutations
- **react-hook-form + zod** for form validation (contact form)
- **Resend** for transactional email
- **gray-matter + unified (remark, rehype, Shiki)** for Markdown blog posts
- **Vitest** for `lib/` and the contact route

State separation uses plain React hooks (`useState`/`useReducer`/`useContext`) — no external store.

## Scripts

```bash
npm run dev         # start dev server
npm run build       # production build
npm start           # serve production build
npm run lint        # eslint
npm run type-check  # tsc --noEmit
npm test            # vitest
node scripts/verify-site.mjs --bodies main --html  # post bodies unchanged, no design placeholders in the build
```

## Env

Copy `.env.example` to `.env.local` and set:

```
RESEND_API_KEY=re_...
```

## Content

Blog posts live in `content/blog/*.md`. Each file needs frontmatter:

```yaml
---
title: "..."
excerpt: "..."
date: "YYYY-MM-DD"
image: "/images/blog/..."
imageAlt: "..."
imagePosition: "50% 50%"  # optional
category: "Artificial Intelligence"  # or "Angular"; drives the blog filter
label: "..."  # shown on cards
slug: "url-slug"
---
```

The filename slug should match the `slug` field. Page copy lives in `content/site/*.ts`.

## Structure

```
app/            # App Router pages + API routes + layouts
components/     # Shared React components (server + client)
content/blog/   # Markdown posts
lib/            # posts pipeline, theme hook, zod schemas
public/         # Static assets (images, icons, CV)
```

The legacy Astro source is preserved under `src/deprecated/` during migration and can be removed once parity is verified.
