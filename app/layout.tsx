import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import Footer from "@/components/partials/Footer";
import CustomNavbar from "@/components/partials/Navbar";
import { fontSans } from "@/config/fonts";
// import { Navbar } from "@/components/partials/Navbar";
import FloatingScrollToTop from "@/components/common/FloatingScrollToTop";
import FloatingWhatsAppButton from "@/components/common/FloatingWhatsAppButton";

export const metadata: Metadata = {
  title: "Ngodingin",

  // description: siteConfig.description,
  icons: {
    icon: "/ngodingin-favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
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
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-san   antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <CustomNavbar />
            <FloatingScrollToTop /> {/* muncul di semua page */}
            <FloatingWhatsAppButton
              defaultContact={{
                name: "Admin Ngodingin",
                number: "62812345678",
                prefilledText:
                  "Halo! Saya tertarik untuk konsultasi terkait tugas akhir.",
              }}
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
            />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
