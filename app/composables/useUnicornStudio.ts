/** Unicorn Studio JS SDK v2.1.4 (UMD) */
export const UNICORN_SDK_URL =
	"https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js";

export type UnicornScene = { destroy: () => void };

export type UnicornAddSceneOptions = {
	elementId: string;
	projectId: string;
	scale?: number;
	dpi?: number;
	fps?: number;
	lazyLoad?: boolean;
	production?: boolean;
};

type UnicornStudioGlobal = {
	addScene: (opts: UnicornAddSceneOptions) => Promise<UnicornScene>;
};

let sdkPromise: Promise<UnicornStudioGlobal> | null = null;

function getGlobal(): UnicornStudioGlobal | undefined {
	return (window as Window & { UnicornStudio?: UnicornStudioGlobal })
		.UnicornStudio;
}

function loadUnicornSdkOnce(): Promise<UnicornStudioGlobal> {
	return new Promise((resolve, reject) => {
		const ready = getGlobal();
		if (ready?.addScene) {
			resolve(ready);
			return;
		}
		const existing = document.querySelector<HTMLScriptElement>(
			`script[src="${UNICORN_SDK_URL}"]`,
		);
		if (existing) {
			const finish = () => {
				const u = getGlobal();
				if (u?.addScene) resolve(u);
				else reject(new Error("Unicorn Studio SDK loaded but addScene is missing"));
			};
			if (existing.dataset.loaded === "true") {
				finish();
				return;
			}
			existing.addEventListener("load", finish, { once: true });
			existing.addEventListener(
				"error",
				() => reject(new Error("Unicorn Studio SDK failed to load")),
				{ once: true },
			);
			queueMicrotask(finish);
			return;
		}
		const script = document.createElement("script");
		script.src = UNICORN_SDK_URL;
		script.async = true;
		script.onload = () => {
			script.dataset.loaded = "true";
			const u = getGlobal();
			if (u?.addScene) resolve(u);
			else reject(new Error("Unicorn Studio SDK loaded but addScene is missing"));
		};
		script.onerror = () =>
			reject(new Error("Unicorn Studio SDK failed to load"));
		document.head.appendChild(script);
	});
}

/**
 * Resolves to the Unicorn Studio global after the SDK script has loaded.
 * Safe to call from multiple places; loading is deduplicated.
 */
export function ensureUnicornSdk(): Promise<UnicornStudioGlobal> {
	if (!import.meta.client) {
		return Promise.reject(new Error("Unicorn Studio is client-only"));
	}
	if (!sdkPromise) {
		sdkPromise = loadUnicornSdkOnce();
	}
	return sdkPromise;
}

/** Start loading the SDK as early as the app mounts (client). */
export function useUnicornStudioRoot() {
	onMounted(() => {
		void ensureUnicornSdk();
	});
}

export type UnicornSceneOptions = Omit<UnicornAddSceneOptions, "elementId">;
