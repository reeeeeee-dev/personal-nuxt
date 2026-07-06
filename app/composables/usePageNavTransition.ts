/** True while the outgoing page is gone and the incoming page is not yet visible. */
export const pageNavTransitionLoading = ref(false);

const CLIP_MS = 1080;

/**
 * Two flags drive the overlay in app.vue:
 *   - overlayVisible: v-show; keeps the overlay in the DOM across the whole
 *     leave + swap + enter sequence so its clip-path animation is continuous.
 *   - overlayOpen: toggles .page-nav-overlay--open, which transitions
 *     clip-path from inset(50%) (invisible) → inset(0) (covering).
 *
 * Sequence:
 *   1. onLeave: mount overlay (visible=true, open=false = fully iris-closed),
 *      then next frame flip open=true so it irises OUT from center over the
 *      still-full-size outgoing page. After CLIP_MS, call done() and Vue
 *      swaps children while the overlay is fully covering (no white flash).
 *   2. onEnter: children are swapped, overlay still fully covers. Wait a
 *      tick for the new page to mount, then flip open=false so the overlay
 *      irises BACK IN to center, revealing the new page. After CLIP_MS,
 *      hide the overlay (visible=false) and call done().
 */
export function usePageNavTransition() {
	const overlayVisible = ref(false);
	const overlayOpen = ref(false);

	const pageNavTransition = {
		name: "page-nav",
		mode: "out-in" as const,
		css: false,
		onLeave(_el: Element, done: () => void) {
			pageNavTransitionLoading.value = true;
			overlayVisible.value = true;
			overlayOpen.value = false;
			// Two rAFs so the initial clip-path (fully closed) commits before
			// we flip .page-nav-overlay--open on and start the transition.
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					overlayOpen.value = true;
					window.setTimeout(done, CLIP_MS);
				});
			});
		},
		onEnter(_el: Element, done: () => void) {
			void (async () => {
				await nextTick();
				overlayOpen.value = false;
				window.setTimeout(() => {
					overlayVisible.value = false;
					pageNavTransitionLoading.value = false;
					done();
				}, CLIP_MS);
			})();
		},
	};

	return {
		pageNavTransition,
		pageNavTransitionLoading,
		pageNavOverlayVisible: overlayVisible,
		pageNavOverlayOpen: overlayOpen,
	};
}
