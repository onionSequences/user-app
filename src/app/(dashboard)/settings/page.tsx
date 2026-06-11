import { SettingsContent } from '@/components/Settings';
import { requireAuth } from '@/lib/auth/requireAuth';

export default async function SettingsPage() {
  const user = await requireAuth();

  return <SettingsContent user={user} />;
}
