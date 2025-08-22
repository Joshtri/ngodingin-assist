// src/data/landing.ts
import type { ComponentType, SVGProps } from "react";

import {
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import {
  siJavascript,
  siNodedotjs,
  siMongodb,
  siMysql,
  siExpress,
  siFirebase,
  // siCsharp,
  siReact,
  siEjs,
  siTypescript,
  siPostgresql,
  siBootstrap,
  siBulma,
  siTailwindcss,
  // siFlowbite,
  siDaisyui,
  siNextdotjs,
  siMui,
  siPrisma,
  siSupabase,
  siZod,
  siRedis,
  siAuth0,
  siSequelize,
  siSqlite,
  siHandlebarsdotjs,
  siSharp,
  siVite,
  siJsonwebtokens,
} from "simple-icons";

import { TeamMember, TechItem } from "@/types";
export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export const navItems = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Layanan" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#pricing", label: "Harga" },
  { href: "#contact", label: "Kontak" },
];

export const services: {
  icon: IconType;
  title: string;
  description: string;
}[] = [
  {
    icon: CodeBracketIcon,
    title: "Pembuatan Aplikasi Multiplatform",
    description:
      "Kami buatkan aplikasi untuk tugas akhir Anda dengan teknologi terkini yang bisa berjalan di berbagai platform (Android, iOS, Web).",
  },
  {
    icon: AcademicCapIcon,
    title: "Bimbingan Step-by-Step",
    description:
      "Kami jelaskan alur pembuatan aplikasi Anda secara detail, sehingga Anda bisa mempresentasikan dengan percaya diri di depan dosen.",
  },
  {
    icon: DocumentTextIcon,
    title: "Dokumentasi Lengkap",
    description:
      "Kami sediakan dokumentasi lengkap termasuk laporan, diagram UML, dan panduan penggunaan untuk memudahkan Anda.",
  },
  {
    icon: ServerIcon,
    title: "Backend & API Development",
    description:
      "Kami bangun sistem backend yang scalable dengan teknologi modern seperti Node.js, Laravel, atau Firebase.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "UI/UX Modern",
    description:
      "Desain antarmuka yang user-friendly dan modern untuk meningkatkan nilai plus aplikasi Anda.",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Support 24/7",
    description:
      "Tim support kami siap membantu Anda kapan saja, termasuk revisi mendadak sebelum sidang.",
  },
];

export const technologies: TechItem[] = [
  { name: "JavaScript", icon: siJavascript },
  { name: "Node.js", icon: siNodedotjs },
  { name: "MongoDB", icon: siMongodb },
  { name: "MySQL", icon: siMysql },
  { name: "Express", icon: siExpress },
  { name: "Firebase", icon: siFirebase },
  { name: "C#", icon: siSharp },
  { name: "React", icon: siReact },
  { name: "EJS", icon: siEjs },
  { name: "TypeScript", icon: siTypescript },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Bootstrap", icon: siBootstrap },
  { name: "Bulma", icon: siBulma },
  { name: "TailwindCSS", icon: siTailwindcss },
  { name: "Vite", icon: siVite },
  {
    name: "Flowbite",
    local:
      "https://img.shields.io/badge/Flowbite-%2303C8A8.svg?style=for-the-badge&logo=flowbite&logoColor=white",
  },
  { name: "daisyUI", icon: siDaisyui },
  { name: "Vite", icon: siVite },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Material UI (MUI)", icon: siMui },
  { name: "Prisma", icon: siPrisma },
  { name: "Supabase", icon: siSupabase },
  { name: "Zod", icon: siZod },
  { name: "Redis", icon: siRedis },
  { name: "Auth0", icon: siAuth0 },
  { name: "JWT", icon: siJsonwebtokens },
  { name: "Sequelize", icon: siSequelize },
  { name: "SQLite", icon: siSqlite },
  { name: "Handlebars.js", icon: siHandlebarsdotjs },
];

export const portfolioItems = [
  {
    title:
      "Sistem Pendukung Keputusan Pemberian Beasiswa Rote Ndao menggunakan Algoritma SAW & TOPSIS",
    description:
      "Aplikasi berbasis web yang membantu menentukan penerima beasiswa di Kabupaten Rote Ndao menggunakan algoritma SAW dan TOPSIS. Sistem ini memudahkan proses seleksi agar lebih transparan dan objektif.",
    image: "/assets/projects/beasiswa-spk-rote-ndao.png",
    tags: ["Next.JS", "React", "Supabase", "PostgreSQL", "ShadcnUI"],
  },
  {
    title: "Sistem Informasi Surat Menyurat Kelurahan Liliba Kupang",
    description:
      "Sistem informasi digital untuk mengelola surat masuk, surat keluar, dan surat keterangan warga di Kelurahan Liliba Kupang. Aplikasi ini mempermudah pembuatan, pencatatan, serta pelacakan surat secara cepat dan akurat.",
    image: "/assets/projects/sisurat.png",
    tags: ["Next.JS", "React", "Supabase", "PostgreSQL", "HeroUI"],
  },
  {
    title: "Tes Psikologi Web",
    description:
      "Platform berbasis web untuk melakukan tes psikologi online. Sistem ini menyediakan soal-soal psikotes, otomatisasi penilaian, dan hasil analisis yang dapat digunakan untuk rekrutmen maupun asesmen individu.",
    image: "/assets/projects/psikologi-tes.png",
    tags: ["React", "Node.js", "MongoDB", "Flowbite CSS"],
  },
  {
    title: "E-Learning Yayasan Obor Timor Ministry",
    description:
      "Platform e-learning untuk Yayasan Obor Timor Ministry yang menyediakan materi pembelajaran berbentuk video, kuis interaktif, dan sertifikat online. Mendukung proses belajar mengajar jarak jauh secara efektif.",
    image: "/assets/projects/e-learning-yotm.png",
    tags: ["Next.JS", "React", "Node.js", "PostgreSQL", "Firebase", "ShadcnUI"],
  },
  {
    title:
      "Sistem Pendukung Keputusan Rumah Layak Huni Rote Ndao menggunakan algoritma SAW & TOPSIS",
    description:
      "Aplikasi yang digunakan pemerintah Kabupaten Rote Ndao untuk menentukan calon penerima program rumah layak huni. Sistem ini menggunakan metode analisis kriteria agar distribusi bantuan lebih tepat sasaran.",
    image: "/assets/projects/layak-huni-spk.png",
    tags: ["React", "Node.js", "MongoDB", "Flowbite"],
  },
  {
    title:
      "Sistem Pendukung Keputusan Pembebasan Bersyarat Lapas Kelas IIA Kupang menggunakan algoritma TOPSIS",
    description:
      "Sistem pendukung keputusan yang membantu pihak Lapas Kelas IIA Kupang dalam menilai kelayakan narapidana untuk mendapatkan pembebasan bersyarat berdasarkan kriteria hukum, perilaku, dan administratif.",
    image: "/assets/projects/spk-lp-iia.png",
    tags: ["Bulma CSS", "Node.js", "EJS", "MySQL"],
  },
  {
    title: "Sistem Informasi Monitoring Siswa SMA Negeri 3 Kupang",
    description:
      "Aplikasi monitoring siswa yang digunakan guru dan wali kelas untuk memantau kehadiran, nilai, dan pelanggaran siswa di SMA Negeri 3 Kupang. Sistem ini juga menyediakan laporan perkembangan siswa secara real-time.",
    image: "/assets/projects/simon.png",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "NatureCare Eco App",
    description:
      "Aplikasi yang membantu pengguna untuk menemukan pengepul dan menjual barang bekas secara online. Aplikasi ini juga menyediakan informasi tentang cara mendaur ulang sampah dengan benar.",
    image: "/assets/projects/naturecare.png",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  },
];

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  notIncluded: string[];
  popular: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Paket Basic",
    price: "Mulai Rp 1,7 jt (± Rp 300rb)",
    description:
      "Untuk aplikasi sederhana 1 platform. Harga bisa turun ~300rb atau naik tergantung kompleksitas & scope.",
    features: [
      "1 platform (Android ATAU iOS ATAU Web)",
      "Hingga 3 fitur inti (fitur tambahan dihitung terpisah)",
      "Dokumentasi dasar",
      "1x revisi tambah fitur (fitur kecil; biaya mengikuti scope)",
    ],
    notIncluded: [
      "Backend custom/kompleks",
      "Integrasi pihak ketiga non-standar (payment, chat realtime, dsb)",
      "Deploy ke store/hosting (opsional add-on)",
    ],
    popular: false,
  },
  {
    name: "Paket Standard",
    price: "Mulai Rp 3,0 jt (± Rp 500rb)",
    description:
      "Solusi lengkap untuk mayoritas tugas akhir: 2 platform + backend dasar, batas fitur jelas, dan pendampingan.",
    features: [
      "2 platform (Android+iOS ATAU Web+Mobile)",
      "Hingga 6 fitur inti",
      "Backend dasar (CRUD + auth sederhana)",
      "Dokumentasi lengkap",
      "3x revisi minor + 1x revisi tambah fitur",
      "Bimbingan 2 sesi",
      "Bantuan deploy ke 1 store/hosting",
    ],
    notIncluded: [
      "Fitur kompleks (payment gateway, chat realtime, push notifikasi massal) kecuali disepakati",
      "Integrasi pihak ketiga di luar list standar",
    ],
    popular: true,
  },
  {
    name: "Paket Premium",
    price: "Mulai Rp 5,5 jt (± Rp 1 jt)",
    description:
      "Untuk aplikasi kompleks multi-platform dengan backend custom, prioritas pengerjaan, dan dukungan lengkap.",
    features: [
      "3 platform (Android, iOS, Web)",
      "Hingga 12 fitur inti awal (penambahan lewat sprint disepakati terpisah)",
      "Backend custom (role/relasi kompleks, laporan)",
      "Dokumentasi super lengkap",
      "5x revisi minor + 2x revisi tambah fitur",
      "Bimbingan 5 sesi",
      "Prioritas pengerjaan",
      "QA & optimasi dasar",
      "Deploy ke 2 store + 1 hosting",
      "Monitoring & analytics basic",
    ],
    notIncluded: [
      "Pengembangan berkelanjutan tanpa batas (diatur per sprint/kontrak lanjutan)",
      "Biaya store/hosting/akun publisher",
    ],
    popular: false,
  },
];

export const testimonials = [
  {
    name: "Ariel",
    rating: 5,
    text: "Lumayan, saya akhirnya eskom",
  },
  {
    name: "Ina",
    rating: 5,
    text: "semua revisi dan tambah fitur dikerjakan sesuai request kwkwk",
  },
  {
    name: "Ratna",
    rating: 5,
    text: "msih dlm pengerjaan tapi progress dan tambah fitur okee.",
  },
  {
    name: "Inthan",
    rating: 5,
    text: "aplikasi saya utk studi smua dikerjakan dengan baik dan perbaikan bug cepat",
  },
  {
    name: "Richard",
    rating: 5,
    text: "Pengerjaan cepat, hasil sesuai ekspektasi, dan komunikasinya sangat jelas.",
  },
  {
    name: "Erik",
    rating: 4,
    text: "Beberapa revisi memang perlu, tapi overall aplikasinya sudah bagus banget.",
  },
  {
    name: "Yohan",
    rating: 5,
    text: "Mantap sekali, fitur-fitur yang saya minta semua bisa berjalan lancar.",
  },
  {
    name: "Clara",
    rating: 5,
    text: "Desain aplikasi sangat rapi, modern, dan mudah digunakan.",
  },
  {
    name: "Riko",
    rating: 4,
    text: "Awalnya ada bug kecil, tapi cepat banget di-fix. Jadi puas dengan hasil akhirnya.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Arpakhsad Joshtri Sugiatma Lenggu",
    role: "Fullstack Developer",
    description:
      "Lulusan Ilmu Komputer dengan pengalaman 5 tahun mengembangkan aplikasi multiplatform.",
    skills: [
      "Next.JS",
      "React",
      "Typescript",
      "Node.js",
      "HeroUI",
      "TailwindCSS",
      "Prisma",
    ],
    image: "https://avatars.githubusercontent.com/u/89520714?v=4",
    socials: {
      github: "https://github.com/Joshtri",
      linkedin:
        "https://www.linkedin.com/in/arpakhsad-joshtri-sugiatma-lenggu-771242201/",
      portfolio: "https://arpakhsad-lenggu-portofolio.vercel.app/",
      x: "https://x.com/<your-handle>",
      instagram: "https://www.instagram.com/joshtrilenggu/",
    },
  },
  {
    name: "Samuel Jacob",
    role: "Frontend Developer",
    description:
      "Spesialis antarmuka pengguna dengan keahlian dalam membuat desain yang intuitif dan sistem backend yang scalable.",
    skills: ["React", "TailwindCSS", "DaisyUI", "Node.js"],
    image: "https://avatars.githubusercontent.com/u/172507739?v=4",
    socials: {
      github: "https://github.com/Anthasss",
      instagram: "https://www.instagram.com/samuelbjacob_/",
      linkedin: "https://www.linkedin.com/in/<samuel-handle>/",
      website: "https://samuel.example.com",
    },
  },
];
