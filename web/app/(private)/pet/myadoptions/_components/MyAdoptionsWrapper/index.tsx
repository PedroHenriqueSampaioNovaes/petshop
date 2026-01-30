import userAdoptions from '@/app/actions/user-adoptions';

import MyAdoptions from '../MyAdoptions';

export default async function MyAdoptionsWrapper() {
  const { data, ok } = await userAdoptions();

  if (!ok) return <p>Erro ao buscar adoções.</p>;
  if (data.length === 0) return <p>Ainda não há adoções de Pets.</p>;

  return <MyAdoptions adoptions={data} />;
}
