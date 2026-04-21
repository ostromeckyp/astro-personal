# ostromecki.dev

Personal portfolio + blog — Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · React Query · react-hook-form + zod · Resend.

## Stack

- **Next.js 15** (App Router, SSR by default; blog pages statically generated)
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme` CSS-first config, `@tailwindcss/forms` + `@tailwindcss/typography`)
- **@tanstack/react-query** for server-state / HTTP mutations
- **react-hook-form + zod** for form validation (contact form)
- **Resend** for transactional email
- **gray-matter + remark + rehype** for Markdown blog posts

State separation uses plain React hooks (`useState`/`useReducer`/`useContext`) — no external store.

## Scripts

```bash
npm run dev         # start dev server
npm run build       # production build
npm start           # serve production build
npm run lint        # eslint
npm run type-check  # tsc --noEmit
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
image: "https://..."
category: "..."
slug: "url-slug"
---
```

The filename slug should match the `slug` field.

## Structure

```
app/            # App Router pages + API routes + layouts
components/     # Shared React components (server + client)
content/blog/   # Markdown posts
lib/            # posts pipeline, theme hook, zod schemas
public/         # Static assets (images, icons, CV)
```

The legacy Astro source is preserved under `src/deprecated/` during migration and can be removed once parity is verified.
