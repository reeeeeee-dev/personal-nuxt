<script lang="ts" setup>
const links = [
  { to: '/', label: 'Home' },
  { to: '/journey', label: 'Journey' },
  { to: '/projects', label: 'Projects' },
  { to: '/art', label: 'Art' },
];
</script>

<template>
  <nav class="flex gap-6 px-8 py-4 border-b border-gray-200">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="no-underline text-inherit font-medium hover:underline"
      active-class="underline"
    >
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>
