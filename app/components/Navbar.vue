<script lang="ts" setup>
import { siteNav, socialLinks } from "~/config/site";

const menuOpen = ref(false);
const navRef = ref<HTMLElement | null>(null);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function handleOutsidePointer(e: PointerEvent) {
  if (!menuOpen.value) return;
  const target = e.target as Node | null;
  if (target && navRef.value && !navRef.value.contains(target)) {
    closeMenu();
  }
}

function handleEscape(e: KeyboardEvent) {
  if (e.key === "Escape" && menuOpen.value) closeMenu();
}

onMounted(() => {
  document.addEventListener("pointerdown", handleOutsidePointer);
  document.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handleOutsidePointer);
  document.removeEventListener("keydown", handleEscape);
});

const socialItems = [
  {
    href: socialLinks.github,
    label: "GitHub (opens in a new tab)",
    icon: "simple-icons:github",
  },
  {
    href: socialLinks.linkedin,
    label: "LinkedIn (opens in a new tab)",
    icon: "simple-icons:linkedin",
  },
  {
    href: socialLinks.instagram,
    label: "Instagram (opens in a new tab)",
    icon: "simple-icons:instagram",
  },
  {
    href: socialLinks.buyMeACoffee,
    label: "Buy me a coffee (opens in a new tab)",
    icon: "simple-icons:buymeacoffee",
  },
] as const;
</script>

<template>
  <nav
    ref="navRef"
    class="absolute top-0 left-0 right-0 z-50"
    aria-label="Primary"
  >
    <div
      class="mx-auto flex max-w-6xl items-center justify-between gap-x-8 px-6 py-5 md:px-12 md:py-7"
    >
      <!-- Mobile MENU button (visible < md) -->
      <button
        type="button"
        class="font-sans -m-2 inline-flex cursor-pointer items-center gap-2.5 rounded-sm border-0 bg-transparent p-2 font-medium text-xs uppercase tracking-[0.35em] text-(--cream) transition-colors duration-200 hover:text-(--cream) md:hidden"
        style="text-shadow: 0 1px 8px rgba(0, 0, 0, 0.85)"
        :aria-expanded="menuOpen"
        aria-controls="primary-nav-panel"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <span
          class="relative inline-block h-[14px] w-5 shrink-0"
          aria-hidden="true"
        >
          <span
            class="absolute left-0 h-0.5 w-full bg-current transition-all duration-300 ease-out"
            :class="menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'"
          ></span>
          <span
            class="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current transition-opacity duration-300 ease-out"
            :class="{ 'opacity-0': menuOpen }"
          ></span>
          <span
            class="absolute left-0 h-0.5 w-full bg-current transition-all duration-300 ease-out"
            :class="menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'"
          ></span>
        </span>
        <span>{{ menuOpen ? "Close" : "Menu" }}</span>
      </button>

      <!-- Desktop nav links (visible md+) -->
      <ul class="hidden flex-wrap items-center gap-x-9 md:flex">
        <li v-for="link in siteNav" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="nav-tagline-link font-sans group relative inline-block font-light text-xs uppercase tracking-[0.45em] text-(--cream)/75 transition-colors duration-200 hover:text-(--cream)"
            style="text-shadow: 0 1px 8px rgba(0, 0, 0, 0.7)"
            active-class="nav-tagline-link--active"
          >
            <span class="relative">{{ link.label }}</span>
            <span
              class="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-[.nav-tagline-link--active]:scale-x-100"
              aria-hidden="true"
            ></span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Desktop socials (visible md+) -->
      <ul class="hidden items-center gap-5 md:flex">
        <li v-for="item in socialItems" :key="item.href">
          <a
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-(--cream)/75 transition-colors hover:text-(--cream)"
            style="filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.7))"
            :aria-label="item.label"
          >
            <Icon :name="item.icon" class="h-[18px] w-[18px]" />
            <span class="sr-only">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Mobile panel: collapses links + socials below the bar when open.
         Hidden on md+ since desktop has them inline already. -->
    <div
      id="primary-nav-panel"
      class="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden"
      :class="menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="min-h-0">
        <div
          class="mx-auto max-w-6xl border-t border-(--cream)/15 bg-(--ink)/90 px-6 py-6 backdrop-blur-sm"
          :inert="!menuOpen"
        >
          <ul class="flex flex-col gap-4">
            <li v-for="link in siteNav" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="nav-tagline-link font-sans group relative inline-block font-light text-xs uppercase tracking-[0.45em] text-(--cream)/85 transition-colors duration-200 hover:text-(--cream)"
                active-class="nav-tagline-link--active"
                @click="closeMenu"
              >
                <span class="relative">{{ link.label }}</span>
                <span
                  class="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-[.nav-tagline-link--active]:scale-x-100"
                  aria-hidden="true"
                ></span>
              </NuxtLink>
            </li>
          </ul>

          <div class="mt-6 h-px w-full bg-(--cream)/10" aria-hidden="true"></div>

          <ul class="mt-6 flex items-center gap-6">
            <li v-for="item in socialItems" :key="item.href">
              <a
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--cream)/75 transition-colors hover:text-(--cream)"
                :aria-label="item.label"
              >
                <Icon :name="item.icon" class="h-5 w-5" />
                <span class="sr-only">{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
