<script lang="ts" setup>
import { contactInfo, siteNav, socialLinks } from "~/config/site";

// Footer for non-home pages. Mirrors the global Navbar's design language:
// Manrope sans, uppercase + wide tracking on small labels, Fraunces display
// on the brand line, single-weight thin gold strokes for icons.
//
// Contents (left → right on desktop, stacked on mobile):
//   1. "Reetik Patel" wordmark (display serif) - clickable, links to home
//   2. Site nav links (Home / Journey / Projects / Resume)
//   3. Social row (GitHub, LinkedIn, Instagram, Buy Me a Coffee)
//   4. Back-to-top button (anchored right on desktop, full-width on mobile)
//   5. Bottom row: © year + tagline
//
// The footer sits inside the page flow, not fixed, and uses the page's own
// --ink background so it blends with the existing dark theme of non-home
// pages without introducing a new color.

const currentYear = new Date().getFullYear();

function scrollToTop() {
  if (typeof window === "undefined") return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  window.scrollTo({
    top: 0,
    behavior: prefersReduced ? "auto" : "smooth",
  });
}

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
  <footer
    class="relative mt-24 border-t border-(--cream)/15 bg-(--ink) text-(--cream)"
    aria-labelledby="site-footer-heading"
  >
    <h2 id="site-footer-heading" class="sr-only">Site footer</h2>

    <div
      class="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:px-12 md:py-16"
    >
      <!-- Top row: wordmark + back-to-top -->
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="flex flex-col gap-2">
          <NuxtLink
            to="/"
            class="font-display text-3xl font-medium leading-none tracking-[-0.02em] text-(--cream) no-underline transition-opacity hover:opacity-75 md:text-4xl"
          >
            Reetik Patel
          </NuxtLink>
          <p
            class="font-sans text-[10px] font-light uppercase tracking-[0.45em] text-(--cream)/60 md:text-xs"
          >
            Artist · Engineer
          </p>
        </div>

        <button
          type="button"
          class="group inline-flex w-fit cursor-pointer items-center gap-2 border-0 bg-transparent font-sans text-[10px] font-medium uppercase tracking-[0.45em] text-(--cream)/75 transition-colors hover:text-(--cream) md:text-xs"
          @click="scrollToTop"
        >
          <span>Back to top</span>
          <Icon
            name="lucide:arrow-up"
            class="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 md:h-[14px] md:w-[14px]"
          />
        </button>
      </div>

      <!-- Divider -->
      <div class="h-px w-full bg-(--cream)/10" aria-hidden="true"></div>

      <!-- Lower row: nav links + socials -->
      <div
        class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16"
      >
        <!-- Sitemap -->
        <nav aria-label="Footer">
          <p
            class="font-sans text-[10px] font-light uppercase tracking-[0.45em] text-(--cream)/50 md:text-xs"
          >
            Sitemap
          </p>
          <ul class="mt-4 grid grid-cols-2 gap-x-10 gap-y-3 md:grid-cols-3">
            <li v-for="link in siteNav" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="footer-link group relative inline-block font-sans text-sm font-light text-(--cream)/85 no-underline transition-colors duration-200 hover:text-(--cream) md:text-base"
                active-class="footer-link--active"
              >
                <span class="relative">{{ link.label }}</span>
                <span
                  class="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-[.footer-link--active]:scale-x-100"
                  aria-hidden="true"
                ></span>
              </NuxtLink>
            </li>
            <li>
              <a
                :href="contactInfo.resumeUrl"
                target="_blank"
                rel="noopener"
                class="group relative inline-block font-sans text-sm font-light text-(--cream)/85 no-underline transition-colors duration-200 hover:text-(--cream) md:text-base"
              >
                <span class="relative">Resume</span>
                <span
                  class="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                ></span>
              </a>
            </li>
          </ul>
        </nav>

        <!-- Contact -->
        <div>
          <p
            class="font-sans text-[10px] font-light uppercase tracking-[0.45em] text-(--cream)/50 md:text-xs"
          >
            Contact
          </p>
          <ul class="mt-4 flex flex-col gap-3">
            <li>
              <a
                :href="`mailto:${contactInfo.email}`"
                class="group relative inline-block font-sans text-sm font-light text-(--cream)/85 no-underline transition-colors duration-200 hover:text-(--cream) md:text-base"
              >
                <span class="relative">{{ contactInfo.email }}</span>
                <span
                  class="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                ></span>
              </a>
            </li>
            <li>
              <a
                :href="`tel:${contactInfo.phoneHref}`"
                class="group relative inline-block font-sans text-sm font-light text-(--cream)/85 no-underline transition-colors duration-200 hover:text-(--cream) md:text-base"
              >
                <span class="relative">{{ contactInfo.phoneDisplay }}</span>
                <span
                  class="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                ></span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Elsewhere -->
        <div>
          <p
            class="font-sans text-[10px] font-light uppercase tracking-[0.45em] text-(--cream)/50 md:text-xs"
          >
            Elsewhere
          </p>
          <ul class="mt-4 flex flex-wrap items-center gap-5 md:gap-6">
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

      <!-- Copyright -->
      <p
        class="font-sans text-[10px] font-light uppercase tracking-[0.45em] text-(--cream)/40 md:text-xs"
      >
        © {{ currentYear }} Reetik Patel — Made by hand
      </p>
    </div>
  </footer>
</template>
