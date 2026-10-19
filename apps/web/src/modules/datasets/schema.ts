import { z } from 'zod';

export const datasetSchema = z.object({
  name: z.string().min(1),
  divisionId: z.string().min(1),
  fileUrl: z.string().url(),
});

export type DatasetInput = z.infer<typeof datasetSchema>;
