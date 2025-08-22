// components/common/GlowBlob.tsx
"use client";

import React from "react";

type GlowBlobProps = {
  position: "top-right" | "bottom-left" | "top-left" | "bottom-right";
  colorClass?: string; // misal: bg-brand-600/10
  size?: string; // misal: h-72 w-72
  blur?: string; // misal: blur-3xl
  className?: string;
};

export default function GlowBlob({
  position,
  colorClass = "bg-brand-600/10",
  size = "h-72 w-72",
  blur = "blur-3xl",
  className = "",
}: GlowBlobProps) {
  const posClass =
    position === "top-right"
      ? "-top-28 -right-24"
      : position === "bottom-left"
        ? "-bottom-28 -left-24"
        : position === "top-left"
          ? "-top-28 -left-24"
          : "-bottom-28 -right-24";

  return (
    <div
      className={`pointer-events-none absolute ${posClass} ${size} rounded-full ${colorClass} ${blur} ${className}`}
    />
  );
}
