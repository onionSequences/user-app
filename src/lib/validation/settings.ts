import { z } from 'zod';

export const reminderSettingsSchema = z.object({
  remindersEnabled: z.boolean(),
  notifyDayBefore: z.boolean(),
  notifyDayOf: z.boolean(),
  timezone: z.string().min(1),
});

export type ReminderSettingsInput = z.infer<typeof reminderSettingsSchema>;
