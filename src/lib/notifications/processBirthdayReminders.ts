import { FieldValue } from 'firebase-admin/firestore';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { FamilyMember } from '@/types/member';
import { ReminderType } from '@/types/settings';
import {
  getDaysUntilBirthdayInTimezone,
  getUpcomingBirthdayYear,
} from '@/lib/helpers/timezone';
import { sendEmail } from '@/lib/notifications/email';
import { buildBirthdayReminderEmail } from '@/lib/notifications/templates';

type ProcessResult = {
  usersChecked: number;
  sent: number;
  skipped: number;
  errors: string[];
};

function docToMember(
  id: string,
  data: FirebaseFirestore.DocumentData
): FamilyMember {
  return {
    id,
    name: data.name,
    birthday: data.birthday,
    relationship: data.relationship,
    photoUrl: data.photoUrl ?? undefined,
    notes: data.notes ?? undefined,
  };
}

function reminderId(
  memberId: string,
  year: number,
  type: ReminderType
): string {
  return `${memberId}_${year}_${type}`;
}

export async function processBirthdayReminders(): Promise<ProcessResult> {
  const db = getAdminFirestore();
  const result: ProcessResult = {
    usersChecked: 0,
    sent: 0,
    skipped: 0,
    errors: [],
  };

  const usersSnap = await db
    .collection('users')
    .where('remindersEnabled', '==', true)
    .get();

  for (const userDoc of usersSnap.docs) {
    result.usersChecked += 1;

    const uid = userDoc.id;
    const userData = userDoc.data();
    const email = userData.email as string | undefined;

    if (!email) {
      result.skipped += 1;
      continue;
    }

    const timezone = (userData.timezone as string) || 'UTC';
    const notifyDayBefore = userData.notifyDayBefore !== false;
    const notifyDayOf = userData.notifyDayOf !== false;

    const membersSnap = await db.collection(`users/${uid}/members`).get();

    for (const memberDoc of membersSnap.docs) {
      const member = docToMember(memberDoc.id, memberDoc.data());
      const daysUntil = getDaysUntilBirthdayInTimezone(
        member.birthday,
        timezone
      );

      let reminderType: ReminderType | null = null;

      if (daysUntil === 0 && notifyDayOf) {
        reminderType = 'day_of';
      } else if (daysUntil === 1 && notifyDayBefore) {
        reminderType = 'day_before';
      }

      if (!reminderType) {
        continue;
      }

      const year = getUpcomingBirthdayYear(member.birthday, timezone);
      const id = reminderId(member.id!, year, reminderType);
      const sentRef = db.doc(`users/${uid}/sentReminders/${id}`);
      const alreadySent = await sentRef.get();

      if (alreadySent.exists) {
        result.skipped += 1;
        continue;
      }

      try {
        const content = buildBirthdayReminderEmail({
          member,
          reminderType,
          timezone,
        });

        await sendEmail({
          to: email,
          ...content,
        });

        await sentRef.set({
          memberId: member.id,
          type: reminderType,
          year,
          sentAt: FieldValue.serverTimestamp(),
        });

        result.sent += 1;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to send reminder';
        result.errors.push(`${uid}/${member.id}: ${message}`);
      }
    }
  }

  return result;
}
