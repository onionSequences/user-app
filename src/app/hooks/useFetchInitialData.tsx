import { useEffect, useState } from 'react';
import { OrderByDirection } from 'lib/data';
import { setUsers } from 'lib/redux/usersSlice';
import { useAppDispatch } from 'lib/redux/hooks';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { User, Users } from '@/types/user';

export function useFetchInitialData() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    const userCollection = collection(db, 'users');

    const q = query(
      userCollection,
      orderBy('createdAt', OrderByDirection.Desc)
    );

    onSnapshot(q, (querySnapshot) => {
      const users = [] as Users;

      querySnapshot.forEach((doc) => {
        users.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toJSON(),
        } as User);
      });

      dispatch(setUsers(users));
      setIsLoading(false);
    });
  }, []);

  return { isLoading };
}
