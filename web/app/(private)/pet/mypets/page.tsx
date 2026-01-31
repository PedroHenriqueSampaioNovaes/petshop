import { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adopt a Pet - Meus Pets',
  description: 'Cadastre, exclua ou edite as informações sobre seu pet.',
};

import Title from '@/src/shared/components/Title';
import MyPetsWrapper from './_components/MyPetsWrapper';

export default async function MyPetsPage() {
  return (
    <section className="max-w-300 mx-auto">
      <div className="flex items-center justify-between max-md:flex-col gap-3">
        <Title>Meus Pets</Title>
        <Link
          href="/pet/add"
          className="bg-secondary text-white rounded-md font-bold font-secondary py-2 px-3 border-2 border-secondary hover:bg-white hover:text-secondary transition"
        >
          Cadastrar Pet
        </Link>
      </div>

      <Suspense>
        <MyPetsWrapper />
      </Suspense>
    </section>
  );
}
