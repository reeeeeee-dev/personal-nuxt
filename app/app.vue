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
    <Navbar />
    <main class="min-h-screen overflow-hidden bg-(--cream)">
      <NuxtPage :transition="pageNavTransition" />
    </main>
  </div>
</template>

<style>
.page-nav-load-enter-active,
.page-nav-load-leave-active {
  transition: opacity 280ms ease-in-out;
}

.page-nav-load-enter-from,
.page-nav-load-leave-to {
  opacity: 0;
}
</style>

