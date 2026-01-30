'use client';

import { useForm, Resolver, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import z from 'zod';

import { IState } from '../EditPetWrapper';

import petUpdate from '@/app/actions/pet-update';

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

    const { ok, error } = await petUpdate(formData, pet._id);

    if (!ok) {
      toast.error(error);
      return;
    }

    toast.success('Pet editado com sucesso!');
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
