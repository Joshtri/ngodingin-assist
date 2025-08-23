// components/sections/PricingSection.tsx
"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { siWhatsapp } from "simple-icons";

import { GridBackground } from "../common/GridBackground";
import AnimationTransitionWrapper from "../common/AnimationTransitionWrapper";

import SectionWrapper from "@/components/common/SectionWrapper";
import GlowBlob from "@/components/common/GlowBlob";

export type PricingPlan = {
  name: string;
  price: string;
  description?: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

type WhatsAppContact = {
  name: string;
  role: string;
  number: string;
};

type Variant = "light" | "dark";

type PricingSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  plans: PricingPlan[];
  className?: string;
  variant?: Variant;
  showGlow?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
  onSelectPlan?: (plan: PricingPlan) => void;
  contacts?: WhatsAppContact[];
  directWhatsApp?: boolean;
};

function normalizeIDPhone(raw: string) {
  // hapus spasi, tanda dll
  let x = (raw || "").replace(/[^\d+]/g, "");

  // +62... → 62..., 08... → 62...
  if (x.startsWith("+")) x = x.slice(1);
  if (x.startsWith("0")) x = "62" + x.slice(1);

  return x;
}

export default function PricingSection({
  id = "pricing",
  title = "Paket Harga Terjangkau",
  description = "Harga khusus mahasiswa dengan kualitas profesional. Bisa dicicil 2x pembayaran!",
  plans,
  className = "bg-white",
  variant = "light",
  showGlow = false,
  titleClassName,
  descriptionClassName,
  onSelectPlan,
  contacts = [
    { name: "Admin Ngodingin", role: "Admin Utama", number: "6285298389192" },
    {
      name: "Technical Support",
      role: "Bantuan Teknis",
      number: "6285298389192",
    },
  ],
  directWhatsApp = false,
}: PricingSectionProps) {
  const isDark = variant === "dark";
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const cardBase = isDark
    ? "bg-surface-card border border-surface-line/40 text-text"
    : "bg-white border border-brand-50/60 text-gray-900";

  const nameCls = isDark ? "text-text" : "text-gray-900";
  const priceCls = isDark ? "text-brand-300" : "text-brand-600";
  const descCls = isDark ? "text-text-muted" : "text-gray-600";

  const sectionTitleCls =
    titleClassName ?? (isDark ? "text-white" : "text-gray-900");
  const sectionDescCls =
    descriptionClassName ?? (isDark ? "text-gray-300" : "text-gray-600");

  const handlePlanSelect = (plan: PricingPlan) => {
    if (directWhatsApp && contacts.length > 0) {
      // Direct to WhatsApp with the first contact
      openWhatsAppChat(contacts[0], plan);
    } else if (contacts.length > 1) {
      // Show contact selection modal
      setSelectedPlan(plan);
      setIsContactModalOpen(true);
    } else if (contacts.length === 1) {
      // Direct to WhatsApp with the only contact
      openWhatsAppChat(contacts[0], plan);
    } else {
      // Fallback to provided onSelectPlan
      onSelectPlan?.(plan);
    }
  };

  const openWhatsAppChat = (contact: WhatsAppContact, plan: PricingPlan) => {
    const num = normalizeIDPhone(contact.number);
    const text = encodeURIComponent(
      `Halo! Saya tertarik dengan paket ${plan.name} seharga ${plan.price}. Bisakah Anda memberikan informasi lebih lanjut?`,
    );

    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
    setIsContactModalOpen(false);
  };

  return (
    <SectionWrapper
      descriptionClassName={sectionDescCls}
      id={id}
      title={title}
      titleClassName={sectionTitleCls}
      description={description}
      // ✅ penting: bikin stacking context di parent
      className={`relative z-0 ${className}`}
    >
      {/* Glow paling belakang */}
      {showGlow && (
        <div className="absolute inset-0 -z-10 pointer-events-none">
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
      )}

      <GridBackground
        majorEvery={3}
        majorOpacity={0.16}
        minorOpacity={0.07}
        size={50}
      />

      {/* Konten di atas particle (DOM order menang) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch relative">
        {plans.map((plan, i) => {
          const popular = !!plan.popular;

          return (
            <AnimationTransitionWrapper
              key={i}
              animation="blur"
              delay={0.2}
              duration={0.8}
              repeatOnEnter={true}
              threshold={0.2}
            >
              <Card
                key={i}
                disableRipple
                isPressable
                className={[
                  "relative flex h-full rounded-2xl shadow-card transition-transform duration-300 transform-gpu",
                  "data-[hover=true]:-translate-y-2 data-[pressed=true]:scale-[0.985]",
                  "active:scale-[0.985]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                  "hover:shadow-lg",
                  cardBase,
                  popular ? "ring-2 ring-brand-500/60 md:scale-[1.02]" : "",
                  "motion-reduce:transform-none motion-reduce:transition-none",
                ].join(" ")}
                classNames={{ base: "overflow-visible" }}
              >
                {popular && (
                  <Chip
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-3 py-1 font-semibold shadow pointer-events-none z-10"
                    radius="full"
                    size="sm"
                    variant="solid"
                  >
                    POPULER
                  </Chip>
                )}

                <CardHeader className="text-center pb-2 pt-6">
                  <div className="w-full">
                    <h3
                      className={`text-lg sm:text-xl font-semibold mb-1 ${nameCls}`}
                    >
                      {plan.name}
                    </h3>
                    <div
                      className={`leading-tight font-bold mb-2 break-words ${priceCls}`}
                    >
                      <span className="block text-2xl sm:text-3xl">
                        {plan.price}
                      </span>
                    </div>
                    {plan.description && (
                      <p className={`text-sm ${descCls}`}>{plan.description}</p>
                    )}
                  </div>
                </CardHeader>

                <CardBody className="flex flex-col gap-5 h-full">
                  <ul className="space-y-3 text-sm sm:text-[15px] flex-1">
                    {plan.features.map((f, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start ${isDark ? "text-text" : "text-gray-800"}`}
                      >
                        <CheckIcon className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                    {(plan.notIncluded ?? []).map((f, idx) => (
                      <li
                        key={`x-${idx}`}
                        className={`${isDark ? "text-gray-400" : "text-gray-500"} flex items-start`}
                      >
                        <XMarkIcon className="h-5 w-5 text-rose-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.ctaHref ? (
                    <a
                      className="block"
                      href={plan.ctaHref}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Button
                        fullWidth
                        aria-label={`Pilih ${plan.name}`}
                        className={
                          popular
                            ? "bg-brand-600 hover:bg-brand-700 text-white"
                            : "bg-brand-100 text-brand-700 hover:bg-brand-200"
                        }
                        size="lg"
                      >
                        {plan.ctaLabel ?? "Pilih Paket Ini"}
                      </Button>
                    </a>
                  ) : (
                    <Button
                      fullWidth
                      aria-label={`Pilih ${plan.name}`}
                      className={
                        popular
                          ? "bg-brand-600 hover:bg-brand-700 text-white"
                          : "bg-brand-100 text-brand-700 hover:bg-brand-200"
                      }
                      size="lg"
                      startContent={
                        contacts.length > 0 && (
                          <svg
                            dangerouslySetInnerHTML={{ __html: siWhatsapp.svg }}
                            fill="currentColor"
                            height={20}
                            viewBox="0 0 24 24"
                            width={20}
                          />
                        )
                      }
                      onPress={() => handlePlanSelect(plan)}
                    >
                      {plan.ctaLabel ?? "Pilih Paket Ini"}
                    </Button>
                  )}
                </CardBody>
              </Card>
            </AnimationTransitionWrapper>
          );
        })}
      </div>

      {/* WhatsApp Contact Selection Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Pilih Kontak WhatsApp
          </ModalHeader>
          <ModalBody className="pb-6">
            <p className="text-sm text-gray-600 mb-4">
              Pilih salah satu kontak untuk mendiskusikan paket{" "}
              <strong>{selectedPlan?.name}</strong>
            </p>
            <div className="flex flex-col gap-2">
              {contacts.map((contact, index) => (
                <Button
                  key={index}
                  className="justify-start px-4 py-6 text-left"
                  color="success"
                  startContent={
                    <svg
                      dangerouslySetInnerHTML={{ __html: siWhatsapp.svg }}
                      className="text-green-600"
                      fill="currentColor"
                      height={20}
                      viewBox="0 0 24 24"
                      width={20}
                    />
                  }
                  variant="flat"
                  onPress={() =>
                    selectedPlan && openWhatsAppChat(contact, selectedPlan)
                  }
                >
                  <div>
                    <div className="font-semibold">{contact.name}</div>
                    <div className="text-sm text-gray-600">{contact.role}</div>
                  </div>
                </Button>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </SectionWrapper>
  );
}
