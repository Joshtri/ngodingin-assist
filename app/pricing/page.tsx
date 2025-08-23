import { Metadata } from "next";

import { title } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Harga & Paket",
  description:
    "Lihat daftar harga dan paket layanan pembuatan aplikasi tugas akhir, sistem informasi, web development, dan mobile app development. Paket mulai dari Rp 800.000 dengan berbagai fitur lengkap.",
  keywords: [
    "harga jasa coding",
    "paket pembuatan aplikasi",
    "biaya skripsi aplikasi",
    "tarif web development",
    "harga sistem informasi",
    "jasa coding murah",
    "paket tugas akhir",
  ],
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <div>
      <h1 className={title()}>Pricing</h1>
    </div>
  );
}
