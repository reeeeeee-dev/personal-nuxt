<script lang="ts" setup>
const { ready: isAppReady } = useSiteReady();
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

    <main class="overflow-hidden">
      <Navbar />
      <NuxtPage />
    </main>
  </div>
</template>

<style>
/* Page transition: site entry + route changes (Vue transition hooks) */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
