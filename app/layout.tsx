import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import Footer from "@/components/partials/Footer";
import CustomNavbar from "@/components/partials/Navbar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
// import { Navbar } from "@/components/partials/Navbar";
import FloatingScrollToTop from "@/components/common/FloatingScrollToTop";
import FloatingWhatsAppButton from "@/components/common/FloatingWhatsAppButton";
import {
  OrganizationStructuredData,
  LocalBusinessStructuredData,
  ServiceStructuredData,
  WebsiteStructuredData,
} from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: {
    default:
      siteConfig.name +
      " - Jasa Pembuatan Aplikasi Tugas Akhir & Sistem Informasi",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.openGraph.locale,
    url: siteConfig.openGraph.url,
    siteName: siteConfig.openGraph.siteName,
    title: siteConfig.openGraph.title,
    description: siteConfig.openGraph.description,
    images: siteConfig.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.twitter.title,
    description: siteConfig.twitter.description,
    images: siteConfig.twitter.images,
    creator: siteConfig.twitter.creator,
  },
  verification: siteConfig.verification,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/ngodingin-favicon-lts.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/ngodingin-favicon-lts.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="id">
      <head>
        <OrganizationStructuredData />
        <LocalBusinessStructuredData />
        <ServiceStructuredData />
        <WebsiteStructuredData />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-san   antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <CustomNavbar />
            <FloatingScrollToTop /> {/* muncul di semua page */}
            <FloatingWhatsAppButton
              contacts={[
                {
                  name: "Admin Ngodingin",
                  number: "62812345678",
                  prefilledText:
                    "Halo! Saya tertarik untuk konsultasi terkait tugas akhir.",
                },
                {
                  name: "Technical Support",
                  number: "62887654321",
                  prefilledText: "Halo! Saya butuh bantuan teknis.",
                },
              ]}
              defaultContact={{
                name: "Admin Ngodingin",
                number: "62812345678",
                prefilledText:
                  "Halo! Saya tertarik untuk konsultasi terkait tugas akhir.",
              }}
            />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
