import { Socket, Server } from 'socket.io';

export function setupRoomHandlers(io: Server, socket: Socket) {
  // Join division room: division:<divisionId>
  socket.on('room:join:division', (divisionId: string) => {
    socket.join(`division:${divisionId}`);
  });

  // Join user room: user:<userId>
  socket.on('room:join:user', (userId: string) => {
    socket.join(`user:${userId}`);
  });

  // Join ticket room: ticket:<ticketId>
  socket.on('room:join:ticket', (ticketId: string) => {
    socket.join(`ticket:${ticketId}`);
  });

  // Leave room
  socket.on('room:leave', (room: string) => {
    socket.leave(room);
  });
}
