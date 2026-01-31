'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { IPet } from '@/src/common/@types/pets';

import petDelete from '@/app/actions/pet-delete';
import concludeAdoption from '@/app/actions/conclude-adoption';

interface IMyPets {
  pets: IPet[];
}

export default function MyPets({ pets = [] }: IMyPets) {
  async function onDeletePet(id: string) {
    const { ok, error } = await petDelete({ id });

    if (!ok) {
      toast.error(error);
      return;
    }

    toast.success('Pet excluído com sucesso!');
  }

  async function onConcludeAdoption(id: string) {
    const { ok, error } = await concludeAdoption(id);

    if (!ok) {
      toast.error(error);
      return;
    }

    toast.success('Adoção concluída com sucesso!');
  }

  return (
    <div className="mt-8">
      {pets.map((pet) => (
        <div
          key={pet._id}
          className="flex items-center justify-between max-md:flex-col gap-y-4.5 m-4 mr-0 max-md:ml-0 p-4 border-b border-secondary"
        >
          <div className="flex items-center gap-x-4 gap-y-2 max-md:flex-col">
            <Image
              src={pet.images[0].url}
              alt={pet.name}
              width={1200}
              height={1200}
              className="w-18.75 h-18.75 object-cover rounded-full"
            />
            <span className="text-secondary font-bold">{pet.name}</span>
          </div>

          <div className="flex gap-3 flex-wrap justify-center max-md:flex-col max-md:min-w-32.5">
            {pet.available ? (
              <>
                {pet.adopter && (
                  <button
                    className="cursor-pointer text-valid-500 text-xs font-secondary font-bold border-2 border-valid-500 px-3 py-1.5 rounded-sm hover:bg-valid-500 hover:text-white transition"
                    onClick={() => onConcludeAdoption(pet._id)}
                  >
                    Concluir adoção
                  </button>
                )}
                <Link
                  href={`/pet/edit/${pet._id}`}
                  className="text-secondary text-xs text-center font-secondary font-bold border-2 border-secondary px-3 py-1.5 rounded-sm hover:bg-secondary hover:text-white transition"
                >
                  Editar
                </Link>
                <button
                  className="cursor-pointer text-red-700 text-xs font-secondary font-bold border-2 border-red-700 px-3 py-1.5 rounded-sm hover:bg-red-700 hover:text-white transition"
                  onClick={() => onDeletePet(pet._id)}
                >
                  Excluir
                </button>
              </>
            ) : (
              <p>Pet já adotado</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
