<script lang="ts" setup>
definePageMeta({
  title: "Art",
});
</script>

<template>
  <div class="flex min-h-screen flex-col bg-(--ink) text-(--cream)">
    <section
      class="flex flex-1 flex-col items-center justify-center px-8 py-24 text-center md:px-12"
    >
      <div class="mx-auto max-w-lg">
        <h1
          class="font-display text-5xl font-medium italic leading-[1] tracking-[-0.02em] md:text-7xl"
        >
          Art
        </h1>
        <p
          class="font-sans mt-6 text-[10px] font-light uppercase tracking-[0.45em] text-(--cream)/80 md:text-xs"
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
    </section>
    <SiteFooter />
  </div>
</template>
