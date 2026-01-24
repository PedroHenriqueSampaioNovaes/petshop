import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adopt a Pet - Conheça o PET',
  description:
    'Conheça informações detalhadas sobre o PET que você se interessou. Ao clicar em "Eu adoto", você terá que esperar o tutor do animal aceitar a adoção.',
};

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
