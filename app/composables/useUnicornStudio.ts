/** Unicorn Studio JS SDK v2.1.4 (UMD) */
export const UNICORN_SDK_URL =
	"https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js";

export type UnicornScene = { destroy: () => void };

/** Internal scene shape (unicornstudio.js `me` class) — not fully typed; used for readiness only. */
type UnicornSceneInternal = UnicornScene & {
	initialized?: boolean;
	destroyed?: boolean;
	local?: { preloadedImages?: Record<string, { loading?: boolean }> };
	layers?: Array<{
		isModel?: boolean;
		layerType?: string;
		isFlattened?: boolean;
		local?: {
			modelLoaded?: boolean;
			imageReady?: boolean;
			loaded?: boolean;
		};
		areTextAssetsReady?: () => boolean;
		areImageAssetsReady?: () => boolean;
		areModelAssetsReady?: () => boolean;
	}>;
};

/**
 * Mirrors unicornstudio.js `waitForAssetsAndDisablePlanes` / `handlePlaneCreation`:
 * `addScene()` resolves before WebGL init, texture preload, and `waitForAssetsAndDisablePlanes` finish.
 */
function unicornSceneAssetsPending(scene: UnicornSceneInternal): boolean {
	if (scene.destroyed) {
		return false;
	}
	const pre = scene.local?.preloadedImages;
	if (pre && Object.values(pre).some((x) => x.loading)) {
		return true;
	}
	const layers = scene.layers;
	if (!layers?.length) {
		return false;
	}
	return layers.some((layer) => {
		if (layer.isModel && !layer.local?.modelLoaded) {
			return true;
		}
		if (layer.layerType === "image" && !layer.local?.imageReady) {
			return true;
		}
		if (layer.layerType === "text" && !layer.local?.loaded) {
			return true;
		}
		if (layer.isFlattened) {
			const textOk = layer.areTextAssetsReady?.() ?? true;
			const imgOk = layer.areImageAssetsReady?.() ?? true;
			const modelOk = layer.areModelAssetsReady?.() ?? true;
			return !(textOk && imgOk && modelOk);
		}
		return false;
	});
}

/**
 * Wait until the scene has run `handlePlaneCreation` (initialized) and the asset pipeline
 * has caught up (same conditions the SDK uses before final render).
 */
export async function waitForUnicornSceneVisualReady(
	scene: UnicornScene | null,
): Promise<void> {
	if (!scene) {
		return;
	}
	const s = scene as UnicornSceneInternal;
	const deadline = Date.now() + 20000;
	while (!s.destroyed && !s.initialized && Date.now() < deadline) {
		await new Promise<void>((r) => requestAnimationFrame(() => r()));
	}
	while (unicornSceneAssetsPending(s) && Date.now() < deadline) {
		await new Promise<void>((r) => setTimeout(r, 32));
	}
	await new Promise<void>((r) => requestAnimationFrame(() => r()));
}

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

export type UnicornSceneOptions = Omit<UnicornAddSceneOptions, "elementId">;

/** Tracks in-flight `addScene` work so the shell can wait for WebGL + assets, not just the SDK script. */
let sceneLoadDepth = 0;
const sceneWaiters: Array<() => void> = [];

export function beginUnicornSceneLoad() {
	sceneLoadDepth++;
}

export function endUnicornSceneLoad() {
	sceneLoadDepth = Math.max(0, sceneLoadDepth - 1);
	if (sceneLoadDepth === 0) {
		while (sceneWaiters.length > 0) {
			const w = sceneWaiters.pop();
			w?.();
		}
	}
}

export function waitForUnicornScenes(): Promise<void> {
	if (sceneLoadDepth === 0) {
		return Promise.resolve();
	}
	return new Promise((resolve) => {
		sceneWaiters.push(resolve);
	});
}

/** Lets lazy route views register `beginUnicornSceneLoad` before we gate on `waitForUnicornScenes`. */
export async function waitForUnicornSceneRegistration(maxMs = 400) {
	const deadline = Date.now() + maxMs;
	while (sceneLoadDepth === 0 && Date.now() < deadline) {
		await nextTick();
		await new Promise<void>((r) => requestAnimationFrame(() => r()));
	}
}
