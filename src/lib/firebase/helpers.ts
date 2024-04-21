import { User } from '@/types/user';
import { push, ref, serverTimestamp, set } from 'firebase/database';
import { db } from 'lib/firebase/index';

export function addNewUser(user: User) {
  const usersRef = ref(db, 'users/');
  const newDataRef = push(usersRef);

  set(newDataRef, {
    ...user,
    createdAt: serverTimestamp(),
  });
}

export function updateUser(user: User) {
  set(ref(db, 'users/' + user.id), { ...user });
}
