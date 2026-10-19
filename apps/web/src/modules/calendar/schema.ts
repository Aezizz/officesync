import { z } from 'zod';

export const calendarEventSchema = z.object({
  title: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  divisionId: z.string().optional(),
});
