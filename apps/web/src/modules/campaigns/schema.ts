import { z } from 'zod';

export const campaignSchema = z.object({
  title: z.string().min(1),
  budget: z.number().nonnegative(),
  divisionId: z.string().min(1),
});

export type CampaignInput = z.infer<typeof campaignSchema>;
