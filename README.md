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
cohost/                   # second deployments of the sites /projects embeds
├── deploy.sh             # clone → build → deploy each preview Worker
└── seed-steven-wise/     # one-off D1 + R2 seeder for the Steven Wise copy
wrangler.jsonc            # Cloudflare Worker config (custom domain: reetikpatel.me)
nuxt.config.ts
```

## Develop

```bash
bun install
bun run dev            # http://localhost:3000
```

## Build & preview

```bash
bun run build          # nuxt build → .output/
bun run preview        # build + wrangler dev (runs on the Workers runtime locally)
```

Use `bun run build`, not `bun build` — the latter is Bun's own bundler
subcommand and will not run the Nuxt script.

## Deploy

```bash
bun run deploy         # build + wrangler deploy → reetikpatel.me
```

Requires `wrangler login` and access to the Cloudflare account bound in
[`wrangler.jsonc`](wrangler.jsonc).

## Co-hosted project previews

[`/projects`](app/pages/projects.vue) renders some projects as live miniatures
inside an iframe ([`MiniSitePreview.vue`](app/components/MiniSitePreview.vue))
rather than as screenshots. Those iframes deliberately do **not** point at the
projects' production hostnames — most of those sites are client-owned, and
embedding production would spend a client's bandwidth and break the preview
whenever they change their site.

Instead each embeddable project is deployed a second time into my own
Cloudflare account, and `projects.vue` embeds that copy via its `cohost()`
helper. Each site keeps its own `wrangler.jsonc` pointed at its own domain;
[`cohost/deploy.sh`](cohost/deploy.sh) generates a `wrangler.cohost.jsonc`
override at deploy time that repins `account_id`, drops `routes`, and enables
`workers_dev`.

```bash
./cohost/deploy.sh                        # all three
./cohost/deploy.sh puracoco steven-wise   # a subset
```

| Project | Worker | Notes |
| --- | --- | --- |
| Pura Coco | `puracoco-preview` | Nuxt 4 SSR |
| All AV Services | `allavservices-preview` | Next.js static export, assets-only Worker |
| Steven Wise | `steven-wise-preview` | Nuxt 4 SSR + its own D1 and R2 |

Clones land in the gitignored `cohost/.work/`, so the first run is slow.

Steven Wise needs data as well as code: its gallery reads artwork metadata from
D1 and image bytes from R2. The copy gets its own `steven-wise-portfolio-preview`
database and `steven-wise-works-preview` bucket, seeded once by
[`cohost/seed-steven-wise`](cohost/seed-steven-wise) — a throwaway Worker that
copies objects at the edge, because the R2 REST API returns object bodies as
lossily decoded strings and corrupts every image. Deploy it, walk `/seed?offset=`
until `/verify` reports no missing objects, then delete it.

That copy's `ACCESS_AUD` is intentionally not a real Cloudflare Access
audience, so `/admin` and `/api/admin` return 403 on the preview. The gallery is
public and unaffected. Pointing it at the real audience would stand up a second,
unguarded admin console over a client's data.

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
