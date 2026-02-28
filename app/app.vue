<script lang="ts" setup>
const isAppReady = ref(false);

onMounted(() => {
  nextTick(() => {
    isAppReady.value = true;
  });
});
</script>

<template>
  <div>
    <!-- Route navigation loading bar -->
    <NuxtLoadingIndicator
      color="var(--loading-color, currentColor)"
      :height="3"
      :duration="400"
    />

    <!-- Initial site load overlay -->
    <Transition name="site-load">
      <div
        v-show="!isAppReady"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        aria-live="polite"
        aria-busy="true"
      >
        <div
          class="h-10 w-10 rounded-full border-2 border-gray-200 border-t-gray-800 animate-spin"
          aria-hidden="true"
        />
      </div>
    </Transition>

    <Navbar />
    <main>
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

/* Site load overlay fade-out (Vue transition hooks) */
.site-load-enter-active,
.site-load-leave-active {
  transition: opacity 0.3s ease;
}

.site-load-leave-to {
  opacity: 0;
}
</style>
