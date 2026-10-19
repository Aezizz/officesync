'use client';

import React from 'react';
import Link from 'next/link';

interface TicketCardProps {
  id: string;
  title: string;
  priority: string;
  status: string;
}

export function TicketCard({ id, title, priority, status }: TicketCardProps) {
  return (
    <div className="p-3 bg-card border rounded shadow-sm hover:shadow-md transition">
      <Link href={`/tickets/${id}`} className="font-semibold text-sm hover:underline block mb-2">
        {title}
      </Link>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="px-2 py-0.5 rounded bg-muted uppercase font-bold">{priority}</span>
        <span>{status}</span>
      </div>
    </div>
  );
}
