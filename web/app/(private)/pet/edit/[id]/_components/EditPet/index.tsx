'use client';

import { useForm, Resolver, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { IState } from '../EditPetWrapper';

import { IPet } from '@/src/common/@types/pets';

import FetchApi from '@/src/common/utils/FetchApi';

import removeCacheTag from '@/app/actions/remove-cache-tag';

import { PET_UPDATE } from '@/src/common/api';

import { petFormSchemaPartial, PetFormSchemaPartial } from '@/src/schema/pet';

import { uploadMany } from '@/src/common/utils/uploadMany';
import { IUploadedFile } from '@/src/common/@types/upload';

import PetForm from '@/src/shared/components/PetForm';
import getToken from '@/app/actions/get-token';

interface EditPetProps {
  states: IState[];
  pet: IPet;
}

export default function EditPet({ states, pet }: EditPetProps) {
  const methods = useForm<PetFormSchemaPartial>({
    resolver: zodResolver(
      petFormSchemaPartial,
    ) as Resolver<PetFormSchemaPartial>,
    defaultValues: {
      images: [] as unknown as FileList,
      name: pet.name,
      age: pet.age.toString(),
      breed: pet.breed,
      gender: pet.gender,
      castrationStatus: pet.castrationStatus.toString(),
      weight: pet.weight.toString(),
      state: pet.location.state,
      municipality: pet.location.municipality,
      description: pet.description,
    },
  });

  async function onSubmit(data: PetFormSchemaPartial) {
    const petData: Omit<PetFormSchemaPartial, 'images'> & {
      images: IUploadedFile[];
    } = { ...data, images: [] };

    const token = await getToken();

    const { url } = PET_UPDATE({ id: pet._id });

    try {
      if (data.images.length) {
        const images = await uploadMany(data.images, 'pets');
        images.forEach(
          (image) =>
            (petData.images = [
              ...petData.images,
              { public_id: image.public_id, secure_url: image.secure_url },
            ]),
        );
      }

      await FetchApi.patch(url, {
        body: JSON.stringify(petData),
        headers: {
          'Content-Type': 'application/json',
        },
        token,
      });

      await removeCacheTag('get-mypet', true);
      await removeCacheTag('get-pet');
      await removeCacheTag('get-pets');

      toast.success('Pet editado com sucesso!');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <FormProvider {...methods}>
      <PetForm
        onSubmit={methods.handleSubmit(onSubmit)}
        stateOptions={states.map((state) => ({
          value: state.sigla,
          label: state.nome,
        }))}
        callToAction="Editar Pet"
        petUrlImages={pet.images.map((image) => image.url)}
      />
    </FormProvider>
  );
}
