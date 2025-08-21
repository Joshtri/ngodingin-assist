// components/common/GridBackground.tsx
import React from "react";

type Align = "stretch" | "left" | "right" | "center";

type GridBackgroundProps = {
  size?: number; // ukuran kotak kecil (px)
  majorEvery?: number; // setiap berapa kotak kecil jadi garis besar
  minorOpacity?: number;
  majorOpacity?: number;

  /** Lebar grid dalam persen (0–100). Default 100 (full width). */
  coverage?: number;

  /** Posisi grid di dalam parent (absolute): kiri/kanan/center/stretch(full). */
  align?: Align;

  /** Offset tambahan (px atau %) dari sumbu X/Y. Contoh: 24, "40px", "10%". */
  offsetX?: number | string;
  offsetY?: number | string;

  /** Matikan/nyalakan fade mask. */
  fade?: boolean;

  /** Kelas tambahan (mis. untuk responsive width override). */
  className?: string;

  /** Z-index wrapper (kalau perlu naik/turun layer). */
  zIndex?: number;
};

export function GridBackground({
  size = 40,
  majorEvery = 4,
  minorOpacity = 0.08,
  majorOpacity = 0.18,
  coverage = 100,
  align = "stretch",
  offsetX = 0,
  offsetY = 0,
  fade = true,
  className = "",
  zIndex,
}: GridBackgroundProps) {
  // CSS custom props for grid lines
  const gridStyle: React.CSSProperties &
    Record<"--s" | "--m" | "--c1" | "--c2", string | number> = {
    "--s": `${size}px`,
    "--m": majorEvery,
    "--c1": `rgba(255,255,255,${minorOpacity})`,
    "--c2": `rgba(255,255,255,${majorOpacity})`,
    backgroundImage: `
      linear-gradient(var(--c1) 1px, transparent 1px),
      linear-gradient(90deg, var(--c1) 1px, transparent 1px),
      linear-gradient(var(--c2) 1px, transparent 1px),
      linear-gradient(90deg, var(--c2) 1px, transparent 1px)
    `,
    backgroundSize: `
      var(--s) var(--s),
      var(--s) var(--s),
      calc(var(--s) * var(--m)) calc(var(--s) * var(--m)),
      calc(var(--s) * var(--m)) calc(var(--s) * var(--m))
    `,
    backgroundPosition: "0 0, 0 0, 0 0, 0 0",
  };

  // Wrapper positioning (absolute, full height of parent)
  const wrapperStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex,
  };

  // width & horizontal anchor
  const widthValue = `${Math.max(0, Math.min(100, coverage))}%`;
  const tx = typeof offsetX === "number" ? `${offsetX}px` : offsetX || "0";
  const ty = typeof offsetY === "number" ? `${offsetY}px` : offsetY || "0";

  if (align === "stretch") {
    // full-bleed horizontally
    Object.assign(wrapperStyle, { left: 0, right: 0 });
  } else if (align === "left") {
    Object.assign(wrapperStyle, {
      left: 0,
      width: widthValue,
      transform: `translate(${tx}, ${ty})`,
    });
  } else if (align === "right") {
    Object.assign(wrapperStyle, {
      right: 0,
      width: widthValue,
      transform: `translate(${tx}, ${ty})`,
    });
  } else {
    // center
    Object.assign(wrapperStyle, {
      left: "50%",
      width: widthValue,
      transform: `translate(calc(-50% + ${tx}), ${ty})`,
    });
  }

  return (
    <div aria-hidden className={`absolute ${className}`} style={wrapperStyle}>
      <div className="absolute inset-0 opacity-70" style={gridStyle} />
      {fade && (
        <div
          className="absolute inset-0"
          style={{
            // radial fade: ubah focal point sesuai layout kamu jika perlu
            maskImage:
              "radial-gradient(120% 120% at 70% 50%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(120% 120% at 70% 50%, black 55%, transparent 100%)",
            background: "rgba(0,0,0,0.22)",
          }}
        />
      )}
    </div>
  );
}
