<script lang="ts" setup generic="T extends Entry">
import type { Entry } from "~/types/entry";

defineProps<{
  entries: T[];
  tocAriaLabel?: string;
  /** Tailwind width classes for the media column (right side on odd rows). */
  mediaColumnClass?: string;
  /** Tailwind width classes for the inner media wrapper. */
  mediaWrapperClass?: string;
  /** Aria-label prefix for the stack pill list (e.g. "Technologies for"). */
  stackAriaPrefix?: string;
}>();

defineSlots<{
  body(props: { entry: T }): unknown;
}>();
</script>

<template>
  <nav
    class="mt-10 border-t border-(--cream)/20 pt-8"
    :aria-label="tocAriaLabel ?? 'On this page'"
  >
    <ul
      class="font-display flex list-disc flex-col gap-2 pl-5 text-xl font-normal italic md:text-2xl"
    >
      <li v-for="e in entries" :key="e.id">
        <a
          :href="`#${e.id}`"
          class="text-(--cream) transition-colors duration-300 hover:text-(--red)"
        >
          {{ e.tocLabel }}
        </a>
      </li>
    </ul>
  </nav>

  <div class="mt-16 flex flex-col gap-20 md:mt-20 md:gap-24">
    <section
      v-for="(e, i) in entries"
      :id="e.id"
      :key="e.id"
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
            {{ e.title }}
          </h2>
          <ul
            class="mt-6 flex flex-wrap gap-2"
            :aria-label="`${stackAriaPrefix ?? 'Technologies for'} ${e.title}`"
          >
            <li
              v-for="tech in e.stack"
              :key="tech"
              class="font-sans rounded-full border border-(--cream)/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-(--cream)/85 md:text-xs"
            >
              {{ tech }}
            </li>
          </ul>

          <slot name="body" :entry="e">
            <p
              v-if="e.body"
              class="mt-6 text-base leading-relaxed text-(--cream)/90 md:text-lg md:leading-relaxed"
            >
              {{ e.body }}
            </p>
          </slot>
        </div>

        <div
          v-if="e.video || e.images?.length"
          class="flex w-full shrink-0 justify-center lg:justify-end"
          :class="mediaColumnClass ?? 'lg:w-72 lg:max-w-[40%]'"
        >
          <div
            class="flex w-full justify-center"
            :class="[mediaWrapperClass ?? 'max-w-sm lg:max-w-none', e.imageRowClass]"
          >
            <video
              v-if="e.video"
              :class="[
                e.video.class,
                'shrink-0 rounded-sm border border-(--cream)/10',
              ]"
              :aria-label="e.video.alt"
              :poster="e.video.poster"
              autoplay
              loop
              muted
              playsinline
              preload="metadata"
            >
              <source
                v-for="s in e.video.sources"
                :key="s.src"
                :src="s.src"
                :type="s.type"
              />
            </video>
            <!-- biome-ignore lint/a11y/useAltText: alt comes from each image -->
            <img
              v-for="img in e.images"
              v-else
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
</template>
