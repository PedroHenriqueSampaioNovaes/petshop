'use client';

import { ComponentProps, HTMLInputTypeAttribute } from 'react';
import { Field } from '@base-ui/react/field';
import { FieldValues, UseFormRegisterReturn, FieldPath } from 'react-hook-form';

interface InputLabelProps<
  T extends FieldValues,
> extends ComponentProps<'input'> {
  description?: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegisterReturn<FieldPath<T>>;
}

export default function InputLabel<T extends FieldValues>({
  description,
  type = 'text',
  label,
  placeholder,
  error,
  register,
}: InputLabelProps<T>) {
  return (
    <Field.Root>
      <Field.Label className="block mb-1">{label}</Field.Label>
      <Field.Control
        type={type}
        placeholder={placeholder}
        className="w-full border border-back-400 p-2 h-10 rounded-lg font-secondary placeholder:text-back-600 text-sm"
        {...register}
      />

      <Field.Error className="text-sm text-red-800 mt-0.5" match={true}>
        {error}
      </Field.Error>

      {description && (
        <Field.Description className="text-sm text-gray-600">
          {description}
        </Field.Description>
      )}
    </Field.Root>
  );
}
