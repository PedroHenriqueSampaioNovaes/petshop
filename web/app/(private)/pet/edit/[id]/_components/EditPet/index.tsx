'use client';

import { useForm, Resolver, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { IState } from '../EditPetWrapper';

import { PET_UPDATE } from '@/src/common/api';

import getToken from '@/app/actions/get-token';
import removeCacheTag from '@/app/actions/remove-cache-tag';

import { IPet } from '@/src/common/@types/pets';

import { petFormSchemaPartial, PetFormSchemaPartial } from '@/src/schema/pet';

import PetForm from '@/src/shared/components/PetForm';

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
      images: undefined,
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
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) return;

      if (value instanceof FileList) {
        for (const file of value) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, value as string);
      }
    });

    const token = await getToken();

    const { url } = PET_UPDATE({ id: pet._id });

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

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
