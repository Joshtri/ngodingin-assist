"use client";

import { useEffect, useState } from "react";

// 👇 import semua data
import ContactSection from "@/components/landing/ContactSection";
import HeroSection from "@/components/landing/HeroSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import PricingSection from "@/components/landing/PricingSection";
import ServicesSection from "@/components/landing/ServicesSection";
import TeamSection from "@/components/landing/TeamSection";
import TechnologyStackSection from "@/components/landing/TechnologyStackSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import {
  portfolioItems,
  pricingPlans,
  services,
  teamMembers,
  technologies,
  testimonials,
} from "@/data/landing";

export default function DevAssistLanding() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      <HeroSection />

      {/* Services Section */}
      <ServicesSection services={services} />
      {/* Technology Stack */}
      <TechnologyStackSection technologies={technologies} />
      {/* Portfolio Section */}
      <PortfolioSection
        items={portfolioItems}
        variant="dark"
        description="Beberapa aplikasi yang telah kami kembangkan untuk tugas akhir mahasiswa."
        title="Portfolio Kami"
        className="bg-gradient-to-b from-surface-soft via-brand-900 to-surface"
        // optional: override judul/desc kalau mau beda
        // title="Portfolio Kami"
        // description="Beberapa aplikasi ..."
      />
      {/* Team Section */}
      <TeamSection
        id="team"
        variant="dark"
        className="bg-gradient-to-b from-surface-soft via-brand-900 to-surface"
        titleClassName="text-white"
        descriptionClassName="text-gray-300"
        members={teamMembers}
      />
      {/* Pricing Section */}
      <PricingSection
        variant="dark"
        className="bg-gradient-to-r from-surface-soft via-brand-900 to-surface"
        plans={pricingPlans}
      />
      {/* Testimonials */}
      <TestimonialsSection
        items={testimonials}
        className="bg-gradient-to-b from-surface-soft via-brand-900 to-surface"
      />

      <ContactSection
        variant="dark"
        className="bg-gradient-to-b from-surface-soft via-brand-900 to-surface"
        showGlow
        whatsapp={{
          number: "0852-9838-9192",
          prefilledText: "Halo, saya butuh bantuan untuk ngoding sistem 🙌",
        }}
        email="ngodingin@protonmail.com"
        instagram="ngodingin-assist"
      />

      {/* CTA Section */}
    </div>
  );
}
