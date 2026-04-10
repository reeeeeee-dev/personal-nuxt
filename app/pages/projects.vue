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
};

const projects: Project[] = [
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
  {
    id: "43south",
    tocLabel: "43 South Smart Home & Servers",
    title: "43 South",
    stack: [
      "Small Electronics",
      "Home Assistant",
      "Shelly",
      "Unraid",
      "Server Management",
      "IoT",
      "Ubiquiti",
    ],
    image: {
      src: "/img/43south.jpg",
      alt: "43 South smart home setup",
      class:
        "h-full max-h-[40rem] w-full max-w-2xl object-cover sm:max-h-[48rem]",
    },
  },
];
</script>

<template>
  <div
    class="min-h-screen bg-(--ink) px-8 py-16 text-(--cream) md:px-12 md:py-24"
  >
    <article class="mx-auto max-w-6xl">
      <h1 class="text-4xl font-medium tracking-tight md:text-5xl">
        Projects, Presentations, and Contracts
      </h1>

      <nav
        class="mt-10 border-t border-(--cream)/20 pt-8"
        aria-label="On this page"
      >
        <ul
          class="flex flex-col gap-2 text-xl font-medium md:text-2xl list-disc"
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
          v-for="p in projects"
          :id="p.id"
          :key="p.id"
          class="scroll-mt-8"
        >
          <div
            class="flex flex-col gap-8 lg:flex-row-reverse lg:items-start lg:gap-12 xl:gap-16"
          >
            <div class="min-w-0 flex-1">
              <h2 class="text-2xl font-medium md:text-3xl">{{ p.title }}</h2>
              <ul
                class="mt-6 flex flex-wrap gap-2"
                :aria-label="`Technologies for ${p.title}`"
              >
                <li
                  v-for="tech in p.stack"
                  :key="tech"
                  class="rounded-full border border-(--cream)/25 px-3 py-1 text-xs font-medium tracking-wide text-(--cream)/85 uppercase md:text-sm"
                >
                  {{ tech }}
                </li>
              </ul>

              <template v-if="p.id === 'allavservices'">
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

              <template v-else-if="p.id === 'drycleansupercenter'">
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  My cousin wanted a new website for my dad's dry cleaning
                  business. It was a simple and straightforward project. After
                  building the website with Vue and Tailwind, I hosted it using
                  Cloudflare Pages. I'm not sure it it'll ever be finished at
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

              <template v-else-if="p.id === 'resplash'">
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  This was one of my first forays in native Android
                  development. Resplash is always one of the first apps I
                  download when I get a new phone. It has an autowallpaper
                  feature that updates the wallpaper on my phone on a set
                  interval. I also occasioanlly find myself scrolling Unsplash so
                  having a mobile client was useful.
                </p>
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  I wanted the push notification to be persistent so it
                  wouldn't disappear when I instinctively cleared all
                  notifications. It was a shortcut for more details about the
                  current wallpaper. Seeing the app was open source and
                  available on GitHub, I decided to go ahead and take a crack at
                  it. With some help from
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

              <template v-else-if="p.id === '43south'">
                <p
                  class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
                >
                  43 South is my parent's new house. When moving into this
                  house, I wasn't swayed much by the size, neighborhood, or
                  anything. The one thing that caught me was the wiring. Built
                  in 2006, the house contained coaxial, Cat5e ethernet, and
                  alarm wiring. I started in the garage setting up my servers.
                  The network and security camera's ran on Ubiquiti's Unifi line
                  of products. The main server was an old Dell C2100 I bought off
                  a friend for $100. Over time I upgraded the RAM, CPUs, and
                  added a total of 50TB of storage. The server ran everything
                  from a simple DDNS client, game servers, to multiple virtual
                  machines alongside archival storage for my family. Throughout
                  the house, I installed Unifi access points and cameras, Shelly
                  smart relays, and other sensors to automate different things.
                  Among them were the garage door, syncing outdoor lighting to
                  the solar cycle, and improving network coverage.
                </p>
              </template>
            </div>

            <div
              class="flex w-full shrink-0 justify-center lg:w-[32rem] lg:max-w-[55%] lg:justify-end"
            >
              <div class="flex w-full max-w-2xl justify-center lg:max-w-none">
                <!-- biome-ignore lint/a11y/useAltText: alt comes from each Project.image -->
                <img
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
  </div>
</template>
