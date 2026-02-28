// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["nitro-cloudflare-dev"],

	css: ["~/assets/css/main.css"],

	vite: {
		plugins: [tailwindcss()],
	},

	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},

	nitro: {
		preset: "cloudflare_module",

		cloudflare: {
			deployConfig: true,
			nodeCompat: true,
		},
	},
});
