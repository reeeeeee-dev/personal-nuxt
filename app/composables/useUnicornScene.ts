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
	/** Pairs with `beginUnicornSceneLoad` even if we navigate away before the async mount work finishes. */
	let loadSlotHeld = false;
	let disposed = false;

	function releaseLoadSlot() {
		if (loadSlotHeld) {
			endUnicornSceneLoad();
			loadSlotHeld = false;
		}
	}

	onMounted(async () => {
		beginUnicornSceneLoad();
		loadSlotHeld = true;
		try {
			const api = await ensureUnicornSdk();
			const s = await api.addScene({ elementId, ...options });
			if (disposed) {
				s.destroy();
				return;
			}
			scene = s;
			await waitForUnicornSceneVisualReady(s);
		} catch {
			// SDK or scene init failed; page can still render
		} finally {
			releaseLoadSlot();
		}
	});

	onBeforeUnmount(() => {
		disposed = true;
		scene?.destroy();
		scene = null;
		releaseLoadSlot();
	});
}
