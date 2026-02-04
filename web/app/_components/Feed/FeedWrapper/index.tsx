import petsGet from '@/app/actions/pets-get';

import Feed from '../';

export default async function FeedWrapper() {
  const { data, ok } = await petsGet({});

  if (!ok) return <p>Erro ao buscar os pets.</p>;
  if (data.pets.length === 0) return <p>Ainda não há adoções de Pets.</p>;

  return <Feed petsData={data} />;
}
