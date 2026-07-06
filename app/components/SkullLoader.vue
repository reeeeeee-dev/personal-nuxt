<script lang="ts" setup>
withDefaults(
  defineProps<{
    variant?: "on-ink" | "on-cream";
  }>(),
  { variant: "on-ink" },
);
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <div
      class="aspect-square w-[min(42vh,22rem)] max-w-[min(90vw,28rem)] overflow-hidden select-none"
      aria-hidden="true"
    >
      <SeigaihaWaves
        :tile="110"
        :stroke-opacity="0.45"
        :fill-opacity="0.04"
        color="#8C6A1F"
      />
    </div>
    <div
      class="skull-loader__dots flex shrink-0 items-center gap-3"
      :class="variant === 'on-cream' ? 'skull-loader__dots--on-cream' : ''"
      aria-hidden="true"
    >
      <span class="skull-loader__dot" />
      <span class="skull-loader__dot" />
      <span class="skull-loader__dot" />
    </div>
  </div>
</template>

<style scoped>
.skull-loader__dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background: var(--cream);
  animation: skull-loader-dot-bounce 0.9s ease-in-out infinite;
}

.skull-loader__dots--on-cream .skull-loader__dot {
  background: var(--ink);
}

.skull-loader__dot:nth-child(1) {
  animation-delay: 0s;
}

.skull-loader__dot:nth-child(2) {
  animation-delay: 0.15s;
}

.skull-loader__dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes skull-loader-dot-bounce {
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
