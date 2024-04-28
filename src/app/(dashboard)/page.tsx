'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import { UserCard } from 'components/UserCard';
import { setUsers } from 'lib/redux/usersSlice';
import './dashboard.scss';
import { useAppDispatch, useAppSelector } from 'lib/redux/hooks';
import { useFetchInitialData } from '@/app/hooks/useFetchInitialData';

enum SortType {
  Newest = 'newest',
  Oldest = 'oldest',
  NameAsc = 'nameAsc',
}

export default function DashboardPage() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { isLoading } = useFetchInitialData();
  const users = useAppSelector((state) => state.users.users);
  const searchQuery = useAppSelector((state) => state.users.searchQuery);
  const searchUsers = useAppSelector((state) => state.users.searchUsers);

  const [sortType, setSortType] = useState(SortType.Newest);
  const [isListView, setIsListView] = useState(false);

  // TODO: Do sorting & filtering trough firebase
  // Sorting
  useEffect(() => {
    const sortedUsers = (sortType: SortType) => {
      let sorted;
      if (sortType === SortType.Newest)
        sorted = [...users].sort((a, b) => (a.id! < b.id! && 1) || -1);

      if (sortType === SortType.Oldest)
        sorted = [...users].sort((a, b) => (a.id! > b.id! && 1) || -1);

      if (sortType === SortType.NameAsc)
        sorted = [...users].sort((a, b) => a.name.localeCompare(b.name));

      // wtf is this
      if (JSON.stringify(sorted) !== JSON.stringify(users)) {
        dispatch(setUsers(sorted));
      }
    };
    sortedUsers(sortType);
  }, [sortType, dispatch, users]);

  const activeUsers = searchQuery ? searchUsers : users;
  return (
    <>
      <div className="control-bar wrapper">
        <button onClick={() => router.push('/create')}>Add User</button>
        <div>
          <button onClick={() => setIsListView((prevState) => !prevState)}>
            {isListView ? <FiGrid /> : <FiList />}
          </button>
          <select
            name="sort"
            onChange={(e) => setSortType(e.target.value as SortType)}
            value={sortType}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="nameAsc">Name (A-Z)</option>
          </select>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      <section className={`users-list wrapper ${isListView ? 'list' : ''}`}>
        {activeUsers &&
          activeUsers.map((user) => <UserCard key={user.id} userData={user} />)}
      </section>
    </>
  );
}
