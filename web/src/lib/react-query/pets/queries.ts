import petsGet, { IPetsGetResponse } from '@/app/actions/pets-get';
import {
  infiniteQueryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';

export const petsInfiniteQuery = infiniteQueryOptions<IPetsGetResponse>({
  queryKey: ['pets'],
  queryFn: async ({ pageParam }: QueryFunctionContext) => {
    const cursor = pageParam as string | null;
    const { data, ok, error } = await petsGet({ nextCursor: cursor });

    if (!ok) throw new Error(error);

    return data;
  },
  initialPageParam: null,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
