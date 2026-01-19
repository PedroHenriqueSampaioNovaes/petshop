import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

import Header from '@/src/shared/components/Header';
import Footer from '@/src/shared/components/Footer';

const inter = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Adopt a Pet',
  description:
    'Adote um pet e ajude a encontrar um lar para eles, onde poderão compartilhar muitos momentos felizes.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased font-primary`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
