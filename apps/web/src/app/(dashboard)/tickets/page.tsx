import React from 'react';
import { KanbanBoard } from '@/modules/tickets';

export default function TicketsPage() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Tiket</h1>
          <p className="text-sm text-muted-foreground">Kelola alur kerja tiket divisi dalam tampilan Kanban.</p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard tickets={[]} />
      </div>
    </div>
  );
}
