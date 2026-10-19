'use server';

import { TicketService } from './service';
import { ticketInputSchema, TicketInput } from './schema';
import { TicketStatus } from '@officesync/shared';
import { revalidatePath } from 'next/cache';

export async function createTicketAction(data: TicketInput) {
  const validated = ticketInputSchema.parse(data);
  const demoUserId = 'demo-user-id'; // Dari session
  const ticket = await TicketService.createTicket(validated, demoUserId);
  revalidatePath('/tickets');
  return { success: true, ticket };
}

export async function updateTicketStatusAction(ticketId: string, status: TicketStatus) {
  const demoUserId = 'demo-user-id';
  const updated = await TicketService.updateTicketStatus(ticketId, status, demoUserId);
  revalidatePath('/tickets');
  return { success: true, updated };
}
