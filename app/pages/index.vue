<script lang="ts" setup>
import { Shader, Swirl } from "shaders/vue";

const { sage, ink } = useTheme();
</script>

<template>
  <Shader class="h-screen w-screen">
    <Swirl :color-a="sage" :color-b="ink" />
  </Shader>
</template>
