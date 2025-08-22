// components/sections/PortfolioSection.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

import GlowBlob from "../common/GlowBlob";
import { GridBackground } from "../common/GridBackground";

import SectionWrapper from "@/components/common/SectionWrapper";

export type PortfolioItem = {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  href?: string;
};

type Variant = "light" | "dark";

type PortfolioSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  items: PortfolioItem[];
  className?: string;
  variant?: Variant;
  speedPxPerSec?: number;
};

export default function PortfolioSection({
  id = "portfolio",
  title = "Portfolio Kami",
  description = "Beberapa aplikasi yang telah kami kembangkan untuk tugas akhir mahasiswa.",
  items,
  className = "bg-white",
  variant = "light",
  speedPxPerSec = 40,
}: PortfolioSectionProps) {
  const isDark = variant === "dark";

  const cardBase = isDark
    ? "bg-surface-card/95 backdrop-blur border border-surface-line/30 text-text hover:border-brand-400/60 hover:shadow-brand-400/15"
    : "bg-white/95 backdrop-blur border border-brand-50/50 text-gray-900 hover:border-brand-200/70";

  const titleClass = isDark
    ? "text-text group-hover:text-brand-300"
    : "text-gray-900 group-hover:text-brand-700";
  const descClass = isDark ? "text-text-muted" : "text-gray-600";
  const chipClass = isDark
    ? "bg-surface-soft text-text ring-1 ring-surface-line"
    : "bg-brand-50 text-brand-700 ring-1 ring-brand-100";

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isDraggingRef = useRef(false);
  const dragVelocityRef = useRef(0);

  // gandakan konten biar loop-nya seamless
  const doubled = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    const el = trackRef.current;

    if (!el) return;

    const setup = () => {
      const batchWidth = Math.round(el.scrollWidth / 2);

      if (!batchWidth) return;

      const wrapX = gsap.utils.wrap(-batchWidth, 0);

      gsap.set(el, { x: 0, force3D: true, willChange: "transform" });
      tweenRef.current?.kill();
      tweenRef.current = gsap.to(el, {
        x: -batchWidth,
        duration: batchWidth / speedPxPerSec,
        ease: "linear",
        repeat: -1,
        force3D: true,
        lazy: false,
        modifiers: { x: (x) => `${wrapX(parseFloat(x))}px` },
      });
    };

    const ro = new ResizeObserver(setup);

    ro.observe(el);

    let io: IntersectionObserver | null = null;

    if (viewportRef.current) {
      io = new IntersectionObserver(
        ([e]) =>
          e.isIntersecting
            ? tweenRef.current?.resume()
            : tweenRef.current?.pause(),
        { threshold: 0.01, rootMargin: "200px 0px 200px 0px" },
      );
      io.observe(viewportRef.current);
    }

    const t = setTimeout(setup, 0);

    return () => {
      clearTimeout(t);
      ro.disconnect();
      io?.disconnect();
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, [items, speedPxPerSec]);

  // Add drag functionality
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;

    if (!track || !viewport) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let animationId: number;

    const handleStart = (clientX: number) => {
      isDragging = true;
      isDraggingRef.current = true;
      startX = clientX;
      currentX = gsap.getProperty(track, "x") as number;

      // Pause auto-scroll when dragging
      tweenRef.current?.pause();

      // Cancel any momentum animation
      if (animationId) cancelAnimationFrame(animationId);

      dragVelocityRef.current = 0;
    };

    const handleMove = (clientX: number) => {
      if (!isDragging) return;

      const deltaX = clientX - startX;
      const newX = currentX + deltaX;

      // Apply the drag with momentum feel
      gsap.set(track, { x: newX });

      // Calculate velocity for momentum
      dragVelocityRef.current = deltaX * 0.1;
    };

    const handleEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      // Add momentum effect
      const momentum = dragVelocityRef.current;

      if (Math.abs(momentum) > 1) {
        const currentPos = gsap.getProperty(track, "x") as number;

        gsap.to(track, {
          x: currentPos + momentum * 50,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            isDraggingRef.current = false;
            // Resume auto-scroll after momentum ends
            setTimeout(() => tweenRef.current?.resume(), 500);
          },
        });
      } else {
        isDraggingRef.current = false;
        // Resume auto-scroll immediately if no momentum
        setTimeout(() => tweenRef.current?.resume(), 300);
      }
    };

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    // Add event listeners
    viewport.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    viewport.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    viewport.addEventListener("touchmove", handleTouchMove, { passive: false });
    viewport.addEventListener("touchend", handleTouchEnd);

    // Prevent default drag behavior
    viewport.style.userSelect = "none";
    track.style.userSelect = "none";

    return () => {
      viewport.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      viewport.removeEventListener("touchstart", handleTouchStart);
      viewport.removeEventListener("touchmove", handleTouchMove);
      viewport.removeEventListener("touchend", handleTouchEnd);

      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  const CardInner = (item: PortfolioItem, index: number) => {
    const baseIdx = index % items.length;
    const body = (
      <Card
        isPressable
        className={`group overflow-hidden rounded-2xl shadow-card hover:-translate-y-3 hover:shadow-xl transition-all duration-500 ${cardBase} h-[500px] mt-0 mb-0`}
      >
        <CardHeader className="p-0">
          <div className="relative overflow-hidden w-full">
            <Image
              alt={item.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              height={480}
              src={item.image || "/placeholder.svg"}
              width={800}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </CardHeader>

        <CardBody className="px-6 py-5 flex flex-col h-full">
          <h3
            className={`text-lg font-semibold mb-2 transition-colors ${titleClass}`}
          >
            {item.title}
          </h3>
          <p className={`text-sm leading-relaxed mb-4 ${descClass}`}>
            {item.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            {item.tags.map((tag, tagIndex) => (
              <Chip
                key={tagIndex}
                className={chipClass}
                radius="full"
                size="sm"
                variant="flat"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>
    );

    const content = item.href ? (
      <a
        className="block"
        href={item.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {body}
      </a>
    ) : (
      body
    );

    return (
      <motion.div
        key={`${item.title}-${index}`}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 snap-start w-[75vw] sm:w-[360px] md:w-[400px] lg:w-[440px]"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.45, delay: 0.06 * baseIdx }}
      >
        {content}
      </motion.div>
    );
  };

  return (
    <SectionWrapper
      className={`relative ${className}`}
      description={description}
      descriptionClassName={isDark ? "text-gray-300" : "text-gray-600"}
      id={id}
      title={title}
      titleClassName={isDark ? "text-white" : "text-gray-900"}
    >
      <GlowBlob colorClass="bg-brand-600/10" position="top-right" />
      <GlowBlob colorClass="bg-brand-800/10" position="bottom-left" />
      <GridBackground
        majorEvery={3}
        majorOpacity={0.07}
        minorOpacity={0.05}
        size={50}
      />
      {/* FULL-BLEED VIEWPORT (lebar penuh layar) */}
      <div
        className="
          relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen
          overflow-hidden mt-5 bg-inherit
        "
      >
        <div
          ref={viewportRef}
          className="relative -mx-4 px-4 overflow-hidden bg-inherit"
        >
          {/* Fade HITAM kiri/kanan */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black/70 via-black/30 to-transparent z-10" />
          {/* Fade HITAM atas/bawah (opsional, aktif sesuai permintaan) */}
          {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" /> */}

          {/* TRACK bergerak (GSAP) */}
          <div
            ref={trackRef}
            className="flex gap-6 items-stretch snap-x snap-mandatory will-change-transform pb-2 cursor-grab active:cursor-grabbing"
          >
            {doubled.map((item, i) => CardInner(item, i))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
