<script lang="ts" setup>
import { Aurora, Shader, Swirl } from "shaders/vue";

const { ink, cream, red, sage } = useTheme();
</script>

<template>
  <div class="flex justify-between h-dvh">
    <div
      class="flex gap-12 w-min h-full items-end text-(--red) text-[20dvw] leading-none px-6"
    >
      Reetik Patel
    </div>
    <div
      class="[writing-mode:vertical-lr] rotate-180 w-full text-[23.5dvh] leading-none text-(--cream)"
    >
      <div>Developer</div>
      <div>Designer</div>
    </div>
  </div>

  <div class="absolute top-0 left-0 -z-10">
    <Shader class="h-screen w-screen bg-(--ink)">
      <Aurora :color-a="ink" :color-b="cream" />
    </Shader>
  </div>
</template>

<style scoped>
.portrait {
  animation: slideIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
  transform: translateX(100%);
  opacity: 0;
}

@keyframes slideIn {
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
