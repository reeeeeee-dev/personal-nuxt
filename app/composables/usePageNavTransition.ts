/** True while the outgoing page is gone and the incoming page is not yet visible. */
export const pageNavTransitionLoading = ref(false);

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION_S = "0.35s";

function applyTransition(el: HTMLElement) {
	el.style.transition = `opacity ${DURATION_S} ${EASE}, transform ${DURATION_S} ${EASE}`;
}

function runEnterAfterReady(el: HTMLElement, done: () => void) {
	applyTransition(el);
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			el.style.opacity = "1";
			el.style.transform = "translateY(0)";
			window.setTimeout(() => {
				el.style.transition = "";
				done();
			}, 400);
		});
	});
}

function runLeave(el: HTMLElement, done: () => void) {
	applyTransition(el);
	requestAnimationFrame(() => {
		el.style.opacity = "0";
		el.style.transform = "translateY(12px)";
		window.setTimeout(() => {
			el.style.transition = "";
			pageNavTransitionLoading.value = true;
			done();
		}, 400);
	});
}

/**
 * `css: false` so we drive opacity/transform manually and keep the loading flag
 * in sync with the incoming page's mount.
 */
export function usePageNavTransition() {
	const pageNavTransition = {
		name: "page-nav",
		mode: "out-in" as const,
		css: false,
		onBeforeEnter(el: Element) {
			const elHtml = el as HTMLElement;
			elHtml.style.opacity = "0";
			elHtml.style.transform = "translateY(12px)";
		},
		onEnter(el: Element, done: () => void) {
			const elHtml = el as HTMLElement;
			void (async () => {
				await nextTick();
				runEnterAfterReady(elHtml, () => {
					pageNavTransitionLoading.value = false;
					done();
				});
			})();
		},
		onLeave(el: Element, done: () => void) {
			runLeave(el as HTMLElement, done);
		},
	};

	return { pageNavTransition, pageNavTransitionLoading };
}
