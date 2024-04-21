'use client';

import { useRouter } from 'next/navigation';

import { ref, set } from 'firebase/database';
import { Popup } from 'components/Popup';
import { UserForm } from 'components/UserForm';
import { db } from 'lib/firebase';

export default function EditUserPage() {
  const router = useRouter();

  const handleSubmit = (values) => {
    set(ref(db, 'users/' + values.id), { ...values });

    return router.push('/');
  };

  return (
    <Popup title="User form">
      <UserForm handleSubmit={handleSubmit} />
    </Popup>
  );
}
