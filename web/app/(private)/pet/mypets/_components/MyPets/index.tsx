'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { IPet } from '@/src/common/@types/pets';

import petDelete from '@/app/actions/pet-delete';

interface IMyPets {
  pets: IPet[];
}

export default function MyPets({ pets = [] }: IMyPets) {
  async function deletePet(id: string) {
    const { ok, error } = await petDelete({ id });

    if (!ok) {
      toast.error(error);
      return;
    }

    toast.success('Pet excluído com sucesso!');
  }

  return (
    <div className="mt-8">
      {pets.map((pet) => (
        <div
          key={pet._id}
          className="flex items-center justify-between m-4 mr-0 p-4 border-b border-secondary"
        >
          <div className="flex items-center gap-4">
            <Image
              src={pet.images[0].url}
              alt={pet.name}
              width={1200}
              height={1200}
              className="w-18.75 h-18.75 object-cover rounded-full"
            />
            <span className="text-secondary font-bold">{pet.name}</span>
          </div>

          <div>
            <Link
              href={`/pet/edit/${pet._id}`}
              className="text-secondary text-xs font-secondary font-bold border-2 border-secondary px-3 py-1.5 rounded-sm hover:bg-secondary hover:text-white transition"
            >
              Editar
            </Link>
            <button
              className="cursor-pointer ml-3 text-red-700 text-xs font-secondary font-bold border-2 border-red-700 px-3 py-1.5 rounded-sm hover:bg-red-700 hover:text-white transition"
              onClick={() => deletePet(pet._id)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
