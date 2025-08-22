// hanya yang mau di-override
const ICON_COLOR_OVERRIDES: Partial<Record<string, string>> = {
  Express: "E6EAF2", // putih biar kebaca di dark
  "Next.js": "E6EAF2",
  Prisma: "AAB3C5", // sedikit lebih soft
  // tambahin brand lain kalau perlu...
};

export function getIconColor(name: string, hex?: string) {
  // key case-sensitive sesuai name yang kamu pakai di technologies[]
  return ICON_COLOR_OVERRIDES[name] ?? hex ?? "E6EAF2";
}

export function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const int = parseInt(h, 16);

  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

export function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (v: number) => {
    v /= 255;

    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const [R, G, B] = [toLinear(r), toLinear(g), toLinear(b)];

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// kembalikan hex yang aman untuk background gelap
export function safeColorOnDark(name: string, hex: string) {
  if (!hex) return "E6EAF2";
  if (ICON_COLOR_OVERRIDES[name]) return ICON_COLOR_OVERRIDES[name];
  const L = relativeLuminance(hex);

  // threshold ~0.35: kalau terlalu gelap, pakai warna teks terang
  return L < 0.35 ? "E6EAF2" : hex;
}
