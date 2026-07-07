# personal-nuxt

Source for [reetikpatel.me](https://reetikpatel.me) — my personal site.

## Stack

- [Nuxt 4](https://nuxt.com) · Vue 3 · TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- [@nuxt/fonts](https://fonts.nuxt.com) — Fraunces (display) + Manrope (sans), self-hosted
- [@nuxt/icon](https://github.com/nuxt/icon) — Iconify (`simple-icons` + `lucide`), pre-bundled for first paint
- [Three.js](https://threejs.org) + custom GLSL for the landing paint-stroke shader
- Deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (Nitro `cloudflare_module` preset)

## Structure

```
app/
├── app.vue               # root — favicon links, SEO meta, page-nav overlay
├── pages/
│   ├── index.vue         # landing — seigaiha + paint strokes
│   ├── about.vue
│   ├── journey.vue
│   └── projects.vue
├── components/
│   ├── SeigaihaWaves.vue           # tiled 青海波 SVG pattern
│   ├── SeigaihaLoader.vue          # animated variant used during nav
│   ├── LandingPaintStrokesGL.vue   # Three.js + GLSL paint-stroke ribbons
│   ├── Navbar.vue
│   ├── PageShell.vue               # shared interior-page wrapper (bg + H1 + footer)
│   └── SiteLoading.vue / SiteFooter.vue
├── composables/          # useSiteReady, usePageNavTransition
├── config/site.ts        # nav links, social URLs, contact info
└── assets/css/main.css   # design tokens + .iris-wipe + .external-link

public/                   # favicons, og-image, static assets
wrangler.jsonc            # Cloudflare Worker config (custom domain: reetikpatel.me)
nuxt.config.ts
```

## Develop

```bash
yarn install
yarn dev               # http://localhost:3000
```

## Build & preview

```bash
yarn build             # nuxt build → .output/
yarn preview           # build + wrangler dev (runs on the Workers runtime locally)
```

## Deploy

```bash
yarn deploy            # build + wrangler deploy → reetikpatel.me
```

Requires `wrangler login` and access to the Cloudflare account bound in
[`wrangler.jsonc`](wrangler.jsonc).

## Design notes

- **Seigaiha (青海波)** is the visual anchor — landing background, page-nav
  loader, and the entire favicon / OG image set are all the same wave motif
  rendered from [`SeigaihaWaves.vue`](app/components/SeigaihaWaves.vue).
- Palette lives as CSS custom properties in
  [`app/assets/css/main.css`](app/assets/css/main.css): `--ink` `#151514`,
  `--cream` `#ceb9a1`, `--wave-ink` `#7a8a82`, with a warm gold accent
  (`#8C6A1F` / `#C9A24A`) for the seigaiha stroke.
- Landing scroll is locked via `useHead` classes so the shader canvas stays
  pinned; interior pages scroll normally.
