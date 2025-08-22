"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

import GlowBlob from "../common/GlowBlob";
import { GridBackground } from "../common/GridBackground";

import SectionWrapper from "@/components/common/SectionWrapper";

type Technology = {
  name: string;
  icon?: { hex: string; path: string };
  local?: string;
  initials?: string;
};

type Props = { technologies: Technology[] };

// HANYA yang mau dioverride
const ICON_COLOR_OVERRIDES: Partial<Record<string, string>> = {
  Express: "E6EAF2",
  "Next.js": "E6EAF2",
  Prisma: "AAB3C5",
};
const getIconColor = (name: string, hex?: string) =>
  ICON_COLOR_OVERRIDES[name] ?? hex ?? "E6EAF2";

const TechnologyStackSection: React.FC<Props> = ({ technologies }) => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2));
  const secondRow = technologies.slice(Math.ceil(technologies.length / 2));

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;
    gsap.set(row1Ref.current, { x: "0%" });
    gsap.to(row1Ref.current, {
      x: "-50%",
      duration: 30,
      ease: "none",
      repeat: -1,
    });
    gsap.set(row2Ref.current, { x: "-50%" });
    gsap.to(row2Ref.current, {
      x: "0%",
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const fadeMask: React.CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
    maskImage:
      "linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
  };

  const renderTechItem = (tech: Technology) => (
    <div key={tech.name} className="min-w-[108px] mx-3">
      <div className="flex flex-col items-center">
        <div className="p-4 rounded-xl bg-surface-card shadow-card transition-transform duration-300 group-hover:scale-105">
          {"icon" in tech && tech.icon && (
            <svg
              aria-label={tech.name}
              className="w-12 h-12"
              role="img"
              style={{ color: `#${getIconColor(tech.name, tech.icon.hex)}` }}
              viewBox="0 0 24 24"
            >
              <title>{tech.name}</title>
              <path d={tech.icon.path} fill="currentColor" />
            </svg>
          )}

          {"local" in tech && tech.local && (
            <Image
              unoptimized
              alt={tech.name}
              className="w-12 h-12 object-contain"
              height={48}
              src={tech.local}
              width={48}
            />
          )}

          {"initials" in tech && tech.initials && (
            <div className="w-12 h-12 rounded-xl bg-text grid place-items-center font-bold text-surface">
              {tech.initials}
            </div>
          )}
        </div>
        <span className="mt-3 text-text-muted text-center">{tech.name}</span>
      </div>
    </div>
  );

  return (
    <SectionWrapper
      className="relative bg-surface py-20 overflow-hidden"
      id="tech"
    >
      <GridBackground
        majorEvery={3}
        majorOpacity={0.16}
        minorOpacity={0.07}
        size={50}
      />
      {/* glow lembut pakai token */}
      <GlowBlob
        colorClass="bg-brand-600/20"
        position="top-right"
        size="h-80 w-80"
      />
      <GlowBlob
        colorClass="bg-accent-500/20"
        position="bottom-left"
        size="h-72 w-72"
      />
      {/* <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl" /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left z-10">
          <h2 className="text-4xl font-extrabold text-text">
            Teknologi yang Kami Gunakan
          </h2>
          <p className="text-xl text-text-muted max-w-lg">
            Kami menggunakan teknologi terkini untuk memastikan aplikasi Anda
            modern, scalable, dan mudah dikembangkan.
          </p>
        </div>
      </div>

      {/* marquee full-bleed kanan */}
      <div className="md:absolute md:inset-y-0 md:right-0 md:left-1/2">
        <div className="relative h-full flex flex-col justify-center gap-8 px-0">
          <div className="overflow-hidden" style={fadeMask}>
            <div ref={row1Ref} className="flex items-center whitespace-nowrap">
              {[...firstRow, ...firstRow].map((t, i) => (
                <div key={`r1-${t.name}-${i}`} className="group">
                  {renderTechItem(t)}
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden" style={fadeMask}>
            <div ref={row2Ref} className="flex items-center whitespace-nowrap">
              {[...secondRow, ...secondRow].map((t, i) => (
                <div key={`r2-${t.name}-${i}`} className="group">
                  {renderTechItem(t)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TechnologyStackSection;
