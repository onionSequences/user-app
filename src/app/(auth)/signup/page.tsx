import Link from 'next/link';
import { FiUsers } from 'react-icons/fi';
import { SignupForm } from '@/components/auth/SignupForm';
import '@/components/auth/auth.scss';

export default function SignupPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <FiUsers />
        </div>
        <h1>Family Circle</h1>
        <p>Create an account to start tracking birthdays.</p>
        <SignupForm />
        <p className="auth-footer">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
