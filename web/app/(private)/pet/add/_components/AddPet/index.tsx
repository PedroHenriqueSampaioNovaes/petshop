'use client';

import { useRouter } from 'next/navigation';
import { useForm, Resolver, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { IState } from '../AddPetWrapper';

import petCreate from '@/app/actions/pet-create';

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

    try {
      const { ok, error } = await petCreate(formData);

      if (!ok) {
        throw new Error(error);
      }

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
