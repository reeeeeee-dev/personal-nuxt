<script lang="ts" setup>
const HOME_SCENE_ID = "unicorn-home-scene";

useUnicornScene(HOME_SCENE_ID, {
  projectId: "7jRdUQOUL2g9MWYqrKzJ",
  scale: 1,
  dpi: 1.5,
  fps: 60,
  lazyLoad: true,
  production: true,
});
</script>

<template>
  <div
    :id="HOME_SCENE_ID"
    class="absolute top-0 left-0 -z-10 h-screen w-screen min-h-[400px]"
    aria-hidden="true"
  />
</template>
