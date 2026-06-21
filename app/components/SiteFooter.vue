<script lang="ts" setup>
// Footer for non-home pages. Mirrors the global Navbar's design language:
// Manrope sans, uppercase + wide tracking on small labels, Fraunces display
// on the brand line, single-weight thin gold strokes for icons.
//
// Contents (left → right on desktop, stacked on mobile):
//   1. "Reetik Patel" wordmark (display serif) - clickable, links to home
//   2. Site nav links (Home / Journey / Projects / Art / Resume)
//   3. Social row (GitHub, LinkedIn, Instagram, Buy Me a Coffee)
//   4. Back-to-top button (anchored right on desktop, full-width on mobile)
//   5. Bottom row: © year + tagline
//
// The footer sits inside the page flow, not fixed, and uses the page's own
// --ink background so it blends with the existing dark theme of non-home
// pages without introducing a new color.

const links = [
  { to: "/", label: "Home" },
  { to: "/journey", label: "Journey" },
  { to: "/projects", label: "Projects" },
  { to: "/art", label: "Art" },
];

const githubUrl = "https://github.com/reeeeeee-dev";
const linkedinUrl = "https://linkedin.com/in/reetik";
const instagramUrl = "https://instagram.com/reetik_photography";
const buyMeACoffeeUrl = "https://buymeacoffee.com/reetik";
const resumeUrl = "/resume.pdf";

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
            Designer · Engineer
          </p>
        </div>

        <button
          type="button"
          class="group inline-flex w-fit cursor-pointer items-center gap-2 border-0 bg-transparent font-sans text-[10px] font-medium uppercase tracking-[0.45em] text-(--cream)/75 transition-colors hover:text-(--cream) md:text-xs"
          @click="scrollToTop"
        >
          <span>Back to top</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 md:h-[14px] md:w-[14px]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
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
            <li v-for="link in links" :key="link.to">
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
                :href="resumeUrl"
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

        <!-- Elsewhere -->
        <div>
          <p
            class="font-sans text-[10px] font-light uppercase tracking-[0.45em] text-(--cream)/50 md:text-xs"
          >
            Elsewhere
          </p>
          <ul class="mt-4 flex flex-wrap items-center gap-5 md:gap-6">
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

      <!-- Copyright -->
      <p
        class="font-sans text-[10px] font-light uppercase tracking-[0.45em] text-(--cream)/40 md:text-xs"
      >
        © {{ currentYear }} Reetik Patel — Made by hand
      </p>
    </div>
  </footer>
</template>
