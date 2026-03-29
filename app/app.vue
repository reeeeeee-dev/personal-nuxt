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

    <main class="overflow-hidden">
      <Navbar />
      <NuxtPage :transition="pageNavTransition" />
    </main>
  </div>
</template>

