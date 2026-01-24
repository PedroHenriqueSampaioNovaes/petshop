'use client';

import { createContext, use, useState } from 'react';

type IAuthModalContext = {
  openModal: 'login' | 'register' | null;
  setOpenModal: React.Dispatch<
    React.SetStateAction<'login' | 'register' | null>
  >;
};

interface IAuthModalContextProvider {
  children: React.ReactNode;
}

const AuthModalContext = createContext<IAuthModalContext | null>(null);

export function AuthModalContextProvider({
  children,
}: IAuthModalContextProvider) {
  const [openModal, setOpenModal] = useState<'login' | 'register' | null>(null);

  return (
    <AuthModalContext value={{ openModal, setOpenModal }}>
      {children}
    </AuthModalContext>
  );
}

export function useAuthModal() {
  const context = use(AuthModalContext);
  if (!context) {
    throw new Error(
      'É necessário envolver o AuthModalContextProvider no seu componente para usar o useAuthModal',
    );
  }

  return context;
}
