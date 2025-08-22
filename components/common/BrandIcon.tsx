// components/common/BrandIcon.tsx
"use client";

import React from "react";
import { siWhatsapp, siInstagram, siTelegram, siGmail } from "simple-icons";

type BrandIconProps = {
  icon: "whatsapp" | "instagram" | "telegram" | "gmail" | "phone" | "location";
  className?: string;
  size?: number;
};

const iconMap = {
  whatsapp: siWhatsapp,
  instagram: siInstagram,
  telegram: siTelegram,
  gmail: siGmail,
  phone: null, // We'll use heroicons for phone
  location: null, // We'll use heroicons for location
};

// Brand colors for better contrast
const brandColors = {
  whatsapp: "#25D366",
  instagram: "#E4405F", 
  telegram: "#0088CC",
  gmail: "#EA4335",
  phone: "currentColor",
  location: "currentColor",
};

export default function BrandIcon({
  icon,
  className = "",
  size = 24,
}: BrandIconProps) {
  const iconData = iconMap[icon];

  if (!iconData) {
    // Return null for non-brand icons, let the parent handle fallback
    return null;
  }

  const color = brandColors[icon];

  return (
    <svg
      aria-label={iconData.title}
      className={className}
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
      style={{ color }}
    >
      <path d={iconData.path} />
    </svg>
  );
}
