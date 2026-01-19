'use client';

import Link from 'next/link';

import Logo from '../Logo';

import Login from '@/app/_components/Login';

import { useUser } from '@/src/context/UserContext';

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-primary px-6 max-md:px-3 py-4 max-md:py-2 rounded-b-lg flex justify-between items-center max-md:flex-col gap-y-2">
      <Logo />

      <nav>
        <ul className="flex items-center justify-center gap-2 flex-wrap">
          <li>
            <Link
              href="/"
              className="px-3 py-2 rounded-md font-semibold text-secondary hover:text-white hover:bg-secondary transition h-9"
            >
              Adotar
            </Link>
          </li>
          {user?.name ? (
            <>
              <li>
                <Link
                  href="/pet/myadoptions"
                  className="px-3 py-2 rounded-md font-semibold text-secondary hover:text-white hover:bg-secondary transition h-9"
                >
                  Minhas Adoções
                </Link>
              </li>
              <li>
                <Link
                  href="/pet/mypets"
                  className="px-3 py-2 rounded-md font-semibold text-secondary hover:text-white hover:bg-secondary transition h-9"
                >
                  Meus Pets
                </Link>
              </li>
              <li>
                <Link
                  href="/user/perfil"
                  className="px-3 py-2 rounded-md font-semibold text-secondary hover:text-white hover:bg-secondary transition h-9"
                >
                  Perfil
                </Link>
              </li>
              <li>
                <button className="px-3 py-2 rounded-md font-semibold leading-none text-secondary hover:text-white hover:bg-secondary transition cursor-pointer h-9">
                  Sair
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Login />
              </li>
              <li>
                <button className="px-3 py-2 rounded-md font-semibold leading-none text-secondary hover:text-white hover:bg-secondary transition cursor-pointer h-9">
                  Cadastrar
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
