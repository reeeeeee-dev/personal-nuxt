<script lang="ts" setup>
defineProps<{
  ready: boolean;
}>();
</script>

<template>
  <Transition name="site-load">
    <div
      v-show="!ready"
      class="site-load fixed inset-0 z-9999 flex flex-col items-center justify-center bg-(--ink) px-6"
      aria-live="polite"
      :aria-busy="!ready"
    >
      <SeigaihaLoader variant="on-ink" />
    </div>
  </Transition>
</template>

<style>
/*
 * Square iris wipe on leave: overlay is a full-viewport ink layer with a
 * square hole cut out via a self-intersecting polygon (outer viewport rect
 * CW + inner centered square CCW). --wipe is the half-side of the hole as
 * a % of the overlay. 0% = no hole (covers). 71% ≈ sqrt(0.5) so the hole's
 * corners fully contain the viewport regardless of aspect ratio.
 *
 * Vue's <Transition> flow: adds -leave-from + -leave-active (from state),
 * next frame swaps -leave-from for -leave-to (to state), interpolates. We
 * pin --wipe: 0% on the base .site-load class AND on -leave-from so the
 * transition has an explicit starting value — without it, the browser
 * paints the combined -active + -to state on the same frame and skips the
 * animation entirely (the initial-flash bug).
 */
.site-load {
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
}

.site-load-leave-active {
  transition: --wipe 1080ms cubic-bezier(0.7, 0, 0.3, 1);
}

.site-load-leave-from {
  --wipe: 0%;
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
  .site-load-leave-active {
    transition: opacity 200ms ease-in-out;
  }

  .site-load-leave-to {
    opacity: 0;
  }
}
</style>
