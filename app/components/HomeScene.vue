<script lang="ts" setup>
import {
	Mesh,
	OrthographicCamera,
	PlaneGeometry,
	Scene,
	ShaderMaterial,
	Vector2,
	WebGLRenderer,
} from "three";

const canvas = ref<HTMLCanvasElement | null>(null);

// 12-fold mandala over a wine→ink radial gradient and a seigaiha (青海波) wave
// background. The linework is procedural - all signed-distance-field strokes
// drawn in folded mandala space so a single arm definition replicates 12
// times around the viewport center.
//
// Layers (back → front):
//   1. WINE→INK radial gradient + soft sine modulation
//   2. Seigaiha wave field across the viewport, faded near center
//   3. Mandala foreground in folded-arm space:
//        - Main vine spine (cubic bezier through three rose anchors)
//        - Tendril curls between roses
//        - Three roses (5-petal silhouette + bud + petal seams)
//        - Outer arc band at length(m) ≈ 0.96
//        - Radial rays in the outer band
//   4. Edge vignette + center safe-zone darkening
const vertexShader = /* glsl */ `
	void main() {
		gl_Position = vec4(position, 1.0);
	}
`;

const fragmentShader = /* glsl */ `
	precision highp float;

	uniform float uTime;
	uniform vec2 uResolution;

	const vec3 INK = vec3(0.05, 0.03, 0.04);
	const vec3 WINE = vec3(0.13, 0.04, 0.08);
	const vec3 GOLD = vec3(0.86, 0.66, 0.34);
	const vec3 GOLD_HI = vec3(1.00, 0.87, 0.58);

	mat2 rot(float a) {
		float c = cos(a);
		float s = sin(a);
		return mat2(c, -s, s, c);
	}

	float sdSegment(vec2 p, vec2 a, vec2 b) {
		vec2 pa = p - a;
		vec2 ba = b - a;
		float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		return length(pa - ba * h);
	}

	// Bezier as a polyline of subdivided segments
	float sdBezier(vec2 p, vec2 a, vec2 b, vec2 c) {
		float d = 1e9;
		vec2 prev = a;
		for (int i = 1; i <= 8; i++) {
			float t = float(i) / 8.0;
			vec2 q = mix(mix(a, b, t), mix(b, c, t), t);
			d = min(d, sdSegment(p, prev, q));
			prev = q;
		}
		return d;
	}

	float sdArc(vec2 p, float r, float a0, float a1) {
		float a = atan(p.y, p.x);
		float ac = clamp(a, a0, a1);
		vec2 onArc = vec2(cos(ac), sin(ac)) * r;
		return length(p - onArc);
	}

	float stroke(float d, float w, float pxScale) {
		float halfW = w * 0.5 * pxScale;
		return 1.0 - smoothstep(halfW - pxScale, halfW + pxScale, d);
	}

	// 12-fold symmetric fold
	vec2 mandalaFold(vec2 p) {
		float a = atan(p.y, p.x);
		float r = length(p);
		float seg = 3.14159265 / 6.0;
		a = mod(a + seg * 0.5, seg) - seg * 0.5;
		return vec2(cos(a), sin(a)) * r;
	}

	float wobble(float s, float t) {
		return sin(s * 6.0 + t * 0.7) * 0.012 + sin(s * 13.0 - t * 0.3) * 0.006;
	}

	// Seigaiha (青海波) connected field on a true equilateral hex lattice.
	float seigaihaBackground(vec2 p, float tile, float pxScale) {
		float rowHeight = tile * 0.86602540378;
		float circleR = tile;

		float rowIndex = floor(p.y / rowHeight);
		float colIndex = floor(p.x / tile);

		float ringFactors[3];
		ringFactors[0] = 1.00;
		ringFactors[1] = 0.66;
		ringFactors[2] = 0.36;

		float ink = 0.0;

		for (int dy = 0; dy <= 2; dy++) {
			float ry = rowIndex - float(dy);
			float xOff = mod(ry, 2.0) * 0.5 * tile;
			float centerY = ry * rowHeight;
			for (int dx = 0; dx <= 1; dx++) {
				float centerX = (colIndex + float(dx)) * tile + xOff;
				vec2 toCenter = p - vec2(centerX, centerY);
				if (toCenter.y >= 0.0 && toCenter.y <= circleR) {
					float distToCenter = length(toCenter);
					if (distToCenter <= circleR + pxScale) {
						for (int k = 0; k < 3; k++) {
							float arcR = circleR * ringFactors[k];
							ink += stroke(abs(distToCenter - arcR), 0.85, pxScale);
						}
					}
				}
			}
		}

		return ink;
	}

	// === Rose: 5-lobed silhouette + bud + petal seams ===
	float drawRose(vec2 p, vec2 c, float baseR, float seed, float t, float pxScale) {
		vec2 q = p - c;
		float pr = length(q);
		if (pr > baseR * 1.15) return 0.0;

		float ink = 0.0;
		float breathe = 1.0 + 0.05 * sin(t * 1.3 + seed * 6.28318);
		float effR = baseR * breathe;

		const float TAU = 6.28318;
		float a = atan(q.y, q.x);

		// Outer silhouette: 5-lobed rose curve
		float lobeShape = (1.0 - cos(5.0 * a)) * 0.5;
		float silhouetteR = effR * (1.0 - 0.30 * lobeShape);
		ink += stroke(abs(pr - silhouetteR), 1.1, pxScale);

		// Inner bud
		float budR = baseR * 0.22 * breathe;
		ink += stroke(abs(pr - budR), 0.95, pxScale);

		// Five petal seam lines from center to each lobe tip
		float seg = TAU / 5.0;
		float nearestPeakA = floor((a + seg * 0.5) / seg) * seg;
		float angDelta = a - nearestPeakA;
		float perpDist = abs(pr * sin(angDelta));
		float withinR = step(budR, pr) * step(pr, silhouetteR * 0.95);
		ink += stroke(perpDist, 0.85, pxScale) * withinR;

		return ink;
	}

	// Three rose anchor points along an arm (in folded space, on +x axis)
	const vec2 ROSE_A = vec2(0.86, 0.0);
	const vec2 ROSE_B = vec2(0.58, 0.0);
	const vec2 ROSE_C = vec2(0.42, 0.0);

	// MAIN VINE: a curving spine that threads through all three rose centers.
	float mainVine(vec2 p, float t, float pxScale) {
		float wob = wobble(p.x + p.y * 0.5, t);

		vec2 outer = vec2(1.06, 0.04);
		vec2 ctrl1 = vec2(0.95, 0.10 + wob);
		vec2 ctrl2 = vec2(0.72, -0.10 + wob);
		vec2 ctrl3 = vec2(0.50, 0.09 - wob);
		vec2 inner = vec2(0.34, 0.0);

		float d = sdBezier(p, outer, ctrl1, ROSE_A);
		d = min(d, sdBezier(p, ROSE_A, ctrl2, ROSE_B));
		d = min(d, sdBezier(p, ROSE_B, ctrl3, ROSE_C));
		d = min(d, sdSegment(p, ROSE_C, inner));

		return d;
	}

	// TENDRILS: short curved single-stroke arcs branching off the main vine.
	float tendrils(vec2 p, float pxScale) {
		float ink = 0.0;

		vec2 t1Pos = mix(ROSE_A, ROSE_B, 0.5) + vec2(-0.01, 0.06);
		float dT1 = sdArc((p - t1Pos) * rot(0.5), 0.06, -1.2, 0.6);
		ink += stroke(dT1, 0.85, pxScale);

		vec2 t2Pos = mix(ROSE_B, ROSE_C, 0.5) + vec2(0.0, -0.05);
		float dT2 = sdArc((p - t2Pos) * rot(-0.4), 0.045, -0.6, 1.2);
		ink += stroke(dT2, 0.80, pxScale);

		vec2 t3Pos = mix(vec2(1.0, 0.0), ROSE_A, 0.5) + vec2(0.02, -0.06);
		float dT3 = sdArc((p - t3Pos) * rot(0.3), 0.05, -1.4, 0.4);
		ink += stroke(dT3, 0.85, pxScale);

		return ink;
	}

	// Radial rays: short dashes in the outer band pointing inward.
	float radialRays(vec2 p, float pxScale) {
		float d = sdSegment(p, vec2(0.92, 0.0), vec2(1.02, 0.0));
		return stroke(d, 1.4, pxScale);
	}

	void main() {
		vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
		float pxScale = 1.0 / min(uResolution.x, uResolution.y);
		float r = length(uv);
		float t = uTime;

		// Layer 1: wine -> ink radial gradient with soft pulse
		vec3 bg = mix(WINE * 0.55, INK, smoothstep(0.0, 0.95, r));
		bg *= 0.85 + 0.15 * sin(r * 6.0 - t * 0.2);

		// Layer 2: seigaiha wave field across the whole viewport
		float waveBg = seigaihaBackground(uv, 0.06, pxScale);
		float bgFade = smoothstep(0.20, 0.55, r);
		bg += GOLD * waveBg * 0.16 * bgFade;

		float safeZone = smoothstep(0.30, 0.36, r);

		// Layer 3: mandala foreground in folded-arm space
		vec2 m = mandalaFold(uv);

		float dVine = mainVine(m, t, pxScale);
		float vineInk = stroke(dVine, 1.6, pxScale);

		float tendrilInk = tendrils(m, pxScale);

		float roseInk = 0.0;
		roseInk += drawRose(m, ROSE_A, 0.085, 0.10, t, pxScale);
		roseInk += drawRose(m, ROSE_B, 0.068, 0.47, t, pxScale);
		roseInk += drawRose(m, ROSE_C, 0.052, 0.83, t, pxScale);

		float outerBand = stroke(abs(length(m) - 0.96), 0.7, pxScale);
		outerBand *= smoothstep(0.85, 0.96, r);

		float rays = radialRays(m, pxScale);
		rays *= smoothstep(0.88, 0.95, r);

		float totalInk = clamp(vineInk + tendrilInk + roseInk + outerBand + rays, 0.0, 2.0) * safeZone;

		// All linework stays in the gold ramp - no rose/red tinting on the landing.
		vec3 lineColor = mix(GOLD, GOLD_HI, smoothstep(0.4, 1.0, totalInk));

		vec3 col = bg;
		col += GOLD * totalInk * totalInk * 0.18;
		col += lineColor * totalInk;

		// Edge vignette
		float vignette = smoothstep(1.45, 0.45, r);
		col *= mix(0.45, 1.0, vignette);

		// Center safe-zone darkening
		col = mix(INK * 0.85, col, smoothstep(0.18, 0.42, r));

		gl_FragColor = vec4(col, 1.0);
	}
`;

let renderer: WebGLRenderer | null = null;
let scene: Scene | null = null;
let camera: OrthographicCamera | null = null;
let mesh: Mesh | null = null;
let material: ShaderMaterial | null = null;
let rafId = 0;
let resizeObserver: ResizeObserver | null = null;
let startedAt = 0;
let lastFrameAt = 0;
let reducedMotion = false;

function syncSize() {
	if (!renderer || !canvas.value || !material) return;
	const parent = canvas.value.parentElement;
	if (!parent) return;
	const { clientWidth, clientHeight } = parent;
	if (clientWidth === 0 || clientHeight === 0) return;
	const dpr = Math.min(window.devicePixelRatio || 1, 2);
	renderer.setPixelRatio(dpr);
	renderer.setSize(clientWidth, clientHeight, false);
	(material.uniforms.uResolution.value as Vector2).set(
		clientWidth * dpr,
		clientHeight * dpr,
	);
}

function tick(now: number) {
	if (!renderer || !scene || !camera || !material) return;
	if (startedAt === 0) startedAt = now;
	const elapsed = (now - startedAt) / 1000;
	material.uniforms.uTime.value = elapsed;
	renderer.render(scene, camera);

	const frameBudget = reducedMotion ? 1000 / 30 : 0;
	const wait = Math.max(0, frameBudget - (now - lastFrameAt));
	lastFrameAt = now;
	if (wait > 0) {
		window.setTimeout(() => {
			rafId = requestAnimationFrame(tick);
		}, wait);
	} else {
		rafId = requestAnimationFrame(tick);
	}
}

onMounted(() => {
	if (!canvas.value) return;

	reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	renderer = new WebGLRenderer({
		canvas: canvas.value,
		antialias: false,
		alpha: false,
		powerPreference: "high-performance",
	});
	renderer.setClearColor(0x0a050a, 1);

	scene = new Scene();
	camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

	material = new ShaderMaterial({
		vertexShader,
		fragmentShader,
		uniforms: {
			uTime: { value: 0 },
			uResolution: { value: new Vector2(1, 1) },
		},
	});
	mesh = new Mesh(new PlaneGeometry(2, 2), material);
	scene.add(mesh);

	syncSize();

	const parent = canvas.value.parentElement;
	if (parent && "ResizeObserver" in window) {
		resizeObserver = new ResizeObserver(() => syncSize());
		resizeObserver.observe(parent);
	} else {
		window.addEventListener("resize", syncSize);
	}

	rafId = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
	if (rafId !== 0) cancelAnimationFrame(rafId);
	resizeObserver?.disconnect();
	window.removeEventListener("resize", syncSize);
	mesh?.geometry.dispose();
	material?.dispose();
	renderer?.dispose();
	renderer = null;
	scene = null;
	camera = null;
	mesh = null;
	material = null;
});
</script>

<template>
	<canvas
		ref="canvas"
		class="block h-full w-full"
		aria-hidden="true"
	/>
</template>
