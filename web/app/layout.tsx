import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

import AppLayout from './_components/AppLayout';

const inter = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
        <Suspense>
          <AppLayout>{children}</AppLayout>
        </Suspense>

        <Toaster />
      </body>
    </html>
  );
}
