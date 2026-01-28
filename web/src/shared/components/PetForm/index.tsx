'use client';

import { FormEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';

import { InputLabel } from '../Forms/Input';
import Button from '../Button';
import ComboboxField, { Option } from '../Forms/ComboboxField';
import Textarea from '../Forms/Textarea';
import Preview from './Preview';
import MunicipalityField from './MunicipalityField';

import { PetFormSchema } from '@/src/schema/pet';

const genderOptions = [
  { value: 'male', label: 'Macho' },
  { value: 'female', label: 'Fêmea' },
];

const castrationOptions = [
  { value: 'true', label: 'Castrado' },
  { value: 'false', label: 'Não castrado' },
];

interface PetFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  stateOptions: Option[];
  petUrlImages?: string[];
  callToAction: string;
}

export default function PetForm({
  onSubmit,
  stateOptions,
  petUrlImages,
  callToAction,
}: PetFormProps) {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<PetFormSchema>();

  return (
    <>
      <Preview petUrlImages={petUrlImages} />

      <form
        onSubmit={onSubmit}
        className="max-w-75 mx-auto flex flex-col gap-4 w-full"
      >
        <InputLabel
          label="Imagens do Pet:"
          type="file"
          multiple
          accept="image/jpeg, image/png, image/webp"
          register={register('images')}
          error={errors.images?.message as string}
          centralizedLabel
        />

        <InputLabel
          label="Nome do Pet:"
          placeholder="Digite o nome"
          register={register('name')}
          error={errors.name?.message as string}
          centralizedLabel
        />

        <InputLabel
          label="Idade do Pet:"
          placeholder="Digite a idade"
          type="number"
          min={0}
          register={register('age')}
          error={errors.age?.message as string}
          centralizedLabel
        />

        <InputLabel
          label="Peso do Pet:"
          placeholder="Digite o peso"
          type="number"
          min={0}
          register={register('weight')}
          error={errors.weight?.message as string}
          centralizedLabel
        />

        <InputLabel
          label="Raça do pet:"
          placeholder="Digite a raça"
          register={register('breed')}
          error={errors.breed?.message as string}
          centralizedLabel
        />

        <ComboboxField
          label="Selecione o gênero:"
          name="gender"
          control={control}
          options={genderOptions}
          error={errors.gender?.message as string}
          centralizedLabel
        />

        <ComboboxField
          label="Selecione o status da castração:"
          name="castrationStatus"
          control={control}
          options={castrationOptions}
          error={errors.castrationStatus?.message as string}
          centralizedLabel
        />

        <ComboboxField
          label="Selecione o estado:"
          name="state"
          control={control}
          options={stateOptions}
          error={errors.state?.message as string}
          centralizedLabel
        />

        <MunicipalityField />

        <Textarea
          label="Descrição do Pet:"
          placeholder="Descreva com detalhes o seu pet"
          register={register('description')}
          error={errors.description?.message as string}
          centralizedLabel
        />

        <Button type="submit" disabled={isSubmitting}>
          {callToAction}
        </Button>
      </form>
    </>
  );
}
