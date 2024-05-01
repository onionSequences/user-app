import { sortOptions } from 'components/ControlBar/constants';
import { useSortType } from 'components/ControlBar/hooks/useSortType';

export function SortBy() {
  const { sortType, handleSortType } = useSortType();

  return (
    <select name="sort" onChange={handleSortType} value={sortType}>
      {sortOptions.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
