import { Metadata } from "next";
import { title } from "@/components/primitives";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Tentang Kami",
  description: "Pelajari lebih lanjut tentang Ngodingin - tim developer berpengalaman yang siap membantu proyek tugas akhir Anda dengan teknologi modern dan pendampingan profesional.",
});

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>
    </div>
  );
}
