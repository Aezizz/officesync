import { TicketStatus, TicketPriority } from './enums';

export enum SocketEvent {
  // Client to Server
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',

  // Server to Client
  TICKET_CREATED = 'ticket:created',
  TICKET_UPDATED = 'ticket:updated',
  TICKET_DELETED = 'ticket:deleted',
  TICKET_STATUS_CHANGED = 'ticket:status_changed',
  NOTIFICATION_RECEIVED = 'notification:received',
  ACTIVITY_LOGGED = 'activity:logged',
}

export interface TicketPayload {
  ticketId: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  divisionId: string;
  assigneeId?: string;
  updatedBy: string;
  timestamp: string;
}

export interface NotificationPayload {
  id: string;
  userId: string;
  title: string;
  message: string;
  link?: string;
  createdAt: string;
}
