// components/common/FloatingWhatsAppButton.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { gsap } from "gsap";
import { siWhatsapp } from "simple-icons";

type WhatsAppContact = {
  name: string;
  number: string;
  prefilledText?: string;
};

type FloatingWhatsAppButtonProps = {
  contacts?: WhatsAppContact[];
  defaultContact?: WhatsAppContact;
  showModal?: boolean;
};

export default function FloatingWhatsAppButton({
  contacts = [],
  defaultContact,
  showModal = true,
}: FloatingWhatsAppButtonProps) {
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // Appear with a slight delay
    gsap.fromTo(
      rootRef.current,
      {
        autoAlpha: 0,
        y: 16,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 1.5,
      }
    );

    // Hide when scroll position is at the contact section
    const onScroll = () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // Hide when contact section is in view
        setVisible(rect.top > window.innerHeight || rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
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

  const openWhatsApp = (contact?: WhatsAppContact) => {
    if (!contact && !defaultContact) return;

    const selectedContact = contact || defaultContact!;
    const num = normalizeIDPhone(selectedContact.number);
    const text = encodeURIComponent(
      selectedContact.prefilledText ??
        "Halo! Saya tertarik untuk konsultasi terkait tugas akhir."
    );

    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
    setIsOpen(false);
  };

  // Click button handler
  const handleClick = () => {
    if (showModal && contacts.length > 1) {
      setIsOpen(true);
    } else {
      openWhatsApp(defaultContact || contacts[0]);
    }
  };

  function normalizeIDPhone(raw: string) {
    // hapus spasi, tanda dll
    let x = (raw || "").replace(/[^\d+]/g, "");
    // +62... → 62..., 08... → 62...
    if (x.startsWith("+")) x = x.slice(1);
    if (x.startsWith("0")) x = "62" + x.slice(1);
    return x;
  }

  return (
    <>
      <div
        ref={rootRef}
        className="fixed left-6 bottom-24 z-[9999] opacity-0 translate-y-4"
      >
        <Button
          isIconOnly
          radius="full"
          onPress={handleClick}
          aria-label="Chat dengan WhatsApp"
          className="relative z-10 w-14 h-14 bg-green-600 text-white shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 hover:bg-green-700"
        >
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="currentColor"
            dangerouslySetInnerHTML={{ __html: siWhatsapp.svg }}
          />
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Pilih Kontak WhatsApp
          </ModalHeader>
          <ModalBody className="pb-6">
            <div className="flex flex-col gap-2">
              {contacts.map((contact, index) => (
                <Button
                  key={index}
                  color="success"
                  variant="flat"
                  className="justify-start px-4 py-6 text-left"
                  startContent={
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-green-600"
                      dangerouslySetInnerHTML={{ __html: siWhatsapp.svg }}
                    />
                  }
                  onPress={() => openWhatsApp(contact)}
                >
                  <div>
                    <div className="font-semibold">{contact.name}</div>
                    <div className="text-sm text-gray-600">
                      +{normalizeIDPhone(contact.number)}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
