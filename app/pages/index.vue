<script lang="ts" setup>
import { Aurora, Shader, Swirl } from "shaders/vue";

const { ink, cream, red, sage } = useTheme();
</script>

<template>
  <div
    class="absolute bottom-5 w-min text-(--red) text-[20dvw] leading-none px-6"
  >
    Reetik Patel
  </div>

  <div class="absolute top-0 left-0 -z-10">
    <Shader class="h-screen w-screen bg-(--ink)">
      <Aurora :color-a="red" :color-b="cream" />
    </Shader>
  </div>
</template>
