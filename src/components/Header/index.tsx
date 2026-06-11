import Link from 'next/link';
import { FiUsers } from 'react-icons/fi';
import { SessionUser } from '@/lib/auth/getSession';
import { getInitials } from '@/lib/helpers/avatar';
import './header.scss';

type Props = {
  user: SessionUser;
};

export function Header({ user }: Props) {
  const displayName = user.name ?? user.email ?? 'Account';

  return (
    <header>
      <div className="wrapper">
        <Link href="/" className="logo-box">
          <span className="logo-icon">
            <FiUsers />
          </span>
          <h1>Family Circle</h1>
        </Link>
        <div className="header-profile">
          <Link href="/settings" className="profile-pill">
            <span className="profile-initials">{getInitials(displayName)}</span>
            <span className="profile-name">{displayName}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
