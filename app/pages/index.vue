<script lang="ts" setup>
import { Aurora, Shader, Swirl } from "shaders/vue";

const { ink, cream, red, sage } = useTheme();
</script>

<template>
  <Shader class="h-screen w-screen bg-(--ink)">
    <Aurora :color-a="red" :color-b="cream" />
  </Shader>
</template>
