import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import DevNavigation from "@/components/shared/DevNavigation";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnExpert Connect",
  description: "Integrated online platform for e-learning and expert guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            {/* The Header and Footer are now handled by individual layouts */}
            {children}
            {process.env.NODE_ENV === 'development' && <DevNavigation />}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
