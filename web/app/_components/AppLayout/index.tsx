import { UserContextProvider } from '@/src/context/UserContext';
import { AuthModalContextProvider } from '@/src/context/AuthModalContext';
import TanStackQueryProvider from '@/src/lib/tanstackQueryProvider';

import userGet from '@/app/actions/user-get';

import Header from '@/src/shared/components/Header';
import Footer from '@/src/shared/components/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const { data: user } = await userGet();

  return (
    <TanStackQueryProvider>
      <UserContextProvider userData={user}>
        <AuthModalContextProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container">{children}</main>
            <Footer />
          </div>
        </AuthModalContextProvider>
      </UserContextProvider>
    </TanStackQueryProvider>
  );
}
