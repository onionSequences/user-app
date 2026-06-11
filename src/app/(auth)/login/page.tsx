import Link from 'next/link';
import { FiUsers } from 'react-icons/fi';
import { LoginForm } from '@/components/auth/LoginForm';
import '@/components/auth/auth.scss';

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <FiUsers />
        </div>
        <h1>Family Circle</h1>
        <p>Sign in to manage your family directory.</p>
        <LoginForm />
        <p className="auth-footer">
          No account? <Link href="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}
