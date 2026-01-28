import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adopt a Pet - Cadastre seu Pet',
  description:
    'Cadastre o seu pet adicionando fotos, nome, raça, idade, etc...',
};

import Subtitle from '@/src/shared/components/Subtitle';
import Title from '@/src/shared/components/Title';

import AddPetWrapper from './_components/AddPetWrapper';

export default function AddPet() {
  return (
    <section>
      <Title className="text-center mb-2.5">Cadastre um Pet</Title>
      <Subtitle className="text-center">
        Depois ele ficará disponível para adoção
      </Subtitle>

      <div className="mt-8">
        <Suspense>
          <AddPetWrapper />
        </Suspense>
      </div>
    </section>
  );
}
