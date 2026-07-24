<script lang="ts" setup>
import type { Entry } from "~/types/entry";

definePageMeta({
  title: "Journey",
});

const logoClass =
  "aspect-square w-full max-w-56 object-contain bg-white sm:max-w-60";

const roles: Entry[] = [
  {
    id: "waypave",
    tocLabel: "WayPave",
    title: "WayPave",
    stack: ["Vite", "Handlebars", "Tailwind", "Firebase"],
    video: {
      sources: [
        { src: "/img/waypave.webm", type: "video/webm" },
        { src: "/img/waypave.mp4", type: "video/mp4" },
      ],
      alt: "WayPave marketing site preview",
      class:
        "h-full max-h-[36rem] w-full max-w-2xl object-contain sm:max-h-[44rem]",
    },
  },
  {
    id: "design-pickle",
    tocLabel: "Design Pickle",
    title: "Design Pickle",
    stack: ["Typescript", "Javascript", "SCSS", "Storybook", "Jest"],
    body: "I joined Design Pickle as a Senior Frontend Software Engineer in September 2024. My main project was leading the full frontend migration from a legacy Rails-served React app to Remix, then React Router 7. Active feature work never stopped, so I prioritized the highest-traffic pages and rewrote complex components in-flight. I set up a CI/CD workflow that published Storybook for both the legacy and new apps, which tightened alignment between design and engineering. Along the way I shipped new project management features end-to-end, cleared a long tail of bugs, and pushed test coverage and readability across the codebase.",
    images: [
      {
        src: "/img/designpickle.jpg",
        alt: "Design Pickle",
        class: logoClass,
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
  <PageShell title="My Journey">
    <EntryList :entries="roles" stack-aria-prefix="Technologies at">
      <template #body="{ entry }">
        <template v-if="entry.id === 'waypave'">
          <p
            class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
          >
            Ben Cline, an old coworker from Walmart, reached out. He's now
            the CTO of WayPave. WayPave is a Northwest Arkansas startup
            helping frontline workers find local jobs. My first project was
            to refresh their marketing site. The site already ran on Vite,
            Handlebars, and Tailwind, shipped to Firebase Hosting. I
            modernized the design on top of that foundation. I leaned on
            Oh My OpenAgent and Cursor to move fast. Visit them at
            <a
              href="https://waypave.com"
              target="_blank"
              rel="noopener noreferrer"
              class="external-link"
              >waypave.com</a
            >.
          </p>
        </template>
      </template>
    </EntryList>
  </PageShell>
</template>
