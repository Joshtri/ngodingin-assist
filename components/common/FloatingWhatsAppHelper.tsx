// components/common/FloatingWhatsAppHelper.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { gsap } from "gsap";

import BrandIcon from "./BrandIcon";

type FloatingWhatsAppHelperProps = {
  whatsappNumber: string;
  prefilledText?: string;
};

export default function FloatingWhatsAppHelper({
  whatsappNumber,
  prefilledText = "Halo! Saya tertarik untuk konsultasi.",
}: FloatingWhatsAppHelperProps) {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Normalize phone number for WhatsApp
  const normalizePhone = (phone: string) => {
    let normalized = phone.replace(/[^\d+]/g, "");

    if (normalized.startsWith("+")) normalized = normalized.slice(1);
    if (normalized.startsWith("0")) normalized = "62" + normalized.slice(1);

    return normalized;
  };

  const normalizedNumber = normalizePhone(whatsappNumber);
  const whatsappUrl = `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(prefilledText)}`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setVisible(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    rootRef.current.style.pointerEvents = visible ? "auto" : "none";
    gsap.to(rootRef.current, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 16,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [visible]);

  const handleClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      ref={rootRef}
      className="fixed left-6 bottom-24 z-[9999] opacity-0 translate-y-4"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 animate-ping">
          <div className="w-14 h-14 bg-emerald-400 rounded-full opacity-75" />
        </div>

        {/* Main button */}
        <Button
          isIconOnly
          aria-label="Contact via WhatsApp"
          className="
            relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white 
            rounded-full shadow-lg hover:shadow-xl transform transition-all 
            duration-200 hover:scale-110 active:scale-95
          "
          size="lg"
          onPress={handleClick}
        >
          <BrandIcon className="h-7 w-7" icon="whatsapp" size={28} />
        </Button>
      </div>
    </div>
  );
}
