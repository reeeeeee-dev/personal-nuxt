<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <div
    class="min-h-screen bg-(--ink) px-8 py-16 text-(--cream) md:px-12 md:py-24"
  >
    <slot name="pre-article" />
    <article class="mx-auto max-w-6xl">
      <h1
        class="font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] md:text-6xl"
      >
        {{ title }}
      </h1>
      <slot />
    </article>
    <SiteFooter />
  </div>
</template>
