<script lang="ts" setup>
const { ready: isAppReady } = useSiteReady();
const { pageNavTransition } = usePageNavTransition();
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

    <!-- Navbar outside <main> so main overflow-hidden never clips the menu -->
    <Navbar />
    <main class="overflow-hidden">
      <NuxtPage :transition="pageNavTransition" />
    </main>
  </div>
</template>

