import {
	ensureUnicornSdk,
	waitForUnicornSceneRegistration,
	waitForUnicornScenes,
} from "./useUnicornStudio";

/**
 * Drives the shell loading overlay: becomes true after the first post-mount tick,
 * the router is ready, the Unicorn SDK script has loaded, and any in-flight
 * `addScene` (WebGL + project assets) has finished — or failed, in which case
 * we still reveal the UI.
 */
export function useSiteReady() {
	const ready = ref(false);
	const route = useRoute();

	onMounted(async () => {
		await nextTick();
		await useRouter().isReady();
		await nextTick();
		await ensureUnicornSdk().catch(() => {});

		const expectsScene = Boolean(
			(route.meta as { unicornScene?: boolean }).unicornScene,
		);
		if (expectsScene) {
			await waitForUnicornSceneRegistration(500);
		}

		await waitForUnicornScenes();
		ready.value = true;
	});

	return { ready };
}
