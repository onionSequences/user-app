export enum Relationship {
  Parent = 'parent',
  Sibling = 'sibling',
  Child = 'child',
  Spouse = 'spouse',
  Cousin = 'cousin',
  Other = 'other',
}

export type FamilyMember = {
  id?: string;
  name: string;
  birthday: string;
  relationship: Relationship;
  photoUrl?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MemberFormData = Omit<
  FamilyMember,
  'id' | 'createdAt' | 'updatedAt'
>;

export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  [Relationship.Parent]: 'Parent',
  [Relationship.Sibling]: 'Sibling',
  [Relationship.Child]: 'Child',
  [Relationship.Spouse]: 'Spouse',
  [Relationship.Cousin]: 'Cousin',
  [Relationship.Other]: 'Other',
};
