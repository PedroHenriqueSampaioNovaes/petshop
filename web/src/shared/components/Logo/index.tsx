'use client';

import Image from 'next/image';

export default function Logo() {
  return (
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
  );
}
