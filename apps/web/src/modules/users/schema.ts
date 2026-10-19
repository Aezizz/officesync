import { z } from 'zod';
import { UserRole } from '@officesync/shared';

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  divisionId: z.string(),
});

export const divisionSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional(),
});
