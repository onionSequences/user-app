'use server';

import { revalidatePath } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { requireAuth } from '@/lib/auth/requireAuth';
import { reminderSettingsSchema } from '@/lib/validation/settings';
import {
  DEFAULT_USER_SETTINGS,
  UserSettings,
} from '@/types/settings';

function userDocRef(uid: string) {
  return getAdminFirestore().collection('users').doc(uid);
}

function toUserSettings(
  email: string | null | undefined,
  data?: FirebaseFirestore.DocumentData
): UserSettings {
  return {
    email: email ?? null,
    remindersEnabled:
      data?.remindersEnabled ?? DEFAULT_USER_SETTINGS.remindersEnabled,
    notifyDayBefore:
      data?.notifyDayBefore ?? DEFAULT_USER_SETTINGS.notifyDayBefore,
    notifyDayOf: data?.notifyDayOf ?? DEFAULT_USER_SETTINGS.notifyDayOf,
    timezone: data?.timezone ?? DEFAULT_USER_SETTINGS.timezone,
  };
}

export async function getUserSettings(): Promise<UserSettings> {
  const session = await requireAuth();
  const ref = userDocRef(session.uid);
  const doc = await ref.get();

  if (!doc.exists) {
    const initial = {
      email: session.email ?? null,
      ...DEFAULT_USER_SETTINGS,
      updatedAt: FieldValue.serverTimestamp(),
    };
    await ref.set(initial);
    return toUserSettings(session.email);
  }

  return toUserSettings(session.email, doc.data());
}

export async function updateReminderSettings(
  input: unknown
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await requireAuth();
  const parsed = reminderSettingsSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? 'Invalid settings',
    };
  }

  if (parsed.data.remindersEnabled && !session.email) {
    return {
      success: false,
      error: 'An email address is required to receive reminders.',
    };
  }

  await userDocRef(session.uid).set(
    {
      email: session.email ?? null,
      ...parsed.data,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  revalidatePath('/settings');
  return { success: true };
}
