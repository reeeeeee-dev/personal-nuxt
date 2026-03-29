import type { UnicornScene, UnicornSceneOptions } from "./useUnicornStudio";
import { ensureUnicornSdk } from "./useUnicornStudio";

/**
 * Mount a scene when the component mounts; destroys it on unmount.
 */
export function useUnicornScene(
	elementId: string,
	options: UnicornSceneOptions,
) {
	let scene: UnicornScene | null = null;

	onMounted(async () => {
		try {
			const api = await ensureUnicornSdk();
			scene = await api.addScene({ elementId, ...options });
		} catch {
			// SDK or scene init failed; page can still render
		}
	});

	onBeforeUnmount(() => {
		scene?.destroy();
		scene = null;
	});
}
