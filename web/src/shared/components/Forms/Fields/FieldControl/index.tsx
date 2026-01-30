import { ComponentProps } from 'react';
import { UseFormRegisterReturn, FieldPath, FieldValues } from 'react-hook-form';
import { Field } from '@base-ui/react/field';

interface FieldControlProps<
  T extends FieldValues,
> extends ComponentProps<'input'> {
  className?: string;
  register: UseFormRegisterReturn<FieldPath<T>>;
}

export default function FieldControl<T extends FieldValues>({
  className,
  register,
  ...props
}: FieldControlProps<T>) {
  return (
    <Field.Control
      className={`w-full border border-back-400 p-2 h-10 rounded-lg font-secondary placeholder:text-back-600 text-sm ${className}`}
      {...register}
      {...props}
    />
  );
}
