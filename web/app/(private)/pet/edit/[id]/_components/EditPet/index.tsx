'use client';

import { useForm, Resolver, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { IState } from '../EditPetWrapper';

import { IPet } from '@/src/common/@types/pets';

import { petFormSchemaPartial, PetFormSchemaPartial } from '@/src/schema/pet';

import PetForm from '@/src/shared/components/PetForm';
import petUpdate from '@/app/actions/pet-update';

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
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        for (const file of Array.from(value as FileList)) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const { ok, error } = await petUpdate(formData, pet._id);

      if (!ok) {
        throw new Error(error);
      }

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
