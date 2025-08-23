import { Metadata } from "next";

import { title } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Pelajari lebih lanjut tentang Ngodingin, tim pengembang aplikasi tugas akhir dan sistem informasi yang berpengalaman melayani mahasiswa di Indonesia Timur, khususnya Kupang dan sekitarnya.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>
    </div>
  );
}
