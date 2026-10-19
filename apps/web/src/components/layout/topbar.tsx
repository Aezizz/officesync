'use client';

import React from 'react';

export function Topbar() {
  return (
    <header className="h-14 border-b flex items-center justify-between px-6 bg-card">
      <div className="text-sm font-medium text-muted-foreground">Divisi: IT Support</div>
      <div className="flex items-center gap-3">
        <span className="text-sm">demo@officesync.local</span>
      </div>
    </header>
  );
}
