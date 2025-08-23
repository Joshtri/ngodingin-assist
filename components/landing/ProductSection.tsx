// components/landing/ProductSection.tsx
"use client";

import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { motion } from "framer-motion";

import GlowBlob from "../common/GlowBlob";
import { GridBackground } from "../common/GridBackground";

import { ProductSectionProps } from "@/types";
import { productItems } from "@/data/landing";
import SectionWrapper from "@/components/common/SectionWrapper";

export default function ProductSection({
  id = "product",
  title = "Jenis Aplikasi yang Kami Kembangkan",
  description = "Kami dapat membantu Anda mengembangkan berbagai jenis aplikasi sesuai kebutuhan tugas akhir Anda dengan kualitas profesional.",
  items = productItems,
  className = "bg-gradient-to-b from-surface-soft via-brand-900 to-surface",
  variant = "dark",
}: ProductSectionProps) {
  const isDark = variant === "dark";

  const cardBase = isDark
    ? "bg-surface-card border border-surface-line/40 text-text"
    : "bg-white border border-brand-50/60 text-gray-900";

  const titleCls = isDark ? "text-text" : "text-gray-900";
  const descCls = isDark ? "text-text-muted" : "text-gray-600";
  const chipCls = isDark
    ? "bg-surface-soft text-text ring-1 ring-surface-line"
    : "bg-brand-50 text-brand-700 ring-1 ring-brand-100";

  return (
    <SectionWrapper
      className={`relative z-0 ${className}`}
      description={description}
      descriptionClassName="text-gray-300"
      id={id}
      title={title}
      titleClassName="text-white"
    >
      {/* Glow background */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <GlowBlob
          colorClass="bg-brand-500/20"
          position="top-right"
          size="h-[18rem] w-[18rem]"
        />
        <GlowBlob
          colorClass="bg-accent-500/15"
          position="bottom-left"
          size="h-[18rem] w-[18rem]"
        />
      </div>

      <GridBackground
        majorEvery={3}
        majorOpacity={0.16}
        minorOpacity={0.07}
        size={50}
      />

      {/* Grid produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              viewport={{ once: false, margin: "-100px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card
                isPressable
                className={[
                  "relative h-full rounded-2xl shadow-card transition-all duration-300 transform-gpu",
                  "hover:-translate-y-2 hover:shadow-xl",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                  cardBase,
                ].join(" ")}
              >
                <CardHeader className="pb-2 flex gap-4">
                  <div className="h-12 w-12 grid place-items-center rounded-xl bg-brand-600/20 ring-1 ring-brand-500/30">
                    <Icon className="h-6 w-6 text-brand-400" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${titleCls}`}>
                      {item.title}
                    </h3>
                  </div>
                </CardHeader>

                <CardBody className="pt-2 flex flex-col gap-4">
                  <p className={`leading-relaxed ${descCls}`}>
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    <h4 className="text-sm font-medium mb-2 text-brand-300">
                      Contoh Aplikasi:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.examples.map((example, i) => (
                        <Chip
                          key={i}
                          className={chipCls}
                          radius="sm"
                          size="sm"
                          variant="flat"
                        >
                          {example}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-gray-300 text-sm">
        * Jenis aplikasi di atas hanyalah sebagian contoh yang dapat kami
        kembangkan. Kami dapat menyesuaikan dengan kebutuhan spesifik tugas
        akhir Anda.
      </p>
    </SectionWrapper>
  );
}
