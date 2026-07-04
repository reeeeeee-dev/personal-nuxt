<script lang="ts" setup>
definePageMeta({
  noScroll: true,
});
</script>

<template>
  <div
    class="absolute inset-0 z-0 overflow-hidden bg-(--ink)"
  >
    <SeigaihaWaves
      class="pointer-events-none absolute inset-0 z-0"
      :tile="110"
      :stroke-opacity="0.45"
      :fill-opacity="0.04"
      color="#8C6A1F"
    />

    <ClientOnly>
      <AfterstonePaintStrokesGL
        class="pointer-events-none absolute inset-0 z-[5]"
      />
    </ClientOnly>

    <div
      class="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(21,21,20,0.55)_0%,rgba(21,21,20,0)_65%)]"
      aria-hidden="true"
    />

    <footer
      class="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 pb-6 text-center md:gap-4 md:pb-10"
    >
      <h1
        class="font-display antialiased font-semibold text-5xl leading-[1.0] tracking-[-0.01em] text-[#FAECC1] md:text-7xl"
        style="
          text-shadow:
            0 1px 3px rgba(0, 0, 0, 0.95),
            0 2px 8px rgba(0, 0, 0, 0.75),
            0 0 24px rgba(0, 0, 0, 0.4);
        "
      >
        Reetik Patel
      </h1>
      <p
        class="font-sans antialiased max-w-lg text-sm font-normal leading-relaxed tracking-wide text-[#F2DDA0] md:text-base md:leading-relaxed"
        style="
          text-shadow:
            0 1px 2px rgba(0, 0, 0, 0.95),
            0 2px 6px rgba(0, 0, 0, 0.7);
        "
      >
        Artist &amp; Engineer based in Northwest Arkansas
      </p>
    </footer>
  </div>
</template>
