'use client';

import Image from 'next/image';

import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useHookFormMask } from 'use-mask-input';

import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineVpnKey,
  MdPersonOutline,
} from 'react-icons/md';

import userRegister from '@/app/actions/user-register';
import login from '@/app/actions/login';

import { InputIcon } from '@/src/shared/components/Forms/Input';

import AuthDialog from '../AuthDialog';

const registerSchema = z
  .object({
    name: z.string('Insira um nome').min(2, 'Mínimo de 2 caracteres'),
    phone: z
      .string('Insira um telefone para contato')
      .regex(/^\d{2}\s\d{5}\-\d{4}$/, 'Telefone inválido'),
    email: z.email('E-mail inválido'),
    password: z.string().min(6, 'Mínimo de 6 caracteres'),
    confirm: z.string('Insira a confirmação de senha'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'As senhas não coincidem',
    path: ['confirm'],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

interface RegisterProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onLoginClick?: () => void;
}

export default function Register({
  open,
  onOpenChange,
  onLoginClick,
}: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const registerWithMask = useHookFormMask(register);

  async function onSubmit(data: RegisterSchema) {
    const {
      data: registerData,
      ok: registerOk,
      error: registerError,
    } = await userRegister(data);

    if (!registerOk) {
      toast.error(registerError);
      return;
    }

    const { ok: loginOk, error: loginError } = await login({
      email: registerData.email,
      password: data.password,
    });

    if (!loginOk) {
      toast.error(loginError);
      return;
    }

    window.location.href = '/';
  }

  return (
    <AuthDialog
      triggerText="Cadastrar"
      title="Crie sua conta"
      handleSubmit={handleSubmit(onSubmit)}
      ImageAside={
        <Image
          src="/register-dog.png"
          width={172}
          height={225}
          alt=""
          className="mt-12"
        />
      }
      submitText="Cadastrar"
      open={open}
      onOpenChange={onOpenChange}
      ActionLinkMessage={
        <p className="text-sm lg:text-right">
          Já tem conta?{' '}
          <button
            className="text-secondary font-bold cursor-pointer"
            type="button"
            onClick={onLoginClick}
          >
            Clique aqui
          </button>
          .
        </p>
      }
      reverseColumn
      buttonIsDisabled={isSubmitting}
    >
      <InputIcon
        placeholder="Nome"
        Icon={
          <MdPersonOutline
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={24}
            color="var(--color-back-700)"
          />
        }
        register={register('name')}
        error={errors.name?.message}
      />

      <InputIcon
        placeholder="Telefone"
        type="tel"
        Icon={
          <MdOutlinePhone
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={24}
            color="var(--color-back-700)"
          />
        }
        register={registerWithMask('phone', '99 99999-9999', {
          showMaskOnHover: false,
          showMaskOnFocus: false,
        })}
        error={errors.phone?.message}
      />

      <InputIcon
        placeholder="E-mail"
        type="email"
        Icon={
          <MdOutlineEmail
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={24}
            color="var(--color-back-700)"
          />
        }
        register={register('email')}
        error={errors.email?.message}
      />

      <InputIcon
        placeholder="Senha"
        type="password"
        Icon={
          <MdOutlineVpnKey
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={24}
            color="var(--color-back-700)"
          />
        }
        register={register('password')}
        error={errors.password?.message}
      />

      <InputIcon
        placeholder="Confirmar senha"
        type="password"
        Icon={
          <MdOutlineVpnKey
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={24}
            color="var(--color-back-700)"
          />
        }
        register={register('confirm')}
        error={errors.confirm?.message}
      />
    </AuthDialog>
  );
}
