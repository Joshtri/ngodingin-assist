import { Metadata } from "next";

import JsonLd from "@/components/seo/JsonLd";
import LandingContent from "@/components/landing/LandingContent";
import { constructMetadata, schemaOrgData } from "@/config/seo";

export const metadata: Metadata = constructMetadata({
  title: "Ngodingin - Jasa Pembuatan Aplikasi",
  description:
    "Jasa pembuatan aplikasi web untuk mahasiswa mulai Rp 1.5 juta. Tim developer berpengalaman, konsultasi gratis, teknologi modern. Hubungi tim Ngodingin sekarang!",
  keywords: [
    "harga ngodingin",
    "biaya jasa skripsi",
    "tim ngodingin",
    "produk ngodingin",
    "layanan ngodingin",
    "jasa pembuatan aplikasi murah",
    "developer indonesia",
    "aplikasi web mahasiswa",
    "konsultasi IT gratis",
    "paket harga coding",
  ],
  canonicalUrl: "https://www.ngodingin-assist.tech",
});

export default function DevAssistLanding() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={schemaOrgData.service} />
      <JsonLd data={schemaOrgData.faq} />
      <JsonLd data={schemaOrgData.localBusiness} />
      <JsonLd
        data={schemaOrgData.breadcrumb([
          { name: "Home", url: "https://www.ngodingin-assist.tech" },
          {
            name: "Jasa Pembuatan Aplikasi",
            url: "https://www.ngodingin-assist.tech/#services",
          },
          {
            name: "Harga & Paket",
            url: "https://www.ngodingin-assist.tech/#pricing",
          },
          {
            name: "Tim Developer",
            url: "https://www.ngodingin-assist.tech/#team",
          },
        ])}
      />
      <LandingContent />
    </div>
  );
}
