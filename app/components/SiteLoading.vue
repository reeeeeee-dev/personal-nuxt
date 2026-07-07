<script lang="ts" setup>
defineProps<{
  ready: boolean;
}>();
</script>

<template>
  <Transition name="site-load">
    <div
      v-show="!ready"
      class="site-load iris-wipe fixed inset-0 z-9999 flex flex-col items-center justify-center bg-(--ink) px-6"
      aria-live="polite"
      :aria-busy="!ready"
    >
      <SeigaihaLoader variant="on-ink" />
    </div>
  </Transition>
</template>

<style>
/*
 * Site-load overlay uses the shared .iris-wipe polygon (main.css). Base state
 * is fully closed (covers viewport). On leave, --wipe animates 0% → 71%
 * (hole opens from center outward, revealing the app).
 *
 * Pinning --wipe: 0% on both .site-load AND .site-load-leave-from gives the
 * transition an explicit starting value — without it Vue paints the combined
 * -active + -to state on the same frame and skips the animation (the
 * initial-flash bug).
 */
.site-load {
  --wipe: 0%;
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

@media (prefers-reduced-motion: reduce) {
  .site-load-leave-active {
    transition: opacity 200ms ease-in-out;
  }

  .site-load-leave-to {
    opacity: 0;
  }
}
</style>
