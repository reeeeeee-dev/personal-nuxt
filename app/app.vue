<script lang="ts" setup>
const { ready: isAppReady } = useSiteReady();
const {
  pageNavTransition,
  pageNavTransitionLoading,
  pageNavOverlayVisible,
  pageNavOverlayOpen,
} = usePageNavTransition();

// Site-wide favicon links and social share meta.
// Favicon set + og-image live in /public and depict the seigaiha wave motif —
// matching the landing background pattern (see components/SeigaihaWaves.vue).
useHead({
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
  meta: [{ name: "theme-color", content: "#151514" }],
});

useSeoMeta({
  ogImage: "/og-image.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: "image/png",
  twitterCard: "summary_large_image",
  twitterImage: "/og-image.png",
});
</script>

<template>
  <div>
    <!-- Route navigation loading bar -->
    <NuxtLoadingIndicator
      color="var(--loading-color, currentColor)"
      :height="3"
      :duration="400"
    />

    <SiteLoading :ready="isAppReady" />

    <div
      v-show="pageNavOverlayVisible"
      class="page-nav-overlay iris-wipe fixed inset-0 z-40 flex flex-col items-center justify-center bg-(--ink) px-6"
      :class="{ 'page-nav-overlay--open': pageNavOverlayOpen }"
      aria-live="polite"
      :aria-busy="pageNavTransitionLoading"
    >
      <SeigaihaLoader variant="on-ink" />
    </div>

    <!-- Navbar outside <main> so main overflow-hidden never clips the menu -->
    <ClientOnly>
      <Navbar v-if="isAppReady" />
    </ClientOnly>
    <main class="min-h-screen overflow-hidden bg-(--cream)">
      <NuxtPage :transition="pageNavTransition" />
    </main>
  </div>
</template>

<style>
/*
 * Page-nav overlay uses the shared .iris-wipe polygon (main.css). Base state
 * is fully open (invisible); .page-nav-overlay--open closes it to cover the
 * viewport. onLeave animates open → closed, onEnter animates closed → open.
 */
.page-nav-overlay {
  --wipe: 71%;
  transition: --wipe 1080ms cubic-bezier(0.7, 0, 0.3, 1);
}

.page-nav-overlay--open {
  --wipe: 0%;
}

@media (prefers-reduced-motion: reduce) {
  .page-nav-overlay {
    clip-path: none;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .page-nav-overlay--open {
    opacity: 1;
  }
}
</style>

