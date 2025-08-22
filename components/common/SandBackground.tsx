// components/common/SandBackground.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string; // "absolute inset-0 -z-10 pointer-events-none"
  variant?: "light" | "dark"; // tema default warna butiran
  color?: string; // override warna, ex: "rgba(255,255,255,0.9)"
  density?: number; // butir per 100k px² (default 60 → halus)
  sizeRange?: [number, number]; // ukuran butir px (default [0.8, 1.8])
  speedY?: [number, number]; // kecepatan jatuh px/s (default [12, 36])
  windX?: [number, number]; // kecepatan angin dasar px/s (default [-6, 6])
  jitter?: number; // amplitudo goyangan kecil (px/s, default 10)
  cursorPush?: number; // dorongan horizontal dari kursor (+ ke kanan, - ke kiri)
  cursorRadius?: number; // radius pengaruh kursor px
  layers?: number; // jumlah lapisan parallax (default 2)
  opacity?: number; // global opacity 0..1 (default 0.9)
  maskFade?: boolean; // fade di tepi (default true)
};

type Grain = {
  x: number;
  y: number;
  vy: number;
  vxBase: number;
  size: number;
  phase: number; // untuk jitter sinus
  freq: number; // frekuensi jitter
  layer: number; // 0..layers-1
};

export default function SandBackground({
  className = "absolute inset-0 -z-10 pointer-events-none",
  variant = "dark",
  color,
  density = 60,
  sizeRange = [0.8, 1.8],
  speedY = [12, 36],
  windX = [-6, 6],
  jitter = 10,
  cursorPush = 60,
  cursorRadius = 140,
  layers = 2,
  opacity = 0.9,
  maskFade = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let W = 0,
      H = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 2);
    let grains: Grain[] = [];
    let raf = 0;
    let last = 0;
    let running = true;

    const col =
      color ??
      (variant === "dark" ? "rgba(255,255,255,0.9)" : "rgba(17,24,39,0.9)");

    const mouse = { x: NaN, y: NaN, active: false };
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const rand = (a: number, b: number) => Math.random() * (b - a) + a;
    const clamp = (v: number, a: number, b: number) =>
      Math.max(a, Math.min(b, v));

    function resize() {
      const r = wrap.getBoundingClientRect();

      W = Math.max(1, Math.floor(r.width));
      H = Math.max(1, Math.floor(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // hitung jumlah butiran berdasarkan luas & layer
      const units = (W * H) / 100000;
      const total = clamp(Math.round(units * density), 40, 1200);
      const perLayer = Math.max(8, Math.round(total / Math.max(1, layers)));

      const arr: Grain[] = [];

      for (let l = 0; l < layers; l++) {
        const layerScale = 1 + l * 0.35; // lapisan belakang → jatuh sedikit lebih cepat & sedikit lebih besar

        for (let i = 0; i < perLayer; i++) {
          arr.push({
            x: rand(0, W),
            y: rand(0, H),
            vy: (rand(speedY[0], speedY[1]) * layerScale) / 60, // per frame ~60fps
            vxBase: (rand(windX[0], windX[1]) * layerScale) / 60,
            size: rand(sizeRange[0], sizeRange[1]) * layerScale,
            phase: rand(0, Math.PI * 2),
            freq: rand(0.4, 1.2), // jitternya beda-beda
            layer: l,
          });
        }
      }
      grains = arr;
    }

    function step(ts: number) {
      if (!running) return;
      raf = requestAnimationFrame(step);
      const dt = last ? clamp((ts - last) / 16.67, 0.5, 1.5) : 1;

      last = ts;

      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = col;

      const hasCursor =
        mouse.active && !Number.isNaN(mouse.x) && !Number.isNaN(mouse.y);
      const pushR = cursorRadius;

      for (let i = 0; i < grains.length; i++) {
        const g = grains[i];

        // jitter sinus halus → efek “pasir hidup”
        const jx = Math.sin(ts * 0.001 * g.freq + g.phase) * (jitter / 60);

        let vx = g.vxBase + jx;
        let vy = g.vy;

        // hembusan “angin” dari kursor (lembut)
        if (hasCursor) {
          const dx = g.x - mouse.x;
          const dy = g.y - mouse.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < pushR * pushR) {
            const d = Math.sqrt(d2) || 1;
            const s = ((pushR - d) / pushR) * (cursorPush / 60);

            vx += (dx / d) * s; // dorong kiri/kanan relatif ke kursor
          }
        }

        g.x += vx * dt;
        g.y += vy * dt;

        // wrap vertikal (jatuh ke bawah, muncul lagi dari atas)
        if (g.y > H + 4) {
          g.y = -4;
          g.x = rand(0, W);
        }
        // wrap horizontal supaya mulus saat kena angin
        if (g.x < -4) g.x = W + 4;
        else if (g.x > W + 4) g.x = -4;

        // gambar butir (pakai rect kecil untuk performa)
        // untuk ukuran > 1.2 terlihat bulat; sisanya kecil seperti “grain”
        const s = g.size;

        ctx.beginPath();
        if (s <= 1.2) {
          ctx.fillRect(g.x, g.y, 1, 1);
        } else {
          ctx.arc(g.x, g.y, s * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // cursor pakai window supaya tetap terbaca meski pointer-events:none
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();

      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onPointerLeave = () => {
      mouse.active = false;
      mouse.x = NaN;
      mouse.y = NaN;
    };

    const ro = new ResizeObserver(resize);

    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        const shouldRun = entry.isIntersecting && !reduced;

        if (shouldRun) {
          running = true;
          last = 0;
          raf = requestAnimationFrame(step);
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.01 },
    );

    io.observe(wrap);

    // init
    resize();
    if (!reduced) raf = requestAnimationFrame(step);

    // listeners
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    // optional: mask fade di tepi agar “larut”
    if (maskFade) {
      canvas.style.maskImage =
        "radial-gradient(120% 120% at 50% 50%, black, transparent 85%)";
      canvas.style.WebkitMaskImage = canvas.style.maskImage;
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [
    variant,
    color,
    density,
    sizeRange?.[0],
    sizeRange?.[1],
    speedY?.[0],
    speedY?.[1],
    windX?.[0],
    windX?.[1],
    jitter,
    cursorPush,
    cursorRadius,
    layers,
    opacity,
    maskFade,
  ]);

  return (
    <div ref={wrapRef} aria-hidden className={className}>
      <canvas ref={canvasRef} />
    </div>
  );
}
