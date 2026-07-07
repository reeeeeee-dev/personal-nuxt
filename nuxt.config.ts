// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["nitro-cloudflare-dev", "@nuxt/fonts", "@nuxt/icon"],

	// Icons are served via @nuxt/icon. On Cloudflare Workers, `serverBundle: 'auto'`
	// (default) picks `remote` — icons are fetched from jsdelivr on demand rather
	// than shipping the full collection JSON in the Worker bundle. We still
	// pre-bundle the icons known at build time into the client bundle so they
	// render on first paint without a round-trip.
	icon: {
		mode: "svg",
		clientBundle: {
			icons: [
				"simple-icons:github",
				"simple-icons:linkedin",
				"simple-icons:instagram",
				"simple-icons:buymeacoffee",
				"lucide:arrow-up",
			],
			scan: true,
		},
	},

	css: ["~/assets/css/main.css"],

	fonts: {
		families: [
			{
				name: "Fraunces",
				provider: "google",
				weights: [400, 500, 600],
				styles: ["normal", "italic"],
				subsets: ["latin"],
			},
			{
				name: "Manrope",
				provider: "google",
				weights: [300, 400, 500, 600],
				styles: ["normal"],
				subsets: ["latin"],
			},
		],
		defaults: {
			preload: true,
		},
	},

	vite: {
		// Cast: @tailwindcss/vite and Nuxt resolve different Vite type versions (hotUpdate context mismatch)
		// biome-ignore lint/suspicious/noExplicitAny: Vite plugin type version mismatch between Nuxt and @tailwindcss/vite
		plugins: [tailwindcss()] as any,
	},

	nitro: {
		preset: "cloudflare_module",

		cloudflare: {
			deployConfig: true,
			nodeCompat: true,
		},
	},
});
