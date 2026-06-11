'use server';

import { revalidatePath } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { requireAuth } from '@/lib/auth/requireAuth';
import { memberSchema } from '@/lib/validation/member';
import { FamilyMember } from '@/types/member';

function membersCollection(uid: string) {
  return getAdminFirestore().collection(`users/${uid}/members`);
}

function docToMember(
  id: string,
  data: FirebaseFirestore.DocumentData
): FamilyMember {
  return {
    id,
    name: data.name,
    birthday: data.birthday,
    relationship: data.relationship,
    photoUrl: data.photoUrl ?? undefined,
    notes: data.notes ?? undefined,
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? undefined,
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() ?? undefined,
  };
}

export async function getMembers(): Promise<FamilyMember[]> {
  const session = await requireAuth();
  const snapshot = await membersCollection(session.uid)
    .orderBy('name', 'asc')
    .get();

  return snapshot.docs.map((doc) => docToMember(doc.id, doc.data()));
}

export async function getMember(memberId: string): Promise<FamilyMember | null> {
  const session = await requireAuth();
  const doc = await membersCollection(session.uid).doc(memberId).get();

  if (!doc.exists) {
    return null;
  }

  return docToMember(doc.id, doc.data()!);
}

export async function createMember(
  input: unknown
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await requireAuth();
  const parsed = memberSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? 'Invalid data' };
  }

  const { photoUrl, ...rest } = parsed.data;

  await membersCollection(session.uid).add({
    ...rest,
    ...(photoUrl ? { photoUrl } : {}),
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  revalidatePath('/');
  return { success: true };
}

export async function updateMember(
  memberId: string,
  input: unknown
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await requireAuth();
  const parsed = memberSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? 'Invalid data' };
  }

  const docRef = membersCollection(session.uid).doc(memberId);
  const existing = await docRef.get();

  if (!existing.exists) {
    return { success: false, error: 'Member not found' };
  }

  const { photoUrl, ...rest } = parsed.data;

  await docRef.update({
    ...rest,
    ...(photoUrl ? { photoUrl } : {}),
    updatedAt: FieldValue.serverTimestamp(),
  });

  revalidatePath('/');
  revalidatePath(`/members/${memberId}/edit`);
  return { success: true };
}

export async function deleteMember(
  memberId: string
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await requireAuth();
  const docRef = membersCollection(session.uid).doc(memberId);
  const existing = await docRef.get();

  if (!existing.exists) {
    return { success: false, error: 'Member not found' };
  }

  await docRef.delete();
  revalidatePath('/');
  return { success: true };
}
