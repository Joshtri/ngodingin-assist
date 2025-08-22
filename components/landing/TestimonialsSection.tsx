"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardBody, Avatar } from "@heroui/react";
import { StarIcon } from "@heroicons/react/24/solid";
import gsap from "gsap";

import ParticleBackground from "../common/ParticleBackground";

export type Testimonial = {
  name: string;
  text: string;
  rating?: number;
  avatarSrc?: string;
  company?: string;
  role?: string;
};

type TestimonialsSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  items: Testimonial[];
  className?: string;
  speed?: number; // px per detik
  pauseOnScroll?: boolean; // default: false
  pauseWhenHidden?: boolean; // default: true
};

export default function TestimonialsSection({
  id = "testimonials",
  title = "Apa Kata Klien ?",
  description = "Mahasiswa yang sudah terbantu menyelesaikan tugas akhir mereka",
  items,
  className = "bg-gray-900",
  speed = 30,
  pauseOnScroll = false,
  pauseWhenHidden = true,
}: TestimonialsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  // ✅ deteksi mobile (≤ 767px)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Distribusi kolom (untuk desktop)
  const col1 = useMemo(() => items.filter((_, i) => i % 3 === 0), [items]);
  const col2 = useMemo(() => items.filter((_, i) => i % 3 === 1), [items]);
  const col3 = useMemo(() => items.filter((_, i) => i % 3 === 2), [items]);

  // GSAP marquee helper
  const setupMarquee = (
    element: HTMLElement,
    direction: "up" | "down",
    pxPerSec: number,
  ) => {
    const originalHTML = element.innerHTML;

    (element as any).__originalHTML = originalHTML;
    element.innerHTML = originalHTML + originalHTML;

    const batchHeight = Math.round(element.scrollHeight / 2);

    gsap.set(element, {
      y: direction === "up" ? 0 : -batchHeight,
      force3D: true,
    });

    const wrapY = gsap.utils.wrap(-batchHeight, 0);

    const tween = gsap.to(element, {
      y: direction === "up" ? -batchHeight : 0,
      duration: batchHeight / pxPerSec,
      ease: "linear",
      force3D: true,
      repeat: -1,
      lazy: false,
      modifiers: { y: (y) => wrapY(parseFloat(y)) + "px" },
    });

    const api = {
      pause: () => tween.pause(),
      resume: () => tween.resume(),
      kill: () => {
        tween.kill();
        element.innerHTML = (element as any).__originalHTML ?? originalHTML;
        gsap.set(element, { clearProps: "all" });
      },
      rebuild: () => {
        api.kill();

        return setupMarquee(element, direction, pxPerSec);
      },
      tween,
      batchHeight,
    };

    return api;
  };

  // Jalankan marquee HANYA kalau non-mobile
  useEffect(() => {
    if (isMobile) return; // ❌ skip di mobile

    if (!column1Ref.current || !column2Ref.current || !column3Ref.current)
      return;

    [column1Ref.current, column2Ref.current, column3Ref.current].forEach(
      (el) => {
        el.style.willChange = "transform";
        (el.style as any).transform = "translate3d(0,0,0)";
      },
    );

    let m1 = setupMarquee(column1Ref.current, "up", speed * 1.0);
    let m2 = setupMarquee(column2Ref.current, "down", speed * 0.92);
    let m3 = setupMarquee(column3Ref.current, "up", speed * 1.08);

    const ros: ResizeObserver[] = [];
    const rebuildThrottled = (() => {
      let raf = 0;

      return () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          m1 = m1?.rebuild() ?? null;
          m2 = m2?.rebuild() ?? null;
          m3 = m3?.rebuild() ?? null;
          raf = 0;
        });
      };
    })();

    [column1Ref.current, column2Ref.current, column3Ref.current].forEach(
      (el) => {
        const ro = new ResizeObserver(rebuildThrottled);

        ro.observe(el);
        ros.push(ro);
      },
    );

    let resumeTimer: number | null = null;
    const pauseAll = () => {
      m1?.pause();
      m2?.pause();
      m3?.pause();
    };
    const resumeAll = () => {
      m1?.resume();
      m2?.resume();
      m3?.resume();
    };
    const onActivity = () => {
      if (!pauseOnScroll) return;
      pauseAll();
      if (resumeTimer) window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(resumeAll, 180);
    };

    if (pauseOnScroll) {
      window.addEventListener("wheel", onActivity, { passive: true });
      window.addEventListener("touchmove", onActivity, { passive: true });
      window.addEventListener("scroll", onActivity, { passive: true });
    }

    let io: IntersectionObserver | null = null;

    if (pauseWhenHidden && containerRef.current) {
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? resumeAll() : pauseAll()),
        { threshold: 0.001, rootMargin: "200px 0px 200px 0px" },
      );
      io.observe(containerRef.current);
    }

    const settle = window.setTimeout(() => {
      m1 = m1?.rebuild() ?? null;
      m2 = m2?.rebuild() ?? null;
      m3 = m3?.rebuild() ?? null;
    }, 200);

    return () => {
      ros.forEach((r) => r.disconnect());
      if (resumeTimer) window.clearTimeout(resumeTimer);
      if (pauseOnScroll) {
        window.removeEventListener("wheel", onActivity);
        window.removeEventListener("touchmove", onActivity);
        window.removeEventListener("scroll", onActivity);
      }
      if (io) io.disconnect();
      window.clearTimeout(settle);
      m1?.kill();
      m2?.kill();
      m3?.kill();
    };
  }, [items, speed, pauseOnScroll, pauseWhenHidden, isMobile]);

  const renderCard = (t: Testimonial, i: number) => (
    <Card
      key={`${t.name}-${i}`}
      isPressable
      className="bg-surface-card border border-surface-line/40 text-text hover:border-brand-400 hover:shadow-brand-400/20 
                 p-6 rounded-2xl shadow-card transition-all duration-300 
                 hover:-translate-y-2 hover:shadow-lg mb-6 h-[200px] w-full"
    >
      <CardBody className="p-0 h-full flex flex-col justify-between w-full">
        <div className="flex items-start gap-4 mb-3 w-full">
          <Avatar
            className="bg-brand-100 text-brand-700 font-bold flex-shrink-0"
            name={t.name?.charAt(0)}
            size="sm"
            src={t.avatarSrc}
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-300 text-sm truncate">
              {t.name}
            </h4>
            <p className="text-gray-600 text-xs truncate">
              {t.role} {t.company && `/ ${t.company}`}
            </p>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, idx) => (
                <StarIcon
                  key={idx}
                  className={`h-3 w-3 ${idx < (t.rating ?? 5) ? "text-accent-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-start w-full">
          <p className="leading-relaxed text-gray-300 text-sm line-clamp-4 overflow-hidden w-full">
            &quot;{t.text}&quot;
          </p>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <section
      className={`relative z-0 overflow-hidden py-20 px-4 ${className}`}
      id={id}
    >
      {/* ❌ Matikan particle di mobile (hemat & bersih); ✅ tampilkan di desktop */}
      {!isMobile && (
        <ParticleBackground
          className="absolute inset-0 -z-10 pointer-events-none"
          connectDistance={110}
          cursorForce={-30}
          cursorRadius={150}
          density={18}
          opacity={0.12}
          speed={34}
          variant="dark"
        />
      )}

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-wide text-white">
            {title}
          </h2>
          {description && (
            <p className="text-gray-200 max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        {/* ✅ MOBILE: list biasa, tanpa marquee, bebas scroll */}
        {isMobile ? (
          <div className="grid grid-cols-1 gap-4">
            {items.map((t, i) => renderCard(t, i))}
          </div>
        ) : (
          // ✅ DESKTOP: 3 kolom marquee + masks + fixed height
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] overflow-hidden relative"
          >
            {/* masks */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10 pointer-events-none" />

            <div className="relative overflow-hidden w-full">
              <div ref={column1Ref} className="space-y-6 w-full">
                {col1.map((t, i) => renderCard(t, i))}
              </div>
            </div>
            <div className="relative overflow-hidden w-full">
              <div ref={column2Ref} className="space-y-6 w-full">
                {col2.map((t, i) => renderCard(t, i))}
              </div>
            </div>
            <div className="relative overflow-hidden w-full">
              <div ref={column3Ref} className="space-y-6 w-full">
                {col3.map((t, i) => renderCard(t, i))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
