'use client';

import Image from 'next/image';

import { IPet } from '@/src/common/@types/pets';

interface IMyAdoptionsProps {
  adoptions: IPet[];
}

export default function MyAdoptions({ adoptions }: IMyAdoptionsProps) {
  return (
    <div className="flex flex-col">
      {adoptions.map((pet) => (
        <div
          key={pet._id}
          className="flex max-md:flex-col items-center mb-5 pb-4 md:p-4 border-b text-secondary md:m-4.5 md:mr-0"
        >
          <Image
            src={pet.images[0].url}
            alt={pet.name}
            width={1200}
            height={1200}
            className="md:mr-4.5 w-18.75 h-18.75 rounded-full object-cover"
          />
          <span className="font-bold text-secondary mt-2 md:mt-0 md:min-w-25">
            {pet.name}
          </span>

          <div className="my-4.5 md:ml-8">
            <p>
              <span className="font-bold text-secondary">Ligue para:</span>{' '}
              {pet.user.phone}
            </p>
            <p>
              <span className="font-bold text-secondary">Fale com:</span>{' '}
              <span
                className="overflow-hidden whitespace-nowrap text-ellipsis md:max-w-47.5"
                title={pet.user.name}
              >
                {pet.user.name}
              </span>
            </p>
          </div>

          <div className="mt-4.5 md:ml-auto">
            {pet.available ? (
              <p>Adoção em processo</p>
            ) : (
              <p>Adoção finalizada</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
