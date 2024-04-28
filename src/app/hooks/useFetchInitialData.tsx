import { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from 'lib/data';
import { setUsers } from 'lib/redux/usersSlice';
import { useAppDispatch } from 'lib/redux/hooks';

export function useFetchInitialData() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const users = await fetchUsers();

    dispatch(setUsers(users));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return { isLoading };
}
