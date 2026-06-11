import {
  differenceInCalendarDays,
  format,
  parseISO,
  setYear,
  startOfDay,
} from 'date-fns';
import { FamilyMember } from '@/types/member';

export function getAge(birthday: string, referenceDate = new Date()): number {
  const birth = parseISO(birthday);
  let age = referenceDate.getFullYear() - birth.getFullYear();
  const monthDiff = referenceDate.getMonth() - birth.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && referenceDate.getDate() < birth.getDate())
  ) {
    age -= 1;
  }

  return age;
}

export function getNextBirthday(
  birthday: string,
  referenceDate = new Date()
): Date {
  const birth = parseISO(birthday);
  const today = startOfDay(referenceDate);
  let next = setYear(birth, today.getFullYear());

  if (next < today) {
    next = setYear(birth, today.getFullYear() + 1);
  }

  return next;
}

export function getDaysUntilBirthday(
  birthday: string,
  referenceDate = new Date()
): number {
  const next = getNextBirthday(birthday, referenceDate);
  return differenceInCalendarDays(startOfDay(next), startOfDay(referenceDate));
}

export function formatBirthday(birthday: string): string {
  return format(parseISO(birthday), 'MMM d, yyyy');
}

export function getBirthdayBadgeText(daysUntil: number): string | null {
  if (daysUntil === 0) return 'Today!';
  if (daysUntil === 1) return 'Tomorrow';
  if (daysUntil <= 30) return `Birthday in ${daysUntil} days`;
  return null;
}

export function getUpcomingBirthdays(
  members: FamilyMember[],
  withinDays = 30,
  referenceDate = new Date()
): FamilyMember[] {
  return members
    .map((member) => ({
      member,
      daysUntil: getDaysUntilBirthday(member.birthday, referenceDate),
    }))
    .filter(({ daysUntil }) => daysUntil <= withinDays)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .map(({ member }) => member);
}

export function sortMembers(
  members: FamilyMember[],
  sort: string
): FamilyMember[] {
  const sorted = [...members];

  switch (sort) {
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'birthday':
      return sorted.sort(
        (a, b) =>
          getDaysUntilBirthday(a.birthday) - getDaysUntilBirthday(b.birthday)
      );
    case 'name':
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}
