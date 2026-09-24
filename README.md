# Paul Wayne Gregory — Storefront

Headless Next.js storefront for [Paul Wayne Gregory Chocolates](https://www.instagram.com/pwg_chocolates), an award-winning UK chocolatier. Product data, cart, and checkout run through Shopify's Storefront GraphQL API; there is no custom backend — all commerce logic lives in `src/lib` and is called directly from Server Components and Server Actions.

## Pages

- `/` — home
- `/shop`, `/shop/[slug]` — product collections (Chocolate Art, Truffles) and individual product pages
- `/bespoke-box`, `/bespoke-box/build` — custom gift-box builder
- `/windrush` — the Windrush Collection
- `/philosophy` — brand philosophy
- `/about`, `/gallery`, `/contact`
- `/cart`
- `/policies/*` — privacy, refund, shipping, terms (shared `LegalPage` component)
- `/coming-soon` — pre-launch holding page (see Coming Soon Gate below)

## Bespoke Box builder

A multi-step custom gift-box flow under `src/components/bespoke/`: choose a box style and colour (`step-box`), pick truffles (`step-truffles`), personalise with a message (`step-personalise`), then review (`step-review`) with a live running summary (`live-summary`) before adding to cart. Step state and progress are driven by `step-indicator.tsx` and `builder.tsx`; static config (box styles, colours, truffle options) lives in `src/lib/bespoke-config.ts`, and share-link encoding for a saved configuration lives in `src/lib/bespoke-share.ts`.

## Shopify integration

- `src/lib/shopify.ts` — all Storefront API calls (product/variant fetches, cart create/read/update) via GraphQL, using `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
- `src/lib/products.ts` — static product copy (descriptions, flavours, ingredients, allergens) keyed by slug, merged with live Shopify availability/variant data so marketing content can be hand-written while stock and pricing stay live.
- `src/lib/cart.ts` — Server Actions for cart create/add/update/remove, backed by a `cart_id` cookie (30-day expiry).
- If Shopify env vars are absent, product fetches degrade gracefully rather than throwing, so the site can still build and render without live credentials.

Order fulfilment for the three current SKUs is handled by a third-party integration (MyInline), configured entirely on the Shopify admin side — no code in this repo talks to it directly.

## Coming Soon gate

`src/proxy.ts` (Next.js 16 renamed `middleware.ts` to `proxy.ts`) gates the entire site behind `/coming-soon` when `COMING_SOON_MODE=true`, scoped to hostnames ending in `paulwaynegregory.com`. A `PREVIEW_BYPASS_SECRET` passed as `?preview=<secret>` sets an httpOnly `pwg_preview` cookie (90-day expiry) to bypass the gate for reviewers without disabling it site-wide.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Shopify Storefront API (GraphQL)

## Environment variables

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
NEXT_PUBLIC_SITE_URL=https://www.paulwaynegregory.com
COMING_SOON_MODE=false
PREVIEW_BYPASS_SECRET=
```

`NEXT_PUBLIC_SITE_URL` is used for canonical URLs, the sitemap, and social metadata (falls back to `https://www.paulwaynegregory.com` if unset). `COMING_SOON_MODE` and `PREVIEW_BYPASS_SECRET` are optional and only relevant while the site is gated pre-launch.

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint     # eslint
```

## Asset pipeline

- `scripts/compress-images.js` — resizes/compresses JPEGs in `public/images/shopify-cdn` (via `sharp`, max width 2000px).
- `scripts/compress-videos.sh` — re-encodes `public/video/*.mp4` via the bundled `ffmpeg-static` binary.

## Deployment

Deploys to Vercel.
