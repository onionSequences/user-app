import { useEffect, useState } from 'react';
import { fetchUsers, OrderByDirection } from 'lib/data';
import { useAppDispatch } from 'lib/redux/hooks';

export function useFetchInitialData() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers('createdAt', OrderByDirection.Desc, dispatch);
    };

    void fetchData();
    setIsLoading(false);
  }, []);

  return { isLoading };
}
