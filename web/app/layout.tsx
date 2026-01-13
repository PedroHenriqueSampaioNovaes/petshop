import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

import Header from '@/src/shared/components/Header';

const inter = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: '500',
});

export const metadata: Metadata = {
  title: 'Adopt a Pet',
  description:
    'Adote um pet e ajude a encontrar um lar para eles, onde poderão compartilhar muitos momentos felizes.',
};

export default function RootLayout({
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
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
