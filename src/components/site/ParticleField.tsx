import { useEffect, useRef } from "react";
import { cloudShape, handshakeShape, type Pt } from "./ParticleShapes";

const COUNT = 2400;

export function ParticleField({ shape }: { shape: "handshake" | "cloud" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef(shape);
  targetRef.current = shape;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const shapes: Record<string, Pt[]> = {
      handshake: handshakeShape(COUNT),
      cloud: cloudShape(COUNT),
    };

    // current animated positions start from the initial shape
    const cur: Pt[] = shapes[targetRef.current].map((p) => [p[0], p[1], p[2]]);
    const jitter = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) jitter[i] = Math.random() * Math.PI * 2;

    let raf = 0;
    let yaw = 0;
    let last = performance.now();
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    };
    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduce) yaw += dt * 0.32;

      const target = shapes[targetRef.current];
      const w = canvas.width;
      const h = canvas.height;
      const scale = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const tilt = 0.28;
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;

      for (let i = 0; i < COUNT; i++) {
        const tp = target[i];
        const p = cur[i];
        const ease = 1 - Math.pow(0.0025, dt);
        p[0] += (tp[0] - p[0]) * ease;
        p[1] += (tp[1] - p[1]) * ease;
        p[2] += (tp[2] - p[2]) * ease;

        const jx = Math.sin(t * 0.9 + jitter[i * 3]) * 0.012;
        const jy = Math.sin(t * 1.1 + jitter[i * 3 + 1]) * 0.012;
        const jz = Math.sin(t * 0.8 + jitter[i * 3 + 2]) * 0.012;

        const x0 = p[0] + jx;
        const y0 = p[1] + jy;
        const z0 = p[2] + jz;

        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        const y1 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        const persp = 2.6 / (2.6 + z2);
        const sx = cx + x1 * scale * persp;
        const sy = cy - y1 * scale * persp;

        const depth = (z2 + 1) / 2; // 0 far .. 1 near
        const r = (0.9 + depth * 1.5) * dpr * persp;
        const alpha = 0.16 + depth * 0.7;
        ctx.fillStyle =
          depth > 0.62
            ? `rgba(163, 240, 92, ${alpha})`
            : `rgba(126, 214, 196, ${alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}