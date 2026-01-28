'use client';

import { ComponentProps } from 'react';
import { Field } from '@base-ui/react/field';
import { FieldValues, UseFormRegisterReturn, FieldPath } from 'react-hook-form';

import FieldError from '../Fields/FieldError';
import FieldLabel from '../Fields/FieldLabel';

interface TextareaProps<
  T extends FieldValues,
> extends ComponentProps<'textarea'> {
  label: string;
  centralizedLabel?: boolean;
  error?: string;
  register: UseFormRegisterReturn<FieldPath<T>>;
}

export default function Textarea<T extends FieldValues>({
  label,
  centralizedLabel,
  error,
  register,
  ...props
}: TextareaProps<T>) {
  return (
    <Field.Root>
      <FieldLabel
        className={`block mb-1 ${centralizedLabel ? 'text-center' : ''}`}
      >
        {label}
      </FieldLabel>

      <Field.Control
        {...register}
        render={
          <textarea
            className="w-full border border-back-400 p-2 h-32 rounded-lg font-secondary placeholder:text-back-600 text-sm resize-none"
            {...props}
          />
        }
      />

      <FieldError error={error} />
    </Field.Root>
  );
}
