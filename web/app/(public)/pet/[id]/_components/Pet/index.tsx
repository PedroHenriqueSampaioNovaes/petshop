'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';

import { IPet } from '@/src/common/@types/pets';

import petSchedule from '@/app/actions/pet-schedule';

import { useUser } from '@/src/context/UserContext';
import { useAuthModal } from '@/src/context/AuthModalContext';

import PetGallery from '../PetGallery';
import PetDetails from '../PetDetails';
import Button from '@/src/shared/components/Button';

interface IPetPage {
  pet: IPet;
}

export default function Pet({ pet }: IPetPage) {
  const { user } = useUser();
  const { setOpenModal } = useAuthModal();

  async function onAdoptPet() {
    const { ok, error } = await petSchedule({ id: pet._id });

    if (!ok) {
      toast.error(error);
      return;
    }

    toast.success(
      <p>
        A visita foi agendada com sucesso! Vá na aba{' '}
        <Link href="/pet/myadoptions" className="underline text-secondary">
          Minhas Adoções
        </Link>{' '}
        para entrar em contato com o tutor
      </p>,
      { duration: 10000 },
    );
  }

  return (
    <>
      <div className="mt-8 flex max-lg:flex-col gap-6">
        <PetGallery pet={pet} />

        <PetDetails pet={pet} />
      </div>

      {user?.name ? (
        <Button className="mt-8 max-w-50 mx-auto" onClick={onAdoptPet}>
          Eu adoto
        </Button>
      ) : (
        <p className="mt-7.5">
          Você precisa{' '}
          <button
            className="text-secondary underline cursor-pointer"
            onClick={() => setOpenModal('register')}
          >
            criar uma conta,
          </button>{' '}
          para solicitar a visita
        </p>
      )}
    </>
  );
}
