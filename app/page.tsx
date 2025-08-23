import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import DevAssistLanding from "./client-page";

export const metadata: Metadata = constructMetadata({
  title: "Jasa Pembuatan Aplikasi Web & Mobile Profesional - Ngodingin",
  description: "Solusi lengkap pengembangan aplikasi untuk tugas akhir mahasiswa. Layanan profesional pembuatan web, mobile, dan sistem informasi dengan teknologi modern seperti Next.js, React, dan Node.js.",
});

export default function HomePage() {
  return <DevAssistLanding />;
}