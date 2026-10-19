'use client';

import React from 'react';
import { TicketCard } from './TicketCard';
import { TicketStatus } from '@officesync/shared';

interface KanbanBoardProps {
  tickets?: any[];
}

export function KanbanBoard({ tickets = [] }: KanbanBoardProps) {
  const columns = Object.values(TicketStatus);

  return (
    <div className="grid grid-cols-5 gap-4 h-full">
      {columns.map((col) => (
        <div key={col} className="bg-muted/40 p-3 rounded-lg flex flex-col gap-2">
          <h4 className="font-semibold text-xs tracking-wider uppercase text-muted-foreground">{col}</h4>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {tickets.filter((t) => t.status === col).map((ticket) => (
              <TicketCard key={ticket.id || ticket._id} {...ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
