'use client';

import React from 'react';
import { QueryProvider } from './query-provider';
import { SocketProvider } from './socket-provider';
import { ThemeProvider } from './theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <SocketProvider>
          {children}
        </SocketProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
