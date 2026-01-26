import Link from 'next/link';

import { IPet } from '@/src/common/@types/pets';

import Image from 'next/image';

export default function Card({
  _id,
  name,
  age,
  breed,
  gender,
  castrationStatus,
  images,
  location,
}: IPet) {
  return (
    <div className="rounded-2xl overflow-hidden border border-back-300">
      <Image
        src={images[0].url}
        alt={name}
        width={300}
        height={300}
        loading="eager"
        className="h-45 w-full object-cover"
      />

      <div className="p-4 pb-6 flex flex-col gap-4">
        <h3 className="text-secondary text-lg font-bold">{name}</h3>
        <div className="flex items-center gap-2.5">
          <svg
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.66667 0C2.08667 0 0 2.08667 0 4.66667C0 8.16667 4.66667 13.3333 4.66667 13.3333C4.66667 13.3333 9.33333 8.16667 9.33333 4.66667C9.33333 2.08667 7.24667 0 4.66667 0ZM1.33333 4.66667C1.33333 2.82667 2.82667 1.33333 4.66667 1.33333C6.50667 1.33333 8 2.82667 8 4.66667C8 6.58667 6.08 9.46 4.66667 11.2533C3.28 9.47333 1.33333 6.56667 1.33333 4.66667Z"
              fill="#444"
            />
            <path
              d="M4.66667 6.33333C5.58714 6.33333 6.33333 5.58714 6.33333 4.66667C6.33333 3.74619 5.58714 3 4.66667 3C3.74619 3 3 3.74619 3 4.66667C3 5.58714 3.74619 6.33333 4.66667 6.33333Z"
              fill="#444"
            />
          </svg>
          <p className="text-back-700 text-sm font-semibold">
            {location.municipality}, {location.state}
          </p>
        </div>

        <ul className="grid max-xs:grid-cols-2 lg:grid-cols-2 max-lg:gap-2">
          <li className="lg:mb-3">
            <span className="font-medium">Gênero:</span>{' '}
            <span className="text-xs p-1 rounded-sm text-black bg-[#ffda6b] capitalize">
              {gender === 'male' ? 'macho' : 'fêmea'}
            </span>
          </li>
          <li>
            <span className="font-medium">Raça:</span>{' '}
            <span className="text-xs p-1 rounded-sm text-black bg-[#ffda6b] capitalize">
              {breed}
            </span>
          </li>
          <li>
            <span className="font-medium">Idade:</span>{' '}
            <span className="text-xs p-1 rounded-sm text-black bg-[#ffda6b]">
              {age} ano{age > 1 ? 's' : ''}
            </span>
          </li>
          <li>
            <span className="font-medium">Castrado:</span>{' '}
            <span className="text-xs p-1 rounded-sm text-black bg-[#ffda6b] capitalize">
              {castrationStatus ? 'sim' : 'não'}
            </span>
          </li>
        </ul>

        <Link
          href={`/pet/${_id}`}
          className="w-full text-center py-3.5 text-secondary border border-secondary hover:border-primary hover:bg-primary font-bold font-secondary rounded-lg transition"
        >
          Mais detalhes
        </Link>
      </div>
    </div>
  );
}
