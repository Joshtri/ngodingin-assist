import { Metadata } from "next";

import { title } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Baca artikel dan tips seputar pengembangan aplikasi, sistem informasi, web development, dan mobile app development. Tutorial, panduan, dan insights dari tim Ngodingin.",
  keywords: [
    "blog coding",
    "tutorial web development",
    "tips sistem informasi",
    "panduan skripsi aplikasi",
    "artikel teknologi",
    "tutorial programming",
  ],
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <div>
      <h1 className={title()}>Blog</h1>
    </div>
  );
}
