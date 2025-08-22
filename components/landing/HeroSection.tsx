// components/sections/HeroSection.tsx
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import { gsap } from "gsap";

import { GridBackground } from "../common/GridBackground";

const NAV_HEIGHT = 72; // kira2 tinggi navbar untuk offset scroll

type BlockCfg = {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  color: string;
  hasPattern: boolean;
  from: { x: number; y: number; rot: number; scale: number };
  to: {
    x: number;
    y: number;
    rot: number;
    scale: number;
    dur: number;
    delay: number;
  };
  op: { to: number; dur: number; delay: number };
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const cfgRef = useRef<BlockCfg[] | null>(null);
  const blocksIntroRef = useRef<gsap.core.Timeline | null>(null);
  const introPlayedRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if screen is desktop size (>=1030px)
  useLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1030);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ---------- Smooth scroll helper ----------
  const smoothScrollTo = (targetId: string, extraOffset = 8) => {
    const el = document.getElementById(targetId);

    if (!el) return;
    const top =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      (NAV_HEIGHT + extraOffset);

    window.scrollTo({ top, behavior: "smooth" });
  };

  // ====== CONFIG RANDOM (dikunci sekali) ======
  if (!cfgRef.current && isDesktop) {
    const colors = [
      "bg-brand-500",
      "bg-brand-600",
      "bg-accent-400",
      "bg-brand-400",
      "bg-accent-500",
      "bg-brand-300",
      "bg-accent-300",
      "bg-white",
    ];
    const r = gsap.utils.random;

    const AREA_W = 490,
      AREA_H = 520,
      MARGIN = 8,
      GAP = 28;
    const isOverlap = (
      a: { x: number; y: number; w: number; h: number },
      b: { x: number; y: number; w: number; h: number },
      gap: number,
    ) =>
      !(
        a.x + a.w + gap <= b.x ||
        b.x + b.w + gap <= a.x ||
        a.y + a.h + gap <= b.y ||
        b.y + b.h + gap <= a.y
      );
    const rects: { x: number; y: number; w: number; h: number }[] = [];

    cfgRef.current = Array.from({ length: 15 }, (_, i) => {
      const w = r(56, 120),
        h = r(36, 90);
      let x = 0,
        y = 0,
        ok = false;

      for (let t = 0; t < 300 && !ok; t++) {
        x = r(0, Math.max(1, AREA_W - w));
        y = r(0, Math.max(1, AREA_H - h));
        const c = { x, y, w, h };

        ok = rects.every((ex) => !isOverlap(c, ex, GAP));
      }
      rects.push({ x, y, w, h });

      const fromX = r(-30, 30),
        fromY = r(-20, 20),
        fromRot = r(-10, 10),
        fromScale = r(0.9, 1.1);
      const toX = fromX + r(-40, 40),
        toY = fromY + r(-30, 30),
        toRot = fromRot + r(-15, 15),
        toScale = fromScale + r(-0.2, 0.2);

      return {
        id: i,
        width: w,
        height: h,
        left: MARGIN + x,
        top: MARGIN + y,
        color: colors[i % 8],
        hasPattern: i % 3 === 0,
        from: { x: fromX, y: fromY, rot: fromRot, scale: fromScale },
        to: {
          x: toX,
          y: toY,
          rot: toRot,
          scale: toScale,
          dur: r(4, 8),
          delay: i * 0.15,
        },
        op: { to: r(0.7, 1), dur: r(3, 5), delay: i * 0.1 },
      };
    });
  }

  const blocks = cfgRef.current || [];

  // ==== ANIMASI BLOK (loop) + intro fade-in ====
  useLayoutEffect(() => {
    if (!isDesktop) return; // Skip animations on mobile

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      blocksRef.current.forEach((el, idx) => {
        if (!el) return;
        const c = blocks[idx];

        if (!c) return;

        gsap.set(el, {
          x: c.from.x,
          y: c.from.y,
          rotation: c.from.rot,
          scale: c.from.scale,
          opacity: 0,
          willChange: "transform, opacity",
          force3D: true,
        });

        const t1 = gsap.to(el, {
          x: c.to.x,
          y: c.to.y,
          rotation: c.to.rot,
          scale: c.to.scale,
          duration: c.to.dur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: c.to.delay,
          paused: true,
        });
        const t2 = gsap.to(el, {
          opacity: c.op.to,
          duration: c.op.dur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: c.op.delay,
          paused: true,
        });

        tweensRef.current.push(t1, t2);
      });

      blocksIntroRef.current = gsap
        .timeline({ paused: true })
        .to(blocksRef.current, {
          opacity: 1,
          duration: 0.6,
          stagger: 0.03,
          ease: "power2.out",
        })
        .add(() => {
          tweensRef.current.forEach((t) => t.resume());
        });

      if (containerRef.current) {
        const pause = () => tweensRef.current.forEach((t) => t.pause());
        const resume = () => tweensRef.current.forEach((t) => t.resume());
        const io = new IntersectionObserver(
          ([e]) => (e.isIntersecting ? resume() : pause()),
          { threshold: 0.01, rootMargin: "-20% 0px -20% 0px" },
        );

        io.observe(containerRef.current);

        return () => io.disconnect();
      }
    }, containerRef);

    return () => {
      ctx.revert();
      tweensRef.current = [];
      blocksIntroRef.current = null;
    };
  }, [blocks, isDesktop]);

  // ==== TIMELINE TEKS ====
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.from(".hero-title", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".hero-subtitle",
          { autoAlpha: 0, y: 18, duration: 0.55, ease: "power3.out" },
          "-=0.25",
        )
        .from(
          ".hero-ctas > *",
          {
            autoAlpha: 0,
            y: 14,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          },
          "-=0.15",
        )
        .from(
          ".hero-microcopy li",
          {
            autoAlpha: 0,
            y: 10,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.04,
          },
          "-=0.2",
        )
        .from(
          ".hero-badge",
          { autoAlpha: 0, y: -10, duration: 0.4, ease: "power2.out" },
          "-=0.2",
        )
        .add(() => {
          // Animasi kartu hanya jalan di desktop
          if (isDesktop && blocksIntroRef.current) {
            blocksIntroRef.current.play();
          }
        }, "-=0.1");

      if (heroRef.current) {
        const io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !introPlayedRef.current) {
              introPlayedRef.current = true;
              tl.play(0);
            }
          },
          { threshold: 0.35 },
        );

        io.observe(heroRef.current);

        return () => io.disconnect();
      }
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, [isDesktop]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !blocksRef.current.includes(el)) blocksRef.current.push(el);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[80svh] md:min-h-screen flex items-center text-white overflow-hidden
                 bg-gradient-to-br from-brand-900 via-brand-700 to-surface"
      id="home"
    >
      <div aria-hidden className="absolute inset-0 bg-black/25" />
      <GridBackground
        majorEvery={5}
        majorOpacity={0.16}
        minorOpacity={0.07}
        size={36}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        <div
          className={`grid grid-cols-1 gap-12 items-center ${
            isDesktop ? "lg:grid-cols-2" : ""
          }`}
        >
          {/* Left: copy */}
          <div className="space-y-8">
            <h1 className="hero-title text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Butuh sistem untuk proyek studi?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-brand-300">
                Ngodingin, dong!
              </span>
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl text-white/85 leading-relaxed">
              Pendampingan pengembangan sistem untuk keperluan akademik,
              praktikum, dan portofolio—dari perancangan hingga rilis—sambil
              memastikan kamu paham prosesnya.
            </p>

            <div className="hero-ctas flex flex-col sm:flex-row gap-4">
              {/* Smooth scroll ke #contact */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("contact");
                }}
              >
                <Button
                  className="bg-white text-brand-700 hover:bg-brand-50"
                  endContent={<ArrowRightIcon className="w-4 h-4" />}
                  size="lg"
                >
                  Minta Ngodingin Sekarang
                </Button>
              </a>

              {/* Smooth scroll ke #portfolio */}
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("portfolio");
                }}
              >
                <Button
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                  size="lg"
                  startContent={<PlayIcon className="w-4 h-4" />}
                  variant="bordered"
                >
                  Lihat Portofolio
                </Button>
              </a>
            </div>

            <ul className="hero-microcopy text-sm text-white/70 flex flex-wrap gap-x-6 gap-y-2">
              <li>• Pendampingan & code review</li>
              <li>• Milestone jelas & repo rapi</li>
              <li>• Dokumentasi & handover lengkap</li>
            </ul>
          </div>

          {/* Right: Animated Blocks - Hanya tampil di desktop */}
          {isDesktop && (
            <div ref={containerRef} className="relative h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-10">
                <div className="relative w-full h-full max-w-lg">
                  {blocks.map((b) => (
                    <div
                      key={b.id}
                      ref={addToRefs}
                      className={`absolute ${b.color} rounded-lg shadow-2xl overflow-hidden`}
                      style={{
                        width: `${b.width}px`,
                        height: `${b.height}px`,
                        left: `${b.left}px`,
                        top: `${b.top}px`,
                      }}
                    >
                      {b.hasPattern && (
                        <div className="absolute inset-0 p-2">
                          <div className="w-full h-1 bg-white/30 mb-1 rounded" />
                          <div className="w-3/4 h-1 bg-white/20 mb-1 rounded" />
                          <div className="w-1/2 h-1 bg-white/20 rounded" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-brand-900/10 pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-900 to-transparent pointer-events-none" />
    </section>
  );
}
