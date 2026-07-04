<script lang="ts" setup>
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Mesh,
  NormalBlending,
  OrthographicCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

type StrokeSpec = {
  d: string;
  color: string;
  width: number;
  opacity: number;
  gx: number;
  gy: number;
  transform?: string;
  driftX: number;
  driftY: number;
  driftRot: number;
  driftDur: number;
  driftDelay: number;
  depth: number;
};

const VIEW_W = 1600;
const VIEW_H = 1000;
const SAMPLES_PER_STROKE = 64;

const strokes: StrokeSpec[] = [
  { d: "M -260 80 C -120 -40, 40 20, 180 -40 C 320 -100, 420 -40, 460 60", color: "#B5862E", width: 78, opacity: 0.52, gx: 1, gy: 0, transform: "translate(700 480) rotate(-6)", driftX: 18, driftY: -12, driftRot: 5, driftDur: 38, driftDelay: 0, depth: 0.55 },
  { d: "M -200 100 C -80 20, 60 -40, 180 20 C 280 70, 340 40, 380 90", color: "#E8C770", width: 62, opacity: 0.58, gx: 1, gy: 0.05, transform: "translate(520 360) rotate(-24) scale(1.1)", driftX: -22, driftY: 14, driftRot: -6, driftDur: 34, driftDelay: 0.6, depth: 0.7 },
  { d: "M -300 100 C -160 -60, 20 -20, 180 -80 C 320 -130, 420 -60, 460 40", color: "#7A5616", width: 96, opacity: 0.44, gx: 1, gy: -0.05, transform: "translate(420 620) rotate(14)", driftX: 20, driftY: 16, driftRot: 4, driftDur: 48, driftDelay: 1.2, depth: 0.45 },
  { d: "M -260 120 C -80 -40, 120 -80, 260 0 C 380 60, 440 40, 500 100", color: "#F2DDA0", width: 112, opacity: 0.60, gx: 1, gy: 0, transform: "translate(880 240) rotate(-4) scale(0.95)", driftX: -20, driftY: 22, driftRot: -7, driftDur: 44, driftDelay: 1.8, depth: 0.8 },
  { d: "M -280 40 C -120 -60, 40 -20, 200 -60 C 320 -90, 400 -60, 460 -20", color: "#8C6A1F", width: 86, opacity: 0.50, gx: 1, gy: 0.1, transform: "translate(1080 700) rotate(22)", driftX: 18, driftY: -18, driftRot: 5, driftDur: 40, driftDelay: 2.4, depth: 0.5 },
  { d: "M -180 60 C -60 -30, 60 -50, 160 0 C 240 40, 300 20, 340 60", color: "#D4AF37", width: 48, opacity: 0.62, gx: 1, gy: 0, transform: "translate(940 540) rotate(38) scale(0.95)", driftX: 14, driftY: -10, driftRot: -5, driftDur: 32, driftDelay: 3, depth: 0.75 },
  { d: "M -300 60 C -120 -80, 60 -40, 200 0 C 320 40, 400 20, 460 60", color: "#7A5616", width: 102, opacity: 0.45, gx: 1, gy: -0.08, transform: "translate(760 700) rotate(-16)", driftX: -24, driftY: -10, driftRot: 6, driftDur: 50, driftDelay: 3.6, depth: 0.4 },
  { d: "M -220 40 C -80 -80, 60 -60, 180 0 C 280 40, 340 20, 380 60", color: "#C9A24A", width: 72, opacity: 0.55, gx: 1, gy: 0, transform: "translate(1160 300) rotate(-14)", driftX: 16, driftY: 20, driftRot: -6, driftDur: 40, driftDelay: 4.2, depth: 0.65 },
  { d: "M -260 80 C -100 -60, 80 -40, 220 20 C 340 60, 400 40, 460 80", color: "#B87333", width: 82, opacity: 0.48, gx: 1, gy: 0.05, transform: "translate(280 480) rotate(-30) scale(0.9)", driftX: 22, driftY: 10, driftRot: 5, driftDur: 44, driftDelay: 4.8, depth: 0.5 },
  { d: "M -180 60 C -60 -40, 60 -40, 140 20 C 220 60, 280 40, 320 80", color: "#F2DDA0", width: 42, opacity: 0.68, gx: 1, gy: 0, transform: "translate(820 420) rotate(-8) scale(1.05)", driftX: -12, driftY: 18, driftRot: -8, driftDur: 34, driftDelay: 5.4, depth: 0.9 },
  { d: "M -200 80 C -80 0, 40 -30, 140 20 C 220 60, 280 40, 320 80", color: "#8C6A1F", width: 68, opacity: 0.42, gx: 1, gy: 0, transform: "translate(180 200) rotate(35)", driftX: 24, driftY: 14, driftRot: 6, driftDur: 42, driftDelay: 0.4, depth: 0.4 },
  { d: "M -180 60 C -60 -20, 60 -30, 140 20 C 220 60, 280 40, 320 80", color: "#D4AF37", width: 52, opacity: 0.5, gx: 1, gy: 0, transform: "translate(120 400) rotate(-40)", driftX: -18, driftY: 16, driftRot: -5, driftDur: 40, driftDelay: 1.4, depth: 0.5 },
  { d: "M -220 60 C -80 -40, 60 -40, 160 20 C 240 60, 300 40, 340 80", color: "#B5862E", width: 60, opacity: 0.44, gx: 1, gy: 0, transform: "translate(220 820) rotate(-20)", driftX: 20, driftY: -14, driftRot: 5, driftDur: 44, driftDelay: 2.2, depth: 0.35 },
  { d: "M -180 60 C -60 -30, 60 -30, 140 20 C 220 60, 280 40, 320 80", color: "#E8C770", width: 54, opacity: 0.48, gx: 1, gy: 0, transform: "translate(1440 180) rotate(-30)", driftX: -22, driftY: 12, driftRot: -6, driftDur: 38, driftDelay: 3, depth: 0.55 },
  { d: "M -220 60 C -80 -40, 60 -40, 160 20 C 240 60, 300 40, 340 80", color: "#7A5616", width: 66, opacity: 0.42, gx: 1, gy: 0, transform: "translate(1480 500) rotate(50)", driftX: 16, driftY: 18, driftRot: 6, driftDur: 50, driftDelay: 3.8, depth: 0.5 },
  { d: "M -200 60 C -80 -30, 60 -30, 140 20 C 220 60, 280 40, 320 80", color: "#B87333", width: 56, opacity: 0.45, gx: 1, gy: 0, transform: "translate(1400 820) rotate(-30)", driftX: -18, driftY: -16, driftRot: -5, driftDur: 40, driftDelay: 4.6, depth: 0.4 },
  { d: "M -160 40 C -60 -30, 40 -30, 120 20 C 200 60, 260 40, 300 60", color: "#F2DDA0", width: 40, opacity: 0.55, gx: 1, gy: 0, transform: "translate(600 140) rotate(20)", driftX: 14, driftY: 12, driftRot: -7, driftDur: 30, driftDelay: 5.2, depth: 0.7 },
  { d: "M -200 40 C -80 -30, 60 -30, 140 20 C 220 60, 280 40, 320 60", color: "#8C6A1F", width: 62, opacity: 0.42, gx: 1, gy: 0, transform: "translate(400 900) rotate(-10)", driftX: 18, driftY: -18, driftRot: 5, driftDur: 44, driftDelay: 6, depth: 0.35 },
  { d: "M -160 40 C -60 -30, 40 -30, 120 20 C 200 60, 260 40, 300 60", color: "#C9A24A", width: 46, opacity: 0.5, gx: 1, gy: 0, transform: "translate(1000 100) rotate(-15)", driftX: -14, driftY: 20, driftRot: -6, driftDur: 34, driftDelay: 6.8, depth: 0.6 },
  { d: "M -200 40 C -80 -30, 60 -30, 140 20 C 220 60, 280 40, 320 60", color: "#B5862E", width: 58, opacity: 0.44, gx: 1, gy: 0, transform: "translate(1240 900) rotate(20)", driftX: 20, driftY: -12, driftRot: 6, driftDur: 46, driftDelay: 7.4, depth: 0.4 },
  { d: "M -160 40 C -60 -30, 40 -30, 120 20 C 200 60, 260 40, 300 60", color: "#D4AF37", width: 44, opacity: 0.52, gx: 1, gy: 0, transform: "translate(1300 460) rotate(-40)", driftX: 14, driftY: 14, driftRot: -6, driftDur: 36, driftDelay: 8, depth: 0.65 },
  { d: "M -320 100 C -160 -80, 60 -40, 220 -60 C 380 -80, 480 -40, 540 60", color: "#B5862E", width: 140, opacity: 0.42, gx: 1, gy: -0.05, transform: "translate(320 200) rotate(-8) scale(1.05)", driftX: 22, driftY: 18, driftRot: 5, driftDur: 52, driftDelay: 0.2, depth: 0.6 },
  { d: "M -300 80 C -140 -80, 40 -60, 200 0 C 340 60, 440 20, 500 80", color: "#7A5616", width: 155, opacity: 0.40, gx: 1, gy: 0, transform: "translate(1250 550) rotate(40)", driftX: -24, driftY: -18, driftRot: -6, driftDur: 56, driftDelay: 1.4, depth: 0.35 },
  { d: "M -340 60 C -180 -100, 40 -40, 220 -20 C 380 0, 480 -40, 540 40", color: "#C9A24A", width: 160, opacity: 0.42, gx: 1, gy: 0, transform: "translate(640 820) rotate(-4) scale(1.1)", driftX: 26, driftY: -14, driftRot: 4, driftDur: 60, driftDelay: 2.6, depth: 0.45 },
  { d: "M -280 60 C -140 -60, 20 -40, 180 -20 C 320 0, 420 -40, 480 40", color: "#8C6A1F", width: 130, opacity: 0.44, gx: 1, gy: 0.1, transform: "translate(1240 160) rotate(28) scale(0.95)", driftX: -20, driftY: 22, driftRot: 6, driftDur: 48, driftDelay: 3.8, depth: 0.5 },
  { d: "M -280 100 C -120 -60, 40 -40, 180 0 C 320 40, 420 -20, 500 60", color: "#B87333", width: 145, opacity: 0.40, gx: 1, gy: -0.08, transform: "translate(140 550) rotate(72) scale(1.05)", driftX: 24, driftY: 16, driftRot: -5, driftDur: 54, driftDelay: 5, depth: 0.4 },
  { d: "M -320 40 C -160 -100, 40 -20, 220 -40 C 380 -50, 480 -20, 540 40", color: "#F2DDA0", width: 120, opacity: 0.50, gx: 1, gy: 0, transform: "translate(1000 380) rotate(-24) scale(0.95)", driftX: -18, driftY: 20, driftRot: -7, driftDur: 46, driftDelay: 6.4, depth: 0.7 },
  { d: "M -160 40 C -60 -30, 40 -30, 120 20 C 200 60, 260 40, 300 60", color: "#E0B85A", width: 42, opacity: 0.5, gx: 1, gy: 0, transform: "translate(80 700) rotate(30)", driftX: -16, driftY: -12, driftRot: 7, driftDur: 40, driftDelay: 8.6, depth: 0.5 },
];

type Segment = {
  ax: number; ay: number;
  c1x: number; c1y: number;
  c2x: number; c2y: number;
  ex: number; ey: number;
};

function parseCubics(d: string): Segment[] {
  const nums = d.match(/-?\d+\.?\d*/g)?.map(Number) ?? [];
  const cmds = d.match(/[MCSLZ]/g) ?? [];
  const segs: Segment[] = [];
  let i = 0;
  let cx = 0, cy = 0;
  let lastC2x = 0, lastC2y = 0;
  for (const cmd of cmds) {
    if (cmd === "M") {
      cx = nums[i++] ?? 0; cy = nums[i++] ?? 0;
      lastC2x = cx; lastC2y = cy;
    } else if (cmd === "C") {
      const c1x = nums[i++] ?? 0, c1y = nums[i++] ?? 0;
      const c2x = nums[i++] ?? 0, c2y = nums[i++] ?? 0;
      const ex = nums[i++] ?? 0, ey = nums[i++] ?? 0;
      segs.push({ ax: cx, ay: cy, c1x, c1y, c2x, c2y, ex, ey });
      cx = ex; cy = ey; lastC2x = c2x; lastC2y = c2y;
    } else if (cmd === "S") {
      const c1x = 2 * cx - lastC2x, c1y = 2 * cy - lastC2y;
      const c2x = nums[i++] ?? 0, c2y = nums[i++] ?? 0;
      const ex = nums[i++] ?? 0, ey = nums[i++] ?? 0;
      segs.push({ ax: cx, ay: cy, c1x, c1y, c2x, c2y, ex, ey });
      cx = ex; cy = ey; lastC2x = c2x; lastC2y = c2y;
    }
  }
  return segs;
}

function evalCubic(s: Segment, t: number): [number, number] {
  const u = 1 - t;
  const x = u*u*u*s.ax + 3*u*u*t*s.c1x + 3*u*t*t*s.c2x + t*t*t*s.ex;
  const y = u*u*u*s.ay + 3*u*u*t*s.c1y + 3*u*t*t*s.c2y + t*t*t*s.ey;
  return [x, y];
}

function samplePath(d: string, n: number): [number, number][] {
  const segs = parseCubics(d);
  if (segs.length === 0) return [];
  const pts: [number, number][] = [];
  const total = segs.length;
  for (let i = 0; i < n; i++) {
    const global = (i / (n - 1)) * total;
    const segIdx = Math.min(total - 1, Math.floor(global));
    const localT = global - segIdx;
    const seg = segs[segIdx];
    if (!seg) continue;
    pts.push(evalCubic(seg, localT));
  }
  return pts;
}

function parseTransform(t: string | undefined): { tx: number; ty: number; rot: number; sx: number; sy: number } {
  const out = { tx: 0, ty: 0, rot: 0, sx: 1, sy: 1 };
  if (!t) return out;
  const tm = t.match(/translate\(\s*(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*\)/);
  if (tm) { out.tx = Number(tm[1]); out.ty = Number(tm[2]); }
  const rm = t.match(/rotate\(\s*(-?\d+\.?\d*)\s*\)/);
  if (rm) { out.rot = Number(rm[1]) * Math.PI / 180; }
  const sm = t.match(/scale\(\s*(-?\d+\.?\d*)(?:\s+(-?\d+\.?\d*))?\s*\)/);
  if (sm) {
    out.sx = Number(sm[1]);
    out.sy = sm[2] !== undefined ? Number(sm[2]) : out.sx;
  }
  return out;
}

type BuiltRibbon = {
  geometry: BufferGeometry;
  centerline: Float32Array;
};

function buildRibbonGeometry(spec: StrokeSpec): BuiltRibbon {
  const localPts = samplePath(spec.d, SAMPLES_PER_STROKE);
  const { tx, ty, rot, sx, sy } = parseTransform(spec.transform);
  const cosR = Math.cos(rot), sinR = Math.sin(rot);

  const pts = localPts.map(([x, y]) => {
    const xs = x * sx, ys = y * sy;
    const xr = xs * cosR - ys * sinR;
    const yr = xs * sinR + ys * cosR;
    return [tx + xr, ty + yr] as [number, number];
  });

  const n = pts.length;
  const half = spec.width * 0.5;
  const positions = new Float32Array(n * 2 * 3);
  const uvs = new Float32Array(n * 2 * 2);
  const sides = new Float32Array(n * 2);
  const centerline = new Float32Array(n * 2);

  for (let i = 0; i < n; i++) {
    const cur = pts[i];
    if (!cur) continue;
    const prev = pts[Math.max(0, i - 1)] ?? cur;
    const next = pts[Math.min(n - 1, i + 1)] ?? cur;
    const dx = next[0] - prev[0];
    const dy = next[1] - prev[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    const u = i / (n - 1);
    const cx = cur[0];
    const cy = cur[1];

    const leftX = cx + nx * half;
    const leftY = cy + ny * half;
    const rightX = cx - nx * half;
    const rightY = cy - ny * half;

    const base = i * 2 * 3;
    positions[base + 0] = leftX;
    positions[base + 1] = -leftY;
    positions[base + 2] = 0;
    positions[base + 3] = rightX;
    positions[base + 4] = -rightY;
    positions[base + 5] = 0;

    const uvBase = i * 2 * 2;
    uvs[uvBase + 0] = u; uvs[uvBase + 1] = 0;
    uvs[uvBase + 2] = u; uvs[uvBase + 3] = 1;

    sides[i * 2 + 0] = -1;
    sides[i * 2 + 1] = 1;

    centerline[i * 2 + 0] = cx;
    centerline[i * 2 + 1] = -cy;
  }

  const indices: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const a = i * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    indices.push(a, b, c);
    indices.push(b, d, c);
  }

  const geom = new BufferGeometry();
  geom.setAttribute("position", new BufferAttribute(positions, 3));
  geom.setAttribute("uv", new BufferAttribute(uvs, 2));
  geom.setAttribute("aSide", new BufferAttribute(sides, 1));
  geom.setIndex(indices);
  return { geometry: geom, centerline };
}

const ribbonVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform float uFlickerAmp;
  uniform float uFlickerFreqA;
  uniform float uFlickerFreqB;
  attribute float aSide;
  uniform vec2 uCursorPos;
  uniform vec2 uCursorVel;
  uniform float uCursorInfluence;
  uniform float uContactU;
  uniform float uFoldWidth;
  varying vec2 vUv;
  varying float vTipRamp;

  void main() {
    vec3 pos = position;
    float u = uv.x;
    float tipRamp = smoothstep(0.55, 1.0, u);
    tipRamp = tipRamp * tipRamp;
    float wave =
      sin(uTime * uFlickerFreqA + uPhase + u * 3.14) +
      0.55 * sin(uTime * uFlickerFreqB + uPhase * 1.6 + u * 5.1);
    float lateral = wave * uFlickerAmp * tipRamp * aSide * 0.3;
    float lift = wave * uFlickerAmp * tipRamp * 0.7;
    pos.x += lateral * 0.5;
    pos.y += lift * 0.9;

    // Ribbon-catches-object fold: displacement peaks at the contact point on
    // the ribbon centerline (u == uContactU) in the direction of cursor
    // velocity, and falls off along the u-axis in both directions using a
    // bell-curve profile. Ribbon roots (u=0, u=1) stay pinned so the ribbon
    // wraps around the "object" (cursor) rather than sliding as a whole.
    float du = u - uContactU;
    float foldWeight = exp(-(du * du) / (uFoldWidth * uFoldWidth));
    // Roots pinned: force weight to 0 at the ends and let it rise in the middle.
    float rootPin = smoothstep(0.0, 0.12, u) * smoothstep(1.0, 0.88, u);
    foldWeight *= rootPin * uCursorInfluence;
    float velLen = length(uCursorVel);
    vec2 velDir = velLen > 0.001 ? uCursorVel / velLen : vec2(0.0);
    float velScale = clamp(velLen * 0.06, 0.0, 1.4);
    pos.xy += velDir * velScale * foldWeight * 110.0;

    vUv = uv;
    vTipRamp = tipRamp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const ribbonFragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  uniform float uNoiseSeed;
  varying vec2 vUv;
  varying float vTipRamp;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    float u = vUv.x;
    float v = vUv.y;

    // Solid ribbon: near-full alpha across most of the interior, only softening
    // at the true edges. widthMask fades only in the outer 8% on each side of
    // the ribbon so the body stays opaque instead of muddy against light bg.
    float widthMask = smoothstep(0.0, 0.08, v) * smoothstep(1.0, 0.92, v);

    // Brush-stroke ends: soft taper at the head/tail of the stroke so the ends
    // read as real paint. Slightly asymmetric — head slightly sharper, tail
    // fades longer like a brush lifting off the surface.
    float lengthTaper = smoothstep(0.0, 0.10, u) * smoothstep(1.0, 0.78, u);

    // Along-length body density (mid heavier than the very start/end).
    float body = 0.85 + 0.15 * smoothstep(0.0, 0.4, u) * smoothstep(1.0, 0.6, u);

    // Two-octave grain modulates COLOR (brightness) not alpha — keeps ribbon
    // opaque while producing painterly pigment variation.
    float grainA = noise(vec2(u * 22.0 + uNoiseSeed, v * 5.0));
    float grainB = noise(vec2(u * 60.0 + uNoiseSeed * 1.7, v * 14.0));
    float grain = mix(grainA, grainB, 0.4);

    float tipGlow = vTipRamp * 0.35;

    // Alpha stays near 1.0 across the ribbon body; only true edges + taper
    // pull it down. Uniform opacity acts as a per-stroke global multiplier.
    float alpha = widthMask * lengthTaper * body * uOpacity;
    if (alpha < 0.01) discard;

    // Color: base gold, brightness varies with grain, extra warmth at tips.
    float pigment = 0.75 + 0.45 * grain;
    vec3 rgb = uColor * (1.85 * pigment + tipGlow);

    gl_FragColor = vec4(rgb * alpha, alpha);
  }
`;

const emberVertexShader = /* glsl */ `
  uniform float uTime;
  attribute float aSeed;
  attribute float aSpeed;
  attribute float aSize;
  varying float vSeed;
  varying float vLifeFrac;

  void main() {
    float life = mod(uTime * aSpeed * 0.00006 + aSeed, 1.0);
    float x = position.x + sin(uTime * 0.0004 * aSpeed + aSeed * 6.28) * 60.0;
    float y = position.y - life * 900.0 + 500.0;
    vec4 mvPos = modelViewMatrix * vec4(x, y, 0.0, 1.0);
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = aSize * (1.0 - life * 0.5);
    vSeed = aSeed;
    vLifeFrac = life;
  }
`;

const emberFragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  varying float vSeed;
  varying float vLifeFrac;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, r) * (1.0 - vLifeFrac) * 0.65;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const sparkleVertexShader = /* glsl */ `
  uniform float uTime;
  attribute float aPhase;
  attribute float aFreq;
  attribute float aSize;
  attribute vec3 aTint;
  varying float vTwinkle;
  varying vec3 vTint;

  void main() {
    // Rock sparkle: each grain flashes briefly at its own phase.
    // Wave shaped so most of the cycle is dark and only the top ~15% shows.
    float phase = uTime * aFreq + aPhase * 6.28318;
    float w = 0.5 + 0.5 * sin(phase);
    w = pow(w, 8.0);
    vTwinkle = w;
    vTint = aTint;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = aSize * (0.4 + 0.8 * w);
  }
`;

const sparkleFragmentShader = /* glsl */ `
  precision highp float;
  varying float vTwinkle;
  varying vec3 vTint;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    // Bright dot with soft halo.
    float core = smoothstep(0.5, 0.0, r);
    float halo = smoothstep(0.5, 0.15, r) * 0.4;
    float alpha = (core + halo) * vTwinkle;
    if (alpha < 0.01) discard;
    vec3 rgb = vTint * (1.2 + vTwinkle * 0.8);
    gl_FragColor = vec4(rgb * alpha, alpha);
  }
`;

const canvas = ref<HTMLCanvasElement | null>(null);

type RibbonRuntime = {
  material: ShaderMaterial;
  centroidX: number;
  centroidY: number;
  depthFactor: number;
  currentInfluence: number;
  centerline: Float32Array;
};

let renderer: WebGLRenderer | null = null;
let scene: Scene | null = null;
let camera: OrthographicCamera | null = null;
let ribbonRuntimes: RibbonRuntime[] = [];
let ribbonMaterials: ShaderMaterial[] = [];
let sparkleMaterial: ShaderMaterial | null = null;
let emberMaterial: ShaderMaterial | null = null;
let rafId = 0;
let resizeObserver: ResizeObserver | null = null;
let startedAt = 0;
let cursorWorldX = 0;
let cursorWorldY = 0;
let prevCursorWorldX = 0;
let prevCursorWorldY = 0;
let cursorVelX = 0;
let cursorVelY = 0;
let hasCursor = false;
let reducedMotion = false;

const CURSOR_INFLUENCE_RADIUS = 360;
const CURSOR_SMOOTH = 0.12;
const VEL_SMOOTH = 0.06;

function syncSize() {
  if (!renderer || !canvas.value) return;
  const parent = canvas.value.parentElement;
  if (!parent) return;
  const { clientWidth, clientHeight } = parent;
  if (clientWidth === 0 || clientHeight === 0) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(clientWidth, clientHeight, false);
}

function handlePointerMove(e: PointerEvent) {
  if (reducedMotion || !canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const nx = (e.clientX - rect.left) / rect.width;
  const ny = (e.clientY - rect.top) / rect.height;
  cursorWorldX = (nx - 0.5) * VIEW_W;
  cursorWorldY = -(ny - 0.5) * VIEW_H;
  if (!hasCursor) {
    prevCursorWorldX = cursorWorldX;
    prevCursorWorldY = cursorWorldY;
    hasCursor = true;
  }
}

// Touch re-taps produce a huge coordinate delta from the last known position
// (finger lifted, moved, and touched down again far away). Without resetting
// prevCursorWorld on touch-start, that delta gets read as an enormous velocity
// spike and every ribbon on screen would fold at once. Anchor prev to the new
// contact point so velocity starts from zero on each fresh touch.
function handlePointerDown(e: PointerEvent) {
  if (reducedMotion || !canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const nx = (e.clientX - rect.left) / rect.width;
  const ny = (e.clientY - rect.top) / rect.height;
  cursorWorldX = (nx - 0.5) * VIEW_W;
  cursorWorldY = -(ny - 0.5) * VIEW_H;
  prevCursorWorldX = cursorWorldX;
  prevCursorWorldY = cursorWorldY;
  cursorVelX = 0;
  cursorVelY = 0;
  hasCursor = true;
}

function tick(now: number) {
  if (!renderer || !scene || !camera) return;
  if (startedAt === 0) startedAt = now;
  const elapsed = now - startedAt;

  if (hasCursor) {
    const rawVelX = cursorWorldX - prevCursorWorldX;
    const rawVelY = cursorWorldY - prevCursorWorldY;
    cursorVelX += (rawVelX - cursorVelX) * VEL_SMOOTH;
    cursorVelY += (rawVelY - cursorVelY) * VEL_SMOOTH;
    prevCursorWorldX = cursorWorldX;
    prevCursorWorldY = cursorWorldY;
  } else {
    cursorVelX *= 1 - VEL_SMOOTH;
    cursorVelY *= 1 - VEL_SMOOTH;
  }

  for (const r of ribbonRuntimes) {
    r.material.uniforms.uTime.value = elapsed;

    // CPU-side proximity gate + contact detection.
    // Only when the cursor is close to this ribbon do we:
    //   (a) find the nearest centerline point → derive contactU (0..1)
    //   (b) let uCursorInfluence rise so the fold shader engages.
    let targetInfluence = 0;
    let contactU = -1;
    if (hasCursor) {
      const dx = cursorWorldX - r.centroidX;
      const dy = cursorWorldY - r.centroidY;
      const centroidDist = Math.hypot(dx, dy);
      if (centroidDist < CURSOR_INFLUENCE_RADIUS + 200) {
        // Find the centerline sample nearest the cursor (in world coords).
        const cl = r.centerline;
        const nSamples = cl.length / 2;
        let bestDistSq = Number.POSITIVE_INFINITY;
        let bestIdx = 0;
        for (let ci = 0; ci < nSamples; ci++) {
          const cx = cl[ci * 2];
          const cy = cl[ci * 2 + 1];
          if (cx === undefined || cy === undefined) continue;
          const ex = cursorWorldX - cx;
          const ey = cursorWorldY - cy;
          const dSq = ex * ex + ey * ey;
          if (dSq < bestDistSq) {
            bestDistSq = dSq;
            bestIdx = ci;
          }
        }
        const bestDist = Math.sqrt(bestDistSq);
        const proximity = Math.max(0, 1 - bestDist / CURSOR_INFLUENCE_RADIUS);
        const eased = proximity * proximity * (3 - 2 * proximity);
        targetInfluence = eased * (0.45 + 0.55 * r.depthFactor);
        contactU = nSamples > 1 ? bestIdx / (nSamples - 1) : 0.5;
      }
    }
    r.currentInfluence +=
      (targetInfluence - r.currentInfluence) * CURSOR_SMOOTH;

    const cursorPos = r.material.uniforms.uCursorPos.value as Vector2;
    cursorPos.set(cursorWorldX, cursorWorldY);
    const cursorVel = r.material.uniforms.uCursorVel.value as Vector2;
    cursorVel.set(cursorVelX, cursorVelY);
    r.material.uniforms.uCursorInfluence.value = r.currentInfluence;
    if (contactU >= 0) r.material.uniforms.uContactU.value = contactU;
  }
  if (emberMaterial) emberMaterial.uniforms.uTime.value = elapsed;
  if (sparkleMaterial) sparkleMaterial.uniforms.uTime.value = elapsed;

  renderer.render(scene, camera);
  rafId = requestAnimationFrame(tick);
}

function buildEmberGeometry(count: number): BufferGeometry {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const speeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * VIEW_W * 0.95;
    positions[i * 3 + 1] = -VIEW_H * 0.5 + Math.random() * VIEW_H;
    positions[i * 3 + 2] = 0;
    seeds[i] = Math.random();
    speeds[i] = 0.6 + Math.random() * 1.4;
    sizes[i] = 2 + Math.random() * 5;
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(positions, 3));
  g.setAttribute("aSeed", new BufferAttribute(seeds, 1));
  g.setAttribute("aSpeed", new BufferAttribute(speeds, 1));
  g.setAttribute("aSize", new BufferAttribute(sizes, 1));
  return g;
}

/*
 * Rock sparkle grains distributed across the whole viewport. Each grain
 * carries its own phase + frequency so twinkling looks organic (not synced).
 * Colors mix pale gold (dominant), warm champagne, and a rare cool ice-blue
 * for mineral variety — as if light is catching quartz + mica flecks in rock.
 */
function buildSparkleGeometry(count: number): BufferGeometry {
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const freqs = new Float32Array(count);
  const sizes = new Float32Array(count);
  const tints = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * VIEW_W;
    positions[i * 3 + 1] = (Math.random() - 0.5) * VIEW_H;
    positions[i * 3 + 2] = 0;
    phases[i] = Math.random();
    freqs[i] = 0.0008 + Math.random() * 0.0022;
    sizes[i] = 3 + Math.random() * 6;
    const r = Math.random();
    let tr = 0;
    let tg = 0;
    let tb = 0;
    if (r < 0.7) {
      tr = 0.95;
      tg = 0.87;
      tb = 0.63;
    } else if (r < 0.92) {
      tr = 0.98;
      tg = 0.94;
      tb = 0.82;
    } else {
      tr = 0.72;
      tg = 0.82;
      tb = 0.92;
    }
    tints[i * 3 + 0] = tr;
    tints[i * 3 + 1] = tg;
    tints[i * 3 + 2] = tb;
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(positions, 3));
  g.setAttribute("aPhase", new BufferAttribute(phases, 1));
  g.setAttribute("aFreq", new BufferAttribute(freqs, 1));
  g.setAttribute("aSize", new BufferAttribute(sizes, 1));
  g.setAttribute("aTint", new BufferAttribute(tints, 3));
  return g;
}

onMounted(() => {
  if (!canvas.value) return;
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  renderer = new WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    premultipliedAlpha: false,
  });
  renderer.setClearColor(0x000000, 0);

  scene = new Scene();
  camera = new OrthographicCamera(
    -VIEW_W * 0.5,
    VIEW_W * 0.5,
    VIEW_H * 0.5,
    -VIEW_H * 0.5,
    -100,
    100,
  );
  camera.position.z = 10;

  const centerOffset = new Vector2(-VIEW_W * 0.5, VIEW_H * 0.5);

  const brightnesses = strokes.map((spec) => {
    const c = new Color(spec.color);
    const luma = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
    return luma * spec.opacity;
  });
  const minBright = Math.min(...brightnesses);
  const maxBright = Math.max(...brightnesses);
  const brightRange = Math.max(0.0001, maxBright - minBright);

  type SortedRibbon = {
    spec: StrokeSpec;
    idx: number;
    depthFactor: number;
    centroidX: number;
    centroidY: number;
  };
  const built: SortedRibbon[] = strokes.map((spec, idx) => {
    const b = brightnesses[idx] ?? minBright;
    const depthFactor = (b - minBright) / brightRange;
    const { tx, ty } = parseTransform(spec.transform);
    return {
      spec,
      idx,
      depthFactor,
      centroidX: tx + centerOffset.x,
      centroidY: -ty + centerOffset.y,
    };
  });
  built.sort((a, b) => a.depthFactor - b.depthFactor);

  for (let renderIdx = 0; renderIdx < built.length; renderIdx++) {
    const b = built[renderIdx];
    if (!b) continue;
    const { spec, idx, depthFactor, centroidX, centroidY } = b;
    const { geometry: geom, centerline } = buildRibbonGeometry(spec);
    geom.translate(centerOffset.x, centerOffset.y, 0);
    // Apply the same centerOffset to the centerline points so contact detection
    // is in the same coord system as vertex positions in the shader.
    for (let ci = 0; ci < centerline.length; ci += 2) {
      const cx = centerline[ci];
      const cy = centerline[ci + 1];
      if (cx === undefined || cy === undefined) continue;
      centerline[ci] = cx + centerOffset.x;
      centerline[ci + 1] = cy + centerOffset.y;
    }
    const mat = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(spec.color) },
        uOpacity: { value: spec.opacity },
        uPhase: { value: idx * 1.37 },
        uFlickerAmp: { value: 26 },
        uFlickerFreqA: { value: 0.0016 },
        uFlickerFreqB: { value: 0.0038 },
        uNoiseSeed: { value: idx * 13.7 },
        uCursorPos: { value: new Vector2(-9999, -9999) },
        uCursorVel: { value: new Vector2(0, 0) },
        uCursorInfluence: { value: 0 },
        uContactU: { value: -1 },
        uFoldWidth: { value: 0.18 },
      },
      vertexShader: ribbonVertexShader,
      fragmentShader: ribbonFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: NormalBlending,
      premultipliedAlpha: true,
      side: DoubleSide,
    });
    ribbonMaterials.push(mat);
    ribbonRuntimes.push({
      material: mat,
      centroidX,
      centroidY,
      depthFactor,
      currentInfluence: 0,
      centerline,
    });
    const mesh = new Mesh(geom, mat);
    mesh.renderOrder = renderIdx;
    scene.add(mesh);
  }

  const emberGeom = buildEmberGeometry(180);
  emberMaterial = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new Color("#D4AF37") },
    },
    vertexShader: emberVertexShader,
    fragmentShader: emberFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const embers = new Points(emberGeom, emberMaterial);
  embers.renderOrder = 999;
  scene.add(embers);

  const sparkleGeom = buildSparkleGeometry(420);
  sparkleMaterial = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: sparkleVertexShader,
    fragmentShader: sparkleFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const sparkles = new Points(sparkleGeom, sparkleMaterial);
  sparkles.renderOrder = 1000;
  scene.add(sparkles);

  syncSize();

  const parent = canvas.value.parentElement;
  if (parent && "ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(() => syncSize());
    resizeObserver.observe(parent);
  } else {
    window.addEventListener("resize", syncSize);
  }

  if (!reducedMotion) {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
  }

  rafId = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  if (rafId !== 0) cancelAnimationFrame(rafId);
  resizeObserver?.disconnect();
  window.removeEventListener("resize", syncSize);
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("pointerdown", handlePointerDown);
  scene?.traverse((obj) => {
    // biome-ignore lint/suspicious/noExplicitAny: Three.js mesh geometry/material types
    const m = obj as any;
    m.geometry?.dispose?.();
    m.material?.dispose?.();
  });
  for (const mat of ribbonMaterials) mat.dispose();
  emberMaterial?.dispose();
  sparkleMaterial?.dispose();
  renderer?.dispose();
  renderer = null;
  scene = null;
  camera = null;
  ribbonMaterials = [];
  ribbonRuntimes = [];
  emberMaterial = null;
  sparkleMaterial = null;
  hasCursor = false;
  cursorVelX = 0;
  cursorVelY = 0;
});
</script>

<template>
  <canvas
    ref="canvas"
    class="block h-full w-full"
    aria-hidden="true"
  />
</template>
