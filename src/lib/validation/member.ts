import { z } from 'zod';
import { Relationship } from '@/types/member';

export const memberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Birthday must be YYYY-MM-DD'),
  relationship: z.nativeEnum(Relationship),
  photoUrl: z.string().url().optional().or(z.literal('')),
  notes: z.string().max(500).optional(),
});

export type MemberInput = z.infer<typeof memberSchema>;
