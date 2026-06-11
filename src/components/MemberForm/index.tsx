'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FocusEvent, useState } from 'react';
import {
  FamilyMember,
  MemberFormData,
  Relationship,
  RELATIONSHIP_LABELS,
} from '@/types/member';
import { createMember, updateMember } from '@/lib/actions/members';
import './memberForm.scss';

const INITIAL_DATA: MemberFormData = {
  name: '',
  birthday: '',
  relationship: Relationship.Other,
  notes: '',
};

type Props = {
  member?: FamilyMember;
};

export function MemberForm({ member }: Props) {
  const router = useRouter();
  const isEditing = Boolean(member?.id);

  const [formData, setFormData] = useState<MemberFormData>(
    member
      ? {
          name: member.name,
          birthday: member.birthday,
          relationship: member.relationship,
          notes: member.notes ?? '',
        }
      : INITIAL_DATA
  );
  const [fieldsWithError, setFieldsWithError] = useState<(keyof MemberFormData)[]>(
    []
  );
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnBlur = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const currentField = e.target.name as keyof MemberFormData;

    if (e.target.value) {
      setFieldsWithError((prev) =>
        prev.filter((field) => field !== currentField)
      );
    } else if (currentField !== 'notes') {
      setFieldsWithError((prev) => [...prev, currentField]);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const requiredErrors = (['name', 'birthday'] as const).filter(
      (field) => !formData[field]
    );

    if (requiredErrors.length > 0) {
      setFieldsWithError(requiredErrors);
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      notes: formData.notes || undefined,
    };

    const result = isEditing
      ? await updateMember(member!.id!, payload)
      : await createMember(payload);

    setLoading(false);

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    router.push('/');
    router.refresh();
  };

  const checkHasError = (field: keyof MemberFormData) =>
    fieldsWithError.some((f) => f === field);

  const errorMessage = 'This field is required';

  return (
    <form className="member-form" onSubmit={onSubmit}>
      <div className="field-wrapper">
        <label htmlFor="name">
          Name<span className="required">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        {checkHasError('name') && (
          <div className="field-error">{errorMessage}</div>
        )}
      </div>
      <div className="field-wrapper">
        <label htmlFor="birthday">
          Birthday<span className="required">*</span>
        </label>
        <input
          type="date"
          name="birthday"
          id="birthday"
          value={formData.birthday}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        {checkHasError('birthday') && (
          <div className="field-error">{errorMessage}</div>
        )}
      </div>
      <div className="field-wrapper">
        <label htmlFor="relationship">Relationship</label>
        <select
          name="relationship"
          id="relationship"
          value={formData.relationship}
          onChange={handleInputChange}
        >
          {Object.values(Relationship).map((value) => (
            <option key={value} value={value}>
              {RELATIONSHIP_LABELS[value]}
            </option>
          ))}
        </select>
      </div>
      <div className="field-wrapper">
        <label htmlFor="notes">Notes</label>
        <textarea
          name="notes"
          id="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
          placeholder="Optional — anything you want to remember"
        />
        <p className="field-hint">Optional — anything you want to remember.</p>
      </div>
      {submitError && <div className="field-error">{submitError}</div>}
      <div className="form-actions">
        <button
          type="button"
          className="btn-cancel"
          onClick={() => router.push('/')}
        >
          Cancel
        </button>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Saving…' : isEditing ? 'Update' : 'Add member'}
        </button>
      </div>
    </form>
  );
}
