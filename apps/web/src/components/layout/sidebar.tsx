'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Kanban,
  Database,
  Megaphone,
  Calendar,
  Activity,
  ShieldCheck,
  Radio,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tickets', label: 'Tickets (Kanban)', icon: Kanban },
  { href: '/datasets', label: 'Datasets', icon: Database },
  { href: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/activity', label: 'Activity Log', icon: Activity },
  { href: '/admin', label: 'Admin Panel', icon: ShieldCheck },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-base shadow-sm">
            OS
          </div>
          <div>
            <div className="font-bold text-base tracking-tight leading-none">OfficeSync</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Multi-division Workspace</div>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase px-2 mb-1 tracking-wider">
            Menu Utama
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-lg border bg-muted/40 p-3 text-xs flex flex-col gap-2">
        <div className="flex items-center gap-2 font-medium">
          <Radio className="h-3.5 w-3.5 text-green-500 animate-pulse" />
          <span>Realtime Engine</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          WebSocket port :4000 aktif untuk broadcast event antar divisi.
        </p>
      </div>
    </aside>
  );
}
