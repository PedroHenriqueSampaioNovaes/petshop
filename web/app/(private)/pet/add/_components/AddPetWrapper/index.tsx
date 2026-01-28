import AddPet from '../AddPet';

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

export default async function AddPetWrapper() {
  const response = await fetch('https://brasilapi.com.br/api/ibge/uf/v1', {
    cache: 'force-cache',
    next: {
      revalidate: 60 * 60 * 24 * 7,
    },
  });
  const states: IState[] = await response.json();

  return <AddPet states={states} />;
}
