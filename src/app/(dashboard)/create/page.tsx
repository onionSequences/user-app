'use client';

import { useRouter } from 'next/navigation';
import { Popup } from 'components/Popup';
import { UserForm } from 'components/UserForm';
import { User } from '@/types/user';
import { addNewUser } from 'lib/data';

export default function CreateUserPage() {
  const router = useRouter();

  const handleSubmit = async (userData: User) => {
    await addNewUser(userData);

    router.push('/');
  };

  return (
    <Popup title="User form">
      <UserForm handleSubmit={handleSubmit} />
    </Popup>
  );
}
