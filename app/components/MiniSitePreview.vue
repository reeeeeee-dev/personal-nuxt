<script lang="ts" setup>
// Renders a same-origin page live inside a miniature frame, in place of a
// screenshot. Used by the "This Site" project entry.
//
// The iframe is laid out at a fixed desktop viewport so the embedded page picks
// its desktop breakpoint, then a ResizeObserver-driven transform shrinks it to
// whatever width the media column gives us. CSS alone can't do this: `scale()`
// needs a unitless ratio and calc() can't divide a length by a length.
//
// Mouse-only interactivity: clicks land inside the frame (the transform scales
// hit-testing along with the pixels), but it is aria-hidden and tabindex="-1"
// so screen readers and keyboard navigation skip straight past it.
//
// Wheel handling is click-to-engage. Wheel events over an iframe belong to the
// embedded document, so left alone they dead-end there and freeze the host
// page. Until you click in, we forward them back to the host; once you click
// in, the mini site keeps its own wheel. Clicking anywhere outside releases it.
// Events inside a nested browsing context never reach the host document, so a
// host-level pointerdown is by definition a click outside the frame.

const props = withDefaults(
  defineProps<{
    src: string;
    title: string;
    frameWidth?: number;
    frameHeight?: number;
  }>(),
  { frameWidth: 1440, frameHeight: 900 },
);

const root = ref<HTMLElement | null>(null);
const frame = ref<HTMLIFrameElement | null>(null);
const scale = ref(0);
const engaged = ref(false);

let observer: ResizeObserver | null = null;

function forwardWheel(event: WheelEvent) {
  if (engaged.value) return;
  event.preventDefault();
  window.scrollBy({ top: event.deltaY, left: event.deltaX });
}

function engage() {
  engaged.value = true;
}

function release() {
  engaged.value = false;
}

function bindFrame() {
  const doc = frame.value?.contentDocument;
  if (!doc) return;
  doc.removeEventListener("wheel", forwardWheel);
  doc.removeEventListener("pointerdown", engage);
  doc.addEventListener("wheel", forwardWheel, { passive: false });
  doc.addEventListener("pointerdown", engage);
}

function unbindFrame() {
  const doc = frame.value?.contentDocument;
  if (!doc) return;
  doc.removeEventListener("wheel", forwardWheel);
  doc.removeEventListener("pointerdown", engage);
}

onMounted(() => {
  const el = root.value;
  if (!el) return;

  const measure = (width: number) => {
    scale.value = width / props.frameWidth;
  };

  observer = new ResizeObserver((entries) => {
    const width = entries[0]?.contentRect.width;
    if (width) measure(width);
  });
  observer.observe(el);
  measure(el.clientWidth);

  document.addEventListener("pointerdown", release);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
  document.removeEventListener("pointerdown", release);
  unbindFrame();
});
</script>

<template>
  <div
    ref="root"
    class="relative w-full overflow-hidden transition-shadow duration-300"
    :class="engaged ? 'ring-1 ring-(--cream)/45' : ''"
    :style="{ aspectRatio: `${frameWidth} / ${frameHeight}` }"
  >
    <!-- biome-ignore lint/a11y/useIframeTitle: title is bound below; biome doesn't resolve v-bind in SFCs -->
    <iframe
      ref="frame"
      :src="src"
      :title="title"
      :width="frameWidth"
      :height="frameHeight"
      class="absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-500"
      :style="{ transform: `scale(${scale})`, opacity: scale ? 1 : 0 }"
      loading="lazy"
      tabindex="-1"
      aria-hidden="true"
      @load="bindFrame"
    />
  </div>
</template>
