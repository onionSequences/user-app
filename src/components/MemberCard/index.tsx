'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { deleteMember } from '@/lib/actions/members';
import { getAvatarGradient, getInitials } from '@/lib/helpers/avatar';
import {
  formatBirthday,
  getAge,
  getBirthdayBadgeText,
  getDaysUntilBirthday,
} from '@/lib/helpers/birthday';
import { FamilyMember, RELATIONSHIP_LABELS } from '@/types/member';
import './memberCard.scss';

type Props = {
  member: FamilyMember;
};

export function MemberCard({ member }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const age = getAge(member.birthday);
  const daysUntil = getDaysUntilBirthday(member.birthday);
  const badgeText = getBirthdayBadgeText(daysUntil);
  const isToday = daysUntil === 0;

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteMember(member.id!);
      if (!result.success) {
        setError(result.error);
        setShowDeleteDialog(false);
        return;
      }
      setShowDeleteDialog(false);
      router.refresh();
    });
  };

  const handleEdit = () => {
    router.push(`/members/${member.id}/edit`);
  };

  return (
    <>
      <div className={`card ${isToday ? 'card--today' : ''}`}>
        <div className="avatar">
          <div
            className="member-avatar"
            style={{ background: getAvatarGradient(member.name) }}
          >
            {getInitials(member.name)}
          </div>
        </div>
        <div className="card-info">
          <h4>
            {member.name}
            <span className="member-age"> ({age})</span>
          </h4>
          <p className="member-relationship">
            {RELATIONSHIP_LABELS[member.relationship]}
          </p>
          <p className="member-birthday">{formatBirthday(member.birthday)}</p>
          {badgeText && (
            <span
              className={`birthday-badge ${isToday ? 'birthday-badge--today' : ''}`}
            >
              {badgeText}
            </span>
          )}
          {member.notes && <p className="member-notes">{member.notes}</p>}
          {error && <p className="field-error">{error}</p>}
        </div>
        <div className="card-buttons">
          <button type="button" onClick={handleEdit} aria-label="Edit member">
            <FiEdit />
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            disabled={isPending}
            aria-label="Delete member"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        title={`Remove ${member.name}?`}
        message="This removes them from your private circle. You can always add them back later."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        loading={isPending}
      />
    </>
  );
}
