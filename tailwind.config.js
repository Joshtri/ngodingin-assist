import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand utama (midnight blue)
        brand: {
          DEFAULT: "#1E1B4B",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#94A3B8",
          400: "#64748B",
          500: "#475569",
          600: "#334155",
          700: "#1E293B",
          800: "#0F172A",
          900: "#020617",
        },

        // Aksen (amber/kuning) buat badge/highlight
        accent: {
          DEFAULT: "#F59E0B",
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },

        // Permukaan gelap yang kamu pakai di section & kartu
        surface: {
          DEFAULT: "#0F1623", // section gelap
          soft: "#1B2233",
          card: "#2D3340", // kartu ikon stack
          muted: "#334155",
          line: "#3E4C6C",
        },

        // Warna teks pada tema gelap
        text: {
          DEFAULT: "#E6EAF2",
          muted: "#AAB3C5",
        },

        // Status (opsional)
        success: { DEFAULT: "#10B981" },
        warning: { DEFAULT: "#F59E0B" },
        danger: { DEFAULT: "#EF4444" },
      },

      boxShadow: {
        // shadow seragam buat kartu
        card: "0 8px 24px rgba(0,0,0,.25), 0 2px 8px rgba(0,0,0,.15)",
      },

      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [heroui()],
};

module.exports = config;
