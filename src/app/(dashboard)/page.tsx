import { Suspense } from 'react';
import { getMembers } from '@/lib/actions/members';
import { getUpcomingBirthdays } from '@/lib/helpers/birthday';
import { DashboardHero } from '@/components/DashboardHero';
import { MembersDashboard } from '@/components/MembersDashboard';
import { UpcomingBirthdays } from '@/components/UpcomingBirthdays';

export default async function DashboardPage() {
  const members = await getMembers();
  const upcoming = getUpcomingBirthdays(members);

  return (
    <>
      <DashboardHero
        memberCount={members.length}
        upcomingCount={upcoming.length}
      />
      <UpcomingBirthdays members={members} />
      <Suspense fallback={null}>
        <MembersDashboard members={members} />
      </Suspense>
    </>
  );
}
