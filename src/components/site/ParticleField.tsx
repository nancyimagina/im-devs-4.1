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

    const flatten = (pts: Pt[]) => {
      const arr = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {
        const p = pts[i] ?? ([0, 0, 0] as Pt);
        arr[i * 3] = p[0];
        arr[i * 3 + 1] = p[1];
        arr[i * 3 + 2] = p[2];
      }
      return arr;
    };

    const shapes: Record<string, Float32Array> = {
      handshake: flatten(handshakeShape(COUNT)),
      cloud: flatten(cloudShape(COUNT)),
    };

    // current animated positions start from the initial shape
    const cur = new Float32Array(shapes[targetRef.current] ?? shapes["cloud"]!);
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
      // gentle oscillation instead of a full spin keeps each silhouette readable
      if (!reduce) yaw += dt;
      const swing = Math.sin(yaw * 0.35) * 0.75;

      const target = shapes[targetRef.current] ?? shapes["cloud"]!;
      const w = canvas.width;
      const h = canvas.height;
      const scale = Math.min(w, h) * 0.52;
      const cx = w / 2;
      const cy = h / 2;
      const cosY = Math.cos(swing);
      const sinY = Math.sin(swing);
      const tilt = 0.22 + Math.sin(yaw * 0.22) * 0.08;
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;

      const ease = 1 - Math.pow(0.0025, dt);
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        cur[i3] = cur[i3]! + (target[i3]! - cur[i3]!) * ease;
        cur[i3 + 1] = cur[i3 + 1]! + (target[i3 + 1]! - cur[i3 + 1]!) * ease;
        cur[i3 + 2] = cur[i3 + 2]! + (target[i3 + 2]! - cur[i3 + 2]!) * ease;

        const x0 = cur[i3]! + Math.sin(t * 0.9 + jitter[i3]!) * 0.012;
        const y0 = cur[i3 + 1]! + Math.sin(t * 1.1 + jitter[i3 + 1]!) * 0.012;
        const z0 = cur[i3 + 2]! + Math.sin(t * 0.8 + jitter[i3 + 2]!) * 0.012;

        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        const y1 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        const persp = 2.6 / (2.6 + z2);
        const sx = cx + x1 * scale * persp;
        const sy = cy - y1 * scale * persp;

        const depth = (z2 + 1) / 2; // 0 far .. 1 near
        const r = (1 + depth * 1.7) * dpr * persp;
        const alpha = 0.22 + depth * 0.78;
        ctx.fillStyle =
          depth > 0.58
            ? `rgba(163, 240, 92, ${alpha})`
            : `rgba(126, 214, 196, ${alpha * 0.8})`;
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