import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import Footer from "@/components/partials/Footer";
import CustomNavbar from "@/components/partials/Navbar";
import { fontSans } from "@/config/fonts";
// import { Navbar } from "@/components/partials/Navbar";
import FloatingScrollToTop from "@/components/common/FloatingScrollToTop";

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
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
