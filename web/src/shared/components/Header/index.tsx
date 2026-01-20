'use client';

import { useState } from 'react';
import Link from 'next/link';

import logout from '@/app/actions/logout';

import Logo from '../Logo';

import Login from '@/app/_components/Login';
import Register from '@/app/_components/Register';

import { useUser } from '@/src/context/UserContext';

export default function Header() {
  const { user, setUser } = useUser();

  const [openModal, setOpenModal] = useState<'login' | 'register' | null>(null);

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
                  href="/user/profile"
                  className="px-3 py-2 rounded-md font-semibold text-secondary hover:text-white hover:bg-secondary transition h-9"
                >
                  Perfil
                </Link>
              </li>
              <li>
                <button
                  className="px-3 py-2 rounded-md font-semibold leading-none text-secondary hover:text-white hover:bg-secondary transition cursor-pointer h-9"
                  onClick={async () => {
                    await logout();
                    setUser(null);

                    window.location.href = '/';
                  }}
                >
                  Sair
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Login
                  open={openModal === 'login'}
                  onOpenChange={(isOpen) =>
                    setOpenModal(isOpen ? 'login' : null)
                  }
                  onRegisterClick={() => setOpenModal('register')}
                />
              </li>
              <li>
                <Register
                  open={openModal === 'register'}
                  onOpenChange={(isOpen) =>
                    setOpenModal(isOpen ? 'register' : null)
                  }
                  onLoginClick={() => setOpenModal('login')}
                />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
