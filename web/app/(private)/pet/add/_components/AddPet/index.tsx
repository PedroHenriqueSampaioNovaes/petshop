'use client';

import { useRouter } from 'next/navigation';
import { useForm, Resolver, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { IState } from '../AddPetWrapper';

import { PET_CREATE } from '@/src/common/api';

import getToken from '@/app/actions/get-token';
import removeCacheTag from '@/app/actions/remove-cache-tag';

import { petFormSchema, PetFormSchema } from '@/src/schema/pet';

import PetForm from '@/src/shared/components/PetForm';

interface AddPetProps {
  states: IState[];
}

export default function AddPet({ states }: AddPetProps) {
  const methods = useForm<PetFormSchema>({
    resolver: zodResolver(petFormSchema) as Resolver<PetFormSchema>,
    defaultValues: {
      images: undefined,
      name: '',
      age: '',
      breed: '',
      gender: '',
      castrationStatus: undefined,
      weight: '',
      state: '',
      municipality: '',
      description: '',
    },
  });

  const router = useRouter();

  async function onSubmit(data: PetFormSchema) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        for (const file of value) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, value);
      }
    });

    const token = await getToken();

    const { url } = PET_CREATE();

    try {
      const response = await fetch(url, {
        method: 'POST',
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
      await removeCacheTag('get-pets');

      toast.success('Pet cadastrado com sucesso!');
      router.push('/pet/mypets');
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
        callToAction="Cadastrar Pet"
      />
    </FormProvider>
  );
}
