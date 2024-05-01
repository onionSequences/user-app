'use client';

import { useFetchInitialData } from '@/app/hooks/useFetchInitialData';
import { ControlBar } from 'components/ControlBar';

import { UsersList } from 'components/UsersList';

import './dashboard.scss';
import { ListViewProvider } from '@/context/ListViewContext';

export default function DashboardPage() {
  const { isLoading } = useFetchInitialData();

  return (
    <ListViewProvider>
      <ControlBar />
      {isLoading ? <p>Loading...</p> : <UsersList />}
    </ListViewProvider>
  );
}
