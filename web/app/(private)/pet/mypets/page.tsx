import { Suspense } from 'react';
import Link from 'next/link';

import Title from '@/src/shared/components/Title';
import MyPetsWrapper from './_components/MyPetsWrapper';

export default async function MyPetsPage() {
  return (
    <section className="max-w-300 mx-auto">
      <div className="flex items-center justify-between">
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
