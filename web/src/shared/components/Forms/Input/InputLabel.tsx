'use client';

import { ComponentProps } from 'react';
import { Field } from '@base-ui/react/field';
import { FieldValues, UseFormRegisterReturn, FieldPath } from 'react-hook-form';

import FieldError from '../Fields/FieldError';
import FieldLabel from '../Fields/FieldLabel';
import FieldControl from '../Fields/FieldControl';

interface InputLabelProps<
  T extends FieldValues,
> extends ComponentProps<'input'> {
  label: string;
  error?: string;
  register: UseFormRegisterReturn<FieldPath<T>>;
}

export default function InputLabel<T extends FieldValues>({
  label,
  error,
  register,
  ...props
}: InputLabelProps<T>) {
  return (
    <Field.Root>
      <FieldLabel className="block mb-1">{label}</FieldLabel>
      <FieldControl register={register} {...props} />

      <FieldError error={error} />
    </Field.Root>
  );
}
