'use client';

import { useRouter } from 'next/navigation';
import { useForm, Resolver, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { IUploadedFile } from '@/src/common/@types/upload';

import { IState } from '../AddPetWrapper';
import { PET_CREATE } from '@/src/common/api';

import removeCacheTag from '@/app/actions/remove-cache-tag';
import getToken from '@/app/actions/get-token';

import FetchApi from '@/src/common/utils/FetchApi';
import { uploadMany } from '@/src/common/utils/uploadMany';

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
    const petData: Omit<PetFormSchema, 'images'> & {
      images: IUploadedFile[];
    } = { ...data, images: [] };

    const token = await getToken();

    const { url } = PET_CREATE();

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

      await FetchApi.post(url, {
        body: JSON.stringify(petData),
        headers: {
          'Content-Type': 'application/json',
        },
        token,
      });

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
