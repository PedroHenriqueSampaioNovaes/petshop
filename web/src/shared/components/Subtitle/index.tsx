import { ReactNode } from 'react';

interface SubtitleProps {
  children: ReactNode;
}

export default function Subtitle({ children }: SubtitleProps) {
  return <p className="font-secondary max-md:text-center">{children}</p>;
}
