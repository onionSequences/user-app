import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import { getMember } from '@/lib/actions/members';
import { MemberForm } from '@/components/MemberForm';

type Props = {
  params: Promise<{ memberId: string }>;
};

export default async function EditMemberPage({ params }: Props) {
  const { memberId } = await params;
  const member = await getMember(memberId);

  if (!member) {
    notFound();
  }

  return (
    <div className="page-content wrapper">
      <Link href="/" className="back-link">
        <FiArrowLeft />
        Back to circle
      </Link>
      <div className="page-heading">
        <h1>Edit family member</h1>
        <p>A few details is all it takes — only their birthday is required.</p>
      </div>
      <div className="form-card">
        <MemberForm member={member} />
      </div>
    </div>
  );
}
