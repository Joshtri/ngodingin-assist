// components/sections/TeamSection.tsx
"use client";

import { Card, CardBody, Avatar, Chip } from "@heroui/react";
import { CodeBracketIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import SectionWrapper from "@/components/common/SectionWrapper";
import GlowBlob from "@/components/common/GlowBlob"; // optional, pakai yang sudah kita buat
import { SocialKeys, TeamMember } from "@/types";
import { GridBackground } from "../common/GridBackground";
import ParticleBackground from "../common/ParticleBackground";

type Variant = "light" | "dark";

type TeamSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  members: TeamMember[];
  /** Background section, bebas pakai gradient kamu */
  className?: string;
  /** Tema kartu & teks (menentukan default warna teks) */
  variant?: Variant;
  /** Tampilkan dekorasi glow blob */
  showGlow?: boolean;
  /** Override warna judul & deskripsi (opsional) */
  titleClassName?: string;
  descriptionClassName?: string;
};

// ambil 1–2 huruf awal sebagai inisial
const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

// ---- brand icons minimal (inline SVG, biar tanpa dependensi tambahan) ----
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58l-.01-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.25-3.22-.13-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23a11.43 11.43 0 0 1 6.01 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.69.25 2.94.12 3.25.78.84 1.25 1.91 1.25 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.5h4V23h-4V8.5Zm7 0h3.83v2h.05c.53-1 1.83-2.05 3.77-2.05C19.5 8.45 21 10.6 21 14.06V23h-4v-7.66c0-1.83-.03-4.18-2.55-4.18-2.55 0-2.94 1.99-2.94 4.05V23h-4V8.5Z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2H21l-6.5 7.43L22 22h-6.766l-4.51-5.89L5.5 22H3l6.963-7.963L2 2h6.85l4.078 5.43L18.244 2Zm-1.186 18h1.64L7.03 3.9H5.29L17.058 20Z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.95.24 2.4.4.6.23 1.03.5 1.48.95.45.45.72.88.95 1.48.16.45.35 1.23.4 2.4.06 1.27.07 1.65.07 4.85s-.01 3.584-.07 4.85c-.05 1.17-.24 1.95-.4 2.4-.23.6-.5 1.03-.95 1.48-.45.45-.88.72-1.48.95-.45.16-1.23.35-2.4.4-1.27.06-1.65.07-4.85.07s-3.584-.01-4.85-.07c-1.17-.05-1.95-.24-2.4-.4-.6-.23-1.03-.5-1.48-.95-.45-.45-.72-.88-.95-1.48-.16-.45-.35-1.23-.4-2.4C2.21 15.58 2.2 15.2 2.2 12s.01-3.584.07-4.85c.05-1.17.24-1.95.4-2.4.23-.6.5-1.03.95-1.48.45-.45.88-.72 1.48-.95.45-.16 1.23-.35 2.4-.4C8.42 2.21 8.8 2.2 12 2.2Zm0 1.6c-3.15 0-3.52.012-4.76.07-1.03.047-1.59.22-1.96.37-.49.19-.83.42-1.2.8-.38.37-.61.71-.8 1.2-.15.37-.32.93-.37 1.96-.06 1.24-.07 1.6-.07 4.76s.012 3.52.07 4.76c.047 1.03.22 1.59.37 1.96.19.49.42.83.8 1.2.37.38.71.61 1.2.8.37.15.93.32 1.96.37 1.24.06 1.6.07 4.76.07s3.52-.012 4.76-.07c1.03-.047 1.59-.22 1.96-.37.49-.19.83-.42 1.2-.8.38-.37.61-.71.8-1.2.15-.37.32-.93.37-1.96.06-1.24.07-1.6.07-4.76s-.012-3.52-.07-4.76c-.047-1.03-.22-1.59-.37-1.96a3.37 3.37 0 0 0-.8-1.2 3.37 3.37 0 0 0-1.2-.8c-.37-.15-.93-.32-1.96-.37-1.24-.06-1.6-.07-4.76-.07Zm0 3.2a5.8 5.8 0 1 1 0 11.6 5.8 5.8 0 0 1 0-11.6Zm0 1.6a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Zm5.9-2.3a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Z" />
  </svg>
);

const socialIconMap: Record<
  SocialKeys,
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element
> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  instagram: InstagramIcon,
  facebook: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M22 12a10 10 0 1 0-11.57 9.87v-6.99H7.9V12h2.53V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  ),
  dribbble: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm6.78 5.23a8.39 8.39 0 0 1 1.67 5.06c-1.29-.27-2.93-.3-4.82-.08-.08-.2-.15-.41-.24-.61-.27-.63-.6-1.26-.95-1.87 2.2-1 3.75-2.28 4.34-2.5ZM12 3.6c1.85 0 3.55.63 4.9 1.69-.5.71-1.86 2.34-4.23 3.4-1.12-2.06-2.38-3.84-2.77-4.36A8.33 8.33 0 0 1 12 3.6Zm-3.9 1.14c.38.5 1.69 2.3 2.84 4.43-3.01.8-5.9.82-6.56.8a8.42 8.42 0 0 1 3.72-5.23ZM3.6 12.01c0-.2 0-.4.02-.6.71.02 4.35.03 7.72-.98.26.46.5.93.73 1.41-.12.04-.24.08-.36.13-3.82 1.46-5.86 4.2-6.37 4.88A8.36 8.36 0 0 1 3.6 12Zm8.41 8.39a8.35 8.35 0 0 1-5.03-1.7c.44-.7 2.29-3.39 6.34-5.01.05-.02.1-.04.15-.05.78 2.02 1.25 4.29 1.44 5.27a8.3 8.3 0 0 1-2.9-.5Zm4.2-1.88c-.16-.83-.58-2.76-1.28-4.72 1.7-.2 3.21-.17 4.43.07a8.4 8.4 0 0 1-3.15 4.65Z" />
    </svg>
  ),
  behance: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M9.15 10.02c.8-.38 1.2-1.01 1.2-1.99 0-2-1.47-2.53-3.31-2.53H2v8.99h5.08c2.11 0 3.55-.97 3.55-2.91 0-1.28-.6-2.15-1.48-2.56ZM4.2 6.95H6.7c.8 0 1.44.22 1.44 1.04 0 .88-.66 1.1-1.46 1.1H4.2V6.95Zm2.64 6.42H4.2v-2.5h2.7c.98 0 1.63.32 1.63 1.25 0 1.01-.75 1.25-1.69 1.25ZM21.99 10.5C21.7 8.3 19.97 7 17.9 7c-2.73 0-4.58 1.95-4.58 4.53 0 2.7 1.89 4.62 4.65 4.62 2.24 0 3.86-1.08 4.3-3h-2.12c-.26.85-1.08 1.24-2.1 1.24-1.24 0-2.08-.7-2.23-1.86h6.16c.03-.22.05-.44.05-.66 0-.14 0-.27-.04-.37Zm-6.24-1.1c.16-1 .95-1.58 1.98-1.58 1.04 0 1.8.6 1.93 1.58h-3.91ZM16 5.2h4v1.2h-4V5.2Z" />
    </svg>
  ),
  youtube: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M23.5 7.2s-.23-1.7-.9-2.45c-.86-.97-1.83-.98-2.27-1.03C17.5 3.5 12 3.5 12 3.5h-.01s-5.5 0-8.32.22c-.44.05-1.41.06-2.27 1.03-.67.75-.9 2.45-.9 2.45S0 9.2 0 11.17v1.65c0 1.97.23 3.97.23 3.97s.23 1.7.9 2.45c.86.97 2 .94 2.51 1.05 1.82.18 7.36.24 7.36.24s5.5-.01 8.33-.23c.44-.05 1.41-.06 2.27-1.03.67-.75.9-2.45.9-2.45s.23-2 .23-3.97v-1.65c0-1.97-.23-3.97-.23-3.97ZM9.6 14.9V8.6l6.02 3.16L9.6 14.9Z" />
    </svg>
  ),
  website: (p) => <GlobeAltIcon {...p} />,
  portfolio: (p) => <GlobeAltIcon {...p} />,
};

export default function TeamSection({
  id = "team",
  title = "Tim Kami",
  description = "Dua programmer berpengalaman yang akan mengerjakan proyek Anda.",
  members,
  className = "bg-white",
  variant = "light",
  showGlow = true,
  titleClassName,
  descriptionClassName,
}: TeamSectionProps) {
  const isDark = variant === "dark";

  // Styling kartu & teks berdasarkan tema
  const cardBase = isDark
    ? "bg-surface-card border border-surface-line/40 text-text hover:border-brand-400 hover:shadow-brand-400/20"
    : "bg-white border border-brand-50/60 text-gray-900 hover:border-brand-200";

  const nameCls = isDark ? "text-text" : "text-gray-900";
  const roleCls = isDark ? "text-brand-300" : "text-brand-600";
  const descCls = isDark ? "text-text-muted" : "text-gray-600";
  const chipCls = isDark
    ? "bg-surface-soft text-text ring-1 ring-surface-line"
    : "bg-brand-50 text-brand-700 border border-brand-100";

  // tombol ikon (sosmed)
  const iconBase =
    "inline-flex items-center justify-center h-9 w-9 rounded-full ring-1 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2";
  const iconTheme = isDark
    ? "ring-surface-line/60 bg-surface-soft text-text hover:bg-surface-card focus-visible:ring-brand-400"
    : "ring-brand-100 bg-white text-gray-700 hover:bg-brand-50 focus-visible:ring-brand-600";

  // Default warna heading/desc section jika tidak di-override
  const sectionTitleCls =
    titleClassName ?? (isDark ? "text-white" : "text-gray-900");
  const sectionDescCls =
    descriptionClassName ?? (isDark ? "text-gray-300" : "text-gray-600");

  return (
    <SectionWrapper
      id={id}
      title={title}
      description={description}
      className={`relative ${className}`}
      titleClassName={sectionTitleCls}
      descriptionClassName={sectionDescCls}
    >
      {showGlow && (
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <GlowBlob
            position="top-right"
            colorClass="bg-brand-500/25"
            size="h-[22rem] w-[22rem]"
          />
          <GlowBlob
            position="bottom-left"
            colorClass="bg-accent-500/20"
            size="h-[20rem] w-[20rem]"
          />
        </div>
      )}

      {/* <GridBackground
        size={50}
        majorEvery={3}
        minorOpacity={0.07}
        majorOpacity={0.16}
      /> */}

      <ParticleBackground
        className="absolute inset-0 z-0 pointer-events-none"
        variant="dark"
        density={15}
        speed={32}
        connectDistance={110}
        cursorRadius={150}
        cursorForce={-28}
        opacity={0.2}
      />

      {/* items-stretch + rows 1fr supaya semua card setinggi sama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch [grid-auto-rows:1fr]">
        {members.map((m, i) => {
          const socialEntries = Object.entries(m.socials ?? {}) as Array<
            [SocialKeys, string]
          >;
          const visibleSocials = socialEntries.filter(
            ([, url]) => typeof url === "string" && url.trim().length > 0
          );

          return (
            <Card
              key={i}
              isPressable
              className={`h-full flex flex-col p-8 rounded-2xl shadow-card hover:-translate-y-2 transition-all duration-300 ${cardBase}`}
            >
              <CardBody className="flex flex-col flex-1 p-0">
                <div className="flex flex-col md:flex-row items-start gap-6 h-full">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {/* Ring manual biar nggak kepotong */}
                    <div className="rounded-full p-[3px] bg-white/90 shadow-md">
                      <Avatar
                        src={m.image}
                        name={getInitials(m.name)}
                        radius="full"
                        className="w-28 h-28"
                        // penting: pastikan img-nya juga bulat penuh
                        classNames={{
                          base: "rounded-full bg-surface-soft text-text",
                          img: "rounded-full object-cover",
                          fallback: "rounded-full",
                          name: "rounded-full",
                        }}
                      />
                    </div>

                    {/* Badge kode, sedikit dinaikkan biar ring nggak ketutup */}
                    <div className="absolute -bottom-1.5 -right-1.5 bg-brand-600 text-white p-2 rounded-full shadow-md">
                      <CodeBracketIcon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Panel konten: GRID 5 baris -> chips & sosial rapih di bawah */}
                  <div className="flex-1 grid grid-rows-[auto_auto_1fr_auto_auto] gap-y-1 text-center md:text-left">
                    <h3 className={`text-xl font-semibold ${nameCls}`}>
                      {m.name}
                    </h3>
                    <p className={`font-medium ${roleCls}`}>{m.role}</p>

                    {/* Deskripsi = row ke-3 (1fr) mendorong chips & sosmed ke bawah */}
                    <p className={`leading-relaxed ${descCls}`}>
                      {m.description}
                    </p>

                    {/* Row ke-4: chips (rata bawah & konsisten) */}
                    <div className="pt-4 flex flex-wrap gap-2 justify-center md:justify-start self-end">
                      {m.skills.map((skill, idx) => (
                        <Chip
                          key={idx}
                          size="sm"
                          radius="full"
                          variant="flat"
                          className={chipCls}
                        >
                          {skill}
                        </Chip>
                      ))}
                    </div>

                    {/* Row ke-5: sosial media / portfolio */}
                    {visibleSocials.length > 0 && (
                      <div className="pt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                        {visibleSocials.map(([key, url]) => {
                          const Icon = socialIconMap[key];
                          const label =
                            key === "x"
                              ? "X (Twitter)"
                              : key.charAt(0).toUpperCase() + key.slice(1);
                          return (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={label}
                              title={label}
                              className={`${iconBase} ${iconTheme}`}
                            >
                              <Icon className="h-4 w-4" />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
