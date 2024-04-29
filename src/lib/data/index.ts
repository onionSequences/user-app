import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { newDb } from 'lib/firebase';
import { Users } from '@/types/user';
import { convertUnixToDateFormat } from 'lib/helpers/convertUnixToDateFormat';

export enum OrderByDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export async function fetchUsers(field: string, direction: OrderByDirection) {
  const q = query(collection(newDb, 'users'), orderBy(field, direction));
  const querySnapshot = await getDocs(q);

  const docs = querySnapshot.docs;
  const users = docs.map((doc) => ({
    ...doc.data(),
    createdAt: convertUnixToDateFormat(doc.data().createdAt.seconds),
  })) as Users;

  return users;
}
