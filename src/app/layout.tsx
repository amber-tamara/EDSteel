// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="min-h-screen" lang="en">
      <body className="text-white min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow xl:px-25 md:px-8 px-4">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
