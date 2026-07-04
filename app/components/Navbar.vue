<script lang="ts" setup>
const links = [
  { to: "/", label: "Home" },
  { to: "/journey", label: "Journey" },
  { to: "/projects", label: "Projects" },
];

const githubUrl = "https://github.com/reeeeeee-dev";
const linkedinUrl = "https://linkedin.com/in/reetik";
const instagramUrl = "https://instagram.com/reetik_photography";
const buyMeACoffeeUrl = "https://buymeacoffee.com/reetik";

const open = ref(false);
const navRef = ref<HTMLElement | null>(null);

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}

function handleOutsidePointer(e: PointerEvent) {
  if (!open.value) return;
  const target = e.target as Node | null;
  if (target && navRef.value && !navRef.value.contains(target)) {
    close();
  }
}

function handleEscape(e: KeyboardEvent) {
  if (e.key === "Escape" && open.value) close();
}

onMounted(() => {
  document.addEventListener("pointerdown", handleOutsidePointer);
  document.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handleOutsidePointer);
  document.removeEventListener("keydown", handleEscape);
});
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
        class="font-sans inline-flex items-center gap-2 border-0 bg-transparent p-0 font-light text-[10px] uppercase tracking-[0.45em] text-(--cream)/75 transition-colors duration-200 hover:text-(--cream) md:hidden"
        style="text-shadow: 0 1px 8px rgba(0, 0, 0, 0.7)"
        :aria-expanded="open"
        aria-controls="primary-nav-panel"
        aria-label="Toggle menu"
        @click="toggle"
      >
        <span>Menu</span>
        <span
          class="relative inline-block h-3 w-3 shrink-0"
          aria-hidden="true"
        >
          <span
            class="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-transform duration-300 ease-out"
            :class="{ 'rotate-45': open }"
          ></span>
          <span
            class="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-out"
            :class="{ '-rotate-45': open }"
          ></span>
        </span>
      </button>

      <!-- Desktop nav links (visible md+) -->
      <ul
        class="hidden flex-wrap items-center gap-x-9 md:flex"
      >
        <li v-for="link in links" :key="link.to">
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
        <li>
          <a
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-(--cream)/75 transition-colors hover:text-(--cream)"
            style="filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.7))"
            aria-label="GitHub (opens in a new tab)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-[18px] w-[18px]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            :href="linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-(--cream)/75 transition-colors hover:text-(--cream)"
            style="filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.7))"
            aria-label="LinkedIn (opens in a new tab)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-[18px] w-[18px]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            :href="instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-(--cream)/75 transition-colors hover:text-(--cream)"
            style="filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.7))"
            aria-label="Instagram (opens in a new tab)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </li>
        <li>
          <a
            :href="buyMeACoffeeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-(--cream)/75 transition-colors hover:text-(--cream)"
            style="filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.7))"
            aria-label="Buy me a coffee (opens in a new tab)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M8 3v3" />
              <path d="M12 3v3" />
              <path d="M16 3v3" />
              <path
                d="M4 9h13a1 1 0 0 1 1 1v4a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-4a1 1 0 0 1 1-1z"
              />
              <path d="M18 11h1.5a2.5 2.5 0 0 1 0 5H18" />
            </svg>
          </a>
        </li>
      </ul>
    </div>

    <!-- Mobile panel: collapses links + socials below the bar when open.
         Hidden on md+ since desktop has them inline already. -->
    <div
      id="primary-nav-panel"
      class="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden"
      :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="min-h-0">
        <div
          class="mx-auto max-w-6xl border-t border-(--cream)/15 bg-(--ink)/90 px-6 py-6 backdrop-blur-sm"
          :inert="!open"
        >
          <ul class="flex flex-col gap-4">
            <li v-for="link in links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="nav-tagline-link font-sans group relative inline-block font-light text-xs uppercase tracking-[0.45em] text-(--cream)/85 transition-colors duration-200 hover:text-(--cream)"
                active-class="nav-tagline-link--active"
                @click="close"
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
            <li>
              <a
                :href="githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--cream)/75 transition-colors hover:text-(--cream)"
                aria-label="GitHub (opens in a new tab)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                :href="linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--cream)/75 transition-colors hover:text-(--cream)"
                aria-label="LinkedIn (opens in a new tab)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                :href="instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--cream)/75 transition-colors hover:text-(--cream)"
                aria-label="Instagram (opens in a new tab)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </li>
            <li>
              <a
                :href="buyMeACoffeeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--cream)/75 transition-colors hover:text-(--cream)"
                aria-label="Buy me a coffee (opens in a new tab)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 3v3" />
                  <path d="M12 3v3" />
                  <path d="M16 3v3" />
                  <path
                    d="M4 9h13a1 1 0 0 1 1 1v4a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-4a1 1 0 0 1 1-1z"
                  />
                  <path d="M18 11h1.5a2.5 2.5 0 0 1 0 5H18" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
