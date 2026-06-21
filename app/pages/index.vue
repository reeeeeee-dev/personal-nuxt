<script lang="ts" setup>
definePageMeta({
  noScroll: true,
});
</script>

<template>
  <div class="absolute inset-0 z-0 overflow-hidden">
    <!-- WebGL mandala backdrop -->
    <HomeScene class="absolute inset-0 z-0" />

    <!-- Edge vignette to deepen the corners over the canvas -->
    <div
      class="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]"
      aria-hidden="true"
    />

    <!-- Bottom dark scrim - guarantees contrast behind the name + blurb -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[42%] bg-[linear-gradient(to_top,rgba(10,5,10,0.92)_0%,rgba(10,5,10,0.65)_40%,transparent_100%)]"
      aria-hidden="true"
    />

    <!-- Foreground composition: tagline above, portrait center, name + blurb below -->
    <div
      class="relative z-20 mx-auto flex h-full max-w-6xl flex-col items-center justify-between px-6 py-6 text-(--cream) md:px-12 md:py-10"
    >
      <!-- Tagline removed - navigation lives in the global Navbar now. -->

      <!-- Portrait, bottom edge fades into the scene. -->
      <div class="relative flex flex-1 items-end justify-center pb-0">
        <div class="relative">
          <!-- Soft warm halo behind the portrait -->
          <div
            class="pointer-events-none absolute inset-0 -m-8 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22)_0%,transparent_70%)] blur-2xl"
            aria-hidden="true"
          ></div>

          <!--
            Wine-sepia portrait. Sepia tints everything brown/gold; hue-rotate
            nudges warm tones toward the cream/wine ramp; slight desaturation
            and contrast lift keep skin from going muddy. Bottom-fade mask
            blends the figure into the scene as before.
          -->
          <img
            src="/img/portrait.webp"
            alt="Reetik Patel"
            class="relative h-[44vh] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] md:h-[58vh]"
            width="1400"
            height="2098"
            decoding="async"
            fetchpriority="high"
            style="
              filter: sepia(1) saturate(1.05) brightness(0.96) hue-rotate(-12deg) contrast(0.96);
              -webkit-mask-image: linear-gradient(
                to top,
                transparent 0%,
                rgba(0, 0, 0, 0.15) 8%,
                rgba(0, 0, 0, 0.85) 22%,
                #000 35%
              );
              mask-image: linear-gradient(
                to top,
                transparent 0%,
                rgba(0, 0, 0, 0.15) 8%,
                rgba(0, 0, 0, 0.85) 22%,
                #000 35%
              );
            "
          />
        </div>
      </div>

      <footer
        class="flex w-full max-w-2xl flex-col items-center gap-3 pb-3 text-center md:gap-4 md:pb-6"
      >
        <h1
          class="font-display font-medium text-5xl leading-[0.95] tracking-[-0.02em] text-(--cream) md:text-7xl"
          style="text-shadow: 0 2px 16px rgba(0, 0, 0, 0.85)"
        >
          Reetik Patel
        </h1>
        <p
          class="font-sans max-w-lg text-sm font-light leading-relaxed text-(--cream)/90 md:text-base md:leading-relaxed"
          style="text-shadow: 0 1px 10px rgba(0, 0, 0, 0.85)"
        >
          Designer &amp; Engineer based in Northwest Arkansas
        </p>
      </footer>
    </div>
  </div>
</template>
