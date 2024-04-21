'use client';

import { useRouter } from 'next/navigation';
import { FiX } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { editUserData } from '../../redux/userSlice';

import './popup.scss';

export function Popup(props) {
  const { title, children } = props;

  const dispatch = useDispatch();
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
