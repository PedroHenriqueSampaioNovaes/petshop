import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adopt a Pet - Minhas Adoções',
  description:
    'Visualize e gerencie todos os pets que você adotou através da plataforma.',
};

import Title from '@/src/shared/components/Title';
import MyAdoptionsWrapper from './_components/MyAdoptionsWrapper';

export default async function MyAdoptionsPage() {
  return (
    <section className="max-w-300 mx-auto">
      <Title className="mb-8">Minhas Adoções</Title>

      <Suspense>
        <MyAdoptionsWrapper />
      </Suspense>
    </section>
  );
}
