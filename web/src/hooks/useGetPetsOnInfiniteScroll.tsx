'use client';

import { useCallback, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { petsInfiniteQuery } from '../lib/react-query/pets/queries';

export default function useGetPetsOnInfiniteScroll() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    ...petsInfiniteQuery,
    refetchOnMount: false,
  });

  const getPets = useCallback(async () => {
    await fetchNextPage();
  }, [fetchNextPage]);

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
