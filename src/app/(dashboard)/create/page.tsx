'use client';

import { useRouter } from 'next/navigation';
import { Popup } from 'components/Popup';
import { UserForm } from 'components/UserForm';
import { addNewUser } from 'lib/firebase/helpers';
import { User } from '@/types/user';

export default function CreateUserPage() {
  const router = useRouter();

  const handleSubmit = (userData: User) => {
    addNewUser(userData);

    router.push('/');
  };

  return (
    <Popup title="User form">
      <UserForm handleSubmit={handleSubmit} />
    </Popup>
  );
}
