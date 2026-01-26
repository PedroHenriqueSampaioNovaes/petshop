'use client';

import { ComponentProps, ReactNode, useState } from 'react';
import { Field } from '@base-ui/react/field';
import { FieldValues, UseFormRegisterReturn, FieldPath } from 'react-hook-form';

import { MdOutlineVisibilityOff, MdOutlineVisibility } from 'react-icons/md';

import FieldError from '../Fields/FieldError';
import FieldLabel from '../Fields/FieldLabel';
import FieldControl from '../Fields/FieldControl';

interface InputIconProps<
  T extends FieldValues,
> extends ComponentProps<'input'> {
  error?: string;
  Icon: ReactNode;
  register: UseFormRegisterReturn<FieldPath<T>>;
  canShowPassword?: boolean;
}

export default function InputIcon<T extends FieldValues>({
  Icon,
  register,
  error,
  canShowPassword = false,
  ...props
}: InputIconProps<T>) {
  const [visible, setVisible] = useState(false);

  return (
    <Field.Root>
      <FieldLabel className="flex items-center relative">
        {Icon}
        <FieldControl
          className="pl-10"
          register={register}
          {...props}
          type={visible ? 'text' : props.type}
        />
        {canShowPassword &&
          (visible ? (
            <MdOutlineVisibility
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              size={24}
              onClick={() => setVisible(!visible)}
              color="var(--color-back-700)"
            />
          ) : (
            <MdOutlineVisibilityOff
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              size={24}
              onClick={() => setVisible(!visible)}
              color="var(--color-back-700)"
            />
          ))}
      </FieldLabel>

      <FieldError error={error} />
    </Field.Root>
  );
}
