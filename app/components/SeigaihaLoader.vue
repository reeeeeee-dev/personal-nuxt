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
      class="seigaiha-loader grid aspect-square w-[min(42vh,22rem)] max-w-[min(90vw,28rem)] grid-cols-4 grid-rows-4 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div v-for="i in 16" :key="i" class="seigaiha-loader__tile">
        <SeigaihaWaves
          :tile="55"
          :stroke-opacity="0.5"
          :fill-opacity="0.05"
          color="#8C6A1F"
        />
      </div>
    </div>
    <p
      class="seigaiha-loader__label font-sans text-sm tracking-[0.28em] uppercase"
      :class="variant === 'on-cream' ? 'text-(--ink)' : 'text-(--cream)'"
      role="status"
    >
      Loading&hellip;
    </p>
  </div>
</template>

<style scoped>
.seigaiha-loader__tile {
  transform-origin: center;
  will-change: transform, opacity, filter;
}

.seigaiha-loader__label {
  opacity: 0.75;
}

@media (prefers-reduced-motion: no-preference) {
  .seigaiha-loader__label {
    animation: seigaiha-loader-label-pulse 2.4s ease-in-out infinite;
  }

  .seigaiha-loader__tile:nth-child(1)  { animation: sk-rot-cw  8s linear infinite; }
  .seigaiha-loader__tile:nth-child(6)  { animation: sk-rot-ccw 10s linear infinite; animation-delay: 0.3s; }
  .seigaiha-loader__tile:nth-child(11) { animation: sk-rot-cw  7s linear infinite; animation-delay: 0.9s; }
  .seigaiha-loader__tile:nth-child(16) { animation: sk-rot-ccw 9s linear infinite; animation-delay: 1.6s; }

  .seigaiha-loader__tile:nth-child(3)  { animation: sk-fade 3s ease-in-out infinite; animation-delay: 0.4s; }
  .seigaiha-loader__tile:nth-child(9)  { animation: sk-fade 4s ease-in-out infinite; animation-delay: 1.1s; }
  .seigaiha-loader__tile:nth-child(14) { animation: sk-fade 2.6s ease-in-out infinite; animation-delay: 0.7s; }

  .seigaiha-loader__tile:nth-child(2)  { animation: sk-shrink 2.4s ease-in-out infinite; animation-delay: 0.5s; }
  .seigaiha-loader__tile:nth-child(12) { animation: sk-shrink 3s ease-in-out infinite; animation-delay: 1.3s; }

  .seigaiha-loader__tile:nth-child(4)  { animation: sk-shimmer 4s ease-in-out infinite; animation-delay: 0.6s; }
  .seigaiha-loader__tile:nth-child(13) { animation: sk-shimmer 3.5s ease-in-out infinite; animation-delay: 1.8s; }

  .seigaiha-loader__tile:nth-child(5)  { animation: sk-pulse 1.4s ease-in-out infinite; animation-delay: 0.2s; }
  .seigaiha-loader__tile:nth-child(10) { animation: sk-pulse 1.2s ease-in-out infinite; animation-delay: 1.0s; }
  .seigaiha-loader__tile:nth-child(15) { animation: sk-pulse 1.5s ease-in-out infinite; animation-delay: 0.5s; }

  .seigaiha-loader__tile:nth-child(7)  { animation: sk-swap-right 5s ease-in-out infinite; animation-delay: 0.8s; }
  .seigaiha-loader__tile:nth-child(8)  { animation: sk-swap-left  5s ease-in-out infinite; animation-delay: 0.8s; }
}

@keyframes sk-rot-cw  { to { transform: rotate(360deg); } }
@keyframes sk-rot-ccw { to { transform: rotate(-360deg); } }

@keyframes sk-fade {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.15; }
}

@keyframes sk-shrink {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(0.4); }
}

@keyframes sk-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.08); }
}

@keyframes sk-shimmer {
  0%, 100% { filter: brightness(1) hue-rotate(0deg); }
  50%      { filter: brightness(1.4) hue-rotate(-12deg); }
}

@keyframes sk-swap-right {
  0%, 100% { transform: translateX(0); }
  45%, 55% { transform: translateX(100%); }
}

@keyframes sk-swap-left {
  0%, 100% { transform: translateX(0); }
  45%, 55% { transform: translateX(-100%); }
}

@keyframes seigaiha-loader-label-pulse {
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 0.95; }
}
</style>
