'use client';

import { createContext, use, useState } from 'react';

import { IUser } from '../common/@types/user';

type IUserContext = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

interface IUserProvider {
  children: React.ReactNode;
  userData: IUser | null;
}

const UserContext = createContext<IUserContext | null>(null);

export function UserContextProvider({ children, userData }: IUserProvider) {
  const [user, setUser] = useState<IUser | null>(userData);

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
}

export function useUser() {
  const context = use(UserContext);
  if (!context) {
    throw new Error(
      'É necessário envolver o UserContextProvider no seu componente para usar o useUser',
    );
  }

  return context;
}
