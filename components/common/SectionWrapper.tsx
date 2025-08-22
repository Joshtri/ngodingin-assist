// components/common/SectionWrapper.tsx
"use client";

import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function SectionWrapper({
  id,
  title,
  description,
  className = "bg-white",
  children,
  titleClassName = "text-gray-900",
  descriptionClassName = "text-gray-600",
}: SectionWrapperProps) {
  return (
    // ✅ Section jadi konteks posisi utk dekor (grid/particle/glow) + cegah scroll X
    <section
      className={`relative z-0 overflow-x-clip overflow-y-visible py-16 ${className}`}
      id={id}
    >
      {/* ❌ JANGAN relative di sini, biar dekor absolute-nya refer ke <section> (full-bleed) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-16">
            {title && (
              <h2
                className={`text-3xl md:text-4xl font-bold mb-4 ${titleClassName}`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`text-xl max-w-3xl mx-auto ${descriptionClassName}`}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
