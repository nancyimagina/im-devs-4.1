export type Pt = [number, number, number];

function rnd(seedRef: { s: number }) {
  seedRef.s = (seedRef.s * 1664525 + 1013904223) % 4294967296;
  return seedRef.s / 4294967296;
}

function normalize(points: Pt[]): Pt[] {
  let max = 0;
  for (const p of points) {
    const d = Math.hypot(p[0], p[1], p[2]);
    if (d > max) max = d;
  }
  return points.map(([x, y, z]) => [x / max, y / max, z / max] as Pt);
}

/** Points on the surface of a box, with optional rotation and offset. */
function boxPoints(
  n: number,
  size: [number, number, number],
  center: [number, number, number],
  rotZ: number,
  seed: { s: number },
): Pt[] {
  const out: Pt[] = [];
  const [sx, sy, sz] = size;
  for (let i = 0; i < n; i++) {
    let x = (rnd(seed) - 0.5) * sx;
    let y = (rnd(seed) - 0.5) * sy;
    let z = (rnd(seed) - 0.5) * sz;
    // push to a surface for a hollow, shell-like look
    const face = Math.floor(rnd(seed) * 3);
    const sign = rnd(seed) < 0.5 ? -0.5 : 0.5;
    if (face === 0) x = sx * sign;
    else if (face === 1) y = sy * sign;
    else z = sz * sign;
    const c = Math.cos(rotZ);
    const s = Math.sin(rotZ);
    const rx = x * c - y * s;
    const ry = x * s + y * c;
    out.push([rx + center[0], ry + center[1], z + center[2]]);
  }
  return out;
}

function spherePoints(
  n: number,
  r: number,
  center: [number, number, number],
  seed: { s: number },
  squashY = 1,
): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const u = rnd(seed) * 2 - 1;
    const t = rnd(seed) * Math.PI * 2;
    const k = Math.sqrt(1 - u * u);
    out.push([
      center[0] + r * k * Math.cos(t),
      center[1] + r * u * squashY,
      center[2] + r * k * Math.sin(t),
    ]);
  }
  return out;
}

function torusPoints(
  n: number,
  R: number,
  r: number,
  center: [number, number, number],
  arc: [number, number],
  seed: { s: number },
): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const u = arc[0] + rnd(seed) * (arc[1] - arc[0]);
    const v = rnd(seed) * Math.PI * 2;
    out.push([
      center[0] + (R + r * Math.cos(v)) * Math.cos(u),
      center[1] + (R + r * Math.cos(v)) * Math.sin(u),
      center[2] + r * Math.sin(v),
    ]);
  }
  return out;
}

/** A stylized 3D handshake: two forearms meeting in a clasp with wrapping fingers. */
export function handshakeShape(count: number): Pt[] {
  const seed = { s: 20260819 };
  const out: Pt[] = [];
  const per = Math.floor(count / 10);
  // left forearm (coming from lower-left) and right forearm (upper-right)
  out.push(...boxPoints(per * 2, [1.5, 0.42, 0.42], [-0.95, -0.34, 0], 0.28, seed));
  out.push(...boxPoints(per * 2, [1.5, 0.42, 0.42], [0.95, 0.34, 0], 0.28, seed));
  // clasped palms in the middle
  out.push(...boxPoints(per * 2, [0.86, 0.72, 0.5], [0, 0, 0], 0.28, seed));
  // wrapping fingers / thumbs
  out.push(...torusPoints(per, 0.34, 0.09, [-0.12, 0.16, 0.02], [-1.5, 1.9], seed));
  out.push(...torusPoints(per, 0.34, 0.09, [0.12, -0.16, -0.02], [1.6, 5.0], seed));
  out.push(...torusPoints(per, 0.24, 0.07, [-0.2, -0.1, 0.16], [-1.2, 2.4], seed));
  out.push(...torusPoints(per, 0.24, 0.07, [0.2, 0.1, -0.16], [1.9, 5.5], seed));
  while (out.length < count) out.push(out[Math.floor(rnd(seed) * out.length)]!);
  return normalize(out.slice(0, count));
}

/** A stylized 3D cloud built from overlapping spheres with a flattened base. */
export function cloudShape(count: number): Pt[] {
  const seed = { s: 77123 };
  const lobes: Array<[number, number, number, number]> = [
    [-0.78, -0.06, 0.05, 0.44],
    [-0.28, 0.2, -0.08, 0.56],
    [0.26, 0.12, 0.1, 0.5],
    [0.76, -0.08, -0.04, 0.42],
    [0.0, -0.18, 0.22, 0.44],
    [0.0, -0.16, -0.24, 0.4],
  ];
  const out: Pt[] = [];
  const per = Math.ceil(count / lobes.length);
  for (const [cx, cy, cz, r] of lobes) {
    for (const p of spherePoints(per, r, [cx, cy, cz], seed, 0.86)) {
      // flatten the underside so the cloud reads as a cloud, not a blob
      if (p[1] < -0.3) p[1] = -0.3 + (p[1] + 0.3) * 0.25;
      // drop points buried inside neighbouring lobes for a clean silhouette
      let inside = false;
      for (const [ox, oy, oz, orr] of lobes) {
        if (ox === cx && oy === cy && oz === cz) continue;
        if (Math.hypot(p[0] - ox, p[1] - oy, p[2] - oz) < orr * 0.94) {
          inside = true;
          break;
        }
      }
      if (!inside) out.push(p);
    }
  }
  while (out.length < count) out.push(out[Math.floor(rnd(seed) * out.length)]!);
  return normalize(out.slice(0, count));
}