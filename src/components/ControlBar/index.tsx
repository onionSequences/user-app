import { FiGrid, FiList } from 'react-icons/fi';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { fetchUsers, OrderByDirection } from 'lib/data';
import { setUsers } from 'lib/redux/usersSlice';
import { useAppDispatch } from 'lib/redux/hooks';
import { sortOptions, SortType } from 'components/ControlBar/constants';
import Link from 'next/link';

type Props = {
  isListView: boolean;
  setIsListView: Dispatch<SetStateAction<boolean>>;
};

export function ControlBar({ isListView, setIsListView }: Props) {
  const dispatch = useAppDispatch();

  const [sortType, setSortType] = useState(SortType.NEWLY_CREATED);

  const handleSortType = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOption = e.target.value;
    switch (selectedSortOption) {
      case SortType.NEWLY_CREATED: {
        const users = await fetchUsers('createdAt', OrderByDirection.Desc);

        dispatch(setUsers(users));
        setSortType(SortType.NEWLY_CREATED);
        return;
      }
      case SortType.OLDEST_CREATED: {
        const users = await fetchUsers('createdAt', OrderByDirection.Asc);

        dispatch(setUsers(users));
        setSortType(SortType.OLDEST_CREATED);
        return;
      }
      case SortType.NAME_ASC: {
        const users = await fetchUsers('name', OrderByDirection.Asc);

        dispatch(setUsers(users));
        setSortType(SortType.NAME_ASC);
        return;
      }
      case SortType.NAME_DESC: {
        const users = await fetchUsers('name', OrderByDirection.Desc);

        dispatch(setUsers(users));
        setSortType(SortType.NAME_DESC);
        return;
      }
    }
  };

  return (
    <div className="control-bar wrapper">
      <Link className="add-user-link" href={'/create'} scroll={false}>
        Add User
      </Link>
      <div>
        <button onClick={() => setIsListView((prevState) => !prevState)}>
          {isListView ? <FiGrid /> : <FiList />}
        </button>
        <select name="sort" onChange={handleSortType} value={sortType}>
          {sortOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
