import petGet from '@/app/actions/pet-get';

import EditPet from '../EditPet';
import Title from '@/src/shared/components/Title';
import Subtitle from '@/src/shared/components/Subtitle';

export interface IState {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

interface IEditPetWrapperProps {
  params: Promise<{ id: string }>;
}

export async function fetchStates() {
  const response = await fetch('https://brasilapi.com.br/api/ibge/uf/v1', {
    cache: 'force-cache',
    next: {
      revalidate: 60 * 60 * 24 * 7,
    },
  });
  const states: IState[] = await response.json();

  return states;
}

export default async function EditPetWrapper({ params }: IEditPetWrapperProps) {
  const { id } = await params;

  const [states, petResponse] = await Promise.all([
    fetchStates(),
    petGet({ id }),
  ]);
  const { data: pet, ok } = petResponse;

  if (!ok) {
    return <p>Pet não encontrado.</p>;
  }

  return (
    <>
      <Title className="text-center mb-2.5">Editando o Pet: {pet.name}</Title>
      <Subtitle className="text-center">
        Depois da edição os dados serão atualizados no sistema
      </Subtitle>

      <div className="mt-8">
        <EditPet states={states} pet={pet} />
      </div>
    </>
  );
}
