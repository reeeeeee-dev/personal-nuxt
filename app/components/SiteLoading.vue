<script lang="ts" setup>
defineProps<{
  ready: boolean;
}>();
</script>

<template>
  <Transition name="site-load">
    <div
      v-show="!ready"
      class="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-(--ink) px-6"
      aria-live="polite"
      :aria-busy="!ready"
    >
      <SkullLoader variant="on-ink" />
    </div>
  </Transition>
</template>

<style>
.site-load-enter-active,
.site-load-leave-active {
  transition: opacity 700ms ease-in-out;
}

.site-load-leave-to {
  opacity: 0;
}
</style>
