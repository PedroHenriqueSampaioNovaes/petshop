'use client';

import { ComponentProps, ReactNode } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  className?: string;
  children: ReactNode;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={`block cursor-pointer bg-valid-500 hover:bg-valid-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-white font-bold h-12 w-full mt-4 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
