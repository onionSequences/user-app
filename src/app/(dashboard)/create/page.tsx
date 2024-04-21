'use client';

import { push, ref, serverTimestamp, set } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { Popup } from 'components/Popup';
import { UserForm } from 'components/UserForm';
import { db } from 'lib/firebase';

export default function CreateUserPage() {
  const router = useRouter();

  const handleSubmit = (userData) => {
    const usersRef = ref(db, 'users/');
    const newDataRef = push(usersRef);

    set(newDataRef, {
      ...userData,
      createdAt: serverTimestamp(),
    });

    router.push('/');
  };

  return (
    <Popup title="User form">
      <UserForm handleSubmit={handleSubmit} />
    </Popup>
  );
}
