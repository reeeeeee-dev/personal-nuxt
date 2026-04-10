<script lang="ts" setup>
definePageMeta({
  title: "Art",
});
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-(--ink) px-8 py-24 text-center text-(--cream) md:px-12"
  >
    <div class="mx-auto max-w-lg">
      <h1 class="text-4xl font-medium tracking-tight md:text-5xl">Art</h1>
      <p
        class="mt-4 text-lg font-medium tracking-wide text-(--cream)/80 uppercase md:text-xl"
      >
        Coming soon
      </p>
      <p class="mt-10">
        <NuxtLink
          to="/"
          class="text-(--cream) underline decoration-(--cream)/30 underline-offset-4 transition-colors hover:text-(--red) hover:decoration-(--red)"
        >
          Back to home
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
