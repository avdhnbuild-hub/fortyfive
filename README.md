# fortyfive

**India's startup economy, clearly explained.**

fortyfive is an India-first publication covering startups, technology, funding, growth, AI, and the business economy. This repo is the complete website — a premium editorial front-end built on Next.js.

Editorial promise: **Clear stories. Sharp context. No noise.**

---

## Tech stack

- **Next.js 15** (App Router, JSX)
- **React 18**
- **Tailwind CSS 3** with a custom brand palette
- **shadcn/ui** primitives + **lucide-react** icons
- **sonner** for toasts
- Fonts: **Instrument Serif** (editorial headlines) + **Inter** (body / UI) via `next/font`
- MongoDB driver preinstalled (not used in MVP — data is local mock data ready to be swapped for a CMS)

## Folder structure

```
fortyfive/
├── app/
│   ├── layout.js                    # Root layout, fonts, metadata
│   ├── page.js                      # Home
│   ├── globals.css                  # Tailwind + editorial styles
│   ├── not-found.js                 # 404 page
│   ├── article/[slug]/page.js       # Article detail (dynamic)
│   ├── category/[slug]/page.js      # Category page (dynamic)
│   ├── search/page.js               # Client-side search
│   ├── about/page.js                # About
│   ├── subscribe/page.js            # Newsletter subscribe
│   └── api/[[...path]]/route.js     # Catch-all API stub
├── components/
│   ├── site/                        # fortyfive components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Hero.js
│   │   ├── ArticleCard.js
│   │   ├── DeepReadCard.js
│   │   ├── CategoryCard.js
│   │   ├── FundingCard.js
│   │   ├── NewsletterCTA.js
│   │   └── SectionHeader.js
│   └── ui/                          # shadcn primitives
├── lib/
│   └── data.js                      # Mock articles, categories, funding
├── tailwind.config.js               # Brand tokens (paper, ink, signal, ash, line)
├── package.json
└── README.md
```

## Design system

| Token   | Value      | Usage                                      |
|---------|------------|--------------------------------------------|
| `ink`   | `#080808`  | Primary text, dark sections, primary CTAs  |
| `paper` | `#F7F4EF`  | Page background (soft off-white)           |
| `line`  | `#E7E2DA`  | Borders, dividers                          |
| `ash`   | `#777777`  | Metadata, muted labels                     |
| `signal`| `#FF5A1F`  | Brand accent — used **intentionally**      |

Orange appears in: brand-mark dot, active nav, category chips, "In brief" border, hover states, CTA hovers.

## Running locally

Requirements: Node 18+, Yarn.

```bash
yarn install
yarn dev
```

Open http://localhost:3000.

Environment variables (`.env`):

```
MONGO_URL=mongodb://localhost:27017
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

MongoDB is **not required** for the MVP — the app runs entirely on local mock data in `lib/data.js`.

## How to add / edit articles (before CMS)

Open `lib/data.js`. Each article is:

```js
{
  slug: 'my-article',
  category: 'startups',            // must match a CATEGORIES slug
  title: '...',
  subtitle: '...',
  author: 'fortyfive desk',
  date: 'Jun 12, 2025',
  readTime: '6 min read',
  kind: 'Analysis',                // Feature | Opinion | Deep Read | ...
  featured: true,                  // optional — one article is hero
  deepRead: true,                  // optional — shows on Deep Reads row
  inBrief: '...',                  // shown at top of article
  bottomLine: '...',               // shown at end of article
  body: [
    { type: 'h2', text: '...' },
    { type: 'p',  text: '...' },
    { type: 'blockquote', text: '...' },
  ],
}
```

The article page renders block-by-block, so switching to MDX or a CMS is a small change.

## Pages

- `/` — Home (hero, latest, explore, deep reads, funding, newsletter)
- `/article/[slug]` — Article detail with In-brief + Bottom-line boxes and related stories
- `/category/[slug]` — Section landing (Startups, Tech, Funding, Growth, AI, Opinion)
- `/search` — Client-side search with category filters
- `/about` — About fortyfive
- `/subscribe` — Newsletter subscribe
- `*` — Clean 404

## Notes for next improvements

1. **CMS** — Replace `lib/data.js` with Sanity, Contentlayer, or MDX files.
2. **Newsletter integration** — Wire the form to Buttondown, Beehiiv, ConvertKit, or Resend audiences.
3. **Analytics** — Plausible or PostHog script tag in `app/layout.js`.
4. **SEO** — Per-article `generateMetadata` already exists; add OpenGraph images per story.
5. **Admin publishing** — Small Next.js `(admin)` route group + MongoDB collection using the preinstalled driver.
6. **RSS feed** — Add `app/rss.xml/route.js` that renders from `ARTICLES`.
7. **Author pages** — Extend articles with an `authorSlug`, add `/author/[slug]`.

---

Built as a clean, extensible base. No dashboards. No noise.
