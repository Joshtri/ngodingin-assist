// components/seo/StructuredData.tsx
"use client";

import Script from "next/script";

export function OrganizationStructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ngodingin",
    alternateName: "Ngodingin Assist",
    url: "https://ngodingin.vercel.app",
    logo: "https://ngodingin.vercel.app/ngodingin-512.png",
    description:
      "Jasa pembuatan aplikasi tugas akhir, sistem informasi, web development, dan mobile app development untuk mahasiswa di Indonesia Timur",
    foundingDate: "2019",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-852-9838-9192",
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: ["Indonesian"],
    },
    sameAs: ["https://www.instagram.com/ngodingin-assist"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kupang",
      addressRegion: "Nusa Tenggara Timur",
      addressCountry: "ID",
    },
    areaServed: {
      "@type": "Place",
      name: "Indonesia Timur",
    },
  };

  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData),
      }}
      id="organization-structured-data"
      type="application/ld+json"
    />
  );
}

export function LocalBusinessStructuredData() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ngodingin.vercel.app",
    name: "Ngodingin",
    description:
      "Jasa pembuatan aplikasi tugas akhir, sistem informasi, web development, dan mobile app development untuk mahasiswa di Indonesia Timur",
    url: "https://ngodingin.vercel.app",
    telephone: "+62-852-9838-9192",
    email: "ngodingin@protonmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kupang",
      addressRegion: "Nusa Tenggara Timur",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -10.1772,
      longitude: 123.607,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
    priceRange: "Rp 800.000 - Rp 5.500.000",
    servesCuisine: null,
    areaServed: [
      {
        "@type": "Place",
        name: "Kupang",
      },
      {
        "@type": "Place",
        name: "Nusa Tenggara Timur",
      },
      {
        "@type": "Place",
        name: "Indonesia Timur",
      },
    ],
  };

  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessData),
      }}
      id="local-business-structured-data"
      type="application/ld+json"
    />
  );
}

export function ServiceStructuredData() {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development",
    provider: {
      "@type": "Organization",
      name: "Ngodingin",
      url: "https://ngodingin.vercel.app",
    },
    areaServed: {
      "@type": "Place",
      name: "Indonesia Timur",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Development Aplikasi",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pembuatan Aplikasi Tugas Akhir",
            description:
              "Jasa pembuatan aplikasi untuk skripsi dan tugas akhir mahasiswa",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sistem Informasi",
            description:
              "Development sistem informasi untuk berbagai kebutuhan organisasi",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description: "Pembuatan website dan aplikasi web modern",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "Pembuatan aplikasi mobile Android dan iOS",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sistem Pendukung Keputusan",
            description:
              "Development sistem pendukung keputusan dengan algoritma SAW, TOPSIS, dan lainnya",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Learning Platform",
            description:
              "Pembuatan platform pembelajaran online dan sistem ujian",
          },
        },
      ],
    },
  };

  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceData),
      }}
      id="service-structured-data"
      type="application/ld+json"
    />
  );
}

export function WebsiteStructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ngodingin.vercel.app/#website",
    url: "https://ngodingin.vercel.app",
    name: "Ngodingin",
    description:
      "Jasa pembuatan aplikasi tugas akhir, sistem informasi, web development, dan mobile app development",
    publisher: {
      "@id": "https://ngodingin.vercel.app/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://ngodingin.vercel.app/?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "id-ID",
  };

  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteData),
      }}
      id="website-structured-data"
      type="application/ld+json"
    />
  );
}
