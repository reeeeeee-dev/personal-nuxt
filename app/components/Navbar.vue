<script lang="ts" setup>
const open = ref(false);
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

const links = [
  { to: "/", label: "Home" },
  { to: "/journey", label: "Journey" },
  { to: "/projects", label: "Projects" },
  { to: "/art", label: "Art" },
];

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
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
