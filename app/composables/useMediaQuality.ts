export type MediaQuality = "live" | "static";

export function useMediaQuality() {
	const quality = useState<MediaQuality>("media-quality", () => "live");

	onMounted(() => {
		const stored = localStorage.getItem("media-quality");
		if (stored === "live" || stored === "static") {
			quality.value = stored;
		}
	});

	watch(quality, (newVal) => {
		if (import.meta.client) {
			localStorage.setItem("media-quality", newVal);
		}
	});

	return {
		quality,
		setQuality: (val: MediaQuality) => {
			quality.value = val;
		},
	};
}
