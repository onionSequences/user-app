import Link from 'next/link';
import {
  formatBirthday,
  getDaysUntilBirthday,
  getUpcomingBirthdays,
} from '@/lib/helpers/birthday';
import { getAvatarGradient, getInitials } from '@/lib/helpers/avatar';
import { FamilyMember, RELATIONSHIP_LABELS } from '@/types/member';
import './upcomingBirthdays.scss';

type Props = {
  members: FamilyMember[];
  withinDays?: number;
};

function formatDaysUntil(days: number): string {
  if (days === 0) return 'Today!';
  if (days === 1) return 'Tomorrow';
  return `In ${days} days`;
}

export function UpcomingBirthdays({ members, withinDays = 30 }: Props) {
  const upcoming = getUpcomingBirthdays(members, withinDays);

  if (upcoming.length === 0) {
    return null;
  }

  return (
    <section className="upcoming-birthdays wrapper">
      <h2>Upcoming birthdays</h2>
      <ul>
        {upcoming.map((member) => {
          const days = getDaysUntilBirthday(member.birthday);
          const isToday = days === 0;

          return (
            <li key={member.id} className={isToday ? 'is-today' : ''}>
              <div
                className="upcoming-avatar"
                style={{ background: getAvatarGradient(member.name) }}
              >
                {getInitials(member.name)}
              </div>
              <div className="upcoming-info">
                <strong>{member.name}</strong>
                <span className="upcoming-meta">
                  {RELATIONSHIP_LABELS[member.relationship]} ·{' '}
                  {formatBirthday(member.birthday)}
                </span>
              </div>
              <span
                className={`upcoming-days ${isToday ? 'upcoming-days--today' : ''}`}
              >
                {formatDaysUntil(days)}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function EmptyState() {
  return (
    <div className="empty-state wrapper">
      <div className="empty-state-icon">👨‍👩‍👧‍👦</div>
      <h3>No family members yet</h3>
      <p>Add your first relative to start tracking birthdays.</p>
      <Link className="btn-primary" href="/members/create">
        Add your first member
      </Link>
    </div>
  );
}
