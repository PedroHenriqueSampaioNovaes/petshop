import myPetsGet from '@/app/actions/mypets-get';

import MyPets from '../MyPets';

export default async function MyPetsWrapper() {
  const { data, ok } = await myPetsGet();

  if (!ok) {
    return <p>Ops! Ocorreu um erro e não foi possível listar os seus pets</p>;
  }

  return <MyPets pets={data} />;
}
