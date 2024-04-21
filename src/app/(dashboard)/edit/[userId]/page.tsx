'use client';

import { useRouter } from 'next/navigation';
import { Popup } from 'components/Popup';
import { UserForm } from 'components/UserForm';
import { User } from '@/types/user';
import { updateUser } from 'lib/firebase/helpers';

export default function EditUserPage() {
  const router = useRouter();

  const handleSubmit = (userData: User) => {
    updateUser(userData);

    router.push('/');
  };

  return (
    <Popup title="User form">
      <UserForm handleSubmit={handleSubmit} />
    </Popup>
  );
}
