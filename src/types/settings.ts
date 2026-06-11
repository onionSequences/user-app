export type ReminderType = 'day_before' | 'day_of';

export type UserSettings = {
  email: string | null;
  remindersEnabled: boolean;
  notifyDayBefore: boolean;
  notifyDayOf: boolean;
  timezone: string;
};

export const DEFAULT_USER_SETTINGS: Omit<UserSettings, 'email'> = {
  remindersEnabled: false,
  notifyDayBefore: true,
  notifyDayOf: true,
  timezone: 'UTC',
};
