<script lang="ts" setup>
definePageMeta({
  title: "Journey",
});

type RoleImage = {
  src: string;
  alt: string;
  class: string;
};

type Role = {
  id: string;
  title: string;
  tocLabel: string;
  stack: string[];
  body: string;
  /** Matches prior site: one logo or a row (e.g. Divvy + Bill.com). */
  images?: RoleImage[];
  imageRowClass?: string;
};

const roles: Role[] = [
  {
    id: "design-pickle",
    tocLabel: "Design Pickle",
    title: "Design Pickle",
    stack: ["Typescript", "Javascript", "SCSS", "Storybook", "Jest"],
    body: "Still too early to summarize, I'm learning and growing in my current role.",
    images: [
      {
        src: "/img/designpickle.jpg",
        alt: "Design Pickle",
        class:
          "aspect-square w-full max-w-56 object-contain bg-white sm:max-w-60",
      },
    ],
  },
  {
    id: "xerosec",
    tocLabel: "Xerosec",
    title: "Xerosec LLC",
    stack: [
      "Typescript",
      "Javascript",
      "SCSS",
      "NX",
      "NextJS",
      "Storybook",
      "Azure",
    ],
    body: "In January of 2024, an old friend from high school reached out about an opportunity. It was a revolutionary new way to share and install scripts. After some design work, I single-handedly created the frontend platform for the site. It was an NX monorepo containing the app itself and a component library supporting it. The component library was written in Typescript and documented with Storybook. The app was built on NextJS.",
    images: [
      {
        src: "/img/xerosec.svg",
        alt: "Xerosec",
        class:
          "aspect-square w-full max-w-56 bg-[rgb(20,20,22)] p-8 sm:max-w-60 sm:p-12",
      },
    ],
  },
  {
    id: "bill-divvy",
    tocLabel: "Bill.com / Divvy",
    title: "Bill.com / Divvy",
    stack: ["Typescript", "Javascript", "SCSS", "NX", "Jest", "Storybook"],
    body: "After 6 years at Walmart, I felt it was time for a change. I joined Divvy just as it was being absorbed by Bill.com. As a frontend engineer, I worked closely with my fellow engineers as well as my design partner. Together we created completely redesigned spend controls for 461,000 businesses controlling over $4 billion in total payment volume (TPV). In the process, I greatly improved my team's test coverage and migrated some of our Javascript functions in our legacy monorepo to a new federated Typescript repository.",
    imageRowClass: "flex flex-wrap items-center justify-center gap-4 sm:gap-6",
    images: [
      {
        src: "/img/divvy.svg",
        alt: "Divvy",
        class:
          "aspect-square w-[42vw] max-w-40 bg-[#f8f7ee] object-contain sm:max-w-44",
      },
      {
        src: "/img/bill.png",
        alt: "Bill.com",
        class: "aspect-square w-[42vw] max-w-40 object-cover sm:max-w-44",
      },
    ],
  },
  {
    id: "walmart",
    tocLabel: "Walmart",
    title: "Walmart Global Tech",
    stack: [
      "Typescript",
      "Javascript",
      "SCSS",
      "AngularJS",
      "React",
      "React Native",
      "iOS",
      "Android",
      "Storybook",
      "Azure",
      "Jenkins",
    ],
    body: "The longest and earliest run of my career was a trial by fire. I started at Walmart in 2016 through a high school internship program called the Bentonville Ignite Program. On the Associate Mobile Platforms team, there was always something to do. I did everything from designing a new version of an admin console, to iOS code signing, to deploying through Walmart's internal hybrid-cloud systems. My most notable project at Walmart was rebuilding the admin console for an internal notifications platform. I designed and built it from the ground up. It allowed app teams to view and configure their settings within the platform. More importantly, the notification platform allowed for emergency alerts to stores in cases such as violent threats, inclement weather, and COVID exposures.",
    images: [
      {
        src: "/img/walmart.png",
        alt: "Walmart",
        class:
          "aspect-square h-full max-h-60 w-full max-w-60 bg-[#122b53] object-contain",
      },
    ],
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
        My Journey
      </h1>

      <nav
        class="mt-10 border-t border-(--cream)/20 pt-8"
        aria-label="On this page"
      >
        <ul
          class="font-display flex list-disc flex-col gap-2 pl-5 text-xl font-normal italic md:text-2xl"
        >
          <li v-for="role in roles" :key="role.id">
            <a
              :href="`#${role.id}`"
              class="text-(--cream) transition-colors duration-300 hover:text-(--red)"
            >
              {{ role.tocLabel }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="mt-16 flex flex-col gap-20 md:mt-20 md:gap-24">
        <section
          v-for="(role, i) in roles"
          :id="role.id"
          :key="role.id"
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
                {{ role.title }}
              </h2>
              <ul
                class="mt-6 flex flex-wrap gap-2"
                :aria-label="`Technologies at ${role.title}`"
              >
                <li
                  v-for="tech in role.stack"
                  :key="tech"
                  class="font-sans rounded-full border border-(--cream)/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-(--cream)/85 md:text-xs"
                >
                  {{ tech }}
                </li>
              </ul>
              <p
                class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
              >
                {{ role.body }}
              </p>
            </div>

            <div
              v-if="role.images?.length"
              class="flex w-full shrink-0 justify-center lg:w-72 lg:max-w-[40%] lg:justify-end"
            >
              <div
                class="flex w-full max-w-sm justify-center lg:max-w-none"
                :class="role.imageRowClass"
              >
                <!-- biome-ignore lint/a11y/useAltText: alt comes from each RoleImage -->
                <img
                  v-for="img in role.images"
                  :key="img.src"
                  :src="img.src"
                  :alt="img.alt"
                  :class="[
                    img.class,
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
