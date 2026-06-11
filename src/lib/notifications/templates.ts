import { formatBirthday, getAge } from '@/lib/helpers/birthday';
import { getReferenceDateInTimezone } from '@/lib/helpers/timezone';
import { FamilyMember, RELATIONSHIP_LABELS } from '@/types/member';
import { ReminderType } from '@/types/settings';

type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

type Params = {
  member: FamilyMember;
  reminderType: ReminderType;
  timezone: string;
};

export function buildBirthdayReminderEmail({
  member,
  reminderType,
  timezone,
}: Params): EmailContent {
  const relationship = RELATIONSHIP_LABELS[member.relationship];
  const birthdayFormatted = formatBirthday(member.birthday);
  const reference = getReferenceDateInTimezone(timezone);
  const ageOnBirthday =
    reminderType === 'day_of'
      ? getAge(member.birthday, reference)
      : getAge(member.birthday, reference) + 1;

  const isToday = reminderType === 'day_of';

  const subject = isToday
    ? `Today is ${member.name}'s birthday!`
    : `Tomorrow is ${member.name}'s birthday`;

  const headline = isToday
    ? `🎂 Today is ${member.name}'s birthday`
    : `🎈 Tomorrow is ${member.name}'s birthday`;

  const detail = isToday
    ? `${member.name} (${relationship}) turns ${ageOnBirthday} today — ${birthdayFormatted}.`
    : `${member.name} (${relationship}) turns ${ageOnBirthday} tomorrow — ${birthdayFormatted}.`;

  const text = `${headline}\n\n${detail}\n\n— Family Circle`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1e1b18;">
      <p style="margin: 0 0 8px; font-size: 13px; color: #78716c; text-transform: uppercase; letter-spacing: 0.05em;">Family Circle</p>
      <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 600; color: #141210;">${headline}</h1>
      <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5; color: #44403c;">${detail}</p>
      <p style="margin: 0; font-size: 13px; color: #78716c;">You can manage reminders in your account settings.</p>
    </div>
  `.trim();

  return { subject, html, text };
}
