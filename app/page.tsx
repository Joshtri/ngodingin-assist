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
        description="Beberapa aplikasi yang telah kami kembangkan untuk tugas akhir mahasiswa."
        items={portfolioItems}
        title="Portfolio Kami"
        variant="dark"
        className="bg-gradient-to-b from-surface-soft via-brand-900 to-surface"
        // optional: override judul/desc kalau mau beda
        // title="Portfolio Kami"
        // description="Beberapa aplikasi ..."
      />
      {/* Team Section */}
      <TeamSection
        className="bg-gradient-to-b from-surface-soft via-brand-900 to-surface"
        descriptionClassName="text-gray-300"
        id="team"
        members={teamMembers}
        titleClassName="text-white"
        variant="dark"
      />
      {/* Pricing Section */}
      <PricingSection
        className="bg-gradient-to-r from-surface-soft via-brand-900 to-surface"
        plans={pricingPlans}
        variant="dark"
      />
      {/* Testimonials */}
      <TestimonialsSection
        className="bg-gradient-to-b from-surface-soft via-brand-900 to-surface"
        items={testimonials}
      />

      <ContactSection
        showGlow
        className="bg-gradient-to-b from-surface-soft via-brand-900 to-surface"
        email="ngodingin@protonmail.com"
        instagram="ngodingin-assist"
        variant="dark"
        whatsapp={{
          number: "0852-9838-9192",
          prefilledText: "Halo, saya butuh bantuan untuk ngoding sistem 🙌",
        }}
      />

      {/* CTA Section */}
    </div>
  );
}
