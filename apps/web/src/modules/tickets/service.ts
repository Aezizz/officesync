import { connectToDatabase } from '@/lib/db';
import { TicketModel } from './model';
import { TicketInput } from './schema';
import { logActivity } from '@/lib/audit';
import { emitRealtimeEvent } from '@/lib/realtime';
import { SocketEvent, TicketStatus } from '@officesync/shared';

export class TicketService {
  static async getTickets(divisionId?: string) {
    await connectToDatabase();
    const query = divisionId ? { divisionId } : {};
    return TicketModel.find(query).sort({ createdAt: -1 }).lean();
  }

  static async getTicketById(id: string) {
    await connectToDatabase();
    return TicketModel.findById(id).lean();
  }

  static async createTicket(input: TicketInput, userId: string) {
    await connectToDatabase();
    const ticket = await TicketModel.create({
      ...input,
      creatorId: userId,
    });

    await logActivity({
      userId,
      action: 'CREATE_TICKET',
      resource: 'ticket',
      resourceId: ticket._id.toString(),
      metadata: { title: ticket.title },
    });

    await emitRealtimeEvent({
      room: `division:${input.divisionId}`,
      event: SocketEvent.TICKET_CREATED,
      payload: ticket,
    });

    return ticket;
  }

  static async updateTicketStatus(ticketId: string, status: TicketStatus, userId: string) {
    await connectToDatabase();
    const ticket = await TicketModel.findByIdAndUpdate(ticketId, { status }, { new: true });
    if (!ticket) throw new Error('Ticket not found');

    await logActivity({
      userId,
      action: 'UPDATE_TICKET_STATUS',
      resource: 'ticket',
      resourceId: ticketId,
      metadata: { status },
    });

    await emitRealtimeEvent({
      room: `division:${ticket.divisionId}`,
      event: SocketEvent.TICKET_STATUS_CHANGED,
      payload: ticket,
    });

    return ticket;
  }
}
