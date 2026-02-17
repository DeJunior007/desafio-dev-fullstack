import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/providers";
import AppNavbar from "@/components/Navbar";
import Footer from "@/components/footers/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simulador de Compensação Energética",
  description: "Desafio Fullstack UC Livre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="light scroll-smooth">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          flex
          flex-col
          bg-gradient-to-br from-orange-50 via-white to-orange-100/50 
        `}
      >
        <Providers>
          {/* NAVBAR */}
          <AppNavbar />

          {/* MAIN */}
          <main
            className="
            min-h-screen
              flex-1
              relative
            "
          >
            {children}
          </main>

          {/* FOOTER */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
