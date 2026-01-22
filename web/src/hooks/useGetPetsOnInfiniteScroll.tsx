'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { IPet } from '@/src/common/@types/pets';

import petsGet from '@/app/actions/pets-get';

export default function useGetPetsOnInfiniteScroll() {
  const [pets, setPets] = useState<IPet[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const nextCursorRef = useRef<string | null>(null);
  const isFetchingRef = useRef(false);

  const getPets = useCallback(async () => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;

    const { data, ok } = await petsGet({
      nextCursor: nextCursorRef.current,
    });

    if (!ok) {
      console.error('Falhou a busca por novos pets');
      return;
    }

    setPets((prev) => [...prev, ...data.pets]);
    setHasNextPage(data.hasNextPage);

    nextCursorRef.current = data.nextCursor;
    isFetchingRef.current = false;
  }, []);

  useEffect(() => {
    getPets();
  }, [getPets]);

  useEffect(() => {
    let wait = false;

    function handleScroll() {
      if (wait || !hasNextPage) return;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getPets, hasNextPage]);

  return {
    pets,
    hasNextPage,
  };
}
