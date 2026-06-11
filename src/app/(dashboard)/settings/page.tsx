import { getUserSettings } from '@/lib/actions/settings';
import { SettingsContent } from '@/components/Settings';
import { requireAuth } from '@/lib/auth/requireAuth';

export default async function SettingsPage() {
  const user = await requireAuth();
  const settings = await getUserSettings();

  return <SettingsContent user={user} settings={settings} />;
}
