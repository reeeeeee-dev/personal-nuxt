<script lang="ts" setup>
const links = [
  { to: '/', label: 'Home' },
  { to: '/journey', label: 'Journey' },
  { to: '/projects', label: 'Projects' },
  { to: '/art', label: 'Art' },
];
</script>

<template>
  <nav class="navbar">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="nav-link"
      active-class="nav-link--active"
    >
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-border, #eee);
}

.nav-link {
  text-decoration: none;
  color: inherit;
  font-weight: 500;
}

.nav-link:hover,
.nav-link--active {
  text-decoration: underline;
}
</style>
