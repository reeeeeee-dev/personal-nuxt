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
  </div>
</template>
