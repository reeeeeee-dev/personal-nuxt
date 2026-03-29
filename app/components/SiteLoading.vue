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
      <img
        src="/loading-skull.gif"
        alt=""
        class="max-h-[min(42vh,22rem)] w-auto max-w-[min(90vw,28rem)] object-contain select-none"
        draggable="false"
      />
      <div
        class="loading-dots flex shrink-0 items-center gap-3"
        aria-hidden="true"
      >
        <span class="loading-dots__dot" />
        <span class="loading-dots__dot" />
        <span class="loading-dots__dot" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-dots__dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background: var(--cream);
  animation: loading-dot-bounce 0.9s ease-in-out infinite;
}

.loading-dots__dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots__dot:nth-child(2) {
  animation-delay: 0.15s;
}

.loading-dots__dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes loading-dot-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.45;
  }
  50% {
    transform: translateY(-0.5rem);
    opacity: 1;
  }
}
</style>

<style>
.site-load-enter-active,
.site-load-leave-active {
  transition: opacity 700ms ease-in-out;
}

.site-load-leave-to {
  opacity: 0;
}
</style>
