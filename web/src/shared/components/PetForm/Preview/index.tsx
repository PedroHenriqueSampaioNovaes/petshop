'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import { PetFormSchema } from '..';

interface PreviewProps {
  petUrlImages?: string[];
}

export default function Preview({ petUrlImages }: PreviewProps) {
  const { watch } = useFormContext<PetFormSchema>();
  const [preview, setPreview] = useState<string[] | null>(petUrlImages || null);

  const images = watch('images');

  useEffect(() => {
    function handleFile() {
      const files = images;

      if (files) {
        const filesArray = Array.from(files);
        const urlsImage: string[] = [];
        filesArray.forEach((file) => urlsImage.push(URL.createObjectURL(file)));
        setPreview(urlsImage);
      }
    }
    handleFile();
  }, [images, setPreview]);

  if (images?.length !== 4) return null;
  return (
    <div className="flex justify-center flex-wrap">
      {preview &&
        preview.map((urlImage) => (
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
