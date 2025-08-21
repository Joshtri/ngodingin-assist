// components/sections/ServicesSection.tsx
"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import SectionWrapper from "@/components/common/SectionWrapper";
import type { ElementType } from "react";
import GlowBlob from "../common/GlowBlob";
import ParticleBackground from "../common/ParticleBackground";

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
      id={id}
      title={title}
      description={description}
      // penting: bikin stacking context supaya z-index anak bekerja
      className={`relative z-0 ${className}`}
      titleClassName="text-white"
      descriptionClassName="text-gray-300"
    >
      {/* Glow paling belakang */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <GlowBlob position="top-right" size="lg" colorClass="bg-brand-600/15" />
        <GlowBlob
          position="bottom-left"
          size="lg"
          colorClass="bg-accent-500/15"
        />
      </div>

      {/* Particle background di atas glow, di bawah konten */}
      <ParticleBackground
        className="absolute inset-0 z-0 pointer-events-none"
        variant="dark"
        density={15}
        speed={32}
        connectDistance={110}
        cursorRadius={150}
        cursorForce={-28}
        opacity={0.2}
      />

      {/* grid cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => {
          const Icon = s.icon as ElementType;
          return (
            <Card
              key={i}
              isPressable
              disableRipple
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
                <p className="text-gray-300 leading-relaxed">{s.description}</p>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
