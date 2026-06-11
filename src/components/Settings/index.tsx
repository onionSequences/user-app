'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiLogOut, FiMail, FiUser } from 'react-icons/fi';
import { logoutSession } from '@/lib/auth/clientSession';
import { SessionUser } from '@/lib/auth/getSession';
import { getAvatarGradient, getInitials } from '@/lib/helpers/avatar';
import { UserSettings } from '@/types/settings';
import { ReminderSettings } from './ReminderSettings';
import './settings.scss';

type Props = {
  user: SessionUser;
  settings: UserSettings;
};

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutSession();
    router.push('/login');
    router.refresh();
  };

  return (
    <button type="button" className="logout-btn" onClick={handleLogout}>
      <FiLogOut />
      Sign out
    </button>
  );
}

export function SettingsContent({ user, settings }: Props) {
  const displayName = user.name ?? '—';
  const email = user.email ?? '—';

  return (
    <div className="settings-page page-content wrapper">
      <Link href="/" className="back-link">
        <FiArrowLeft />
        Back to circle
      </Link>

      <div className="page-heading">
        <h1>Account settings</h1>
        <p>Your private profile, only visible to you.</p>
      </div>

      <div className="settings-profile-card">
        <div
          className="settings-avatar"
          style={{ background: getAvatarGradient(displayName) }}
        >
          {getInitials(displayName)}
        </div>
        <div className="settings-profile-info">
          <h2>{displayName}</h2>
          <p>{email}</p>
        </div>
      </div>

      <ReminderSettings settings={settings} />

      <div className="settings-fields-card">
        <div className="settings-field">
          <label>
            <FiUser />
            Display name
          </label>
          <p>{displayName}</p>
        </div>
        <div className="settings-field">
          <label>
            <FiMail />
            Email
          </label>
          <p>{email}</p>
        </div>
      </div>

      <div className="settings-signout-card">
        <div>
          <h3>Sign out</h3>
          <p>You&apos;ll need your email and password to sign back in.</p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
