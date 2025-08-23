// components/sections/ContactSection.tsx
"use client";

import type { ElementType } from "react";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Button, Chip } from "@heroui/react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { siWhatsapp, siTelegram, siInstagram } from "simple-icons";

import { GridBackground } from "../common/GridBackground";
import AnimationTransitionWrapper from "../common/AnimationTransitionWrapper";

import SectionWrapper from "@/components/common/SectionWrapper";
import GlowBlob from "@/components/common/GlowBlob";

type Variant = "light" | "dark";

type ContactSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  /** background section override */
  className?: string;
  /** tema kartu & teks */
  variant?: Variant;
  /** tampilkan dekor glow */
  showGlow?: boolean;

  /** Kanal opsional (isi yang kamu punya saja) */
  whatsapp?: { number: string; prefilledText?: string; label?: string };
  phone?: string;
  email?: string;
  telegram?: string; // username tanpa @
  instagram?: string; // username tanpa @
  location?: string; // mis. "Kupang, NTT"
};

type Channel = {
  key: string;
  label: string;
  subtitle?: string;
  href: string;
  copyValue?: string;
  icon: ElementType | React.FC<React.SVGProps<SVGSVGElement>>;
  accentClass: string; // ring/bg aksen
};

function normalizeIDPhone(raw: string) {
  // hapus spasi, tanda dll
  let x = (raw || "").replace(/[^\d+]/g, "");

  // +62... → 62..., 08... → 62...
  if (x.startsWith("+")) x = x.slice(1);
  if (x.startsWith("0")) x = "62" + x.slice(1);

  return x;
}

// Helper component to render Simple Icons consistently
const SimpleIconWrapper = ({
  icon,
  size = 24,
  className = "",
}: {
  icon: any;
  size?: number;
  className?: string;
}) => {
  return (
    <svg
      dangerouslySetInnerHTML={{ __html: icon.svg }}
      className={className}
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    />
  );
};

export default function ContactSection({
  id = "contact",
  title = "Kontak Kami",
  description = "Butuh bantuan cepat? Hubungi kami lewat salah satu kanal berikut.",
  className = "bg-white",
  variant = "light",
  showGlow = false,
  whatsapp,
  phone,
  email,
  telegram,
  instagram,
  location,
}: ContactSectionProps) {
  const isDark = variant === "dark";

  const cardBase = isDark
    ? "bg-surface-card border border-surface-line/40 text-text"
    : "bg-white border border-brand-50/60 text-gray-900";

  const titleCls = isDark ? "text-white" : "text-gray-900";
  const descCls = isDark ? "text-gray-300" : "text-gray-600";
  const iconCls = isDark ? "text-white" : "text-inherit";

  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, value?: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1200);
    } catch {}
  };

  const channels = useMemo<Channel[]>(() => {
    const list: Channel[] = [];

    if (whatsapp?.number) {
      const num = normalizeIDPhone(whatsapp.number);
      const text = encodeURIComponent(
        whatsapp.prefilledText ??
          "Halo! Saya tertarik untuk konsultasi terkait tugas akhir.",
      );

      list.push({
        key: "whatsapp",
        label: whatsapp.label ?? "WhatsApp",
        subtitle: `+${num}`,
        href: `https://wa.me/${num}?text=${text}`,
        copyValue: `+${num}`,
        icon: (props) => <SimpleIconWrapper icon={siWhatsapp} {...props} />,
        accentClass: isDark
          ? "ring-emerald-500/50 bg-emerald-500/10"
          : "ring-emerald-200 bg-emerald-50",
      });
    }

    if (phone) {
      const num = normalizeIDPhone(phone);

      list.push({
        key: "phone",
        label: "Telepon",
        subtitle: `+${num}`,
        href: `tel:+${num}`,
        copyValue: `+${num}`,
        icon: PhoneIcon,
        accentClass: isDark
          ? "ring-sky-500/50 bg-sky-500/10"
          : "ring-sky-200 bg-sky-50",
      });
    }

    if (email) {
      list.push({
        key: "email",
        label: "Email",
        subtitle: email,
        href: `mailto:${email}`,
        copyValue: email,
        icon: EnvelopeIcon,
        accentClass: isDark
          ? "ring-brand-500/50 bg-brand-500/10"
          : "ring-brand-200 bg-brand-50",
      });
    }

    if (telegram) {
      const user = telegram.replace(/^@/, "");

      list.push({
        key: "telegram",
        label: "Telegram",
        subtitle: `@${user}`,
        href: `https://t.me/${user}`,
        copyValue: `@${user}`,
        icon: (props) => <SimpleIconWrapper icon={siTelegram} {...props} />,
        accentClass: isDark
          ? "ring-indigo-500/50 bg-indigo-500/10"
          : "ring-indigo-200 bg-indigo-50",
      });
    }

    if (instagram) {
      const ig = instagram.replace(/^@/, "");

      list.push({
        key: "instagram",
        label: "Instagram",
        subtitle: `@${ig}`,
        href: `https://instagram.com/${ig}`,
        copyValue: `@${ig}`,
        icon: (props) => <SimpleIconWrapper icon={siInstagram} {...props} />,
        accentClass: isDark
          ? "ring-pink-500/50 bg-pink-500/10"
          : "ring-pink-200 bg-pink-50",
      });
    }

    if (location) {
      list.push({
        key: "location",
        label: "Lokasi",
        subtitle: location,
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          location,
        )}`,
        icon: MapPinIcon,
        accentClass: isDark
          ? "ring-amber-500/50 bg-amber-500/10"
          : "ring-amber-200 bg-amber-50",
      });
    }

    return list;
  }, [whatsapp, phone, email, telegram, instagram, location, isDark]);

  return (
    <SectionWrapper
      className={`relative z-0 ${className}`}
      description={description}
      descriptionClassName={descCls}
      id={id}
      title={title}
      titleClassName={titleCls}
    >
      {/* dekorasi opsional */}
      {showGlow && (
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
      )}

      <GridBackground
        majorEvery={3}
        majorOpacity={0.16}
        minorOpacity={0.07}
        size={50}
      />

      {/* grid kanal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {channels.map((ch) => {
          const Icon = ch.icon;
          const isCopied = copied === ch.key;

          return (
            <Card
              key={ch.key}
              disableRipple
              isPressable
              className={[
                "relative h-full rounded-2xl shadow-card transition-transform duration-300 transform-gpu",
                "data-[hover=true]:-translate-y-2 data-[pressed=true]:scale-[0.985]",
                "active:scale-[0.985] hover:shadow-lg",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                cardBase,
              ].join(" ")}
              classNames={{ base: "overflow-visible" }}
            >
              <AnimationTransitionWrapper
                animation="slideUp"
                duration={0.6}
                staggerDelay={0.1}
                threshold={0.05}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-4">
                    <div
                      className={[
                        "h-12 w-12 grid place-items-center rounded-xl ring-1",
                        ch.accentClass,
                      ].join(" ")}
                    >
                      {typeof Icon === "function" ? (
                        <Icon className={`h-6 w-6 ${iconCls}`} />
                      ) : (
                        <Icon className={`h-6 w-6 ${iconCls}`} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={
                          isDark
                            ? "text-text font-semibold"
                            : "text-gray-900 font-semibold"
                        }
                      >
                        {ch.label}
                      </h3>
                      {ch.subtitle && (
                        <p
                          className={
                            isDark
                              ? "text-text-muted text-sm truncate"
                              : "text-gray-600 text-sm truncate"
                          }
                        >
                          {ch.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </AnimationTransitionWrapper>

              <CardBody className="pt-2">
                <div className="flex gap-3">
                  <a
                    className="flex-1"
                    href={ch.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button
                      fullWidth
                      className="bg-brand-600 hover:bg-brand-700 text-white"
                    >
                      Buka
                    </Button>
                  </a>

                  {ch.copyValue && (
                    <Button
                      isIconOnly
                      aria-label="Copy"
                      className={"bg-brand-50"}
                      onPress={() => copy(ch.key, ch.copyValue)}
                    >
                      <ClipboardDocumentIcon className="h-5 w-5" />
                    </Button>
                  )}
                </div>

                {/* badge kecil info copy */}
                {isCopied && (
                  <div className="pt-3">
                    <Chip
                      className="bg-emerald-100 text-emerald-700"
                      radius="full"
                      size="sm"
                      variant="flat"
                    >
                      Disalin!
                    </Chip>
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* hint kecil */}
      <p
        className={`mt-6 text-sm ${isDark ? "text-text-muted" : "text-gray-500"}`}
      >
        *Klik <b>Buka</b> untuk langsung chat/call. Tombol copy memudahkan
        menyalin nomor/username.
      </p>
    </SectionWrapper>
  );
}
