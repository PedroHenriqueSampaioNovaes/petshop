import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

import Header from '@/src/shared/components/Header';
import Footer from '@/src/shared/components/Footer';

import userGet from './actions/user-get';

import { UserContextProvider } from '@/src/context/UserContext';
import { AuthModalContextProvider } from '@/src/context/AuthModalContext';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await userGet();

  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased font-primary`}
      >
        <UserContextProvider userData={user}>
          <AuthModalContextProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 container">{children}</main>
              <Footer />
            </div>
          </AuthModalContextProvider>
        </UserContextProvider>

        <Toaster />
      </body>
    </html>
  );
}
