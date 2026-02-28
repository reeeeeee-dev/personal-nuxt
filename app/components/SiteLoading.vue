<script lang="ts" setup>
defineProps<{
  ready: boolean;
}>();
</script>

<template>
  <Transition name="site-load">
    <div
      v-show="!ready"
      class="fixed inset-0 z-9999 flex items-center justify-center bg-white"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        class="h-10 w-10 rounded-full border-2 border-gray-200 border-t-gray-800 animate-spin"
        aria-hidden="true"
      />
    </div>
  </Transition>
</template>

<style>
.site-load-enter-active,
.site-load-leave-active {
  transition: opacity 0.3s ease;
}

.site-load-leave-to {
  opacity: 0;
}
</style>
