import { Metadata } from 'next';

import Profile from './_components/Profile';

export const metadata: Metadata = {
  title: 'Adopt a Pet - Perfil',
  description:
    'Altere suas informações de perfil. Altere foto, nome, e-mail e etc...',
};

export default function ProfilePage() {
  return <Profile />;
}
