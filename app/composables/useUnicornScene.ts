import type { UnicornScene, UnicornSceneOptions } from "./useUnicornStudio";
import {
	beginUnicornSceneLoad,
	endUnicornSceneLoad,
	ensureUnicornSdk,
	waitForUnicornSceneVisualReady,
} from "./useUnicornStudio";

/**
 * Mount a scene when the component mounts; destroys it on unmount.
 */
export function useUnicornScene(
	elementId: string,
	options: UnicornSceneOptions,
) {
	let scene: UnicornScene | null = null;

	onMounted(async () => {
		beginUnicornSceneLoad();
		try {
			const api = await ensureUnicornSdk();
			scene = await api.addScene({ elementId, ...options });
			await waitForUnicornSceneVisualReady(scene);
		} catch {
			// SDK or scene init failed; page can still render
		} finally {
			endUnicornSceneLoad();
		}
	});

	onBeforeUnmount(() => {
		scene?.destroy();
		scene = null;
	});
}
