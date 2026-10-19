'use client';

import { useEffect } from 'react';
import { useSocket } from '@/providers/socket-provider';
import { SocketEvent } from '@officesync/shared';

export function useTicketRealtime(divisionId: string, onUpdate: (data: any) => void) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.emit('room:join:division', divisionId);
    socket.on(SocketEvent.TICKET_CREATED, onUpdate);
    socket.on(SocketEvent.TICKET_STATUS_CHANGED, onUpdate);

    return () => {
      socket.off(SocketEvent.TICKET_CREATED, onUpdate);
      socket.off(SocketEvent.TICKET_STATUS_CHANGED, onUpdate);
      socket.emit('room:leave', `division:${divisionId}`);
    };
  }, [socket, divisionId, onUpdate]);
}
