<script lang="ts" setup>
definePageMeta({
  unicornScene: true,
});

const HOME_SCENE_ID = "unicorn-home-scene";

useUnicornScene(HOME_SCENE_ID, {
  projectId: "7jRdUQOUL2g9MWYqrKzJ",
  scale: 1,
  dpi: 1.5,
  fps: 60,
  // Full-bleed hero: must init while the shell loader is up. `true` defers until
  // intersection, which races the loading overlay and feels late vs `addScene`.
  lazyLoad: false,
  production: true,
});
</script>

<template>
  <div
    :id="HOME_SCENE_ID"
    class="absolute top-0 left-0 -z-10 h-screen w-screen overflow-hidden"
    aria-hidden="true"
  />
</template>
