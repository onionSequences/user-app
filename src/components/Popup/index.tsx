'use client';

import { useRouter } from 'next/navigation';
import { FiX } from 'react-icons/fi';
import { ReactNode } from 'react';
import './popup.scss';

type Props = {
  title: string;
  children: ReactNode;
};

export function Popup({ title, children }: Props) {
  const router = useRouter();

  return (
    <div className="popup-background">
      <div className="popup-wrapper">
        <div className="popup-title">
          <h5>{title}</h5>
          <button type="button" onClick={() => router.push('/')} aria-label="Close">
            <FiX />
          </button>
        </div>
        <hr />
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
}
