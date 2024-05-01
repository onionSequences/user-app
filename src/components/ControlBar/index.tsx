'use client';

import { FiGrid, FiList } from 'react-icons/fi';
import Link from 'next/link';
import { SortBy } from 'components/ControlBar/SortBy';
import { useListView } from '@/context/ListViewContext';

export function ControlBar() {
  const { isListView, setIsListView } = useListView();

  return (
    <div className="control-bar wrapper">
      <Link className="add-user-link" href={'/create'} scroll={false}>
        Add User
      </Link>
      <div>
        <button onClick={() => setIsListView((prevState) => !prevState)}>
          {isListView ? <FiGrid /> : <FiList />}
        </button>
        <SortBy />
      </div>
    </div>
  );
}
