'use client';

import {
  ComponentProps,
  HTMLInputTypeAttribute,
  ReactNode,
  useState,
} from 'react';
import { Field } from '@base-ui/react/field';
import { FieldValues, UseFormRegisterReturn, FieldPath } from 'react-hook-form';

import { MdOutlineVisibilityOff, MdOutlineVisibility } from 'react-icons/md';

interface InputIconProps<
  T extends FieldValues,
> extends ComponentProps<'input'> {
  description?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string;
  Icon: ReactNode;
  register: UseFormRegisterReturn<FieldPath<T>>;
}

export default function InputIcon<T extends FieldValues>({
  description,
  type = 'text',
  placeholder,
  error,
  Icon,
  register,
}: InputIconProps<T>) {
  const [visible, setVisible] = useState(false);

  return (
    <Field.Root>
      <Field.Label className="flex items-center relative">
        {Icon}
        <Field.Control
          type={visible ? 'text' : type}
          placeholder={placeholder}
          className="w-full border border-back-400 pl-10 h-10 rounded-lg font-secondary placeholder:text-back-600 text-sm"
          {...register}
        />
        {type === 'password' &&
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
      </Field.Label>

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
