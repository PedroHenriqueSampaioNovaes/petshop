'use client';

import Image from 'next/image';

import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { MdOutlineVpnKey, MdPersonOutline } from 'react-icons/md';

import login from '@/app/actions/login';

import Input from '@/src/shared/components/Forms/Input';

import AuthDialog from '../AuthDialog';

const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
});

type LoginSchema = z.infer<typeof loginSchema>;

interface LoginProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onRegisterClick?: () => void;
}

export default function Login({
  open,
  onOpenChange,
  onRegisterClick,
}: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    const { ok, error } = await login(data);

    if (!ok) {
      toast.error(error);
      return;
    }

    window.location.href = '/';
  }

  return (
    <AuthDialog
      triggerText="Entrar"
      title="Entre no Adopt a Pet"
      handleSubmit={handleSubmit(onSubmit)}
      ImageAside={
        <Image src="/login-cat.png" width={292} height={312} alt="" />
      }
      submitText="Entrar"
      open={open}
      onOpenChange={onOpenChange}
      ActionLinkMessage={
        <p className="text-sm lg:text-right">
          Não tem conta?{' '}
          <button
            className="text-secondary font-bold cursor-pointer"
            type="button"
            onClick={onRegisterClick}
          >
            Clique aqui
          </button>
          .
        </p>
      }
    >
      <Input
        placeholder="E-mail"
        Icon={
          <MdPersonOutline
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={24}
            color="var(--color-back-700)"
          />
        }
        label="email"
        register={register}
        error={errors.email?.message}
      />

      <Input
        placeholder="Senha"
        type="password"
        Icon={
          <MdOutlineVpnKey
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={24}
            color="var(--color-back-700)"
          />
        }
        label="password"
        register={register}
        error={errors.password?.message}
      />
    </AuthDialog>
  );
}
