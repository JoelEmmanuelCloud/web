# Paul Wayne Gregory — Storefront

Next.js storefront for [Paul Wayne Gregory](https://www.instagram.com/pwg_chocolates), an award-winning chocolatier, built on the Shopify Storefront GraphQL API.

## Features

- Shop and product pages backed by Shopify's Storefront API (GraphQL), with graceful fallback when Shopify env vars aren't configured
- **Bespoke Box builder** — a multi-step custom gift-box flow: choose a box style (rigid, folded, or window), select truffles, personalize, and review before adding to cart
- Cart with line-item controls
- Gallery, philosophy, and contact pages
- Legal pages (privacy, refund, shipping, terms) driven by a shared policy-page component
- Cookie consent banner
- SEO plumbing: sitemap, robots.txt, web manifest

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Shopify Storefront API (GraphQL)

## Getting Started

```bash
npm install
npm run dev
```

Configure Shopify access in `.env.local`:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
```

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint     # eslint
```

## Deployment

Deploys to Vercel.
