// config/site.ts
export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  keywords: string[];
  authors: Array<{
    name: string;
    url: string;
  }>;
  creator: string;
  openGraph: {
    type: string;
    locale: string;
    url: string;
    siteName: string;
    title: string;
    description: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
    creator: string;
  };
  verification: {
    google?: string;
    yandex?: string;
    bing?: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Ngodingin",
  description:
    "Jasa pembuatan aplikasi tugas akhir, sistem informasi, web development, dan mobile app development. Spesialis sistem pendukung keputusan, e-learning, dan aplikasi skripsi untuk mahasiswa di Kupang dan Indonesia Timur.",
  url: "https://ngodingin.vercel.app",
  ogImage: "https://ngodingin.vercel.app/ngodingin-512.png",
  keywords: [
    "jasa pembuatan aplikasi tugas akhir",
    "development sistem informasi",
    "pembuatan web skripsi",
    "jasa coding aplikasi",
    "developer aplikasi Kupang",
    "sistem pendukung keputusan",
    "jasa pembuatan website",
    "mobile app development",
    "backend development",
    "e-learning platform",
    "aplikasi android skripsi",
    "web developer Indonesia Timur",
    "jasa coding Kupang",
    "sistem informasi akademik",
    "aplikasi database",
    "skripsi informatika",
    "tugas akhir sistem informasi",
    "jasa pembuatan sistem",
    "developer freelance Kupang",
    "aplikasi web responsif",
    "sistem manajemen data",
    "aplikasi inventory",
    "sistem pendaftaran online",
    "web development NTT",
    "mobile development Indonesia Timur",
  ],
  authors: [
    {
      name: "Ngodingin",
      url: "https://ngodingin.vercel.app",
    },
  ],
  creator: "Ngodingin",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ngodingin.vercel.app",
    siteName: "Ngodingin",
    title: "Ngodingin - Jasa Pembuatan Aplikasi Tugas Akhir & Sistem Informasi",
    description:
      "Jasa pembuatan aplikasi tugas akhir, sistem informasi, web development, dan mobile app development. Spesialis sistem pendukung keputusan, e-learning, dan aplikasi skripsi untuk mahasiswa di Kupang dan Indonesia Timur.",
    images: [
      {
        url: "https://ngodingin.vercel.app/ngodingin-512.png",
        width: 512,
        height: 512,
        alt: "Ngodingin - Jasa Pembuatan Aplikasi Tugas Akhir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ngodingin - Jasa Pembuatan Aplikasi Tugas Akhir & Sistem Informasi",
    description:
      "Jasa pembuatan aplikasi tugas akhir, sistem informasi, web development, dan mobile app development. Spesialis sistem pendukung keputusan, e-learning, dan aplikasi skripsi untuk mahasiswa di Kupang dan Indonesia Timur.",
    images: ["https://ngodingin.vercel.app/ngodingin-512.png"],
    creator: "@ngodingin",
  },
  verification: {
    google: "google-site-verification-code", // To be replaced with actual verification code
  },
};
