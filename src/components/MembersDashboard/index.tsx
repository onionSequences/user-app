'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import { useRouter, useSearchParams } from 'next/navigation';
import { SortBy } from '@/components/ControlBar/SortBy';
import { sortMembers } from '@/lib/helpers/birthday';
import { FamilyMember } from '@/types/member';
import { MembersList } from '@/components/MembersList';
import { EmptyState } from '@/components/UpcomingBirthdays';

type Props = {
  members: FamilyMember[];
};

export function MembersDashboard({ members }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const sort = searchParams.get('sort') ?? 'name';
  const isListView = searchParams.get('view') === 'list';

  const filteredMembers = useMemo(() => {
    const sorted = sortMembers(members, sort);
    if (!searchTerm.trim()) return sorted;
    const query = searchTerm.toLowerCase();
    return sorted.filter((m) => m.name.toLowerCase().includes(query));
  }, [members, sort, searchTerm]);

  const setView = (list: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (list) {
      params.set('view', 'list');
    } else {
      params.delete('view');
    }
    router.replace(`/?${params.toString()}`);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (members.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="control-bar wrapper">
        <div className="dashboard-toolbar">
          <input
            className="search-input"
            placeholder="Search members…"
            value={searchTerm}
            onChange={handleSearch}
          />
          <SortBy />
          <button
            type="button"
            className="toolbar-icon-btn"
            onClick={() => setView(!isListView)}
            aria-label={isListView ? 'Grid view' : 'List view'}
          >
            {isListView ? <FiGrid /> : <FiList />}
          </button>
        </div>
      </div>
      {filteredMembers.length === 0 ? (
        <p className="wrapper no-results">No members match your search.</p>
      ) : (
        <MembersList members={filteredMembers} isListView={isListView} />
      )}
    </>
  );
}
