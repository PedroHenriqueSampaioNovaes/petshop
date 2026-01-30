'use client';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import { PetFormSchema } from '@/src/schema/pet';

interface PreviewProps {
  petUrlImages?: string[];
}

export default function Preview({ petUrlImages }: PreviewProps) {
  const { watch } = useFormContext<PetFormSchema>();
  const files = watch('images');

  let preview: string[] = petUrlImages || [];
  if (files?.length) {
    preview = [];
    const filesArray = Array.from(files);
    filesArray.forEach((file) => preview.push(URL.createObjectURL(file)));
  }

  if (preview?.length !== 4) return null;
  return (
    <div className="flex justify-center flex-wrap">
      {preview.map((urlImage) => (
        <Image
          key={urlImage}
          src={urlImage}
          alt="Foto do pet"
          width={200}
          height={200}
          className="mx-3 mb-4 w-24 md:w-35 h-24 md:h-35 object-cover"
        />
      ))}
    </div>
  );
}
