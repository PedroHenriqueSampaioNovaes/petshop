import { Metadata } from 'next';
import { Suspense } from 'react';

import EditPetWrapper from './_components/EditPetWrapper';

export const metadata: Metadata = {
  title: 'Adopt a Pet - Edite seu Pet',
  description:
    'Edite os dados do seu pet adicionando fotos, nome, raça, idade, etc...',
};

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPetPage({ params }: EditPageProps) {
  return (
    <section>
      <Suspense>
        <EditPetWrapper params={params} />
      </Suspense>
    </section>
  );
}
