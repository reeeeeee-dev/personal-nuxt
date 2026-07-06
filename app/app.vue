<script lang="ts" setup>
const { ready: isAppReady } = useSiteReady();
const {
  pageNavTransition,
  pageNavTransitionLoading,
  pageNavOverlayVisible,
  pageNavOverlayOpen,
} = usePageNavTransition();
</script>

<template>
  <div>
    <!-- Route navigation loading bar -->
    <NuxtLoadingIndicator
      color="var(--loading-color, currentColor)"
      :height="3"
      :duration="400"
    />

    <SiteLoading :ready="isAppReady" />

    <div
      v-show="pageNavOverlayVisible"
      class="page-nav-overlay fixed inset-0 z-40 flex flex-col items-center justify-center bg-(--ink) px-6"
      :class="{ 'page-nav-overlay--open': pageNavOverlayOpen }"
      aria-live="polite"
      :aria-busy="pageNavTransitionLoading"
    >
      <SkullLoader variant="on-ink" />
    </div>

    <!-- Navbar outside <main> so main overflow-hidden never clips the menu -->
    <ClientOnly>
      <Navbar v-if="isAppReady" />
    </ClientOnly>
    <main class="min-h-screen overflow-hidden bg-(--cream)">
      <NuxtPage :transition="pageNavTransition" />
    </main>
  </div>
</template>

<style>
/*
 * Overlay is a static full-viewport ink layer with a square hole in the
 * middle. --wipe is the half-side of the hole as a % of the overlay.
 *   --wipe: 71% (~sqrt(0.5)) → hole covers the viewport → overlay invisible
 *   --wipe: 0%              → no hole → overlay fully covers
 * Leave animates 71% → 0% (ink closes IN from edges to center).
 * Enter animates 0% → 71% (hole opens FROM center outward).
 * clip-path polygon: outer viewport rect (CW) + inner centered square (CCW)
 * joined by a zero-width seam on the left edge — the self-intersecting
 * winding produces a hole rather than a stacked shape.
 */
.page-nav-overlay {
  --wipe: 71%;
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
  transition: --wipe 450ms cubic-bezier(0.7, 0, 0.3, 1);
}

.page-nav-overlay--open {
  --wipe: 0%;
}

@property --wipe {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 71%;
}

@media (prefers-reduced-motion: reduce) {
  .page-nav-overlay {
    clip-path: none;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .page-nav-overlay--open {
    opacity: 1;
  }
}
</style>

