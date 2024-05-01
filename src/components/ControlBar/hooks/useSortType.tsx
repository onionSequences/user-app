import { ChangeEvent, useState } from 'react';
import { SortType } from 'components/ControlBar/constants';
import { fetchUsers, OrderByDirection } from 'lib/data';
import { useAppDispatch } from 'lib/redux/hooks';

export function useSortType() {
  const dispatch = useAppDispatch();

  const [sortType, setSortType] = useState(SortType.NEWLY_CREATED);

  const handleSortType = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOption = e.target.value;
    switch (selectedSortOption) {
      case SortType.NEWLY_CREATED: {
        await fetchUsers('createdAt', OrderByDirection.Desc, dispatch);

        return setSortType(SortType.NEWLY_CREATED);
      }

      case SortType.OLDEST_CREATED: {
        await fetchUsers('createdAt', OrderByDirection.Asc, dispatch);

        return setSortType(SortType.OLDEST_CREATED);
      }

      case SortType.NAME_ASC: {
        await fetchUsers('name', OrderByDirection.Asc, dispatch);

        return setSortType(SortType.NAME_ASC);
      }

      case SortType.NAME_DESC: {
        await fetchUsers('name', OrderByDirection.Desc, dispatch);

        return setSortType(SortType.NAME_DESC);
      }
    }
  };

  return {
    sortType,
    handleSortType,
  };
}
