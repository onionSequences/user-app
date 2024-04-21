'use client';

import { useRouter } from 'next/navigation';
import { FiX } from 'react-icons/fi';
import { editUserData } from 'lib/redux/usersSlice';

import './popup.scss';
import { useAppDispatch } from 'lib/redux/hooks';
import { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

export function Popup({ title, children }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(editUserData(null));
    router.push('/');
  };

  return (
    <div className="popup-background">
      <div className="popup-wrapper">
        <div className="popup-title">
          <h5>{title}</h5>
          <button onClick={handleClick}>
            <FiX />
          </button>
        </div>

        <hr />

        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
}
