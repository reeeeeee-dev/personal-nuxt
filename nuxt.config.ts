// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["nitro-cloudflare-dev", "@nuxt/fonts"],

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
