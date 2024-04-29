'use client';

import { useState } from 'react';
import { UserCard } from 'components/UserCard';
import './dashboard.scss';
import { useAppSelector } from 'lib/redux/hooks';
import { useFetchInitialData } from '@/app/hooks/useFetchInitialData';
import { ControlBar } from 'components/ControlBar';

export default function DashboardPage() {
  const { isLoading } = useFetchInitialData();
  const users = useAppSelector((state) => state.users.users);
  const searchQuery = useAppSelector((state) => state.users.searchQuery);
  const searchUsers = useAppSelector((state) => state.users.searchUsers);

  const [isListView, setIsListView] = useState(false);

  const activeUsers = searchQuery ? searchUsers : users;
  return (
    <>
      <ControlBar isListView={isListView} setIsListView={setIsListView} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className={`users-list wrapper ${isListView ? 'list' : ''}`}>
          {activeUsers &&
            activeUsers.map((user) => (
              <UserCard key={user.id} userData={user} />
            ))}
        </section>
      )}
    </>
  );
}
