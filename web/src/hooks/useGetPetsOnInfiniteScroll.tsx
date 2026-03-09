'use client';

import { useCallback, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { IPetsGetResponse } from '@/app/actions/pets-get';

export default function useGetPetsOnInfiniteScroll(petsData: IPetsGetResponse) {
  async function fetchPets({ pageParam }: { pageParam: string | null }) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pets?petsPerPage=8&nextCursor=${pageParam}`,
    );
    if (!res.ok)
      throw new Error('Um erro ocorreu e não foi possível buscar pelos pets');

    return res.json();
  }

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['pets'],
    queryFn: fetchPets,
    initialData: { pages: [petsData], pageParams: [null] },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnMount: false,
  });

  const getPets = useCallback(async () => {
    await fetchNextPage();
  }, []);

  useEffect(() => {
    let wait = false;

    function handleScroll() {
      if (wait || !hasNextPage || isFetching) return;

      const { scrollHeight, scrollTop } = document.documentElement;
      const viewportHeight = window.innerHeight;

      const finalScrollDistance = (scrollHeight - viewportHeight) * 0.6;
      const canAction = finalScrollDistance < scrollTop;

      if (canAction) {
        getPets();
        wait = true;
        setTimeout(() => {
          wait = false;
        }, 500);
      }
    }
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getPets, hasNextPage, isFetching]);

  return {
    pets: data?.pages.flatMap((page) => page.pets) || [],
    hasNextPage: hasNextPage,
  };
}
