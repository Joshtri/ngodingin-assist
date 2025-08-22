// components/common/ContactSelectionModal.tsx
"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
} from "@heroui/react";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

import BrandIcon from "./BrandIcon";

type ContactMethod = {
  type: "whatsapp" | "phone" | "email" | "telegram";
  label: string;
  value: string;
  icon: React.ReactNode;
  href: string;
  colorClass: string;
};

type ContactSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  contactMethods: {
    whatsapp?: { number: string; prefilledText?: string };
    phone?: string;
    email?: string;
    telegram?: string;
  };
};

export default function ContactSelectionModal({
  isOpen,
  onClose,
  packageName,
  contactMethods,
}: ContactSelectionModalProps) {
  // Normalize phone number
  const normalizePhone = (phone: string) => {
    let normalized = phone.replace(/[^\d+]/g, "");

    if (normalized.startsWith("+")) normalized = normalized.slice(1);
    if (normalized.startsWith("0")) normalized = "62" + normalized.slice(1);

    return normalized;
  };

  const methods: ContactMethod[] = [];

  if (contactMethods.whatsapp?.number) {
    const num = normalizePhone(contactMethods.whatsapp.number);
    const defaultText = `Halo! Saya tertarik dengan paket ${packageName}. Bisa dibantu informasi lebih lanjut?`;
    const text = encodeURIComponent(
      contactMethods.whatsapp.prefilledText || defaultText,
    );

    methods.push({
      type: "whatsapp",
      label: "WhatsApp",
      value: `+${num}`,
      icon: <BrandIcon className="h-6 w-6" icon="whatsapp" size={24} />,
      href: `https://wa.me/${num}?text=${text}`,
      colorClass:
        "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-800",
    });
  }

  if (contactMethods.phone) {
    const num = normalizePhone(contactMethods.phone);

    methods.push({
      type: "phone",
      label: "Telepon",
      value: `+${num}`,
      icon: <PhoneIcon className="h-6 w-6" />,
      href: `tel:+${num}`,
      colorClass: "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800",
    });
  }

  if (contactMethods.email) {
    const subject = encodeURIComponent(`Konsultasi Paket ${packageName}`);
    const body = encodeURIComponent(
      `Halo! Saya tertarik dengan paket ${packageName}. Mohon informasi lebih lanjut.`,
    );

    methods.push({
      type: "email",
      label: "Email",
      value: contactMethods.email,
      icon: <BrandIcon className="h-6 w-6" icon="gmail" size={24} /> || (
        <EnvelopeIcon className="h-6 w-6" />
      ),
      href: `mailto:${contactMethods.email}?subject=${subject}&body=${body}`,
      colorClass: "bg-red-50 border-red-200 hover:bg-red-100 text-red-800",
    });
  }

  if (contactMethods.telegram) {
    const user = contactMethods.telegram.replace(/^@/, "");

    methods.push({
      type: "telegram",
      label: "Telegram",
      value: `@${user}`,
      icon: <BrandIcon className="h-6 w-6" icon="telegram" size={24} />,
      href: `https://t.me/${user}`,
      colorClass:
        "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800",
    });
  }

  const handleMethodSelect = (method: ContactMethod) => {
    window.open(method.href, "_blank");
    onClose();
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{
        base: "max-w-md mx-4",
        backdrop: "bg-black/50",
      }}
      isOpen={isOpen}
      placement="center"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Pilih Metode Kontak</h3>
          <p className="text-sm text-gray-600">
            Bagaimana Anda ingin menghubungi kami untuk paket{" "}
            <span className="font-medium">{packageName}</span>?
          </p>
        </ModalHeader>

        <ModalBody className="py-4">
          <div className="space-y-3">
            {methods.map((method) => (
              <Card
                key={method.type}
                isPressable
                className={`border-2 transition-all duration-200 hover:scale-[1.02] ${method.colorClass}`}
                onPress={() => handleMethodSelect(method)}
              >
                <CardBody className="flex flex-row items-center gap-4 py-4">
                  <div className="flex-shrink-0">{method.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{method.label}</h4>
                    <p className="text-sm opacity-80 truncate">
                      {method.value}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button className="w-full" variant="light" onPress={onClose}>
            Batal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
