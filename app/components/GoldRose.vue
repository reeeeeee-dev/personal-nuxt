<script lang="ts" setup>
/*
 * Stylized gold rose used to obscure the portrait's face on the landing.
 * Composed of a central bud, 3 concentric rings of leaf-shaped petals with
 * increasing size + radial gradient shading, and two low leaves at the base
 * for weight. All strokes and fills stay in the ribbon palette so it reads
 * as part of the same gold family (deep ochre → pale champagne).
 */
</script>

<template>
  <svg
    viewBox="-100 -100 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class="block"
  >
    <defs>
      <radialGradient id="rose-petal-outer" cx="0.4" cy="0.35" r="0.75">
        <stop offset="0%" stop-color="#F2DDA0" />
        <stop offset="55%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#8C6A1F" />
      </radialGradient>
      <radialGradient id="rose-petal-mid" cx="0.45" cy="0.3" r="0.7">
        <stop offset="0%" stop-color="#F2DDA0" />
        <stop offset="55%" stop-color="#C9A24A" />
        <stop offset="100%" stop-color="#7A5616" />
      </radialGradient>
      <radialGradient id="rose-petal-inner" cx="0.5" cy="0.3" r="0.65">
        <stop offset="0%" stop-color="#FAECC1" />
        <stop offset="60%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#8C6A1F" />
      </radialGradient>
      <radialGradient id="rose-bud" cx="0.5" cy="0.4" r="0.6">
        <stop offset="0%" stop-color="#FAECC1" />
        <stop offset="65%" stop-color="#B5862E" />
        <stop offset="100%" stop-color="#5C4010" />
      </radialGradient>
      <linearGradient id="rose-leaf" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#B5862E" />
        <stop offset="60%" stop-color="#8C6A1F" />
        <stop offset="100%" stop-color="#5C4010" />
      </linearGradient>
    </defs>

    <g transform="translate(0 8)">
      <path
        d="M -55 45 C -80 30, -90 5, -78 -18 C -66 -38, -40 -42, -22 -30 C -8 -20, -4 -6, -12 6 C -20 20, -38 32, -55 45 Z"
        fill="url(#rose-leaf)"
        opacity="0.9"
      />
      <path
        d="M 55 45 C 80 30, 90 5, 78 -18 C 66 -38, 40 -42, 22 -30 C 8 -20, 4 -6, 12 6 C 20 20, 38 32, 55 45 Z"
        fill="url(#rose-leaf)"
        opacity="0.9"
      />
    </g>

    <g>
      <g transform="rotate(0)">
        <path
          d="M 0 -80 C 30 -75, 55 -50, 55 -20 C 55 5, 40 25, 15 30 C 0 32, -8 20, -6 8 C -4 -6, 8 -14, 20 -12"
          fill="url(#rose-petal-outer)"
        />
      </g>
      <g transform="rotate(72)">
        <path
          d="M 0 -80 C 30 -75, 55 -50, 55 -20 C 55 5, 40 25, 15 30 C 0 32, -8 20, -6 8 C -4 -6, 8 -14, 20 -12"
          fill="url(#rose-petal-outer)"
        />
      </g>
      <g transform="rotate(144)">
        <path
          d="M 0 -80 C 30 -75, 55 -50, 55 -20 C 55 5, 40 25, 15 30 C 0 32, -8 20, -6 8 C -4 -6, 8 -14, 20 -12"
          fill="url(#rose-petal-outer)"
        />
      </g>
      <g transform="rotate(216)">
        <path
          d="M 0 -80 C 30 -75, 55 -50, 55 -20 C 55 5, 40 25, 15 30 C 0 32, -8 20, -6 8 C -4 -6, 8 -14, 20 -12"
          fill="url(#rose-petal-outer)"
        />
      </g>
      <g transform="rotate(288)">
        <path
          d="M 0 -80 C 30 -75, 55 -50, 55 -20 C 55 5, 40 25, 15 30 C 0 32, -8 20, -6 8 C -4 -6, 8 -14, 20 -12"
          fill="url(#rose-petal-outer)"
        />
      </g>
    </g>

    <g transform="rotate(36)">
      <g transform="rotate(0)">
        <path
          d="M 0 -55 C 22 -52, 40 -32, 40 -12 C 40 6, 28 20, 10 22 C -2 24, -8 14, -6 4 C -4 -6, 6 -12, 15 -10"
          fill="url(#rose-petal-mid)"
        />
      </g>
      <g transform="rotate(72)">
        <path
          d="M 0 -55 C 22 -52, 40 -32, 40 -12 C 40 6, 28 20, 10 22 C -2 24, -8 14, -6 4 C -4 -6, 6 -12, 15 -10"
          fill="url(#rose-petal-mid)"
        />
      </g>
      <g transform="rotate(144)">
        <path
          d="M 0 -55 C 22 -52, 40 -32, 40 -12 C 40 6, 28 20, 10 22 C -2 24, -8 14, -6 4 C -4 -6, 6 -12, 15 -10"
          fill="url(#rose-petal-mid)"
        />
      </g>
      <g transform="rotate(216)">
        <path
          d="M 0 -55 C 22 -52, 40 -32, 40 -12 C 40 6, 28 20, 10 22 C -2 24, -8 14, -6 4 C -4 -6, 6 -12, 15 -10"
          fill="url(#rose-petal-mid)"
        />
      </g>
      <g transform="rotate(288)">
        <path
          d="M 0 -55 C 22 -52, 40 -32, 40 -12 C 40 6, 28 20, 10 22 C -2 24, -8 14, -6 4 C -4 -6, 6 -12, 15 -10"
          fill="url(#rose-petal-mid)"
        />
      </g>
    </g>

    <g transform="rotate(18)">
      <g transform="rotate(0)">
        <path
          d="M 0 -32 C 14 -30, 25 -18, 25 -4 C 25 8, 16 18, 4 18 C -4 18, -8 12, -6 4 C -4 -4, 4 -8, 10 -6"
          fill="url(#rose-petal-inner)"
        />
      </g>
      <g transform="rotate(90)">
        <path
          d="M 0 -32 C 14 -30, 25 -18, 25 -4 C 25 8, 16 18, 4 18 C -4 18, -8 12, -6 4 C -4 -4, 4 -8, 10 -6"
          fill="url(#rose-petal-inner)"
        />
      </g>
      <g transform="rotate(180)">
        <path
          d="M 0 -32 C 14 -30, 25 -18, 25 -4 C 25 8, 16 18, 4 18 C -4 18, -8 12, -6 4 C -4 -4, 4 -8, 10 -6"
          fill="url(#rose-petal-inner)"
        />
      </g>
      <g transform="rotate(270)">
        <path
          d="M 0 -32 C 14 -30, 25 -18, 25 -4 C 25 8, 16 18, 4 18 C -4 18, -8 12, -6 4 C -4 -4, 4 -8, 10 -6"
          fill="url(#rose-petal-inner)"
        />
      </g>
    </g>

    <circle cx="0" cy="0" r="10" fill="url(#rose-bud)" />
    <circle cx="-1.5" cy="-2" r="4" fill="#FAECC1" opacity="0.65" />
  </svg>
</template>
