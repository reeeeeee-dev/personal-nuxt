<script lang="ts" setup>
const open = ref(false);
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

const links = [
  { to: "/", label: "Home" },
  { to: "/journey", label: "Journey" },
  { to: "/projects", label: "Projects" },
  { to: "/art", label: "Art" },
];

const githubUrl = "https://github.com/reeeeeee-dev";
const linkedinUrl = "https://linkedin.com/in/reetik";
// /** Set when you have a profile URL */
// const instagramUrl: string | null = null;

function clearCloseTimeout() {
  if (closeTimeout !== null) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
}

function toggle() {
  clearCloseTimeout();
  open.value = !open.value;
}

function close() {
  open.value = false;
}

function scheduleCloseAfterLeave() {
  if (!open.value) return;
  clearCloseTimeout();
  closeTimeout = setTimeout(() => {
    closeTimeout = null;
    close();
  }, 1000);
}
</script>

<template>
  <nav
    class="absolute top-0 left-0 z-50"
    @mouseleave="scheduleCloseAfterLeave"
    @mouseenter="clearCloseTimeout"
  >
    <div
      class="inline-flex w-fit flex-col overflow-hidden border transition-colors duration-300"
      :class="open ? ' bg-(--cream)' : ' bg-(--ink)/85 backdrop-blur-md'"
    >
      <button
        type="button"
        class="flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent px-8 py-4 text-left text-4xl font-medium transition-opacity hover:text-(--red)"
        :class="open ? 'text-(--ink)' : 'text-(--cream)'"
        :aria-expanded="open"
        aria-controls="nav-menu"
        aria-label="Toggle menu"
        @click="toggle"
      >
        <span class="tracking-widest">MENU</span>
        <span
          class="relative inline-block h-[1em] w-[1em] shrink-0"
          aria-hidden
        >
          <span
            class="absolute left-0 top-1/2 w-full h-1 -translate-y-1/2 bg-current transition duration-300 ease-out"
          />
          <span
            class="absolute bottom-0 left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-current transition duration-300 ease-out"
            :class="{ 'rotate-90 opacity-0': open }"
          />
        </span>
      </button>

      <div
        class="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
        :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      >
        <div class="min-h-0">
          <div
            id="nav-menu"
            class="flex min-w-32 flex-col gap-1 px-8 pb-4 pt-0"
            :inert="!open"
          >
            <NuxtLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="group relative inline-block w-fit py-2 no-underline text-(--ink) text-4xl font-medium"
              active-class="nav-link--active"
            >
              <span class="relative">{{ link.label }}</span>
              <span
                class="nav-link-underline absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-[.nav-link--active]:scale-x-100"
                aria-hidden
              />
            </NuxtLink>

            <hr class="border-(--ink)" />

            <div class="flex w-full flex-row items-center justify-center gap-6 pt-2">
              <a
                :href="githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--ink) transition-colors hover:text-(--red)"
                aria-label="GitHub (opens in a new tab)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-9 w-9"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              <a
                :href="linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--ink) transition-colors hover:text-(--red)"
                aria-label="LinkedIn (opens in a new tab)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-9 w-9"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
              <!-- Instagram
              <component
                :is="instagramUrl ? 'a' : 'span'"
                :href="instagramUrl ?? undefined"
                :target="instagramUrl ? '_blank' : undefined"
                :rel="instagramUrl ? 'noopener noreferrer' : undefined"
                class="inline-flex"
                :class="
                  instagramUrl
                    ? 'text-(--ink) transition-colors hover:text-(--red)'
                    : 'cursor-not-allowed text-(--ink)/40'
                "
                :aria-label="
                  instagramUrl
                    ? 'Instagram (opens in a new tab)'
                    : 'Instagram (link coming soon)'
                "
                :title="instagramUrl ? undefined : 'Coming soon'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-9 w-9"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                  />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </component>
              -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
