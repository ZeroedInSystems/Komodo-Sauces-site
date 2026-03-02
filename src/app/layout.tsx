import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://komodosauces.com",
  ),
  title: {
    template: "%s | Komodo Sauces",
    default: "Komodo Sauces — Premium Hot Sauces",
  },
  description:
    "Small-batch, chef-crafted Indonesian hot sauces. Four generations of flavor, made with purpose.",
  openGraph: {
    type: "website",
    siteName: "Komodo Sauces",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@komodosauces",
    creator: "@komodosauces",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-komodo-black text-komodo-white antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-komodo-red focus:px-4 focus:py-2 focus:text-xs focus:font-black focus:uppercase focus:tracking-widest focus:text-komodo-white focus:outline-none"
        >
          Skip to main content
        </a>
        <CartProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
