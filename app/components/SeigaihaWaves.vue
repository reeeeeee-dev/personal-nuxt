<script lang="ts" setup>
withDefaults(
  defineProps<{
    tile?: number;
    strokeOpacity?: number;
    fillOpacity?: number;
    color?: string;
  }>(),
  {
    tile: 96,
    strokeOpacity: 0.55,
    fillOpacity: 0.06,
    color: "var(--wave-ink)",
  },
);

// Unique id per instance so multiple <SeigaihaWaves> on the page do not
// collide on <pattern id="seigaiha">. Without this, mounting a second
// instance (e.g. the loader) hijacks the id, and unmounting it wipes the
// pattern the first instance's <rect fill="url(#...)"> is referencing.
const patternId = `seigaiha-${useId()}`;
</script>

<template>
  <svg
    class="block h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern
        :id="patternId"
        :width="tile"
        :height="tile * 0.5"
        patternUnits="userSpaceOnUse"
        :viewBox="`0 0 ${tile} ${tile * 0.5}`"
      >
        <g
          fill="none"
          :stroke="color"
          stroke-width="1.1"
          :stroke-opacity="strokeOpacity"
          stroke-linecap="round"
        >
          <circle :cx="tile * 0.5" :cy="0" :r="tile * 0.5" />
          <circle :cx="tile * 0.5" :cy="0" :r="tile * 0.35" />
          <circle :cx="tile * 0.5" :cy="0" :r="tile * 0.2" />
          <circle :cx="0" :cy="tile * 0.5" :r="tile * 0.5" />
          <circle :cx="0" :cy="tile * 0.5" :r="tile * 0.35" />
          <circle :cx="0" :cy="tile * 0.5" :r="tile * 0.2" />
          <circle :cx="tile" :cy="tile * 0.5" :r="tile * 0.5" />
          <circle :cx="tile" :cy="tile * 0.5" :r="tile * 0.35" />
          <circle :cx="tile" :cy="tile * 0.5" :r="tile * 0.2" />
        </g>
        <g :fill="color" :fill-opacity="fillOpacity">
          <circle :cx="tile * 0.5" :cy="0" :r="tile * 0.08" />
          <circle :cx="0" :cy="tile * 0.5" :r="tile * 0.08" />
          <circle :cx="tile" :cy="tile * 0.5" :r="tile * 0.08" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>
