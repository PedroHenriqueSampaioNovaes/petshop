import Link from 'next/link';
import Image from 'next/image';

import { IPet } from '@/src/common/@types/pets';

import { MdOutlineLocationOn } from 'react-icons/md';

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
          <MdOutlineLocationOn />
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
