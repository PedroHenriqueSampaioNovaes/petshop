import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
  className?: string;
}

export default function Title({ children, className }: TitleProps) {
  return (
    <h1
      className={`text-[2rem]/none font-bold font-secondary text-secondary max-md:text-center ${className}`}
    >
      {children}
    </h1>
  );
}
