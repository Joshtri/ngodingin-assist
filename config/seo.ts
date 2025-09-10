import { Metadata } from "next";

export const siteConfig = {
  name: "Ngodingin Assist",
  description:
    "Jasa pembuatan aplikasi web untuk tugas akhir mahasiswa. Konsultasi gratis untuk skripsi, thesis, dan project akhir dengan teknologi modern.",
  url: "https://www.ngodingin-assist.tech",
  ogImage: "https://www.ngodingin-assist.tech/og-image.png",
  keywords: [
    "jasa skripsi",
    "tugas akhir",
    "aplikasi web",
    "konsultasi IT",
    "web development",
    "sistem informasi",
    "project mahasiswa",
    "ngodingin",
    "bantuan coding",
    "pembuatan website",
    "harga ngodingin",
    "biaya jasa skripsi",
    "tim ngodingin",
    "produk ngodingin",
    "layanan ngodingin",
    "portofolio ngodingin",
    "kontak ngodingin",
    "teknologi ngodingin",
    "testimoni ngodingin",
    "paket harga tugas akhir",
    "developer ngodingin",
    "programmer indonesia",
    "jasa coding murah",
    "bantuan tugas akhir",
  ],
  creator: "Ngodingin Team",
  themeColor: "#000000",
  locale: "id_ID",
  type: "website",
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon-32x32.png",
  noIndex = false,
  keywords = siteConfig.keywords,
  canonicalUrl,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  keywords?: string[];
  canonicalUrl?: string;
} = {}): Metadata {
  const url = canonicalUrl || siteConfig.url;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [
      {
        name: siteConfig.creator,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    other: {
      "og:image:secure_url": image,
      "og:image:type": "image/png",
      "og:image:width": "1200",
      "og:image:height": "630",
      "whatsapp:image": image,
      "telegram:image": image,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteConfig.name}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: image,
          alt: `${title} - ${siteConfig.name}`,
        },
      ],
      creator: "@ngodingin_assist",
    },
    icons: {
      icon: icons,
      shortcut: icons,
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Schema.org structured data templates
export const schemaOrgData = {
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },

  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/ngodingin-512.png`,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-852-9838-9192",
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: "Indonesian",
    },
    sameAs: [
      "https://instagram.com/ngodingin-assist",
      "https://wa.me/6285298389192",
    ],
  },

  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Jasa Pembuatan Aplikasi untuk Tugas Akhir",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    description:
      "Layanan konsultasi dan pembuatan aplikasi web untuk tugas akhir mahasiswa, skripsi, dan thesis dengan teknologi modern.",
    serviceType: "Web Development",
    areaServed: "Indonesia",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: siteConfig.url,
      servicePhone: "+62-852-9838-9192",
    },
  },

  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),

  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Berapa harga jasa pembuatan aplikasi untuk tugas akhir di Ngodingin?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Harga mulai dari Rp 1.500.000 untuk aplikasi sederhana hingga Rp 5.000.000 untuk aplikasi kompleks. Harga tergantung kompleksitas fitur, teknologi yang digunakan, dan timeline pengerjaan.",
        },
      },
      {
        "@type": "Question",
        name: "Siapa saja tim developer di Ngodingin?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tim Ngodingin terdiri dari developer berpengalaman dengan keahlian dalam berbagai teknologi modern seperti React, Next.js, Node.js, Python, PHP, dan database management.",
        },
      },
      {
        "@type": "Question",
        name: "Apa saja produk dan layanan yang ditawarkan Ngodingin?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ngodingin menawarkan jasa pembuatan aplikasi web untuk tugas akhir, konsultasi IT, pengembangan sistem informasi, dan mentoring coding untuk mahasiswa.",
        },
      },
      {
        "@type": "Question",
        name: "Bagaimana cara menghubungi tim Ngodingin?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Anda dapat menghubungi Ngodingin melalui WhatsApp di +62-852-9838-9192, email ngodingin@protonmail.com, atau Instagram @ngodingin-assist.",
        },
      },
    ],
  },

  priceRange: {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    price: "1500000-5000000",
    priceCurrency: "IDR",
    description: "Harga jasa pembuatan aplikasi untuk tugas akhir",
  },

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.ngodingin-assist.tech",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: "+62-852-9838-9192",
    email: "ngodingin@protonmail.com",
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    serviceArea: {
      "@type": "Country",
      name: "Indonesia",
    },
    priceRange: "Rp 1.500.000 - Rp 5.000.000",
    paymentAccepted: ["Bank Transfer", "E-Wallet", "Cash"],
    openingHours: "Mo-Su 09:00-21:00",
    sameAs: [
      "https://instagram.com/ngodingin-assist",
      "https://wa.me/6285298389192",
    ],
  },
};
