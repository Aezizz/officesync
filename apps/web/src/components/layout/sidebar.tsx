'use client';

import React from 'react';
import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col gap-4">
      <div className="font-bold text-lg px-2">OfficeSync</div>
      <nav className="flex flex-col gap-1">
        <Link href="/" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Dashboard</Link>
        <Link href="/tickets" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Tickets</Link>
        <Link href="/datasets" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Datasets</Link>
        <Link href="/campaigns" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Campaigns</Link>
        <Link href="/calendar" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Calendar</Link>
        <Link href="/activity" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Activity</Link>
        <Link href="/admin" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Admin</Link>
      </nav>
    </aside>
  );
}
