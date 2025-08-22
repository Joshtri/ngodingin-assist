// components/common/ParticleBackground.tsx
"use client";

import React, { useEffect, useRef } from "react";

type ParticleBackgroundProps = {
  /** Posisi & layering, contoh: "absolute inset-0 -z-10 pointer-events-none" */
  className?: string;
  /** Tema warna default partikel */
  variant?: "light" | "dark";
  /** Override warna partikel/garis, contoh: "rgba(255,255,255,0.9)" */
  color?: string;
  /** Kepadatan (≈ partikel per 100k px²). Default 18 */
  density?: number;
  /** Ukuran partikel [min, max] (px) */
  sizeRange?: [number, number];
  /** Kecepatan dasar (px/s). Default 30 */
  speed?: number;
  /** Jarak koneksi antar partikel (px). 0 = nonaktif. Default 120 */
  connectDistance?: number;
  /** Radius pengaruh kursor (px). 0 = nonaktif. Default 140 */
  cursorRadius?: number;
  /** Gaya kursor: positif = tarik, negatif = tolak. Default -30 */
  cursorForce?: number;
  /** Global opacity [0..1] */
  opacity?: number;
};

type P = { x: number; y: number; vx: number; vy: number; r: number };

export default function ParticleBackground({
  className = "absolute inset-0 -z-10 pointer-events-none",
  variant = "dark",
  color,
  density = 18,
  sizeRange = [1.2, 2.6],
  speed = 30,
  connectDistance = 120,
  cursorRadius = 140,
  cursorForce = -30,
  opacity = 1,
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0,
      height = 0;
    let particles: P[] = [];
    let raf = 0;
    let lastT = 0;
    let running = true;

    // warna berdasarkan tema (bisa dioverride via prop color)
    const dotCol =
      color ??
      (variant === "dark" ? "rgba(255,255,255,0.9)" : "rgba(17,24,39,0.9)");
    const lineCol =
      color ??
      (variant === "dark" ? "rgba(255,255,255,0.85)" : "rgba(17,24,39,0.85)");
    const cursorLineCol =
      color ??
      (variant === "dark" ? "rgba(255,255,255,0.7)" : "rgba(17,24,39,0.7)");

    // cursor (global window listener agar tetap terbaca walau pointer-events-none)
    const mouse = { x: NaN, y: NaN, active: false };

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const clamp = (v: number, a: number, b: number) =>
      Math.max(a, Math.min(b, v));

    function resize() {
      const rect = container.getBoundingClientRect();

      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // rebuild particles sesuai luas (responsif)
      const units = (width * height) / 100000; // unit area
      const target = Math.round(units * density);
      const count = clamp(target, 12, 240);

      const arr: P[] = [];

      for (let i = 0; i < count; i++) {
        const r = rand(sizeRange[0], sizeRange[1]);
        const angle = Math.random() * Math.PI * 2;
        const v = (rand(0.6, 1.4) * speed) / 60; // px/frame ~60fps

        arr.push({
          x: rand(0, width),
          y: rand(0, height),
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          r,
        });
      }
      particles = arr;
    }

    function drawLine(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      maxDist: number,
      stroke: string,
    ) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      const d2 = dx * dx + dy * dy;
      const m2 = maxDist * maxDist;

      if (d2 > m2) return;
      const alpha = (1 - d2 / m2) * 0.9;

      ctx.globalAlpha = alpha * opacity;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function step(ts: number) {
      if (!running) return;
      raf = requestAnimationFrame(step);
      const dt = lastT ? clamp((ts - lastT) / 16.67, 0.5, 1.5) : 1; // normalisasi vs 60fps

      lastT = ts;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = dotCol;
      ctx.globalAlpha = opacity;

      const hasCursor =
        mouse.active &&
        !Number.isNaN(mouse.x) &&
        !Number.isNaN(mouse.y) &&
        cursorRadius > 0 &&
        cursorForce !== 0;

      // update & draw dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (hasCursor) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const r = cursorRadius;

          if (d2 > 0.0001 && d2 < r * r) {
            const d = Math.sqrt(d2);
            const nx = dx / d;
            const ny = dy / d;
            const strength = (1 - d / r) * (cursorForce / 60); // per frame

            p.vx += nx * strength;
            p.vy += ny * strength;
          }
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // wrap halus
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // friksi ringan
        p.vx *= 0.995;
        p.vy *= 0.995;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // garis antar partikel
      if (connectDistance > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            drawLine(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y,
              connectDistance,
              lineCol,
            );
          }
        }
        // garis ke kursor (tipis)
        if (hasCursor) {
          for (let i = 0; i < particles.length; i++) {
            drawLine(
              particles[i].x,
              particles[i].y,
              mouse.x,
              mouse.y,
              connectDistance * 0.8,
              cursorLineCol,
            );
          }
        }
      }
    }

    // pointer pakai window → selalu kebaca
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

    // resize observer
    const ro = new ResizeObserver(resize);

    ro.observe(container);

    // pause ketika offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        const shouldRun = entry.isIntersecting && !prefersReduce;

        if (shouldRun) {
          running = true;
          lastT = 0;
          raf = requestAnimationFrame(step);
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.01 },
    );

    io.observe(container);

    // init
    resize();
    if (!prefersReduce) raf = requestAnimationFrame(step);

    // listeners (pakai window)
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

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
    sizeRange[0],
    sizeRange[1],
    speed,
    connectDistance,
    cursorRadius,
    cursorForce,
    opacity,
  ]);

  return (
    <div ref={containerRef} aria-hidden className={className}>
      <canvas ref={canvasRef} />
    </div>
  );
}
