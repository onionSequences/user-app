import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { newDb } from 'lib/firebase';
import { User, Users } from '@/types/user';
import { convertUnixToDateFormat } from 'lib/helpers/convertUnixToDateFormat';

export enum OrderByDirection {
  Asc = 'asc',
  Desc = 'desc',
}

const userCollection = collection(newDb, 'users');

export async function fetchUsers(field: string, direction: OrderByDirection) {
  const q = query(userCollection, orderBy(field, direction));
  const querySnapshot = await getDocs(q);

  const docs = querySnapshot.docs;
  const users = docs.map((doc) => ({
    ...doc.data(),
    createdAt: convertUnixToDateFormat(doc.data().createdAt.seconds),
  })) as Users;

  return users;
}

export async function addNewUser(user: User) {
  const docRef = await addDoc(userCollection, {
    ...user,
    createdAt: serverTimestamp(),
  });
  // TODO: Implement success notification with docRef.id (id of successfully created user
}
