'use client';

import Subtitle from '@/src/shared/components/Subtitle';
import Title from '@/src/shared/components/Title';
import Card from '../Card';

import useGetPetsOnInfiniteScroll from '@/src/hooks/useGetPetsOnInfiniteScroll';

export default function Feed() {
  const { pets, hasNextPage } = useGetPetsOnInfiniteScroll();

  return (
    <section>
      <Title className="mb-2.5">Adote um Pet</Title>
      <Subtitle>Veja os detalhes de cada um e conheça o tutor deles</Subtitle>

      <div className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {pets.map((pet) => (
          <Card key={pet._id} {...pet} />
        ))}
      </div>

      {(!hasNextPage || pets.length === 0) && (
        <p className="text-center pb-1 pt-8 text-back-600 font-secondary">
          Não há pets cadastrados ou disponíveis para adoção no momento
        </p>
      )}
    </section>
  );
}
