// components/sections/ServicesSection.tsx
"use client";

import type { ElementType } from "react";

import { Card, CardHeader, CardBody } from "@heroui/react";

import GlowBlob from "../common/GlowBlob";
import ParticleBackground from "../common/ParticleBackground";

import SectionWrapper from "@/components/common/SectionWrapper";
import AnimationTransitionWrapper from "../common/AnimationTransitionWrapper";

export type ServiceItem = {
  title: string;
  description: string;
  icon: ElementType; // ex: CodeBracketIcon
};

type ServicesSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  services: ServiceItem[];
  className?: string; // section background override
};

export default function ServicesSection({
  id = "services",
  title = "Layanan Kami",
  description = "Kami tidak hanya membuat aplikasi untuk Anda, tapi juga memastikan Anda memahami alur pembuatannya.",
  services,
  className = "bg-gradient-to-b from-surface-soft via-brand-900 to-surface",
}: ServicesSectionProps) {
  return (
    <SectionWrapper
      descriptionClassName="text-gray-300"
      id={id}
      title={title}
      titleClassName="text-white"
      description={description}
      // penting: bikin stacking context supaya z-index anak bekerja
      className={`relative z-0 ${className}`}
    >
      {/* Glow paling belakang */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <GlowBlob colorClass="bg-brand-600/15" position="top-right" size="lg" />
        <GlowBlob
          colorClass="bg-accent-500/15"
          position="bottom-left"
          size="lg"
        />
      </div>

      {/* Particle background di atas glow, di bawah konten */}
      <ParticleBackground
        className="absolute inset-0 z-0 pointer-events-none"
        connectDistance={110}
        cursorForce={-28}
        cursorRadius={150}
        density={15}
        opacity={0.2}
        speed={32}
        variant="dark"
      />

      {/* grid cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => {
          const Icon = s.icon as ElementType;

          return (
            <AnimationTransitionWrapper
              key={i}
              animation="fade"
              duration={0.8}
              delay={0.2}
              threshold={0.2}
              repeatOnEnter={true}
            >
              <Card
                key={i}
                disableRipple
                isPressable
                className="
              group rounded-2xl border border-brand-700/40 bg-surface-card shadow-md
                transition-transform duration-300 transform-gpu hover:shadow-lg
                data-[hover=true]:-translate-y-2 data-[pressed=true]:scale-[0.985]
                active:scale-[0.985] hover:border-brand-400 hover:shadow-brand-400/20
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60
              "
                classNames={{ base: "overflow-visible" }}
              >
                <CardHeader className="pb-2">
                  <div className="w-full flex items-start gap-4">
                    {/* icon bubble */}
                    <div
                      className="
                      h-12 w-12 grid place-items-center rounded-xl
                      bg-brand-700/30 text-brand-200 ring-1 ring-brand-600/50
                      transition-colors group-hover:bg-brand-600/40 group-hover:text-brand-100
                      "
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-brand-300">
                      {s.title}
                    </h3>
                  </div>
                </CardHeader>

                <CardBody>
                  <p className="text-gray-300 leading-relaxed">
                    {s.description}
                  </p>
                </CardBody>
              </Card>
            </AnimationTransitionWrapper>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
