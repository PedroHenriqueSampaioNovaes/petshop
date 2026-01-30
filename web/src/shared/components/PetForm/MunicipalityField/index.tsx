'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import ComboboxField, { Option } from '../../Forms/ComboboxField';

import { PetFormSchema } from '@/src/schema/pet';

export default function MunicipalityField() {
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<PetFormSchema>();

  const [municipalityOptions, setMunicipalityOptions] = useState<Option[]>([]);

  const state = watch('state');

  useEffect(() => {
    if (!state) {
      setMunicipalityOptions([]);
      setValue('municipality', '');
      return;
    }

    async function getMunicipalities() {
      const response = await fetch(
        `https://brasilapi.com.br/api/ibge/municipios/v1/${state}?providers=dados-abertos-br,gov,wikipedia`,
        {
          cache: 'force-cache',
          next: {
            revalidate: 60 * 60 * 24 * 7,
          },
        },
      );
      const municipalities: { codigo_ibge: string; nome: string }[] =
        await response.json();

      const municipalitiesFormatted = municipalities.map((municipality) => ({
        value: municipality.nome,
        label: municipality.nome,
      }));

      setMunicipalityOptions(municipalitiesFormatted);
    }
    getMunicipalities();
  }, [state, setValue]);

  return (
    <ComboboxField
      label="Selecione seu município:"
      name="municipality"
      control={control}
      options={municipalityOptions}
      error={errors.municipality?.message as string}
      centralizedLabel
      disabled={!state}
    />
  );
}
