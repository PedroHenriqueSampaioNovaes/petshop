'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface TanStackQueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function TanStackQueryProvider({
  children,
}: TanStackQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
