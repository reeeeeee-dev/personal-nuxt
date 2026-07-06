<script lang="ts" setup>
const { ready: isAppReady } = useSiteReady();
const { pageNavTransition, pageNavTransitionLoading } =
  usePageNavTransition();
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

    <Transition name="page-nav-load">
      <div
        v-show="pageNavTransitionLoading"
        class="fixed inset-0 z-40 flex flex-col items-center justify-center bg-(--ink) px-6"
        aria-live="polite"
        :aria-busy="pageNavTransitionLoading"
      >
        <SkullLoader variant="on-ink" />
      </div>
    </Transition>

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
 * Square radial wipe on leave — same technique as SiteLoading. Enter still
 * fades so the overlay covers the outgoing page smoothly; leave wipes away
 * to reveal the incoming page in a square growing from center.
 * See SiteLoading.vue for the polygon/hole/@property mechanics.
 */
.page-nav-load-enter-active {
  transition: opacity 280ms ease-in-out;
}

.page-nav-load-enter-from {
  opacity: 0;
}

.page-nav-load-leave-active {
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

.page-nav-load-leave-to {
  --wipe: 71%;
}

@property --wipe {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}

@media (prefers-reduced-motion: reduce) {
  .page-nav-load-leave-active {
    transition: opacity 200ms ease-in-out;
    clip-path: none;
  }

  .page-nav-load-leave-to {
    opacity: 0;
  }
}
</style>

