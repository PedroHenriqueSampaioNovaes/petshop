'use client';

import { useEffect, useState } from 'react';

import petsGet from '@/app/actions/pets-get';

import { IPet } from '@/src/common/@types/pets';

interface IPetsResponse {
  pets: IPet[];
  hasNextPage: boolean;
  nextCursor: string | null;
}

export default function useGetPetsOnInfiniteScroll() {
  const [responsePetData, setResponsePetData] = useState<IPetsResponse>({
    pets: [],
    nextCursor: null,
    hasNextPage: true,
  });
  const [fetchPets, setFetchPets] = useState(true);
  const pets = responsePetData.pets;

  useEffect(() => {
    async function getPets() {
      if (!fetchPets || !responsePetData.hasNextPage) return;

      const { data, ok } = await petsGet({
        nextCursor: responsePetData.nextCursor,
      });

      if (!ok) return;
      setResponsePetData((prev) => ({
        pets: [...prev.pets, ...data.pets],
        nextCursor: data.nextCursor,
        hasNextPage: data.hasNextPage,
      }));
      setFetchPets(false);
    }
    getPets();
  }, [fetchPets]);

  useEffect(() => {
    let wait = false;

    function handleScroll() {
      if (wait || !responsePetData.hasNextPage) return;

      const { scrollHeight, scrollTop } = document.documentElement;
      const viewportHeight = window.innerHeight;

      const finalScrollDistance = (scrollHeight - viewportHeight) * 0.6;
      const canAction = finalScrollDistance < scrollTop;

      if (canAction) {
        setFetchPets(true);
        wait = true;
        setTimeout(() => {
          wait = false;
        }, 500);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    pets,
    hasNextPage: responsePetData.hasNextPage,
    nextCursor: responsePetData.nextCursor,
  };
}
