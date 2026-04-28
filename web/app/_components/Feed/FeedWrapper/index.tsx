import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Feed from '../';

import { petsInfiniteQuery } from '@/src/lib/react-query/pets/queries';

export default async function FeedWrapper() {
  const queryClient = new QueryClient();

  const { pages } = await queryClient.fetchInfiniteQuery(petsInfiniteQuery);

  if (!pages?.length) return <p>Ainda não há adoções de Pets.</p>;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Feed />
    </HydrationBoundary>
  );
}
