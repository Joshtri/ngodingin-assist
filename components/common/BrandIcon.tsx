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

  return (
    <svg
      aria-label={iconData.title}
      className={className}
      fill="currentColor"
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d={iconData.path} />
    </svg>
  );
}
