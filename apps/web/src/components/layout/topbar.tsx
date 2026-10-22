'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export function Topbar() {
  const { data: session, status } = useSession();
  const user = session?.user as { role?: string; divisionId?: string; email?: string } | undefined;

  return (
    <header className="h-14 border-b flex items-center justify-between px-6 bg-card">
      <div className="flex items-center gap-3">
        <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
          {user?.role ? `Peran: ${user.role}` : 'Mode Pratinjau (Dev)'}
        </span>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          Divisi: {user?.divisionId || 'IT Support / Operasional'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {status === 'authenticated' && user ? (
          <>
            <span className="text-xs text-muted-foreground">{user.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-xs px-2.5 py-1 rounded border border-border hover:bg-muted font-medium transition"
            >
              Keluar
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-xs px-3 py-1.5 rounded bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
          >
            Masuk / Login
          </Link>
        )}
      </div>
    </header>
  );
}
