import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: IPetPage): Promise<Metadata> {
  const { id } = await params;
  const { data: pet, ok } = await petGet({ id });

  if (!ok || !pet) {
    return {
      title: 'Pet não encontrado - Adopt a Pet',
      description: 'O pet que você está procurando não foi encontrado.',
    };
  }

  return {
    title: `Adote o ${pet.name} | ${pet.breed} - Adopt a Pet`,
    description: `Conheça ${pet.name}, um ${pet.breed} de ${pet.age} ano${
      pet.age > 1 ? 's' : ''
    } esperando por um lar em ${pet.location.municipality}, ${
      pet.location.state
    }. Clique para saber mais!`,
    openGraph: {
      images: [pet.images[0].url],
    },
  };
}

import petGet from '@/app/actions/pet-get';

import Title from '@/src/shared/components/Title';
import Subtitle from '@/src/shared/components/Subtitle';
import Pet from './_components/Pet';

interface IPetPage {
  params: Promise<{ id: string }>;
}

export default async function PetPage({ params }: IPetPage) {
  const { id } = await params;

  const { data: pet, ok } = await petGet({ id });

  if (!ok) {
    return (
      <p>
        Ops! Algo deu errado e não conseguimos encontrar as informações sobre
        este pet!
      </p>
    );
  }

  return (
    <section className="max-w-300 mx-auto">
      <Title className="mb-2.5">Conheça o Pet:</Title>
      <Subtitle>
        Clicando em "Eu adoto" você terá que esperar o tutor do animal aceitar a
        adoção
      </Subtitle>

      <Pet pet={pet} />
    </section>
  );
}
