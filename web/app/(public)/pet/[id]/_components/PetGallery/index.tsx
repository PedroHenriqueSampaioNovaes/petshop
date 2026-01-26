'use client';

import { useState } from 'react';
import Image from 'next/image';

import { IPet } from '@/src/common/@types/pets';

export default function PetGallery({ pet }: { pet: IPet }) {
  const [selectedImage, setSelectedImage] = useState(pet.images[0]);

  return (
    <div className="lg:w-[60%] grid sm:max-lg:grid-cols-[6fr_1fr] content-start gap-x-6 gap-y-4 sm:gap-y-6.5">
      <Image
        key={selectedImage.public_id}
        src={selectedImage.url}
        alt={pet.name}
        width={1200}
        height={1200}
        className="rounded-2xl object-contain h-60 sm:h-102 animate-fadeInImage"
        loading="eager"
      />
      <div className="flex sm:max-lg:flex-col justify-between max-sm:gap-4 lg:gap-6.5">
        {pet.images.map((_, index) => (
          <button
            key={pet.images[index].public_id}
            className="cursor-pointer"
            onClick={() => setSelectedImage(pet.images[index])}
          >
            <Image
              src={pet.images[index].url}
              alt={pet.name}
              width={1200}
              height={1200}
              className="rounded-2xl object-cover h-15 sm:h-20 lg:h-30"
              loading="eager"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
