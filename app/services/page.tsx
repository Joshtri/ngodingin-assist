import { Metadata } from "next";

import JsonLd from "@/components/seo/JsonLd";
import ServicesSection from "@/components/landing/ServicesSection";
import { constructMetadata, schemaOrgData } from "@/config/seo";
import { services } from "@/data/landing";

export const metadata: Metadata = constructMetadata({
  title: "Layanan Ngodingin - Jasa Pembuatan Aplikasi Tugas Akhir",
  description:
    "Layanan lengkap Ngodingin untuk tugas akhir mahasiswa: pembuatan aplikasi web, sistem informasi, konsultasi IT, dan mentoring coding. Teknologi modern dan terpercaya.",
  keywords: [
    "layanan ngodingin",
    "jasa ngodingin",
    "produk ngodingin",
    "service ngodingin",
    "konsultasi IT",
    "pembuatan aplikasi",
    "sistem informasi",
    "mentoring coding",
    "jasa tugas akhir",
  ],
  canonicalUrl: "https://ngodingin-assist-lxkh.vercel.app//services",
});

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Layanan Ngodingin",
  description: "Daftar lengkap layanan yang ditawarkan oleh Ngodingin",
  itemListElement: services.map((service, index) => ({
    "@type": "Service",
    position: index + 1,
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Ngodingin",
      url: "https://ngodingin-assist-lxkh.vercel.app/",
    },
  })),
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={servicesSchema} />
      <JsonLd data={schemaOrgData.service} />
      <JsonLd
        data={schemaOrgData.breadcrumb([
          { name: "Home", url: "https://ngodingin-assist-lxkh.vercel.app/" },
          {
            name: "Layanan",
            url: "https://ngodingin-assist-lxkh.vercel.app//services",
          },
        ])}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Layanan Lengkap Ngodingin
            <span className="block text-blue-600">Untuk Tugas Akhir Anda</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Kami menyediakan berbagai layanan profesional untuk membantu
            mahasiswa menyelesaikan tugas akhir dengan teknologi modern dan
            pendekatan yang tepat.
          </p>
        </div>

        <ServicesSection services={services} />

        <div className="mt-16 bg-blue-50 p-8 rounded-xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Proses Kerja Kami
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold mb-2">Konsultasi</h3>
              <p className="text-sm text-gray-600">
                Diskusi kebutuhan dan requirement aplikasi
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold mb-2">Perencanaan</h3>
              <p className="text-sm text-gray-600">
                Membuat timeline dan arsitektur sistem
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold mb-2">Development</h3>
              <p className="text-sm text-gray-600">
                Proses pembuatan aplikasi dengan teknologi terkini
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                4
              </div>
              <h3 className="font-semibold mb-2">Delivery</h3>
              <p className="text-sm text-gray-600">
                Testing, deployment, dan handover project
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
