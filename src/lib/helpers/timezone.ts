import { formatInTimeZone } from 'date-fns-tz';
import { parseISO, startOfDay } from 'date-fns';
import { getDaysUntilBirthday, getNextBirthday } from '@/lib/helpers/birthday';

export function getLocalDateString(
  timezone: string,
  date = new Date()
): string {
  return formatInTimeZone(date, timezone, 'yyyy-MM-dd');
}

export function getReferenceDateInTimezone(
  timezone: string,
  date = new Date()
): Date {
  return startOfDay(parseISO(getLocalDateString(timezone, date)));
}

export function getDaysUntilBirthdayInTimezone(
  birthday: string,
  timezone: string,
  date = new Date()
): number {
  const reference = getReferenceDateInTimezone(timezone, date);
  return getDaysUntilBirthday(birthday, reference);
}

export function getUpcomingBirthdayYear(
  birthday: string,
  timezone: string,
  date = new Date()
): number {
  const reference = getReferenceDateInTimezone(timezone, date);
  return getNextBirthday(birthday, reference).getFullYear();
}
