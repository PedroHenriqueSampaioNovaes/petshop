import { ReactNode } from 'react';

interface SubtitleProps {
  children: ReactNode;
  className: string;
}

export default function Subtitle({ children, className }: SubtitleProps) {
  return (
    <p className={`font-secondary max-md:text-center ${className}`}>
      {children}
    </p>
  );
}
