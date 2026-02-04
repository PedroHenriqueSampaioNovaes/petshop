import { Suspense } from 'react';

import Title from '@/src/shared/components/Title';
import Subtitle from '@/src/shared/components/Subtitle';
import FeedWrapper from './_components/Feed/FeedWrapper';

export default function FeedPage() {
  return (
    <section>
      <Title className="mb-2.5">Adote um Pet</Title>
      <Subtitle>Veja os detalhes de cada um e conheça o tutor deles</Subtitle>

      <Suspense>
        <FeedWrapper />
      </Suspense>
    </section>
  );
}
