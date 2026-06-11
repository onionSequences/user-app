import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { MemberForm } from '@/components/MemberForm';

export default function CreateMemberPage() {
  return (
    <div className="page-content wrapper">
      <Link href="/" className="back-link">
        <FiArrowLeft />
        Back to circle
      </Link>
      <div className="page-heading">
        <h1>Add family member</h1>
        <p>A few details is all it takes — only their birthday is required.</p>
      </div>
      <div className="form-card">
        <MemberForm />
      </div>
    </div>
  );
}
