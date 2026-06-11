import { FamilyMember } from '@/types/member';
import { MemberCard } from '@/components/MemberCard';

type Props = {
  members: FamilyMember[];
  isListView: boolean;
};

export function MembersList({ members, isListView }: Props) {
  return (
    <section className={`members-list wrapper ${isListView ? 'list' : ''}`}>
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </section>
  );
}
