import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '900'],
  variable: '--font-geist-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`min-h-screen ${inter.variable}`} lang="en">
      <body className="text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow px-5 md:px-15">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
