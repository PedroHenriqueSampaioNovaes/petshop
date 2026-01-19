'use client';

import { ReactNode } from 'react';

import { Dialog } from '@base-ui/react/dialog';

import Logo from '@/src/shared/components/Logo';
import Button from '@/src/shared/components/Button';

interface AuthDialogProps {
  triggerText: string;
  title: string;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  ImageAside: ReactNode;
  submitText: string;
  ActionLinkMessage: ReactNode;
  reverseColumn?: boolean;
  children: ReactNode;
}

export default function AuthDialog({
  triggerText,
  title,
  handleSubmit,
  ImageAside,
  ActionLinkMessage,
  submitText,
  children,
  reverseColumn = false,
}: AuthDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="px-3 py-2 rounded-md font-semibold leading-none text-secondary hover:text-white hover:bg-secondary transition cursor-pointer h-9">
        {triggerText}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black/48 backdrop-blur-xs transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-[80vw] max-w-79 lg:max-w-158 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline-1 outline-back-300 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
          <div className={`flex ${reverseColumn ? 'flex-row-reverse' : ''}`}>
            <form onSubmit={handleSubmit} className="flex-1">
              <Dialog.Title className="text-center mb-8 text-secondary text-lg font-bold">
                {title}
              </Dialog.Title>
              <Dialog.Description render={<div></div>}>
                <div className="mb-2 flex flex-col gap-2">{children}</div>

                {ActionLinkMessage}

                <Button className="max-w-43 mx-auto" type="submit">
                  {submitText}
                </Button>
              </Dialog.Description>
            </form>

            <div className="flex flex-col items-center max-lg:hidden">
              <Logo />
              {ImageAside}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
