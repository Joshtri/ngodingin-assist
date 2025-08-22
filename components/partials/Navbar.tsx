// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Layanan" },
  { href: "#tech", label: "Teknologi" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#team", label: "Tim" },
  { href: "#pricing", label: "Harga" },
  { href: "#testimonials", label: "Testimoni" },
  { href: "#contact", label: "Kontak" },
];

const NAV_HEIGHT = 72; // px — kira2 tinggi navbar utk offset scroll

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const obsRef = useRef<IntersectionObserver | null>(null);

  // -------- Scroll state (blur + hide text) ----------
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // -------- Active link by section in-view ----------
  const sectionIds = useMemo(
    () => navItems.map((n) => n.href.replace("#", "")),
    [],
  );

  useEffect(() => {
    // Guard SSR
    if (typeof window === "undefined") return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    // rootMargin top = -NAV_HEIGHT * 0.8 biar center-ish;
    // bottom negatif supaya "aktif" saat area tengah viewport memasuki section
    const observer = new IntersectionObserver(
      (entries) => {
        // pilih yang rasio terbesar & visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const id = visible[0].target.id;

          setActiveId(id);
        }
      },
      {
        root: null,
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: `${-NAV_HEIGHT * 0.8}px 0px ${-window.innerHeight * 0.45}px 0px`,
      },
    );

    sections.forEach((sec) => observer.observe(sec));
    obsRef.current = observer;

    return () => {
      observer.disconnect();
      obsRef.current = null;
    };
  }, [sectionIds]);

  // -------- Smooth scroll with offset ----------
  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    // biar tetap support buka di tab baru, dll
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const id = href.replace("#", "");
    const el = document.getElementById(id);

    if (!el) return;

    e.preventDefault();

    // Tutup menu mobile langsung kalau sedang terbuka
    if (isMenuOpen) {
      setIsMenuOpen(false);
      // Delay sedikit agar animasi menu sempat jalan
      setTimeout(() => {
        const top =
          el.getBoundingClientRect().top +
          window.pageYOffset -
          (NAV_HEIGHT + 8);

        window.scrollTo({ top, behavior: "smooth" });
      }, 200);
    } else {
      // Desktop → langsung scroll
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - (NAV_HEIGHT + 8);

      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // -------- Styles ----------
  // Selalu blur saat scrolled, transparan dengan fallback bg kalau browser tak support blur
  const wrapperCls = scrolled
    ? [
        "transition-all duration-300 border-b border-white/10",
        "backdrop-blur-md backdrop-saturate-150",
        "bg-black/10",
        "supports-[backdrop-filter]:bg-transparent",
      ].join(" ")
    : [
        "transition-all duration-300 border-b border-white/10",
        "bg-surface",
        "supports-[backdrop-filter]:backdrop-blur-none",
      ].join(" ");

  const baseLink =
    "relative text-white/90 hover:text-brand-200 transition-colors";
  const activeLink =
    "text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:rounded-full after:bg-gradient-to-r after:from-brand-300 after:to-accent-300";

  return (
    <Navbar
      className="fixed top-0 z-50 w-full !shadow-none"
      classNames={{
        base: "!bg-transparent",
        wrapper: wrapperCls,
      }}
      isBlurred={false}
      isMenuOpen={isMenuOpen} // ← make it controlled
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="gap-3">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <Link
            className="flex items-center gap-2 group"
            href="#home"
            onClick={handleNavClick("#home")}
          >
            <Image
              priority
              alt="Ngodingin"
              className={`rounded-md transition-all duration-500 ease-out ${
                scrolled ? "scale-90" : "scale-100"
              }`}
              height={scrolled ? 68 : 78} // ← DAN INI
              src="/ngodingin-512.png"
              width={scrolled ? 68 : 78} // ← INI yang ngatur ukuran
            />
            <span
              className={`text-xl font-bold tracking-tight text-white transition-all duration-500 ease-out overflow-hidden whitespace-nowrap ${
                scrolled
                  ? "opacity-0 max-w-0 translate-x-[-10px]"
                  : "opacity-100 max-w-[200px] translate-x-0"
              }`}
            >
              N
              <span className="bg-gradient-to-r from-brand-300 to-accent-300 bg-clip-text text-transparent">
                godingin
              </span>
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeId === id;

          return (
            <NavbarItem key={item.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`${baseLink} ${isActive ? activeLink : ""}`}
                data-active={isActive ? "true" : "false"}
                href={item.href}
                onClick={handleNavClick(item.href)}
              >
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end" />

      {/* Mobile menu */}
      <NavbarMenu className="px-4 bg-gradient-to-b from-brand-900 to-surface text-text border-t border-white/10">
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeId === id;

          return (
            <NavbarMenuItem key={item.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`w-full py-2 transition-colors ${
                  isActive ? "text-brand-300" : "text-text hover:text-brand-300"
                }`}
                data-active={isActive ? "true" : "false"}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(item.href)(e); // Scroll jalan
                  setIsMenuOpen(false); // Tutup menu langsung
                }}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
