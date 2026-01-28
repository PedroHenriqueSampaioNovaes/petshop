'use client';

import { Combobox } from '@base-ui/react/combobox';
import { Field } from '@base-ui/react/field';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { MdKeyboardArrowDown, MdOutlineClear } from 'react-icons/md';

import FieldError from '../Fields/FieldError';

export interface Option {
  value: string;
  label: string;
}

interface ComboboxProps<T extends FieldValues> {
  label: string;
  centralizedLabel?: boolean;
  name: Path<T>;
  placeholder?: string;
  disabled?: boolean;
  control: Control<T>;
  options: Option[];
  error?: string;
  className?: string;
}

export default function ComboboxField<T extends FieldValues>({
  label,
  centralizedLabel,
  name,
  placeholder = 'Selecione uma opção',
  disabled = false,
  control,
  options,
  error,
}: ComboboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, ref } }) => (
        <Field.Root disabled={disabled}>
          <Field.Label
            className={`block mb-1 ${centralizedLabel ? 'text-center' : ''}`}
          >
            {label}
          </Field.Label>
          <Combobox.Root
            items={options}
            value={options.find((item) => item.value === value) ?? null}
            onValueChange={(val) => {
              onChange(val?.value);
            }}
            inputRef={ref}
          >
            <div className="relative flex flex-col gap-1 text-sm leading-5 font-medium text-gray-900">
              <div className="relative [&>input]:pr-8 has-[.combobox-clear]:[&>input]:pr-[calc(0.5rem+1.5rem*2)]">
                <Combobox.Input
                  onBlur={onBlur}
                  placeholder={disabled ? '' : placeholder}
                  className="h-10 w-full rounded-md font-normal border border-back-400 pl-2 text-base text-gray-900 bg-[canvas] focus:outline-2 focus:-outline-offset-1 focus:outline-black disabled:bg-gray-100 placeholder:text-back-600"
                />
                <div className="absolute right-2 bottom-0 flex h-10 items-center justify-center text-gray-600">
                  <Combobox.Clear
                    className="combobox-clear flex h-10 w-6 items-center justify-center rounded bg-transparent p-0"
                    aria-label="Limpar seleção"
                  >
                    <MdOutlineClear />
                  </Combobox.Clear>
                  {!disabled && (
                    <Combobox.Trigger
                      className="flex h-10 w-6 items-center justify-center rounded bg-transparent p-0"
                      aria-label="Abrir popup"
                    >
                      <MdKeyboardArrowDown size={20} />
                    </Combobox.Trigger>
                  )}
                </div>
              </div>
            </div>

            <Combobox.Portal>
              <Combobox.Positioner className="outline-none" sideOffset={4}>
                <Combobox.Popup className="w-(--anchor-width) max-h-92 max-w-(--available-width) origin-(--transform-origin) rounded-md bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 duration-100">
                  <Combobox.Empty className="p-4 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
                    Nenhum item encontrado.
                  </Combobox.Empty>
                  <Combobox.List className="outline-0 overflow-y-auto scroll-py-2 py-2 overscroll-contain max-h-[min(23rem,var(--available-height))] data-empty:p-0">
                    {(item: Option) => (
                      <Combobox.Item
                        key={item.value}
                        value={item}
                        className="cursor-default py-2 pr-8 pl-4 text-base leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-2 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-secondary"
                      >
                        <div className="col-start-2">{item.label}</div>
                      </Combobox.Item>
                    )}
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>

          <FieldError error={error} />
        </Field.Root>
      )}
    />
  );
}
