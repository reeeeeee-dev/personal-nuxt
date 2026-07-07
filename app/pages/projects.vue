<script lang="ts" setup>
definePageMeta({
  title: "Projects",
});

type Project = {
  id: string;
  tocLabel: string;
  title: string;
  stack: string[];
  image: {
    src: string;
    alt: string;
    class: string;
  };
  video?: {
    sources: { src: string; type: string }[];
    poster?: string;
  };
};

const projects: Project[] = [
  {
    id: "this-site",
    tocLabel: "This Site",
    title: "This Site",
    stack: [
      "Typescript",
      "Vue",
      "Nuxt 4",
      "Tailwind v4",
      "Three.js",
      "GLSL Shaders",
      "Cloudflare Workers",
      "Oh My OpenAgent",
    ],
    image: {
      src: "/img/personal-nuxt.png",
      alt: "Reetik Patel personal site preview",
      class:
        "h-full max-h-[36rem] w-full max-w-2xl object-contain sm:max-h-[44rem]",
    },
  },
  {
    id: "waypave",
    tocLabel: "WayPave",
    title: "WayPave",
    stack: ["Vite", "Handlebars", "Tailwind", "Firebase"],
    image: {
      src: "/img/waypave.mp4",
      alt: "WayPave marketing site preview",
      class:
        "h-full max-h-[36rem] w-full max-w-2xl object-contain sm:max-h-[44rem]",
    },
    video: {
      sources: [
        { src: "/img/waypave.webm", type: "video/webm" },
        { src: "/img/waypave.mp4", type: "video/mp4" },
      ],
    },
  },
  {
    id: "puracoco",
    tocLabel: "Official Pura Coco",
    title: "Official Pura Coco",
    stack: ["Typescript", "Vue", "NuxtJS", "Tailwind", "Cloudflare"],
    image: {
      src: "/img/puracoco.gif",
      alt: "Pura Coco website preview",
      class:
        "h-full max-h-[36rem] w-full max-w-2xl object-contain bg-white sm:max-h-[44rem]",
    },
  },
  {
    id: "allavservices",
    tocLabel: "All AV Services",
    title: "All AV Services",
    stack: ["Typescript", "SCSS", "React", "NextJS"],
    image: {
      src: "/img/allavservices.gif",
      alt: "All AV Services website preview",
      class:
        "h-full max-h-[36rem] w-full max-w-2xl object-contain bg-white sm:max-h-[44rem]",
    },
  },
  {
    id: "drycleansupercenter",
    tocLabel: "Dry Clean Super Center",
    title: "Dry Clean Super Center",
    stack: ["Vue", "Tailwind", "Cloudflare"],
    image: {
      src: "/img/drycleansupercenter.png",
      alt: "Dry Clean Super Center website preview",
      class:
        "h-full max-h-[36rem] w-full max-w-2xl object-contain bg-white sm:max-h-[44rem]",
    },
  },
  {
    id: "resplash",
    tocLabel: "Resplash",
    title: "Resplash",
    stack: ["Native Android"],
    image: {
      src: "https://raw.githubusercontent.com/b-lam/Resplash/master/design/Resplash_Play_Store_Banner.jpg",
      alt: "Resplash Play Store banner",
      class:
        "h-full max-h-[36rem] w-full max-w-2xl object-contain bg-white sm:max-h-[44rem]",
    },
  },
];
</script>

<template>
  <div
    class="min-h-screen bg-(--ink) px-8 py-16 text-(--cream) md:px-12 md:py-24"
  >
    <article class="mx-auto max-w-6xl">
      <h1
        class="font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] md:text-6xl"
      >
        Projects, Presentations, and Contracts
      </h1>

      <nav
        class="mt-10 border-t border-(--cream)/20 pt-8"
        aria-label="On this page"
      >
        <ul
          class="font-display flex list-disc flex-col gap-2 pl-5 text-xl font-normal italic md:text-2xl"
        >
          <li v-for="p in projects" :key="p.id">
            <a
              :href="`#${p.id}`"
              class="text-(--cream) transition-colors duration-300 hover:text-(--red)"
            >
              {{ p.tocLabel }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="mt-16 flex flex-col gap-20 md:mt-20 md:gap-24">
        <section
          v-for="(p, i) in projects"
          :id="p.id"
          :key="p.id"
          class="scroll-mt-8"
        >
          <div
            class="flex flex-col gap-8 lg:items-start lg:gap-12 xl:gap-16"
            :class="i % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'"
          >
            <div class="min-w-0 flex-1">
              <h2
                class="font-display text-3xl font-medium leading-[1.05] tracking-[-0.015em] md:text-4xl"
              >
                {{ p.title }}
              </h2>
              <ul
                class="mt-6 flex flex-wrap gap-2"
                :aria-label="`Technologies for ${p.title}`"
              >
                <li
                  v-for="tech in p.stack"
                  :key="tech"
                  class="font-sans rounded-full border border-(--cream)/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-(--cream)/85 md:text-xs"
                >
                  {{ tech }}
                </li>
              </ul>

              <template v-if="p.id === 'waypave'">
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  Ben Cline, an old coworker from Walmart, reached out. He's
                  now the CTO of WayPave. WayPave is a Northwest Arkansas
                  startup helping frontline workers find local jobs. My first
                  project was to refresh their marketing site. The site already
                  ran on Vite, Handlebars, and Tailwind, shipped to Firebase
                  Hosting. I modernized the design on top of that
                  foundation. I leaned on Oh My OpenAgent and Cursor to move
                  fast. Visit them at
                  <a
                    href="https://waypave.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
                    >waypave.com</a
                  >.
                </p>
              </template>

              <template v-else-if="p.id === 'allavservices'">
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  I've known Scott Fussellman of All AV Services since he taught
                  video production at my high school. I was referred to him by
                  my instructor in the Ignite Program to build full web refresh
                  of the All AV Services website. One of the few projects I
                  designed and built from the ground up, I referenced some new
                  design trends. My friends and I built the site using NextJS
                  and uploaded it to the company's hosting. All AV Services is a
                  long time client of mine and I'm proud to have been able to
                  help them out. Visit them at
                  <a
                    href="https://allavservices.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
                    >allavservices.com</a
                  >.
                </p>
              </template>

              <template v-else-if="p.id === 'puracoco'">
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  Pura Coco is rapidly growing musician in Northwest Arkansas. I
                  met Pura Coco through a mutual friend. Her previous website
                  was expensive and clunky. It also linked to an external site
                  for concert information. I designed and built the site using
                  NuxtJS and Tailwind, then deployed it to a Cloudflare Worker.
                  It's integrated with the BandsInTown API to dynamically
                  generate pages for upcoming concerts. Visit her at
                  <a
                    href="https://officialpuracoco.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
                    >officialpuracoco.com</a
                  >.
                </p>
              </template>

              <template v-else-if="p.id === 'drycleansupercenter'">
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  My cousin wanted a new website for my dad's dry cleaning
                  business. It was a simple and straightforward project. After
                  building the website with Vue and Tailwind, I hosted it using
                  Cloudflare Pages. I'm not sure if it'll ever be finished at
                  the time of writing. I asked my cousin for images and he
                  hasn't responded yet. Visit them at
                  <a
                    href="https://drycleansupercenter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
                    >drycleansupercenter.com</a
                  >.
                </p>
              </template>

              <template v-else-if="p.id === 'this-site'">
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  The site you&rsquo;re reading right now. Built on Nuxt 4 with
                  Vue 3, styled with Tailwind v4, deployed to a Cloudflare
                  Worker via Wrangler. Type lives in Fraunces and Manrope,
                  served through
                  <code
                    class="font-sans rounded-sm bg-(--cream)/10 px-1.5 py-0.5 text-[0.85em] text-(--cream)"
                    >@nuxt/fonts</code
                  >. Biome handles formatting and lint.
                </p>
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  The landing is a Three.js scene layered under a tiling
                  seigaiha (&#x9752;&#x6d77;&#x6ce2;) wave pattern. Twenty-eight
                  gold ribbon meshes are triangulated from B&eacute;zier
                  centerlines and animated in a custom GLSL vertex shader
                  &mdash; each ribbon carries its own phase and frequency so
                  the flame flicker at the tips never syncs. A rock-sparkle
                  layer of ~400 additive points twinkles independently across
                  the viewport in pale gold, champagne, and ice-blue mineral
                  flecks.
                </p>
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  Most of the implementation was paired with
                  <a
                    href="https://github.com/ohmyopenagent"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
                    >Oh My OpenAgent</a
                  >
                  &mdash; an orchestration layer over Claude that I lean on for
                  parallel exploration, planning, and visual QA against a real
                  browser. The agent did the typing; I did the taste.
                </p>
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  The brushwork references
                  <a
                    href="https://www.albionjeune.com/exhibitions/23-afterstone-su-yu-xin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
                    >Afterstone</a
                  >, Su Yu-Xin&rsquo;s 2026 series of paintings ground from
                  real minerals &mdash; sulphur, realgar, orpiment, lapis
                  lazuli, charcoal, purple slate. The specific work is
                  Waddling Parade (Coal-seam fires, Utah). I caught the exhibit
                  at Lo Studio in Venice during a study abroad trip. The mix of
                  geological patience and swirling, almost-tectonic motion
                  stuck with me, and the gold here is my translation of that
                  brushwork onto a Japanese wave field I&rsquo;ve always loved.
                </p>
                <p class="mt-6">
                  <a
                    href="https://github.com/reeeeeee-dev/personal-nuxt"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block transition-opacity hover:opacity-80"
                  >
                    <img
                      src="/img/github.svg"
                      alt="personal-nuxt on GitHub"
                      class="h-8 w-8"
                      width="32"
                      height="32"
                    />
                  </a>
                </p>
              </template>

              <template v-else-if="p.id === 'resplash'">
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  This was one of my first forays in native Android development.
                  Resplash is always one of the first apps I download when I get
                  a new phone. It has an autowallpaper feature that updates the
                  wallpaper on my phone on a set interval. I also occasionally
                  find myself scrolling Unsplash so having a mobile client was
                  useful.
                </p>
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  I wanted the push notification to be persistent so it wouldn't
                  disappear when I instinctively cleared all notifications. It
                  was a shortcut for more details about the current wallpaper.
                  Seeing the app was open source and available on GitHub, I
                  decided to go ahead and take a crack at it. With some help
                  from
                  <a
                    href="https://b-lam.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
                    >Brandon Lam</a
                  >, I had my first pull request merged and released to the
                  Google Play Store.
                </p>
                <p class="mt-6">
                  <a
                    href="https://github.com/reeeeeee-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block transition-opacity hover:opacity-80"
                  >
                    <img
                      src="/img/github.svg"
                      alt="Reetik Patel on GitHub"
                      class="h-8 w-8"
                      width="32"
                      height="32"
                    />
                  </a>
                </p>
              </template>


            </div>

            <div
              class="flex w-full shrink-0 justify-center lg:w-[32rem] lg:max-w-[55%] lg:justify-end"
            >
              <div class="flex w-full max-w-2xl justify-center lg:max-w-none">
                <video
                  v-if="p.video"
                  :class="[
                    p.image.class,
                    'shrink-0 rounded-sm border border-(--cream)/10',
                  ]"
                  :aria-label="p.image.alt"
                  :poster="p.video.poster"
                  autoplay
                  loop
                  muted
                  playsinline
                  preload="metadata"
                >
                  <source
                    v-for="s in p.video.sources"
                    :key="s.src"
                    :src="s.src"
                    :type="s.type"
                  />
                </video>
                <!-- biome-ignore lint/a11y/useAltText: alt comes from each Project.image -->
                <img
                  v-else
                  :src="p.image.src"
                  :alt="p.image.alt"
                  :class="[
                    p.image.class,
                    'shrink-0 rounded-sm border border-(--cream)/10',
                  ]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
    <SiteFooter />
  </div>
</template>
