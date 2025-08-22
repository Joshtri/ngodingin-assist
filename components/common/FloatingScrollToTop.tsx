// components/common/FloatingScrollToTop.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { gsap } from "gsap";

export default function FloatingScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);

  const SIZE = 56;
  const STROKE = 4;
  const R = (SIZE - STROKE) / 2;
  const C = 2 * Math.PI * R;

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const max = Math.max(1, scrollHeight - clientHeight);
      const p = Math.min(1, Math.max(0, scrollTop / max));

      setProgress(p);
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          strokeDashoffset: C * (1 - p),
          duration: 0.15,
          ease: "power1.out",
        });
      }
      setVisible(scrollTop > 300);
    };

    if (ringRef.current) {
      gsap.set(ringRef.current, { strokeDasharray: C, strokeDashoffset: C });
    }
    update();
    const onScroll = () => requestAnimationFrame(update);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.style.pointerEvents = visible ? "auto" : "none";
    gsap.to(rootRef.current, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 16,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [visible]);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      ref={rootRef}
      className="fixed right-6 bottom-24 z-[9999] opacity-0 translate-y-4"
    >
      <div className="relative">
        {/* RING PROGRESS – selalu terlihat, di ATAS tombol */}
        <svg
          aria-hidden
          className="absolute -inset-[4px] m-auto rotate-[-90deg] pointer-events-none z-20 !opacity-100"
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width={SIZE}
        >
          {/* track tipis */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            fill="none"
            r={R}
            stroke="white"
            strokeOpacity={0.25}
            strokeWidth={STROKE}
          />
          {/* progress putih solid */}
          <circle
            ref={ringRef}
            cx={SIZE / 2}
            cy={SIZE / 2}
            fill="none"
            r={R}
            stroke="white"
            strokeLinecap="round"
            strokeWidth={STROKE}
          />
        </svg>

        {/* Tombol – tanpa efek hover sama sekali */}
        <Button
          isIconOnly
          aria-label="Scroll ke atas"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round(progress * 100)}
          className="relative z-10 w-14 h-14 bg-brand-600 text-white shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          radius="full"
          role="progressbar"
          onPress={toTop}
        >
          <ChevronUpIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
