// components/landing/PortfolioSection.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline";

import GlowBlob from "../common/GlowBlob";
import { GridBackground } from "../common/GridBackground";
import AnimationTransitionWrapper from "../common/AnimationTransitionWrapper";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

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

  // Track manual swipe state
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ startX: 0, scrollLeft: 0 });

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

  // Handle manual touch/mouse swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    tweenRef.current?.pause();
    dragInfo.current = {
      startX: e.pageX,
      scrollLeft: parseFloat(
        trackRef.current.style.transform?.replace(/[^0-9\-\.]/g, "") || "0",
      ),
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    tweenRef.current?.pause();
    dragInfo.current = {
      startX: e.touches[0].pageX,
      scrollLeft: parseFloat(
        trackRef.current.style.transform?.replace(/[^0-9\-\.]/g, "") || "0",
      ),
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;

    // Only allow right-to-left movement (negative delta)
    const x = e.pageX;
    let walk = x - dragInfo.current.startX;

    // If trying to move left-to-right (positive delta), restrict movement
    if (walk > 0) {
      walk = 0;
    }

    const batchWidth = Math.round(trackRef.current.scrollWidth / 2);
    const newPos = dragInfo.current.scrollLeft + walk;
    const wrapX = gsap.utils.wrap(-batchWidth, 0);

    gsap.set(trackRef.current, { x: wrapX(newPos) });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;

    // Only allow right-to-left movement (negative delta)
    const x = e.touches[0].pageX;
    let walk = x - dragInfo.current.startX;

    // If trying to move left-to-right (positive delta), restrict movement
    if (walk > 0) {
      walk = 0;
    }

    const batchWidth = Math.round(trackRef.current.scrollWidth / 2);
    const newPos = dragInfo.current.scrollLeft + walk;
    const wrapX = gsap.utils.wrap(-batchWidth, 0);

    gsap.set(trackRef.current, { x: wrapX(newPos) });
  };

  const handleDragEnd = () => {
    if (!isDragging || !trackRef.current) return;
    setIsDragging(false);
    tweenRef.current?.resume();
  };

  const CardInner = (
    item: PortfolioItem,
    index: number,
    isInModal: boolean = false,
  ) => {
    const baseIdx = index % items.length;
    const body = (
      <AnimationTransitionWrapper
        key={index}
        animation="slideLeft"
        delay={0.2}
        duration={0.8}
        repeatOnEnter={true}
        threshold={0.2}
      >
        <Card
          isPressable
          className={`group overflow-hidden rounded-2xl shadow-card hover:-translate-y-3 hover:shadow-xl transition-all duration-500 ${cardBase} ${isInModal ? "h-full" : "h-[500px]"} mt-0 mb-0`}
        >
          <CardHeader className="p-0">
            <div
              className="relative overflow-hidden w-full cursor-pointer group/image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLightboxImage(item.image || "/placeholder.svg");
              }}
            >
              <Image
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-110 group-hover/image:scale-105 transition-transform duration-500"
                height={480}
                src={item.image || "/placeholder.svg"}
                width={800}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-hover/image:bg-black/20 transition-colors duration-300" />

              {/* Zoom icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <ArrowsPointingOutIcon className="h-5 w-5 text-gray-700" />
                </div>
              </div>
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
      </AnimationTransitionWrapper>
    );

    const content = item.href ? (
      <a
        className="block h-full"
        href={item.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {body}
      </a>
    ) : (
      body
    );

    if (isInModal) {
      return (
        <div key={`modal-${item.title}-${index}`} className="h-full">
          {content}
        </div>
      );
    }

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
      headerActions={
        <div className="flex justify-center relative z-10">
          <Button
            aria-label="View all portfolio items"
            className={`${
              isDark ? "bg-surface-card text-text" : "bg-white text-gray-900"
            } border shadow-md hover:shadow-lg transition-shadow duration-200`}
            endContent={<ArrowsPointingOutIcon className="h-4 w-4" />}
            size="sm"
            onPress={() => setIsModalOpen(true)}
          >
            View All
          </Button>
        </div>
      }
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
          overflow-hidden bg-inherit
        "
      >
        <div
          ref={viewportRef}
          className="relative -mx-4 px-4 overflow-hidden bg-inherit"
        >
          {/* Fade HITAM kiri/kanan */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black/70 via-black/30 to-transparent z-10" />

          {/* TRACK bergerak (GSAP) with touch event handlers */}
          <div
            ref={trackRef}
            className={`flex gap-6 items-stretch snap-x snap-mandatory will-change-transform pb-2 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleDragEnd}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
          >
            {doubled.map((item, i) => CardInner(item, i))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Image Preview */}
      <Modal
        hideCloseButton
        className="bg-black/90 backdrop-blur-md"
        classNames={{
          base: "bg-black/90",
          backdrop: "bg-black/80",
        }}
        isOpen={!!lightboxImage}
        size="full"
        onClose={() => setLightboxImage(null)}
      >
        <ModalContent className="bg-transparent shadow-none max-w-none max-h-none m-0 rounded-none">
          {(onClose) => (
            <>
              {/* Close button */}
              <div className="absolute top-4 right-4 z-50">
                <Button
                  isIconOnly
                  className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
                  radius="full"
                  size="lg"
                  onPress={onClose}
                >
                  <XMarkIcon className="h-6 w-6" />
                </Button>
              </div>

              {/* Image container */}
              <div
                className="flex items-center justify-center min-h-screen p-4 cursor-pointer"
                onClick={onClose}
              >
                <div className="relative max-w-[90vw] max-h-[90vh]">
                  <Image
                    alt="Portfolio preview"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    height={1080}
                    src={lightboxImage || "/placeholder.svg"}
                    width={1366}
                  />
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Responsive Modal for viewing all portfolio items */}
      <Modal
        className="max-w-7xl mx-auto rounded-2xl"
        isOpen={isModalOpen}
        scrollBehavior="inside"
        size="xl"
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center bg-surface-card">
                <h2 className="text-xl font-bold">{title}</h2>
              </ModalHeader>
              <ModalBody className="pb-6 px-4 p-4 bg-surface-card/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {items.map((item, i) => (
                    <div key={i} className="h-full">
                      {CardInner(item, i, true)}
                    </div>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </SectionWrapper>
  );
}
