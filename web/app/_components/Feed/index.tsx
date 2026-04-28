'use client';

import Card from './Card';

import useGetPetsOnInfiniteScroll from '@/src/hooks/useGetPetsOnInfiniteScroll';

export default function Feed() {
  const { pets, hasNextPage } = useGetPetsOnInfiniteScroll();

  return (
    <>
      <div className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {pets.map((pet, index) => (
          <Card key={pet._id} {...pet} loadingEager={index < 8} />
        ))}
      </div>

      {(!hasNextPage || pets.length === 0) && (
        <p className="text-center pb-1 pt-8 text-back-600 font-secondary">
          Não há pets cadastrados ou disponíveis para adoção no momento
        </p>
      )}
    </>
  );
}
