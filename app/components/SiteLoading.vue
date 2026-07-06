<script lang="ts" setup>
defineProps<{
  ready: boolean;
}>();
</script>

<template>
  <Transition name="site-load">
    <div
      v-show="!ready"
      class="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-(--ink) px-6"
      aria-live="polite"
      :aria-busy="!ready"
    >
      <SkullLoader variant="on-ink" />
    </div>
  </Transition>
</template>

<style>
/*
 * Square radial wipe on leave: the overlay stays fully opaque and gets a
 * square-shaped hole in the center that grows outward until it covers the
 * viewport, revealing the page beneath. clip-path polygon uses the
 * even-odd fill rule by way of a self-intersecting path — outer viewport
 * rect (CW) + inner centered square (CCW), joined by a zero-width seam on
 * the left edge — which produces a hole rather than a stacked shape.
 *
 * --wipe is the half-side of the inner square as a percentage of the
 * overlay. 0% = no hole (overlay fully covers). 71% ≈ sqrt(0.5) * 100,
 * enough that the square's corners fully contain the viewport rectangle
 * regardless of aspect ratio.
 */
.site-load-enter-active {
  transition: opacity 300ms ease-in-out;
}

.site-load-leave-active {
  --wipe: 0%;
  clip-path: polygon(
    0% 0%,
    0% 100%,
    100% 100%,
    100% 0%,
    0% 0%,
    calc(50% - var(--wipe)) calc(50% - var(--wipe)),
    calc(50% + var(--wipe)) calc(50% - var(--wipe)),
    calc(50% + var(--wipe)) calc(50% + var(--wipe)),
    calc(50% - var(--wipe)) calc(50% + var(--wipe)),
    calc(50% - var(--wipe)) calc(50% - var(--wipe))
  );
  transition: --wipe 900ms cubic-bezier(0.7, 0, 0.3, 1);
}

.site-load-leave-to {
  --wipe: 71%;
}

@property --wipe {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}

@media (prefers-reduced-motion: reduce) {
  .site-load-enter-active,
  .site-load-leave-active {
    transition: opacity 200ms ease-in-out;
    clip-path: none;
  }

  .site-load-leave-to {
    opacity: 0;
  }
}
</style>
