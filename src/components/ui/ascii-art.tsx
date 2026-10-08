"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface AsciiArtParams {
  renderMode:
    | "characters"
    | "dither"
    | "mosaic"
    | "pixel"
    | "dots"
    | "cross"
    | "diamond"
    | "voxel"
    | "lego"
    | "mixed"
    | "lines"
    | "diagonal"
    | "braille"
    | "disco"
    | "hexdump"
    | "matrix"
    | "rings"
    | "hearts"
    | "stars"
    | "hexagons"
    | "triangles"
    | "bubbles"
    | "hatch"
    | "contour"
    | "halfblocks";
  bgMode: "original" | "blurred" | "solid" | "none";
  bgBlur: number;
  bgOpacity: number;
  cellSize: number;
  coverage: number;
  invert: boolean;
  styleBlend: GlobalCompositeOperation | string;
  charSet: "standard" | "blocks" | "binary" | "minimal" | "braille" | "hexdump" | "matrix" | string;
  customChars: string;
  brightness: number;
  contrast: number;
  edgeEmphasis: number;
  density: number;
  toneCurve?: Array<{ x: number; y: number }>;
  tint: string;
  tintOpacity: number;
  overlayBlend: GlobalCompositeOperation | string;
  saturation: number;
  grayscale: number;
  blurType: "off" | "gaussian" | "directional" | "tiltShift" | "lens";
  blurAmount: number;
  blurAngle?: number;
  directionalBothSides?: boolean;
  tiltFocus?: number;
  tiltPosition?: number;
  tiltFeather?: number;
  lensFocus?: number;
  blurCenterX?: number;
  blurCenterY?: number;
  progressivePosition?: number;
  progressiveReverse?: boolean;
  pfx: {
    vignette?: { enabled: boolean; intensity: number };
    scanLines?: { enabled: boolean; intensity: number };
    chromatic?: { enabled: boolean; intensity: number };
    bloom?: { enabled: boolean; intensity: number };
    filmGrain?: { enabled: boolean; intensity: number };
    glitch?: { enabled: boolean; intensity: number };
    pixelate?: { enabled: boolean; intensity: number };
    halftone?: { enabled: boolean; intensity: number };
    filmDust?: { enabled: boolean; intensity: number };
  };
  animated: boolean;
  animStyle: "shimmer" | "wave" | "pulse" | "ripple" | "flicker";
  animSpeed: { enabled: boolean; intensity: number };
  animIntensity: { enabled: boolean; intensity: number };
  lights?: {
    enabled: boolean;
    points: Array<{ x: number; y: number; radius: number; intensity: number; color?: string }>;
  };
  mask?: {
    enabled: boolean;
    tool?: string;
    brushSize?: number;
    showOverlay?: boolean;
    invert?: boolean;
    dataUrl?: string | null;
    shapes?: any[];
  };
}

export const DEFAULT_ASCII_PARAMS: AsciiArtParams = {
  renderMode: "characters",
  bgMode: "original",
  bgBlur: 12,
  bgOpacity: 30,
  cellSize: 9,
  coverage: 37,
  invert: false,
  styleBlend: "color-dodge",
  charSet: "standard",
  customChars: "",
  brightness: 0,
  contrast: 158,
  edgeEmphasis: 0,
  density: 20,
  toneCurve: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ],
  tint: "#3ca6ff",
  tintOpacity: 0,
  overlayBlend: "multiply",
  saturation: 100,
  grayscale: 0,
  blurType: "off",
  blurAmount: 35,
  blurAngle: 0,
  directionalBothSides: false,
  tiltFocus: 35,
  tiltPosition: 50,
  tiltFeather: 15,
  lensFocus: 40,
  blurCenterX: 50,
  blurCenterY: 50,
  progressivePosition: 55,
  progressiveReverse: false,
  pfx: {
    vignette: { enabled: false, intensity: 38 },
    scanLines: { enabled: false, intensity: 40 },
    chromatic: { enabled: false, intensity: 15 },
    bloom: { enabled: false, intensity: 25 },
    filmGrain: { enabled: false, intensity: 30 },
    glitch: { enabled: false, intensity: 20 },
    pixelate: { enabled: false, intensity: 15 },
    halftone: { enabled: false, intensity: 20 },
    filmDust: { enabled: false, intensity: 20 },
  },
  animated: true,
  animStyle: "shimmer",
  animSpeed: { enabled: true, intensity: 100 },
  animIntensity: { enabled: true, intensity: 60 },
  lights: { enabled: false, points: [] },
  mask: {
    enabled: false,
    tool: "freehand",
    brushSize: 30,
    showOverlay: false,
    invert: false,
    dataUrl: null,
    shapes: [],
  },
};

const CHAR_SETS: Record<string, string> = {
  standard: " .:-=+*#%@",
  dense: " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@",
  blocks: " ░▒▓█",
  binary: " 01",
  minimal: " .:*#",
  braille: " ⠁⠃⠇⡇⣇⣧⣷⣿",
  hexdump: "0123456789ABCDEF",
  matrix: "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789",
};

// Procedural wave generator if offline or while image loads
function createProceduralNatureWave(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Sky to ocean base
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, "#030712");
  grad.addColorStop(0.35, "#082f49");
  grad.addColorStop(0.7, "#0369a1");
  grad.addColorStop(1, "#0284c7");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Large curling ocean wave
  ctx.save();
  ctx.fillStyle = "#38bdf8";
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, height * 0.45);
  ctx.bezierCurveTo(
    width * 0.25,
    height * 0.15,
    width * 0.55,
    height * 0.12,
    width * 0.75,
    height * 0.45
  );
  ctx.bezierCurveTo(
    width * 0.88,
    height * 0.65,
    width * 0.95,
    height * 0.8,
    width,
    height * 0.85
  );
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();

  // Wave crest white foam
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 18;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(width * 0.3, height * 0.22);
  ctx.bezierCurveTo(
    width * 0.52,
    height * 0.12,
    width * 0.72,
    height * 0.32,
    width * 0.85,
    height * 0.52
  );
  ctx.stroke();

  // Spray particles
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 300; i++) {
    const rx = width * (0.2 + Math.random() * 0.65);
    const ry = height * (0.1 + Math.random() * 0.55);
    ctx.beginPath();
    ctx.arc(rx, ry, 1 + Math.random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  return canvas;
}

interface SampledCell {
  c: number;
  r: number;
  cx: number;
  cy: number;
  rVal: number;
  gVal: number;
  bVal: number;
  baseLuma: number;
  pseudoRand: number;
}

export interface AsciiArtProps {
  src?: string;
  params?: Partial<AsciiArtParams>;
  className?: string;
  style?: React.CSSProperties;
}

export const AsciiArt: React.FC<AsciiArtProps> = ({
  src = "/ascii-editor/demos/gen-nature-wave.webp",
  params: customParams,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageSourceRef = useRef<HTMLImageElement | HTMLCanvasElement | null>(null);

  // Merge full configuration
  const p: AsciiArtParams = useMemo(() => ({
    ...DEFAULT_ASCII_PARAMS,
    ...customParams,
    pfx: { ...DEFAULT_ASCII_PARAMS.pfx, ...customParams?.pfx },
    animSpeed: { ...DEFAULT_ASCII_PARAMS.animSpeed, ...customParams?.animSpeed },
    animIntensity: { ...DEFAULT_ASCII_PARAMS.animIntensity, ...customParams?.animIntensity },
    lights: customParams?.lights
      ? {
          enabled: customParams.lights.enabled ?? (DEFAULT_ASCII_PARAMS.lights?.enabled ?? false),
          points: customParams.lights.points ?? (DEFAULT_ASCII_PARAMS.lights?.points ?? []),
        }
      : DEFAULT_ASCII_PARAMS.lights,
    mask: customParams?.mask
      ? {
          ...DEFAULT_ASCII_PARAMS.mask,
          ...customParams.mask,
        }
      : DEFAULT_ASCII_PARAMS.mask,
  }), [customParams]);

  // Load image asset with automatic fallback
  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (!active) return;
      imageSourceRef.current = img;
      setImageLoaded(true);
    };

    img.onerror = () => {
      if (!active) return;
      imageSourceRef.current = createProceduralNatureWave(1280, 800);
      setImageLoaded(true);
    };

    return () => {
      active = false;
    };
  }, [src]);

  // Main rendering engine
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Offscreen sampling canvas
    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
    if (!sampleCtx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let sampledCells: SampledCell[] = [];

    const chars =
      p.customChars.trim() !== ""
        ? p.customChars
        : CHAR_SETS[p.charSet] || CHAR_SETS.standard;

    const contrastFactor =
      (259 * (p.contrast + 255)) / (255 * Math.max(1, 259 - p.contrast));
    const coverageThreshold = 1 - p.coverage / 100;
    const cellSize = Math.max(4, p.cellSize);

    // Recompute cell grid sampling upon size change or image load
    const updateSampleGrid = () => {
      if (!container || !canvas) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 500;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      sampleCanvas.width = Math.max(1, Math.floor(width));
      sampleCanvas.height = Math.max(1, Math.floor(height));

      // Draw source onto sample buffer
      let srcImg = imageSourceRef.current;
      if (!srcImg) {
        srcImg = createProceduralNatureWave(width, height);
      }

      sampleCtx.clearRect(0, 0, width, height);
      sampleCtx.drawImage(srcImg, 0, 0, width, height);

      let imgData: ImageData;
      try {
        imgData = sampleCtx.getImageData(0, 0, width, height);
      } catch {
        return;
      }

      const pixels = imgData.data;
      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);
      const cells: SampledCell[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * cellSize + cellSize / 2;
          const cy = r * cellSize + cellSize / 2;

          // Pseudo-random coverage hash
          const hash = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
          const pseudoRand = hash - Math.floor(hash);
          if (pseudoRand < coverageThreshold) continue;

          const px = Math.min(width - 1, Math.max(0, Math.floor(cx)));
          const py = Math.min(height - 1, Math.max(0, Math.floor(cy)));
          const idx = (py * width + px) * 4;

          let rVal = pixels[idx];
          let gVal = pixels[idx + 1];
          let bVal = pixels[idx + 2];

          // Brightness
          if (p.brightness !== 0) {
            rVal += p.brightness;
            gVal += p.brightness;
            bVal += p.brightness;
          }

          // Contrast
          if (p.contrast !== 0) {
            rVal = contrastFactor * (rVal - 128) + 128;
            gVal = contrastFactor * (gVal - 128) + 128;
            bVal = contrastFactor * (bVal - 128) + 128;
          }

          // Grayscale & Saturation
          const luma = 0.299 * rVal + 0.587 * gVal + 0.114 * bVal;
          if (p.grayscale > 0) {
            const gw = p.grayscale / 100;
            rVal = rVal * (1 - gw) + luma * gw;
            gVal = gVal * (1 - gw) + luma * gw;
            bVal = bVal * (1 - gw) + luma * gw;
          }
          if (p.saturation !== 100) {
            const sw = p.saturation / 100;
            rVal = luma + (rVal - luma) * sw;
            gVal = luma + (gVal - luma) * sw;
            bVal = luma + (bVal - luma) * sw;
          }

          rVal = Math.min(255, Math.max(0, rVal));
          gVal = Math.min(255, Math.max(0, gVal));
          bVal = Math.min(255, Math.max(0, bVal));

          let baseLuma = (0.299 * rVal + 0.587 * gVal + 0.114 * bVal) / 255;
          if (p.invert) baseLuma = 1 - baseLuma;

          cells.push({
            c,
            r,
            cx,
            cy,
            rVal,
            gVal,
            bVal,
            baseLuma,
            pseudoRand,
          });
        }
      }

      sampledCells = cells;
    };

    updateSampleGrid();
    const ro = new ResizeObserver(() => {
      updateSampleGrid();
    });
    ro.observe(container);

    const startTime = performance.now();
    let isVisible = false;
    let lastRenderTime = 0;
    const FRAME_INTERVAL = 1000 / 30; // 30 FPS ceiling for background effects ensures 60-120 FPS buttery smooth scrolling

    // High performance RAF loop
    const render = (now: number) => {
      if (!ctx || width <= 0 || height <= 0 || !isVisible) return;

      if (now - lastRenderTime < FRAME_INTERVAL) {
        if (p.animated && isVisible) {
          animFrameRef.current = requestAnimationFrame(render);
        }
        return;
      }
      lastRenderTime = now;

      const elapsed = (now - startTime) / 1000;
      const speedMult = p.animSpeed.enabled ? p.animSpeed.intensity / 100 : 0;
      const animIntensity = p.animIntensity.enabled ? p.animIntensity.intensity / 100 : 0;
      const animTime = elapsed * speedMult;

      // 1. Clear Frame & Set Dark Ambient Underlay (crucial for color-dodge blend)
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // 2. Background Layer: bgMode ('original', 'blurred', 'solid', 'none')
      let srcImg = imageSourceRef.current;
      if (p.bgMode !== "none" && srcImg) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.bgOpacity / 100));

        if (p.bgMode === "solid") {
          ctx.fillStyle = p.tint || "#000000";
          ctx.fillRect(0, 0, width, height);
        } else {
          if (p.bgMode === "blurred") {
            ctx.filter = `blur(${p.bgBlur}px)`;
          }
          ctx.drawImage(srcImg, 0, 0, width, height);
        }
        ctx.restore();
      }

      // 3. Render ASCII / Primitive Shapes
      ctx.save();
      try {
        ctx.globalCompositeOperation = (p.styleBlend as GlobalCompositeOperation) || "source-over";
      } catch {
        ctx.globalCompositeOperation = "source-over";
      }

      const fontSize = Math.max(6, cellSize * (p.density / 20));
      ctx.font = `bold ${fontSize}px "SF Mono", "Fira Code", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const totalCells = sampledCells.length;
      for (let i = 0; i < totalCells; i++) {
        const cell = sampledCells[i];
        let normLuma = cell.baseLuma;

        // Animate modulation: shimmer, wave, pulse, ripple, flicker
        if (p.animated && animIntensity > 0) {
          let mod = 0;
          if (p.animStyle === "shimmer") {
            mod = Math.sin(cell.c * 0.4 + cell.r * 0.3 + animTime * 3.5) * 0.28 * animIntensity;
          } else if (p.animStyle === "wave") {
            mod = Math.sin(cell.c * 0.2 + animTime * 2.8) * 0.3 * animIntensity;
          } else if (p.animStyle === "pulse") {
            mod = Math.sin(animTime * 2.5) * 0.25 * animIntensity;
          } else if (p.animStyle === "ripple") {
            const dx = cell.c - width / (2 * cellSize);
            const dy = cell.r - height / (2 * cellSize);
            const dist = Math.sqrt(dx * dx + dy * dy);
            mod = Math.sin(dist * 0.35 - animTime * 4.0) * 0.3 * animIntensity;
          } else if (p.animStyle === "flicker") {
            mod = (Math.random() - 0.5) * 0.4 * animIntensity;
          }
          normLuma = Math.max(0, Math.min(1, normLuma + mod));
        }

        // Tint application
        if (p.tintOpacity > 0 && p.tint) {
          ctx.fillStyle = p.tint;
        } else {
          ctx.fillStyle = `rgb(${Math.round(cell.rVal)}, ${Math.round(cell.gVal)}, ${Math.round(cell.bVal)})`;
        }

        // Shape rendering per renderMode
        const mode = p.renderMode;
        if (mode === "characters") {
          const charIdx = Math.min(
            chars.length - 1,
            Math.max(0, Math.floor(normLuma * (chars.length - 1)))
          );
          ctx.fillText(chars[charIdx], cell.cx, cell.cy);
        } else if (mode === "dots") {
          const rad = Math.max(0.5, (cellSize / 2) * normLuma);
          ctx.beginPath();
          ctx.arc(cell.cx, cell.cy, rad, 0, Math.PI * 2);
          ctx.fill();
        } else if (mode === "pixel" || mode === "mosaic") {
          const sz = cellSize * normLuma;
          ctx.fillRect(cell.cx - sz / 2, cell.cy - sz / 2, sz, sz);
        } else if (mode === "cross") {
          const arm = (cellSize / 2) * normLuma;
          ctx.fillRect(cell.cx - arm, cell.cy - 1, arm * 2, 2);
          ctx.fillRect(cell.cx - 1, cell.cy - arm, 2, arm * 2);
        } else if (mode === "diamond") {
          const sz = (cellSize / 2) * normLuma;
          ctx.beginPath();
          ctx.moveTo(cell.cx, cell.cy - sz);
          ctx.lineTo(cell.cx + sz, cell.cy);
          ctx.lineTo(cell.cx, cell.cy + sz);
          ctx.lineTo(cell.cx - sz, cell.cy);
          ctx.closePath();
          ctx.fill();
        } else if (mode === "matrix") {
          const matrixChar = CHAR_SETS.matrix[Math.floor(Math.random() * CHAR_SETS.matrix.length)];
          ctx.fillStyle = `rgba(34, 197, 94, ${normLuma})`;
          ctx.fillText(matrixChar, cell.cx, cell.cy);
        } else if (mode === "lines") {
          const lineH = Math.max(1, cellSize * normLuma * 0.7);
          ctx.fillRect(cell.cx - cellSize / 2, cell.cy - lineH / 2, cellSize, lineH);
        } else {
          const charIdx = Math.min(
            chars.length - 1,
            Math.max(0, Math.floor(normLuma * (chars.length - 1)))
          );
          ctx.fillText(chars[charIdx], cell.cx, cell.cy);
        }
      }
      ctx.restore();

      // 4. Post-Effects (pfx)
      if (p.pfx.scanLines?.enabled) {
        const scanInt = (p.pfx.scanLines.intensity / 100) * 0.25;
        ctx.fillStyle = `rgba(0, 0, 0, ${scanInt})`;
        for (let y = 0; y < height; y += 4) {
          ctx.fillRect(0, y, width, 1.5);
        }
      }

      if (p.pfx.vignette?.enabled) {
        const vigInt = p.pfx.vignette.intensity / 100;
        const grad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.3,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.7
        );
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, `rgba(0,0,0,${vigInt * 0.8})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      if (p.pfx.chromatic?.enabled) {
        const offset = Math.max(1, (p.pfx.chromatic.intensity / 100) * 6);
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = (p.pfx.chromatic.intensity / 100) * 0.35;
        ctx.drawImage(canvas, offset, 0, width, height, 0, 0, width, height);
        ctx.drawImage(canvas, -offset, 0, width, height, 0, 0, width, height);
        ctx.restore();
      }

      if (p.pfx.filmGrain?.enabled) {
        const grainInt = (p.pfx.filmGrain.intensity / 100) * 0.18;
        ctx.save();
        ctx.fillStyle = "#ffffff";
        for (let i = 0; i < 250; i++) {
          const gx = Math.random() * width;
          const gy = Math.random() * height;
          ctx.globalAlpha = Math.random() * grainInt;
          ctx.fillRect(gx, gy, 1.5, 1.5);
        }
        ctx.restore();
      }

      // 5. Point Lights
      if (p.lights?.enabled && p.lights.points?.length > 0) {
        p.lights.points.forEach((pt) => {
          const lx = pt.x * width;
          const ly = pt.y * height;
          const rad = pt.radius;
          const lGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, rad);
          lGrad.addColorStop(0, pt.color || `rgba(56, 189, 248, ${pt.intensity / 100})`);
          lGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = lGrad;
          ctx.fillRect(lx - rad, ly - rad, rad * 2, rad * 2);
        });
      }

      if (p.animated && isVisible) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && p.animated) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = requestAnimationFrame(render);
        } else if (!isVisible) {
          cancelAnimationFrame(animFrameRef.current);
        }
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, [imageLoaded, p]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full h-full select-none", className)}
      style={style}
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
};

export default AsciiArt;
