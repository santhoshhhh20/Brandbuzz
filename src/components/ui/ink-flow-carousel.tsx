"use client"

import * as React from "react"

/**
 * Ink Flow Carousel — every slide is wet paint. Move over it and the picture
 * stirs like ink in water, then settles back. Change slides and the next one
 * pours in as ink: a jet from the edge, or a drop where you clicked, curling
 * into vortices as it spreads.
 *
 * A real fluid simulation on the GPU: stable fluids with vorticity
 * confinement and a pressure projection. It moves a *coordinate map*, not
 * dye. Each pixel remembers where its paint came from, so the photograph
 * itself is smeared, and relaxing that map back toward where it belongs is
 * what lets it settle. A second field carries the incoming slide's ink.
 *
 * WebGL2 with half-float render targets; React is the only import. Without
 * them it cross-fades plain images rather than showing a black rectangle.
 */

export type InkFlowItem = {
  /** Image URL. Must be CORS-enabled, same-origin or a data: URL. */
  src: string
  title?: string
  caption?: string
  alt?: string
}

export type InkFlowCarouselProps = {
  items: InkFlowItem[]
  /** Total height, caption rail included. **Must be a definite length.** */
  height?: string
  /** Milliseconds between automatic pours. 0 (default) is off. */
  autoplay?: number
  /** Milliseconds a pour takes to cover the stage. */
  duration?: number
  /** How hard the pointer stirs the paint. 0 turns stirring off. */
  stir?: number
  /** Wrap past the ends. */
  loop?: boolean
  /** The caption rail under the stage: counter, title, caption, controls. */
  rail?: boolean
  /** Controlled index. Omit for uncontrolled. */
  index?: number
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  className?: string
}

// #region ink
/** Share of a pour spent jetting in before the bloom carries it. */
export const POUR = 0.35
/** From here the incoming ink is raised to a floor everywhere, so the swap is seamless. */
export const FILL_START = 0.8
/** How fast smeared paint returns to where it belongs, per second. */
export const RELAX = 2.4
/** How fast the water stops moving, per second. */
export const DISSIPATION = 1.6
/** Seconds after the last stir before the simulation stops drawing. */
export const SETTLE_S = 3.4
/** How fast the paint's finest detail smooths out, per second. */
export const VISCOSITY = 9

export function wrapIndex(i: number, n: number, loop: boolean): number {
  if (n <= 0) return 0
  return loop ? ((i % n) + n) % n : Math.min(Math.max(i, 0), n - 1)
}

export function smooth(a: number, b: number, x: number): number {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

/**
 * The floor the incoming ink is raised to everywhere: nothing until
 * FILL_START, exactly 1 at the end. A floor rather than an increment, so the
 * stage is fully covered at the swap whatever the frame rate.
 */
export function fillLevel(p: number): number {
  return smooth(FILL_START, 1, p)
}

/** Strength of the jet: full at the start, nothing once the pour is over. */
export function jetStrength(p: number): number {
  return p >= POUR ? 0 : 1 - p / POUR
}

/**
 * How far the ink has spread, as a share of the distance to the farthest
 * corner. An S-curve: the jet has the stage to itself at first, the bloom
 * hurries through the middle, and it reaches the far corner just after the
 * floor starts rising.
 */
export function bloomReach(p: number): number {
  return smooth(0.04, FILL_START + 0.06, p)
}

/** Distortion still left t seconds after the last stir: the slower of the two decays. */
export function residual(t: number): number {
  return Math.exp(-Math.min(RELAX, DISSIPATION) * t)
}
// #endregion

/** Simulation grid (velocity, pressure) and paint grid (coordinate map, ink), by short side. */
const SIM = 160
const DYE = 512
const PRESSURE_ITERATIONS = 20
/**
 * The same, for a device that cannot keep up: a software renderer, an old
 * phone. Chosen once, by watching the first busy frames.
 */
const LITE = { sim: 96, dye: 256, iterations: 8 }
/** A frame slower than this counts against the device; this many of them switch to LITE. */
const SLOW_FRAME_S = 0.05
const SLOW_FRAMES = 12
const CURL = 16
/** Pointer stir: force per stage-width of pointer travel, and brush size. */
const STIR = 1500
/** Dragging stirs like a brush; hovering only ripples the surface. */
const DRAG_STIR = 4.5
const STIR_RADIUS = 0.0026
/** The edge jet's acceleration, the click drop's burst, and eddies seeded along the front. */
const JET = 14000
const DROP = 900
const FRONT_STIR = 6500
/** Clicks, keys and autoplay use this; a reduced-motion change is a plain cross-fade. */
const DURATION = 1800
const REDUCED_DURATION = 240

const VERT = `#version 300 es
in vec2 a_position;
uniform vec2 u_texel;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
void main() {
  vUv = a_position * 0.5 + 0.5;
  vL = vUv - vec2(u_texel.x, 0.0);
  vR = vUv + vec2(u_texel.x, 0.0);
  vT = vUv + vec2(0.0, u_texel.y);
  vB = vUv - vec2(0.0, u_texel.y);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 o;
`
const NEIGHBOURS = `in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
`

const FRAGS = {
  // A gaussian dab: added (velocity) or raised to (ink).
  splat:
    HEAD +
    `uniform sampler2D u_target;
uniform float u_aspect;
uniform vec3 u_value;
uniform vec2 u_point;
uniform float u_radius;
uniform float u_raise;
uniform float u_edge;
uniform float u_seed;
void main() {
  vec2 p = vUv - u_point;
  p.x *= u_aspect;
  vec3 dab;
  if (u_edge > 0.0) {
    // A disc with a narrow rim that wobbles around its circumference, so the
    // bloom's edge is never a clean circle even before the flow tears at it.
    float ang = atan(p.y, p.x);
    float r = u_radius * (1.0 + 0.07 * sin(3.0 * ang + u_seed) + 0.04 * sin(7.0 * ang - 1.7 * u_seed));
    dab = (1.0 - smoothstep(r - u_edge, r, length(p))) * u_value;
  } else {
    dab = exp(-dot(p, p) / u_radius) * u_value;
  }
  vec3 base = texture(u_target, vUv).xyz;
  o = vec4(u_raise > 0.5 ? min(base + dab, vec3(1.0)) : base + dab, 1.0);
}`,
  // Carry a field along the flow, looking back upstream (semi-Lagrangian).
  advect:
    HEAD +
    `uniform sampler2D u_velocity;
uniform sampler2D u_source;
uniform vec2 u_simTexel;
uniform float u_dt;
uniform float u_dissipation;
void main() {
  vec2 back = vUv - u_dt * texture(u_velocity, vUv).xy * u_simTexel;
  o = texture(u_source, back) / (1.0 + u_dissipation * u_dt);
}`,
  // The coordinate map: carried by the flow like the ink, then pulled back
  // toward where each pixel belongs. That pull is the paint settling.
  relax:
    HEAD +
    NEIGHBOURS +
    `uniform sampler2D u_velocity;
uniform sampler2D u_source;
uniform vec2 u_simTexel;
uniform float u_dt;
uniform float u_relax;
uniform float u_viscosity;
void main() {
  vec2 back = vUv - u_dt * texture(u_velocity, vUv).xy * u_simTexel;
  vec2 d = texture(u_source, back).xy - vUv;
  vec2 around = 0.25 * (
    texture(u_source, back + vL - vUv).xy - vL +
    texture(u_source, back + vR - vUv).xy - vR +
    texture(u_source, back + vT - vUv).xy - vT +
    texture(u_source, back + vB - vUv).xy - vB);
  d = mix(d, around, 1.0 - exp(-u_viscosity * u_dt));
  o = vec4(vUv + d * exp(-u_relax * u_dt), 0.0, 1.0);
}`,
  identity: HEAD + `void main() { o = vec4(vUv, 0.0, 1.0); }`,
  floor:
    HEAD +
    `uniform sampler2D u_source;
uniform float u_level;
void main() { o = vec4(max(texture(u_source, vUv).xyz, vec3(u_level)), 1.0); }`,
  scale:
    HEAD +
    `uniform sampler2D u_source;
uniform float u_value;
void main() { o = texture(u_source, vUv) * u_value; }`,
  curl:
    HEAD +
    NEIGHBOURS +
    `uniform sampler2D u_velocity;
void main() {
  float L = texture(u_velocity, vL).y;
  float R = texture(u_velocity, vR).y;
  float T = texture(u_velocity, vT).x;
  float B = texture(u_velocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,
  vorticity:
    HEAD +
    NEIGHBOURS +
    `uniform sampler2D u_velocity;
uniform sampler2D u_curl;
uniform float u_strength;
uniform float u_dt;
void main() {
  float L = texture(u_curl, vL).x;
  float R = texture(u_curl, vR).x;
  float T = texture(u_curl, vT).x;
  float B = texture(u_curl, vB).x;
  float C = texture(u_curl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= u_strength * C;
  force.y *= -1.0;
  vec2 vel = texture(u_velocity, vUv).xy + force * u_dt;
  o = vec4(clamp(vel, -1000.0, 1000.0), 0.0, 1.0);
}`,
  divergence:
    HEAD +
    NEIGHBOURS +
    `uniform sampler2D u_velocity;
void main() {
  vec2 C = texture(u_velocity, vUv).xy;
  float L = vL.x < 0.0 ? -C.x : texture(u_velocity, vL).x;
  float R = vR.x > 1.0 ? -C.x : texture(u_velocity, vR).x;
  float T = vT.y > 1.0 ? -C.y : texture(u_velocity, vT).y;
  float B = vB.y < 0.0 ? -C.y : texture(u_velocity, vB).y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,
  pressure:
    HEAD +
    NEIGHBOURS +
    `uniform sampler2D u_pressure;
uniform sampler2D u_divergence;
void main() {
  float L = texture(u_pressure, vL).x;
  float R = texture(u_pressure, vR).x;
  float T = texture(u_pressure, vT).x;
  float B = texture(u_pressure, vB).x;
  float div = texture(u_divergence, vUv).x;
  o = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`,
  gradient:
    HEAD +
    NEIGHBOURS +
    `uniform sampler2D u_pressure;
uniform sampler2D u_velocity;
void main() {
  float L = texture(u_pressure, vL).x;
  float R = texture(u_pressure, vR).x;
  float T = texture(u_pressure, vT).x;
  float B = texture(u_pressure, vB).x;
  o = vec4(texture(u_velocity, vUv).xy - vec2(R - L, T - B), 0.0, 1.0);
}`,
  display:
    HEAD +
    `uniform sampler2D u_map;
uniform sampler2D u_mask;
uniform sampler2D u_from;
uniform sampler2D u_to;
uniform float u_fromAspect;
uniform float u_toAspect;
uniform vec2 u_res;
uniform vec2 u_dyeTexel;
uniform float u_wet;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

vec3 cover(sampler2D tex, float imgAspect, vec2 uv) {
  float a = u_res.x / u_res.y;
  vec2 s = a > imgAspect ? vec2(1.0, imgAspect / a) : vec2(a / imgAspect, 1.0);
  vec2 plain = (vUv - 0.5) * s;
  return textureGrad(tex, (uv - 0.5) * s + 0.5, dFdx(plain), dFdy(plain)).rgb;
}

float ink(vec2 p) { return texture(u_mask, p).x; }

void main() {
  vec2 uv = texture(u_map, vUv).xy;
  float m = ink(vUv);
  float e = smoothstep(0.45, 0.55, m);
  vec3 col = mix(cover(u_from, u_fromAspect, uv), cover(u_to, u_toAspect, uv), e);

  vec2 dx = vec2(u_dyeTexel.x, 0.0);
  vec2 dy = vec2(0.0, u_dyeTexel.y);
  vec3 light = normalize(vec3(-0.35, 0.5, 0.8));

  float front = 4.0 * e * (1.0 - e);
  vec3 nInk = normalize(vec3(ink(vUv - dx) - ink(vUv + dx), ink(vUv - dy) - ink(vUv + dy), 0.12));
  float gloss = pow(max(dot(nInk, light), 0.0), 24.0);
  col = col * (1.0 - 0.18 * front * u_wet) + gloss * 0.22 * front * u_wet;

  col += (hash(floor(vUv * u_res)) - 0.5) * 0.02;
  o = vec4(col, 1.0);
}`,
}

type Tex = { tex: WebGLTexture }
type Target = Tex & { fbo: WebGLFramebuffer; w: number; h: number }
type Double = { read: Target; write: Target; swap: () => void }
type Prog = { prog: WebGLProgram; u: Record<string, WebGLUniformLocation | null> }
type Uniform = number | number[] | Tex
type Pour = {
  from: number
  to: number
  t: number
  duration: number
  x: number
  y: number
  dx: number
  dy: number
  drop: boolean
  kicked: boolean
  seed: number
}
type Stir = { x: number; y: number; dx: number; dy: number; force: number }

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.decoding = "async"
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("could not load " + src))
    img.src = src
  })

const pad = (i: number) => String(i).padStart(2, "0")

const CSS =
  ".ifc-root{position:relative;display:flex;flex-direction:column;width:100%;overflow:hidden;" +
  "background:var(--color-background,#000000);color:var(--color-foreground,#FFFFFF)}" +
  ".ifc-stage{position:relative;flex:1 1 auto;min-height:0;overflow:hidden;cursor:pointer;touch-action:pan-y;" +
  "user-select:none;-webkit-user-select:none;outline:none;background:#000000}" +
  ".ifc-stage:focus-visible{box-shadow:inset 0 0 0 2px var(--color-primary,#FFFFFF)}" +
  ".ifc-canvas,.ifc-fallback{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none}" +
  ".ifc-canvas{transition:opacity 400ms ease}" +
  ".ifc-fallback{object-fit:cover;transition:opacity 400ms ease}" +
  ".ifc-rail{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px;flex-shrink:0;" +
  "padding:0 16px 0 24px;border-top:1px solid var(--color-border,#262626)}" +
  ".ifc-caption{display:flex;align-items:baseline;gap:20px;min-width:0;font-size:15px;line-height:20px}" +
  ".ifc-caption>*{animation:ifc-in 260ms cubic-bezier(0.23,1,0.32,1) both}" +
  ".ifc-caption>:nth-child(2){animation-delay:40ms}" +
  ".ifc-caption>:nth-child(3){animation-delay:80ms}" +
  ".ifc-count{flex-shrink:0;width:56px;font-size:13px;letter-spacing:.04em;font-variant-numeric:tabular-nums;" +
  "color:var(--color-muted-foreground,#888888)}" +
  ".ifc-count b{font-weight:700;color:var(--color-foreground,#FFFFFF)}" +
  ".ifc-title{flex-shrink:0;font-weight:700}" +
  ".ifc-sub{min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" +
  "color:var(--color-muted-foreground,#888888)}" +
  ".ifc-controls{display:flex;gap:8px;flex-shrink:0}" +
  ".ifc-btn{position:relative;display:flex;align-items:center;justify-content:center;width:40px;height:40px;" +
  "padding:0;border-radius:50%;border:1px solid var(--color-border,#333333);background:transparent;color:inherit;" +
  "cursor:pointer;transition:transform 160ms ease-out,border-color 200ms ease}" +
  ".ifc-btn:active{transform:scale(0.97)}" +
  ".ifc-btn:disabled{opacity:.35;cursor:default}" +
  ".ifc-btn:focus-visible{outline:2px solid var(--color-primary,#FFFFFF);outline-offset:2px}" +
  "@media (hover:hover) and (pointer:fine){.ifc-btn:hover:not(:disabled){border-color:var(--color-muted-foreground,#8A8A8A)}}" +
  ".ifc-ring{position:absolute;inset:-1px;width:40px;height:40px;pointer-events:none;transform:rotate(-90deg)}" +
  ".ifc-ring circle{fill:none;stroke:currentColor;stroke-width:1.5;stroke-dasharray:121;stroke-dashoffset:121;" +
  "animation:ifc-ring linear forwards}" +
  ".ifc-clock{position:absolute;width:0;height:0;animation:ifc-clock linear forwards}" +
  ".ifc-root[data-paused='true'] .ifc-ring circle,.ifc-root[data-paused='true'] .ifc-clock{animation-play-state:paused}" +
  ".ifc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);" +
  "white-space:nowrap;border:0}" +
  "@keyframes ifc-in{from{opacity:0;transform:translateY(6px)}}" +
  "@keyframes ifc-fade{from{opacity:0}}" +
  "@keyframes ifc-ring{to{stroke-dashoffset:0}}" +
  "@keyframes ifc-clock{from{opacity:0}to{opacity:0}}" +
  "@media (prefers-reduced-motion:reduce){.ifc-caption>*{animation-name:ifc-fade}}" +
  "@media (max-width:560px){.ifc-sub{display:none}.ifc-rail{padding:0 12px 0 16px}}"

export function InkFlowCarousel({
  items,
  height = "100svh",
  autoplay = 0,
  duration = DURATION,
  stir = 1,
  loop = true,
  rail = true,
  index,
  defaultIndex = 0,
  onIndexChange,
  className = "",
}: InkFlowCarouselProps) {
  const n = items.length
  const rootRef = React.useRef<HTMLElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  const [uncontrolled, setUncontrolled] = React.useState(() => wrapIndex(defaultIndex, n, loop))
  const active = index === undefined ? wrapIndex(uncontrolled, n, loop) : wrapIndex(index, n, loop)

  const [failed, setFailed] = React.useState(false)
  const [ready, setReady] = React.useState(false)
  const [generation, setGeneration] = React.useState(0)
  const [reduced, setReduced] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const [inView, setInView] = React.useState(true)
  const [focused, setFocused] = React.useState(false)
  const [overRail, setOverRail] = React.useState(false)
  const [stopped, setStopped] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    const onVisibility = () => setHidden(document.hidden)
    onVisibility()
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      mq.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  React.useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const go = React.useCallback(
    (next: number) => {
      const w = wrapIndex(next, n, loop)
      if (index === undefined) setUncontrolled(w)
      onIndexChange?.(w)
    },
    [index, n, loop, onIndexChange],
  )

  const live = React.useRef({ reduced, loop, n, duration, stir })
  live.current = { reduced, loop, n, duration, stir }
  const engineRef = React.useRef({
    cur: active,
    pour: null as Pour | null,
    stirs: [] as Stir[],
    origin: null as { x: number; y: number } | null,
    clearInk: false,
    energy: 0,
    aspect: 1.6,
    kick: () => {},
  })
  const E = engineRef.current

  const previous = React.useRef(active)
  React.useEffect(() => {
    if (previous.current === active) return
    previous.current = active
    if (E.pour) {
      E.cur = E.pour.to
      E.pour = null
      E.clearInk = true
    }
    if (active === E.cur) return E.kick()
    const { n: count, loop: wraps, reduced: still, duration: ms } = live.current
    const forward = wraps ? ((active - E.cur + count) % count) * 2 <= count : active > E.cur
    const o = E.origin
    E.origin = null
    const jitter = Math.random() - 0.5
    E.pour = {
      from: E.cur,
      to: active,
      t: 0,
      duration: (still ? REDUCED_DURATION : Math.max(ms, 300)) / 1000,
      x: o ? o.x : forward ? 0.985 : 0.015,
      y: o ? o.y : 0.5 + jitter * 0.3,
      dx: o ? 0 : forward ? -1 : 1,
      dy: o ? 0 : jitter * 0.5,
      drop: !!o,
      kicked: false,
      seed: Math.random() * 100,
    }
    E.kick()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const sources = items.map((i) => i.src).join("\n")

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || n === 0) return
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false, stencil: false })
    if (!gl || !(gl.getExtension("EXT_color_buffer_float") || gl.getExtension("EXT_color_buffer_half_float"))) {
      setFailed(true)
      return
    }

    let disposed = false
    let raf = 0
    let last = 0
    let started = false
    let lite = false
    let judged = 0
    let slow = 0
    const images: (Tex | null)[] = items.map(() => null)
    const aspects: number[] = items.map(() => 1)
    const P: Record<string, Prog> = {}
    const owned: { textures: WebGLTexture[]; fbos: WebGLFramebuffer[] } = { textures: [], fbos: [] }
    let vel: Double, pres: Double, map: Double, mask: Double, div: Target, curl: Target

    const onLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onRestored = () => setGeneration((g) => g + 1)
    canvas.addEventListener("webglcontextlost", onLost)
    canvas.addEventListener("webglcontextrestored", onRestored)

    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)
      if (!s) throw new Error("could not create shader")
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error("shader: " + gl.getShaderInfoLog(s))
      return s
    }
    const program = (frag: string): Prog => {
      const prog = gl.createProgram()
      if (!prog) throw new Error("could not create program")
      const v = shader(gl.VERTEX_SHADER, VERT)
      const f = shader(gl.FRAGMENT_SHADER, frag)
      gl.attachShader(prog, v)
      gl.attachShader(prog, f)
      gl.bindAttribLocation(prog, 0, "a_position")
      gl.linkProgram(prog)
      gl.deleteShader(v)
      gl.deleteShader(f)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link: " + gl.getProgramInfoLog(prog))
      const u: Prog["u"] = {}
      const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(prog, i)
        if (info) u[info.name.replace(/^u_/, "")] = gl.getUniformLocation(prog, info.name)
      }
      return { prog, u }
    }

    const precise = !!gl.getExtension("EXT_color_buffer_float") && !!gl.getExtension("OES_texture_float_linear")
    const target = (w: number, h: number, wide = false): Target => {
      const tex = gl.createTexture()
      const fbo = gl.createFramebuffer()
      if (!tex || !fbo) throw new Error("could not allocate a render target")
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      const full = wide && precise
      gl.texImage2D(gl.TEXTURE_2D, 0, full ? gl.RGBA32F : gl.RGBA16F, w, h, 0, gl.RGBA, full ? gl.FLOAT : gl.HALF_FLOAT, null)
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) throw new Error("half-float target incomplete")
      owned.textures.push(tex)
      owned.fbos.push(fbo)
      return { tex, fbo, w, h }
    }
    const double = (w: number, h: number, wide = false): Double => {
      const d = { read: target(w, h, wide), write: target(w, h, wide), swap: () => {} }
      d.swap = () => {
        const t = d.read
        d.read = d.write
        d.write = t
      }
      return d
    }
    const release = () => {
      for (const t of owned.textures) gl.deleteTexture(t)
      for (const f of owned.fbos) gl.deleteFramebuffer(f)
      owned.textures = []
      owned.fbos = []
    }

    const run = (p: Prog, dst: Target | null, u: Record<string, Uniform>) => {
      gl.useProgram(p.prog)
      let unit = 0
      for (const k in u) {
        const loc = p.u[k]
        if (!loc) continue
        const v = u[k]
        if (typeof v === "number") gl.uniform1f(loc, v)
        else if (Array.isArray(v)) {
          if (v.length === 2) gl.uniform2f(loc, v[0], v[1])
          else gl.uniform3f(loc, v[0], v[1], v[2])
        } else {
          gl.activeTexture(gl.TEXTURE0 + unit)
          gl.bindTexture(gl.TEXTURE_2D, v.tex)
          gl.uniform1i(loc, unit++)
        }
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, dst ? dst.fbo : null)
      gl.viewport(0, 0, dst ? dst.w : canvas.width, dst ? dst.h : canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    const zero = (t: Target) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo)
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
    const texel = (t: Target) => [1 / t.w, 1 / t.h]
    const splat = (d: Double, x: number, y: number, value: number[], radius: number, raise: boolean, edge = 0, seed = 0) => {
      run(P.splat, d.write, { target: d.read, point: [x, y], value, radius, aspect: E.aspect, raise: raise ? 1 : 0, edge, seed, texel: texel(d.write) })
      d.swap()
    }
    const settle = () => {
      for (const t of [vel.read, vel.write, pres.read, pres.write]) zero(t)
      run(P.identity, map.read, {})
      run(P.identity, map.write, {})
    }

    const size = (short: number) =>
      E.aspect >= 1 ? [Math.round(short * E.aspect), short] : [short, Math.round(short / E.aspect)]
    const allocate = () => {
      release()
      const [sw, sh] = size(lite ? LITE.sim : SIM)
      const [dw, dh] = size(lite ? LITE.dye : DYE)
      vel = double(sw, sh)
      pres = double(sw, sh)
      div = target(sw, sh)
      curl = target(sw, sh)
      map = double(dw, dh, true)
      mask = double(dw, dh)
      settle()
      for (const t of [mask.read, mask.write]) zero(t)
    }

    const step = (dt: number, inking: boolean) => {
      const st = texel(vel.read)
      run(P.curl, curl, { velocity: vel.read, texel: st })
      run(P.vorticity, vel.write, { velocity: vel.read, curl, strength: CURL, dt, texel: st })
      vel.swap()
      run(P.divergence, div, { velocity: vel.read, texel: st })
      run(P.scale, pres.write, { source: pres.read, value: 0.8, texel: st })
      pres.swap()
      for (let i = 0, num = lite ? LITE.iterations : PRESSURE_ITERATIONS; i < num; i++) {
        run(P.pressure, pres.write, { pressure: pres.read, divergence: div, texel: st })
        pres.swap()
      }
      run(P.gradient, vel.write, { pressure: pres.read, velocity: vel.read, texel: st })
      vel.swap()
      run(P.advect, vel.write, { velocity: vel.read, source: vel.read, simTexel: st, dt, dissipation: DISSIPATION, texel: st })
      vel.swap()
      run(P.relax, map.write, { velocity: vel.read, source: map.read, simTexel: st, dt, relax: RELAX, viscosity: VISCOSITY, texel: texel(map.read) })
      map.swap()
      if (inking) {
        run(P.advect, mask.write, { velocity: vel.read, source: mask.read, simTexel: st, dt, dissipation: 0, texel: texel(mask.read) })
        mask.swap()
      }
    }

    const pour = (pr: Pour, p: number, dt: number) => {
      if (pr.drop) {
        if (!pr.kicked) {
          pr.kicked = true
          for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2
            const cx = Math.cos(a)
            const cy = Math.sin(a)
            splat(vel, pr.x + (cx * 0.035) / E.aspect, pr.y + cy * 0.035, [cx * DROP, cy * DROP, 0], 0.0012, false)
          }
        }
      } else {
        const j = jetStrength(p) * JET * dt
        if (j > 0) splat(vel, pr.x, pr.y, [pr.dx * j, pr.dy * j, 0], 0.0022, false)
      }
      if (p < POUR) splat(mask, pr.x, pr.y, [1, 1, 1], 0.0032, true)
      const ox = pr.x * E.aspect
      const far = Math.max(Math.hypot(ox, pr.y), Math.hypot(E.aspect - ox, pr.y), Math.hypot(ox, 1 - pr.y), Math.hypot(E.aspect - ox, 1 - pr.y))
      const ring = bloomReach(p) * far * 1.1
      if (ring > 0.01) splat(mask, pr.x, pr.y, [1, 1, 1], ring, true, 0.03, pr.seed + p * 2)
      for (let i = 0; i < 3; i++) {
        const a = Math.random() * Math.PI * 2
        const fx = pr.x + (Math.cos(a) * ring) / E.aspect
        const fy = pr.y + Math.sin(a) * ring
        if (fx < 0 || fx > 1 || fy < 0 || fy > 1) continue
        const spin = (Math.random() < 0.5 ? -1 : 1) * FRONT_STIR * dt
        splat(vel, fx, fy, [-Math.sin(a) * spin, Math.cos(a) * spin, 0], 0.0035, false)
      }
    }

    const pick = (i: number) => images[i] ?? images.find((t) => t) ?? null
    const display = () => {
      const pr = E.pour
      const fromIdx = pr ? pr.from : E.cur
      const toIdx = pr ? pr.to : E.cur
      const from = pick(fromIdx)
      const to = pick(toIdx)
      if (!from || !to) return
      run(P.display, null, {
        map: map.read,
        mask: mask.read,
        from,
        to,
        fromAspect: aspects[fromIdx] ?? 1,
        toAspect: aspects[toIdx] ?? 1,
        res: [canvas.width, canvas.height],
        dyeTexel: texel(map.read),
        wet: live.current.reduced ? 0 : 1,
        texel: texel(map.read),
      })
    }

    const frame = (now: number) => {
      raf = 0
      if (disposed || !started) return
      const raw = (now - last) / 1000
      last = now
      const elapsed = Math.min(raw, 0.25)
      const dt = Math.min(elapsed, 1 / 30)
      const still = live.current.reduced
      if (!lite && judged < 40) {
        judged += 1
        if (judged > 6 && raw > SLOW_FRAME_S) slow += 1
        if (slow >= SLOW_FRAMES) {
          lite = true
          resize(true)
        }
      }
      if (E.clearInk) {
        zero(mask.read)
        zero(mask.write)
        E.clearInk = false
      }
      for (const s of E.stirs.splice(0)) {
        if (still) continue
        splat(vel, s.x, s.y, [s.dx * s.force, s.dy * s.force, 0], STIR_RADIUS, false)
        E.energy = now
      }
      const pr = E.pour
      let landed = false
      if (pr) {
        pr.t += elapsed
        const p = Math.min(pr.t / pr.duration, 1)
        if (!still) pour(pr, p, dt)
        const level = still ? p : fillLevel(p)
        if (level > 0) {
          run(P.floor, mask.write, { source: mask.read, level, texel: texel(mask.read) })
          mask.swap()
        }
        landed = p >= 1
        E.energy = now
      }
      if (!still) step(dt, !!pr)
      display()
      if (pr && landed) {
        E.cur = pr.to
        E.pour = null
        zero(mask.read)
        zero(mask.write)
      }
      if (E.pour || (!still && now - E.energy < SETTLE_S * 1000)) {
        raf = requestAnimationFrame(frame)
      } else {
        settle()
        display()
      }
    }
    E.kick = () => {
      if (raf || disposed || !started) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const resize = (rebuild = false) => {
      const dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (w === 0 || h === 0) return
      const aspect = w / h
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      if (rebuild || !vel || Math.abs(aspect - E.aspect) / E.aspect > 0.02) {
        E.aspect = aspect
        allocate()
      }
      display()
    }

    try {
      for (const k of Object.keys(FRAGS) as (keyof typeof FRAGS)[]) P[k] = program(FRAGS[k])
      const vao = gl.createVertexArray()
      gl.bindVertexArray(vao)
      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
      gl.enableVertexAttribArray(0)
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
      E.aspect = Math.max(canvas.clientWidth, 1) / Math.max(canvas.clientHeight, 1)
      allocate()
    } catch {
      if (!disposed) setFailed(true)
      return
    }
    const observer = new ResizeObserver(() => started && resize())
    observer.observe(canvas)

    let refused = 0
    items.forEach((item, i) => {
      loadImage(item.src).then(
        (img) => {
          if (disposed) return
          const tex = gl.createTexture()
          if (!tex) return
          gl.bindTexture(gl.TEXTURE_2D, tex)
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
          gl.generateMipmap(gl.TEXTURE_2D)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
          owned.textures.push(tex)
          images[i] = { tex }
          aspects[i] = img.naturalWidth / Math.max(img.naturalHeight, 1)
          if (!started) {
            started = true
            setReady(true)
            resize()
          } else {
            display()
          }
        },
        () => {
          refused += 1
          if (refused === items.length && !disposed) setFailed(true)
        },
      )
    })

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      E.kick = () => {}
      observer.disconnect()
      canvas.removeEventListener("webglcontextlost", onLost)
      canvas.removeEventListener("webglcontextrestored", onRestored)
      release()
      for (const p of Object.values(P)) gl.deleteProgram(p.prog)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources, generation, n])

  const lastPoint = React.useRef<{ x: number; y: number } | null>(null)
  const press = React.useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null)

  const toStage = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    return { x: (e.clientX - r.left) / r.width, y: 1 - (e.clientY - r.top) / r.height }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = toStage(e)
    const prev = lastPoint.current
    lastPoint.current = p
    const pr = press.current
    if (pr && e.pointerId === pr.id && Math.hypot(e.clientX - pr.x, e.clientY - pr.y) > 6) pr.moved = true
    if (!prev || reduced || stir <= 0 || !ready) return
    const force = STIR * stir * (pr ? DRAG_STIR : 1)
    E.stirs.push({ x: p.x, y: p.y, dx: p.x - prev.x, dy: p.y - prev.y, force })
    E.kick()
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    setStopped(true)
    lastPoint.current = toStage(e)
    press.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const pr = press.current
    press.current = null
    if (!pr || e.pointerId !== pr.id || pr.moved || n < 2) return
    if (!loop && E.cur >= n - 1) return
    E.origin = toStage(e)
    go(active + 1)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") setStopped(true)
    if (e.key === "ArrowRight") {
      e.preventDefault()
      go(active + 1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      go(active - 1)
    }
  }

  const playing = autoplay > 0 && !reduced && n > 1 && ready && !stopped && (loop || active < n - 1)
  const paused = overRail || focused || hidden || !inView

  const current = items[active]
  const atStart = !loop && active === 0
  const atEnd = !loop && active === n - 1
  const announce = current ? (current.title ?? current.alt ?? "Slide") + ", " + (active + 1) + " of " + n : ""

  return (
    <section
      ref={rootRef}
      className={"ifc-root " + className}
      style={{ height }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      data-paused={paused}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
      }}
    >
      <style>{CSS}</style>
      <div
        className="ifc-stage"
        tabIndex={0}
        aria-label="Slides. Click to pour in the next one, or use the arrow keys."
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          press.current = null
        }}
        onPointerLeave={() => {
          lastPoint.current = null
        }}
      >
        {failed ? (
          items.map((item, i) => (
            <img
              key={item.src}
              className="ifc-fallback"
              src={item.src}
              alt={i === active ? item.alt ?? "" : ""}
              aria-hidden={i !== active}
              draggable={false}
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))
        ) : (
          <canvas ref={canvasRef} className="ifc-canvas" style={{ opacity: ready ? 1 : 0 }} aria-hidden="true" />
        )}
      </div>

      {rail && n > 0 ? (
        <div className="ifc-rail" onPointerEnter={() => setOverRail(true)} onPointerLeave={() => setOverRail(false)}>
          <div className="ifc-caption" key={active}>
            <span className="ifc-count">
              <b>{pad(active + 1)}</b> / {pad(n)}
            </span>
            {current?.title ? <span className="ifc-title">{current.title}</span> : null}
            {current?.caption ? <span className="ifc-sub">{current.caption}</span> : null}
          </div>
          <div className="ifc-controls">
            <button
              type="button"
              className="ifc-btn"
              onClick={() => {
                setStopped(true)
                go(active - 1)
              }}
              disabled={atStart || n < 2}
              aria-label="Previous slide"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="ifc-btn"
              onClick={() => {
                setStopped(true)
                go(active + 1)
              }}
              disabled={atEnd || n < 2}
              aria-label="Next slide"
            >
              {playing ? (
                <svg className="ifc-ring" key={"ring-" + active} viewBox="0 0 40 40" aria-hidden="true">
                  <circle cx="20" cy="20" r="19.25" style={{ animationDuration: autoplay + "ms" }} />
                </svg>
              ) : null}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}

      {playing ? (
        <span
          className="ifc-clock"
          key={"clock-" + active}
          style={{ animationDuration: autoplay + "ms" }}
          onAnimationEnd={() => go(active + 1)}
          aria-hidden="true"
        />
      ) : null}

      <p className="ifc-sr" aria-live="polite">
        {announce}
      </p>
    </section>
  )
}

export default InkFlowCarousel
