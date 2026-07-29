<script lang="ts" setup>
const { quality, setQuality } = useMediaQuality();
</script>

<template>
  <div class="mt-8 flex flex-col items-start gap-3 md:mt-10">
    <p id="media-quality-hint" class="sr-only">
      Live mode embeds interactive websites. Media mode shows static images and videos.
    </p>
    <div
      role="group"
      aria-label="Preview Quality"
      class="flex items-center gap-1 rounded-full border border-(--cream)/25 p-1"
    >
      <button
        type="button"
        :aria-pressed="quality === 'live'"
        aria-describedby="media-quality-hint"
        class="font-sans rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors duration-200 md:text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-(--cream)/50"
        :class="
          quality === 'live'
            ? 'bg-(--cream)/15 text-(--cream)'
            : 'text-(--cream)/50 hover:text-(--cream)/85'
        "
        @click="setQuality('live')"
      >
        Live
      </button>
      <button
        type="button"
        :aria-pressed="quality === 'static'"
        aria-describedby="media-quality-hint"
        class="font-sans rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors duration-200 md:text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-(--cream)/50"
        :class="
          quality === 'static'
            ? 'bg-(--cream)/15 text-(--cream)'
            : 'text-(--cream)/50 hover:text-(--cream)/85'
        "
        @click="setQuality('static')"
      >
        Media
      </button>
    </div>
  </div>
</template>
