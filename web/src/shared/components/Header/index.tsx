'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const user = { name: '' };

  return (
    <header className="bg-primary px-6 max-md:px-3 py-4 max-md:py-2 rounded-b-lg flex justify-between items-center max-md:flex-col gap-y-2">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Logo"
          width={128}
          height={128}
          className="w-10"
        />
        <h2 className="text-2xl font-bold text-secondary">Adopt A Pet</h2>
      </div>

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
          {user.name ? (
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
                <button className="px-3 py-2 rounded-md font-semibold leading-none text-secondary hover:text-white hover:bg-secondary transition cursor-pointer h-9">
                  Entrar
                </button>
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
