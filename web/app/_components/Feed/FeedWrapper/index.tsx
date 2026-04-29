import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Feed from '../';

import { petsInfiniteQuery } from '@/src/lib/react-query/pets/queries';

export default async function FeedWrapper() {
  const queryClient = new QueryClient();

  try {
    const { pages } = await queryClient.fetchInfiniteQuery(petsInfiniteQuery);

    if (!pages?.length) return <p>Ainda não há adoções de Pets.</p>;
  } catch {
    // Durante o build/prerender a API pode não estar disponível.
    // Nesse caso, renderizamos sem prefetch e deixamos o client-side buscar os dados.
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Feed />
    </HydrationBoundary>
  );
}
