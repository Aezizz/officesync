import { z } from 'zod';
import { TicketStatus, TicketPriority } from '@officesync/shared';

export const ticketInputSchema = z.object({
  title: z.string().min(3, 'Judul tiket minimal 3 karakter'),
  description: z.string().default(''),
  status: z.nativeEnum(TicketStatus).default(TicketStatus.TODO),
  priority: z.nativeEnum(TicketPriority).default(TicketPriority.MEDIUM),
  divisionId: z.string().min(1, 'Divisi harus dipilih'),
  assigneeId: z.string().optional(),
});

export type TicketInput = z.infer<typeof ticketInputSchema>;

export interface TicketDTO extends TicketInput {
  id: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}
