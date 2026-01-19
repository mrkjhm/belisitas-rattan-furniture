import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import LenisProvider from "@/components/Providers/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Belisitas Rattan Furniture",
  description: "Belisitas Rattan Furniture",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <Providers>
          <LenisProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
            </div>
          </LenisProvider>
        </Providers>
      </body>
    </html>
  );
}
