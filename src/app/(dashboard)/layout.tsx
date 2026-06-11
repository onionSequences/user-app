import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { requireAuth } from '@/lib/auth/requireAuth';
import './dashboard.scss';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAuth();

  return (
    <div id="root">
      <Header user={user} />
      <main>{children}</main>
    </div>
  );
}
