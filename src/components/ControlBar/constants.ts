export enum SortType {
  NEWLY_CREATED = 'newlyCreated',
  OLDEST_CREATED = 'oldestCreated',
  NAME_ASC = 'nameAsc',
  NAME_DESC = 'nameDesc',
}

export const sortOptions = [
  {
    value: SortType.NEWLY_CREATED,
    label: 'Sort by: Newly created',
  },
  {
    value: SortType.OLDEST_CREATED,
    label: 'Sort by: Oldest created',
  },
  {
    value: SortType.NAME_ASC,
    label: 'Sort by: Name (A-Z)',
  },
  {
    value: SortType.NAME_DESC,
    label: 'Sort by: Name (Z-A)',
  },
];
