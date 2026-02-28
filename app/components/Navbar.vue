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
    class="relative"
    @mouseleave="scheduleCloseAfterLeave"
    @mouseenter="clearCloseTimeout"
  >
    <button
      type="button"
      class="flex items-center gap-3 px-8 py-4 text-(--cream) text-4xl font-medium bg-transparent border-0 cursor-pointer hover:opacity-80 transition-opacity"
      :aria-expanded="open"
      aria-controls="nav-menu"
      aria-label="Toggle menu"
      @click="toggle"
    >
      <span class="tracking-widest">MENU</span>
      <span class="relative inline-block h-[1em] w-[1em] shrink-0" aria-hidden>
        <span
          class="absolute left-0 top-1/2 w-full h-1 -translate-y-1/2 rounded-sm bg-current transition duration-300 ease-out"
        />
        <span
          class="absolute bottom-0 left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-sm bg-current transition duration-300 ease-out"
          :class="{ 'rotate-90 opacity-0': open }"
        />
      </span>
    </button>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="open"
        id="nav-menu"
        class="absolute left-8 top-full z-10 w-fit min-w-32 flex flex-col gap-1 py-3 px-4"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="group relative inline-block w-fit py-2 no-underline text-(--cream) text-4xl font-medium"
          active-class="nav-link--active"
        >
          <span class="relative">{{ link.label }}</span>
          <span
            class="nav-link-underline absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-[.nav-link--active]:scale-x-100"
            aria-hidden
          />
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>
