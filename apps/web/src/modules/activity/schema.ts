import { z } from 'zod';

export const activitySchema = z.object({
  userId: z.string(),
  action: z.string(),
  resource: z.string(),
});
