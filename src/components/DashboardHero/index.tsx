import Link from 'next/link';
import { format } from 'date-fns';
import { FiPlus } from 'react-icons/fi';
import './dashboardHero.scss';

type Props = {
  memberCount: number;
  upcomingCount: number;
};

export function DashboardHero({ memberCount, upcomingCount }: Props) {
  const today = format(new Date(), 'EEEE, MMMM d').toUpperCase();

  return (
    <section className="dashboard-hero wrapper">
      <div className="dashboard-hero-text">
        <p className="dashboard-hero-date">{today}</p>
        <h2>Your family, all in one place</h2>
        <p className="dashboard-hero-stats">
          {memberCount} {memberCount === 1 ? 'person' : 'people'}
          {upcomingCount > 0 && (
            <>
              {' '}
              · {upcomingCount} {upcomingCount === 1 ? 'birthday' : 'birthdays'}{' '}
              in the next 30 days
            </>
          )}
        </p>
      </div>
      <Link className="dashboard-hero-cta" href="/members/create">
        <span className="dashboard-hero-cta-icon">
          <FiPlus strokeWidth={2.5} />
        </span>
        Add member
      </Link>
    </section>
  );
}
