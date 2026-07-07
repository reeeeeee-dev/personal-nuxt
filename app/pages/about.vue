<script lang="ts" setup>
import { contactInfo, socialLinks } from "~/config/site";

definePageMeta({
  title: "About",
});
</script>

<template>
  <div
    class="min-h-screen bg-(--ink) px-8 py-16 text-(--cream) md:px-12 md:py-24"
  >
    <!--
      Gold-monotone SVG filter for the portrait so it visually rhymes with the
      landing composition. Same feColorMatrix + feComponentTransfer chain used
      on the landing when the portrait was mounted there.
    -->
    <svg width="0" height="0" class="absolute" aria-hidden="true">
      <defs>
        <filter id="about-portrait-gold" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"></feColorMatrix>
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.20 0.55 0.85 1.00"></feFuncR>
            <feFuncG type="table" tableValues="0.13 0.42 0.71 0.94"></feFuncG>
            <feFuncB type="table" tableValues="0.03 0.10 0.24 0.72"></feFuncB>
            <feFuncA type="identity"></feFuncA>
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>

    <article class="mx-auto max-w-6xl">
      <h1
        class="font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] md:text-6xl"
      >
        About
      </h1>

      <div
        class="mt-16 flex flex-col gap-12 lg:mt-20 lg:flex-row lg:items-start lg:gap-16"
      >
        <div class="flex w-full shrink-0 justify-center lg:w-80 lg:justify-end">
          <div class="relative">
            <img
              src="/img/portrait.webp"
              alt="Reetik Patel"
              width="1400"
              height="2098"
              class="block h-auto w-full max-w-[18rem] rounded-sm border border-(--cream)/10 object-cover object-top sm:max-w-[20rem] lg:max-w-none"
              style="
                aspect-ratio: 3 / 4;
                filter: url(#about-portrait-gold);
              "
              decoding="async"
              fetchpriority="high"
            />
            <div
              class="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-(--cream)/5"
              aria-hidden="true"
            ></div>
          </div>
        </div>

        <div class="min-w-0 flex-1">
          <h2
            class="font-display text-3xl font-medium leading-[1.05] tracking-[-0.015em] md:text-4xl"
          >
            Reetik Patel
          </h2>
          <p
            class="font-sans mt-3 text-xs font-light uppercase tracking-[0.3em] text-(--cream)/70 md:text-sm"
          >
            Artist &amp; Engineer &middot; Northwest Arkansas
          </p>

          <p
            class="mt-8 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
          >
            I&rsquo;m a designer and engineer working out of Northwest
            Arkansas. I grew up here &mdash; Bentonville, specifically &mdash;
            and started writing code as a high school intern at Walmart through
            the Bentonville Ignite Program in 2016. That trial-by-fire is still
            the shape of how I work: figure it out, ship it, learn what I got
            wrong, iterate. Six years at Walmart taught me the difference
            between building things that look done and building things that
            actually hold up when real people use them under real load.
          </p>

          <p
            class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
          >
            The artist part isn&rsquo;t a title I claim casually &mdash; it
            just turns out that taste is the discipline I keep returning to.
            When I&rsquo;m not writing code, I&rsquo;m usually behind a camera
            (mostly on my
            <a
              :href="socialLinks.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
              >photography Instagram</a
            >), reading about painters and printmakers, or thinking about how
            visual language moves between mediums. This site &mdash; the gold
            ribbons, the seigaiha waves, the way everything sits under a
            monotone gold &mdash; is an attempt to bring that vocabulary into
            software.
          </p>

          <h3
            class="font-display mt-12 text-2xl font-medium leading-[1.15] tracking-[-0.01em] md:text-3xl"
          >
            How I work
          </h3>
          <p
            class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
          >
            I care about the seams. The interface where a design system meets a
            component library, where a marketing site meets a payment API,
            where a company&rsquo;s brand meets whatever the intern shipped on
            a Friday. Most of my career has lived in that seam &mdash;
            frontend platforms, monorepos, design tokens, migrations that
            nobody wanted to do until the alternative got worse. I like doing
            them.
          </p>
          <p
            class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
          >
            The tools I reach for change every year. The problems don&rsquo;t.
            Someone needs to understand what a system is actually supposed to
            do, then articulate that clearly enough that a team can build it
            without arguing about it every sprint. I try to be that person on
            the projects I&rsquo;m on. When the tools finally match what
            we&rsquo;re trying to say &mdash; that&rsquo;s the good part.
          </p>

          <h3
            class="font-display mt-12 text-2xl font-medium leading-[1.15] tracking-[-0.01em] md:text-3xl"
          >
            Contact
          </h3>
          <dl
            class="mt-6 grid grid-cols-1 gap-4 text-base text-(--cream)/90 md:text-lg sm:grid-cols-[max-content_1fr] sm:gap-x-8 sm:gap-y-3"
          >
            <dt
              class="font-sans text-xs font-light uppercase tracking-[0.3em] text-(--cream)/60 sm:pt-1"
            >
              Email
            </dt>
            <dd>
              <a
                :href="`mailto:${contactInfo.email}`"
                class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
              >
                {{ contactInfo.email }}
              </a>
            </dd>
            <dt
              class="font-sans text-xs font-light uppercase tracking-[0.3em] text-(--cream)/60 sm:pt-1"
            >
              Phone
            </dt>
            <dd>
              <a
                :href="`tel:${contactInfo.phoneHref}`"
                class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
              >
                {{ contactInfo.phoneDisplay }}
              </a>
            </dd>
            <dt
              class="font-sans text-xs font-light uppercase tracking-[0.3em] text-(--cream)/60 sm:pt-1"
            >
              LinkedIn
            </dt>
            <dd>
              <a
                :href="socialLinks.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
              >
                linkedin.com/in/reetik
              </a>
            </dd>
            <dt
              class="font-sans text-xs font-light uppercase tracking-[0.3em] text-(--cream)/60 sm:pt-1"
            >
              Instagram
            </dt>
            <dd>
              <a
                :href="socialLinks.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--cream) underline decoration-(--cream)/40 underline-offset-2 transition-colors hover:text-(--red) hover:decoration-(--red)"
              >
                @reetik_photography
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </article>
    <SiteFooter />
  </div>
</template>
