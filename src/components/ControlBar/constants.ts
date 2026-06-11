export enum SortType {
  NAME = 'name',
  NAME_DESC = 'name-desc',
  BIRTHDAY = 'birthday',
}

export const sortOptions = [
  { value: SortType.NAME, label: 'Sort: Name (A–Z)' },
  { value: SortType.NAME_DESC, label: 'Sort: Name (Z–A)' },
  { value: SortType.BIRTHDAY, label: 'Sort: Birthday (soonest)' },
];
