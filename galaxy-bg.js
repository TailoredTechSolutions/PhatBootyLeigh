/* ============================================================
   HOST LEIGH — Galaxy background (vanilla, auto-inject)
   Brand-tuned port of React Bits "Galaxy" (WebGL via ogl).
   Drops a fixed, full-viewport starfield BEHIND all page content
   (z-index:-1, pointer-events:none — never blocks clicks).

   Just include once per page:
     <script type="module" src="<path>/galaxy-bg.js"></script>

   Defaults are gold-hued and deliberately subtle so text stays
   readable. Override per page before this loads:
     window.GALAXY_OPTS = { density: 1.1, glowIntensity: 0.35, ... };
   ============================================================ */
// ogl is loaded at runtime via dynamic import (native browser ESM), so the
// design-system bundler never tries to resolve it as an npm package.
const OGL_URL = "https://esm.sh/ogl@1.0.11";

const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0, 1); }
`;

const fragment = `
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float tri(float x) { return abs(fract(x) * 2.0 - 1.0); }
float tris(float x) { float t = fract(x); return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0)); }
float trisn(float x) { float t = fract(x); return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0; }
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}
vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));
      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      col += star * size * color;
    }
  }
  return col;
}
void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  }
  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
  vec3 col = vec3(0.0);
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }
  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

// Brand defaults — subtle gold starfield. Override via window.GALAXY_OPTS.
const DEFAULTS = {
  focal: [0.5, 0.5],
  rotation: [1.0, 0.0],
  starSpeed: 0.32,
  density: 1.1,
  hueShift: 42,          // gold
  speed: 0.8,
  glowIntensity: 0.5,
  saturation: 0.5,
  twinkleIntensity: 0.6,
  rotationSpeed: 0.04,
  autoCenterRepulsion: 0,
  transparent: true,
};

async function mount() {
  if (document.getElementById("galaxy-bg")) return;
  const opts = Object.assign({}, DEFAULTS, window.GALAXY_OPTS || {});

  let Renderer, Program, Mesh, Color, Triangle;
  try {
    ({ Renderer, Program, Mesh, Color, Triangle } = await import(/* @vite-ignore */ OGL_URL));
  } catch (e) {
    console.warn("galaxy-bg: failed to load ogl —", e);
    return;
  }

  const ctn = document.createElement("div");
  ctn.id = "galaxy-bg";
  ctn.setAttribute("aria-hidden", "true");
  Object.assign(ctn.style, {
    position: "fixed",
    inset: "0",
    zIndex: "-1",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
  });
  document.body.appendChild(ctn);

  let renderer;
  try {
    renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
  } catch (e) {
    console.warn("galaxy-bg: WebGL unavailable —", e);
    ctn.remove();
    return;
  }
  const gl = renderer.gl;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);
  Object.assign(gl.canvas.style, { width: "100%", height: "100%", display: "block" });

  let program;
  function resize() {
    renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
    if (program) {
      program.uniforms.uResolution.value = new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
    }
  }
  window.addEventListener("resize", resize, false);

  const geometry = new Triangle(gl);
  program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
      uFocal: { value: new Float32Array(opts.focal) },
      uRotation: { value: new Float32Array(opts.rotation) },
      uStarSpeed: { value: opts.starSpeed },
      uDensity: { value: opts.density },
      uHueShift: { value: opts.hueShift },
      uSpeed: { value: opts.speed },
      uGlowIntensity: { value: opts.glowIntensity },
      uSaturation: { value: opts.saturation },
      uTwinkleIntensity: { value: opts.twinkleIntensity },
      uRotationSpeed: { value: opts.rotationSpeed },
      uAutoCenterRepulsion: { value: opts.autoCenterRepulsion },
      uTransparent: { value: opts.transparent },
    },
  });
  resize();

  const mesh = new Mesh(gl, { geometry, program });
  ctn.appendChild(gl.canvas);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf;
  function update(t) {
    raf = requestAnimationFrame(update);
    if (!reduce) {
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uStarSpeed.value = (t * 0.001 * opts.starSpeed) / 10.0;
    }
    renderer.render({ scene: mesh });
  }
  raf = requestAnimationFrame(update);

  // Pause when tab hidden to save GPU.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(update);
  });
}

if (document.readyState !== "loading") mount();
else document.addEventListener("DOMContentLoaded", mount);
