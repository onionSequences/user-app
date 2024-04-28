import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { newDb } from 'lib/firebase';
import { Users } from '@/types/user';
import { convertUnixToDateFormat } from 'lib/helpers/convertUnixToDateFormat';

export async function fetchUsers() {
  const q = query(collection(newDb, 'users'), orderBy('createdAt'));
  const querySnapshot = await getDocs(q);

  const docs = querySnapshot.docs;
  const users = docs.map((doc) => ({
    ...doc.data(),
    createdAt: convertUnixToDateFormat(doc.data().createdAt.seconds),
  })) as Users;

  return users;
}
