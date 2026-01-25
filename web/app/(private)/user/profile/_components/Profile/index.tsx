'use client';

import { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import Image from 'next/image';
import { useHookFormMask } from 'use-mask-input';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { useUser } from '@/src/context/UserContext';

import userUpdate from '@/app/actions/user-update';

import Title from '@/src/shared/components/Title';
import { InputLabel } from '@/src/shared/components/Forms/Input';
import Button from '@/src/shared/components/Button';

import { profileSchema } from '@/src/schema/profile';

type ProfileSchema = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user, setUser } = useUser();
  const [preview, setPreview] = useState<string | null>(
    user?.image?.url || null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
    },
  });
  const registerWithMask = useHookFormMask(register);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function onSubmit(data: ProfileSchema) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (value) {
        formData.append(key, value);
      }
    }

    const { data: userData, ok, error } = await userUpdate(formData);

    if (!ok) {
      toast.error(error);
      return;
    }

    toast.success('Perfil atualizado com sucesso!');
    setUser(userData.userUpdated);
  }

  return (
    <section>
      <Title className="text-center mb-8">Perfil</Title>

      {preview && (
        <Image
          src={preview}
          alt="Foto de perfil"
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4 w-50 h-50 object-cover"
        />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-75 mx-auto flex flex-col gap-4"
      >
        <InputLabel
          placeholder="Imagem"
          label="Imagem:"
          type="file"
          accept="image/jpeg, image/png, image/webp"
          register={register('image', { onChange: handleFile })}
          error={(errors.image as FieldError | undefined)?.message}
        />

        <InputLabel
          placeholder="E-mail"
          label="E-mail:"
          type="email"
          register={register('email')}
          error={errors.email?.message}
        />

        <InputLabel
          placeholder="Nome"
          label="Nome:"
          register={register('name')}
          error={errors.name?.message}
        />

        <InputLabel
          placeholder="Telefone"
          label="Telefone:"
          type="tel"
          register={registerWithMask('phone', '99 99999-9999', {
            showMaskOnHover: false,
            showMaskOnFocus: false,
          })}
          error={errors.phone?.message}
        />

        <InputLabel
          placeholder="Senha"
          label="Senha:"
          type="password"
          register={register('password')}
          error={errors.password?.message}
        />

        <InputLabel
          placeholder="Confirmar senha"
          label="Confirmar senha:"
          type="password"
          register={register('confirm')}
          error={errors.confirm?.message}
        />

        <Button type="submit" disabled={isSubmitting} className="mt-0!">
          Editar
        </Button>
      </form>
    </section>
  );
}
