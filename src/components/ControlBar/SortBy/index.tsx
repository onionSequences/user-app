'use client';

import { ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { sortOptions, SortType } from '@/components/ControlBar/constants';

export function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortType = searchParams.get('sort') ?? SortType.NAME;

  const handleSortType = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    router.replace(`/?${params.toString()}`);
  };

  return (
    <select
      className="sort-select"
      name="sort"
      onChange={handleSortType}
      value={sortType}
    >
      {sortOptions.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
