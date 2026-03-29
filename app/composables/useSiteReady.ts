import { ensureUnicornSdk } from "./useUnicornStudio";

/**
 * Drives the shell loading overlay: becomes true after the first post-mount tick
 * and the Unicorn Studio SDK has finished loading (or failed — we still reveal the UI).
 */
export function useSiteReady() {
	const ready = ref(false);

	onMounted(async () => {
		await nextTick();
		await ensureUnicornSdk().catch(() => {});
		ready.value = true;
	});

	return { ready };
}
