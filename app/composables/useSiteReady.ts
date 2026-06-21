/**
 * Drives the shell loading overlay: becomes true after the first post-mount tick
 * and once the router is ready. The new WebGL hero handles its own visual
 * readiness inside the page; the shell just needs to confirm hydration finished.
 */
export function useSiteReady() {
	const ready = ref(false);

	onMounted(async () => {
		await nextTick();
		await useRouter().isReady();
		await nextTick();
		ready.value = true;
	});

	return { ready };
}
