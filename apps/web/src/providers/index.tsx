'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryProvider } from './query-provider';
import { SocketProvider } from './socket-provider';
import { ThemeProvider } from './theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <QueryProvider>
          <SocketProvider>
            {children}
          </SocketProvider>
        </QueryProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
