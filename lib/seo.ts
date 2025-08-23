import { Metadata } from "next";

export const siteConfig = {
  name: "Ngodingin",
  description: "Jasa pengembangan aplikasi web dan mobile profesional untuk tugas akhir mahasiswa. Spesialis dalam sistem informasi, e-learning, dan aplikasi custom dengan teknologi modern.",
  url: "https://ngodingin-assist.vercel.app",
  ogImage: "https://ngodingin-assist.vercel.app/ngodingin-512.png",
  keywords: [
    "jasa pembuatan aplikasi",
    "pengembangan web",
    "aplikasi mobile",
    "tugas akhir",
    "skripsi",
    "sistem informasi",
    "Next.js",
    "React",
    "Node.js",
    "fullstack developer",
    "jasa coding",
    "pembuatan website",
    "aplikasi custom",
    "e-learning",
    "Kupang",
    "NTT"
  ],
  creator: "@ngodingin",
  authors: [
    {
      name: "Ngodingin Team",
      url: "https://ngodingin-assist.vercel.app",
    },
  ],
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/ngodingin-favicon-lts.png",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.creator,
    },
    icons,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function generateStructuredData(type: "WebSite" | "Organization" | "Service", data?: any) {
  const baseUrl = siteConfig.url;
  
  switch (type) {
    case "WebSite":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        description: siteConfig.description,
        url: baseUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: baseUrl,
        },
      };

    case "Organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        description: siteConfig.description,
        url: baseUrl,
        logo: `${baseUrl}/ngodingin-favicon-lts.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+62852-9838-9192",
          contactType: "customer service",
          availableLanguage: ["Indonesian"],
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kupang",
          addressRegion: "Nusa Tenggara Timur",
          addressCountry: "ID",
        },
        sameAs: [
          "https://instagram.com/ngodingin-assist",
        ],
        serviceArea: {
          "@type": "Place",
          name: "Indonesia",
        },
      };

    case "Service":
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Jasa Pengembangan Aplikasi",
        description: "Layanan pengembangan aplikasi web dan mobile profesional untuk tugas akhir mahasiswa",
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: baseUrl,
        },
        serviceType: "Software Development",
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Aplikasi Web Development",
                description: "Pengembangan aplikasi web menggunakan teknologi modern seperti Next.js, React, dan Node.js",
              },
            },
            {
              "@type": "Offer", 
              itemOffered: {
                "@type": "Service",
                name: "Aplikasi Mobile Development",
                description: "Pengembangan aplikasi mobile untuk Android dan iOS",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service", 
                name: "Sistem Informasi",
                description: "Pengembangan sistem informasi manajemen untuk berbagai kebutuhan bisnis",
              },
            },
          ],
        },
        ...data,
      };

    default:
      return null;
  }
}