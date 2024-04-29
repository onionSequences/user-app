import { User } from '@/types/user';
import { ref, set } from 'firebase/database';
import { db } from 'lib/firebase/index';

export function updateUser(user: User) {
  set(ref(db, 'users/' + user.id), { ...user });
}
