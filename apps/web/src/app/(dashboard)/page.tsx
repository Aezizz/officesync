'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Kanban,
  Database,
  Megaphone,
  Calendar,
  Activity,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Play,
  Terminal,
  FolderGit2,
  Server,
  Layers,
  ArrowRight,
  RefreshCw,
  Lock,
  Globe
} from 'lucide-react';

interface RouteInfo {
  path: string;
  name: string;
  category: 'Frontend Page' | 'API Endpoint';
  isProtected: boolean;
  file: string;
  description: string;
  icon: any;
}

const ROUTES: RouteInfo[] = [
  {
    path: '/',
    name: 'Dashboard Utama',
    category: 'Frontend Page',
    isProtected: false,
    file: 'apps/web/src/app/(dashboard)/page.tsx',
    description: 'Pusat navigasi, ringkasan arsitektur sistem, dan evaluasi seluruh rute aplikasi.',
    icon: Layers,
  },
  {
    path: '/tickets',
    name: 'Manajemen Tiket (Kanban)',
    category: 'Frontend Page',
    isProtected: true,
    file: 'apps/web/src/app/(dashboard)/tickets/page.tsx',
    description: 'Papan Kanban interaktif antar divisi (Todo, In-Progress, Done) dengan dukungan sync realtime.',
    icon: Kanban,
  },
  {
    path: '/datasets',
    name: 'Manajemen Datasets',
    category: 'Frontend Page',
    isProtected: true,
    file: 'apps/web/src/app/(dashboard)/datasets/page.tsx',
    description: 'Katalog berkas operasional, dataset CSV/Excel, dan penyimpanan data internal divisi.',
    icon: Database,
  },
  {
    path: '/campaigns',
    name: 'Kampanye Divisi',
    category: 'Frontend Page',
    isProtected: false,
    file: 'apps/web/src/app/(dashboard)/campaigns/page.tsx',
    description: 'Perencanaan kampanye, kolaborasi lintas divisi, dan tracking KPI.',
    icon: Megaphone,
  },
  {
    path: '/calendar',
    name: 'Kalender Kerja',
    category: 'Frontend Page',
    isProtected: false,
    file: 'apps/web/src/app/(dashboard)/calendar/page.tsx',
    description: 'Jadwal agenda bersama, deadline sprint, dan jadwal rapat internal.',
    icon: Calendar,
  },
  {
    path: '/activity',
    name: 'Log Aktivitas & Audit',
    category: 'Frontend Page',
    isProtected: false,
    file: 'apps/web/src/app/(dashboard)/activity/page.tsx',
    description: 'Audit trail rekaman perubahan status tiket, upload dokumen, dan riwayat login.',
    icon: Activity,
  },
  {
    path: '/admin',
    name: 'Admin Panel',
    category: 'Frontend Page',
    isProtected: true,
    file: 'apps/web/src/app/(dashboard)/admin/page.tsx',
    description: 'Konfigurasi organisasi, hak akses (RBAC), dan manajemen akun staf.',
    icon: ShieldCheck,
  },
  {
    path: '/login',
    name: 'Autentikasi / Login',
    category: 'Frontend Page',
    isProtected: false,
    file: 'apps/web/src/app/(auth)/login/page.tsx',
    description: 'Halaman autentikasi NextAuth dengan opsi 1-Click login akun demo.',
    icon: Lock,
  },
  {
    path: '/api/test-db',
    name: 'API: Health & Database Check',
    category: 'API Endpoint',
    isProtected: false,
    file: 'apps/web/src/app/api/test-db/route.ts',
    description: 'Endpoint pengujian status koneksi driver Mongoose ke MongoDB.',
    icon: Server,
  },
  {
    path: '/api/upload',
    name: 'API: File Upload',
    category: 'API Endpoint',
    isProtected: false,
    file: 'apps/web/src/app/api/upload/route.ts',
    description: 'Endpoint multipart untuk menerima lampiran berkas operasional.',
    icon: Server,
  },
  {
    path: '/api/auth/session',
    name: 'API: NextAuth Session',
    category: 'API Endpoint',
    isProtected: false,
    file: 'apps/web/src/app/api/auth/[...nextauth]/route.ts',
    description: 'Handler otentikasi session, token JWT, dan verifikasi kredensial NextAuth.',
    icon: Server,
  },
];

export default function DashboardPage() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [testUrl, setTestUrl] = useState('/api/test-db');

  const testEndpoint = async (url: string) => {
    setTestUrl(url);
    setApiStatus('loading');
    setApiResponse(null);
    const start = performance.now();

    try {
      const res = await fetch(url);
      const data = await res.json().catch(() => ({ raw: 'Non-JSON response' }));
      const duration = Math.round(performance.now() - start);

      setApiResponse(JSON.stringify({ httpStatus: res.status, ok: res.ok, durationMs: duration, body: data }, null, 2));
      setApiStatus(res.ok ? 'success' : 'error');
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message, note: 'Gagal terhubung ke endpoint' }, null, 2));
      setApiStatus('error');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              Project Ready to Run
            </span>
            <span className="text-xs text-muted-foreground font-mono">Monorepo (pnpm)</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-2">OfficeSync Explorer Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Halaman ikhtisar arsitektur untuk mempelajari, menguji rute, dan mengevaluasi output sistem.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/tickets"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-sm"
          >
            <Kanban className="h-4 w-4" />
            Buka Papan Kanban
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted text-sm font-medium transition"
          >
            <Lock className="h-4 w-4" />
            Portal Login
          </Link>
        </div>
      </div>

      {/* Services Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-card shadow-sm flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Frontend Web</span>
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <div>
            <div className="text-lg font-bold">Next.js 14</div>
            <div className="text-xs text-muted-foreground">App Router • Port 3000</div>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            apps/web
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card shadow-sm flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Realtime Server</span>
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
          <div>
            <div className="text-lg font-bold">Socket.io</div>
            <div className="text-xs text-muted-foreground">Express Engine • Port 4000</div>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            apps/socket
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card shadow-sm flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Shared Library</span>
            <div className="h-2 w-2 rounded-full bg-purple-500" />
          </div>
          <div>
            <div className="text-lg font-bold">@officesync/shared</div>
            <div className="text-xs text-muted-foreground">Types, Enums & Events</div>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            packages/shared
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card shadow-sm flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Database Layer</span>
            <div className="h-2 w-2 rounded-full bg-amber-500" />
          </div>
          <div>
            <div className="text-lg font-bold">MongoDB / Mongoose</div>
            <div className="text-xs text-muted-foreground">Port 27017 (Docker/Local)</div>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            apps/web/src/lib/db.ts
          </div>
        </div>
      </div>

      {/* Interactive API Tester Section */}
      <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              Live API & Output Tester
            </h2>
            <p className="text-xs text-muted-foreground">
              Uji langsung respon API backend dari peramban tanpa perlu membuka Postman.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => testEndpoint('/api/test-db')}
              disabled={apiStatus === 'loading'}
              className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium flex items-center gap-1.5 hover:opacity-90 disabled:opacity-50 transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${apiStatus === 'loading' ? 'animate-spin' : ''}`} />
              Test /api/test-db
            </button>
            <button
              onClick={() => testEndpoint('/api/upload')}
              disabled={apiStatus === 'loading'}
              className="text-xs px-3 py-1.5 rounded-lg border border-border font-medium flex items-center gap-1.5 hover:bg-muted disabled:opacity-50 transition"
            >
              Test /api/upload
            </button>
          </div>
        </div>

        {apiResponse && (
          <div className="rounded-lg bg-zinc-950 p-4 text-xs font-mono text-zinc-100 overflow-x-auto border border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 text-zinc-400">
              <span>Output Response dari: {testUrl}</span>
              <span className={apiStatus === 'success' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                {apiStatus.toUpperCase()}
              </span>
            </div>
            <pre>{apiResponse}</pre>
          </div>
        )}
      </div>

      {/* Route & Path Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Katalog Rute & Path Aplikasi</h2>
            <p className="text-xs text-muted-foreground">
              Daftar path yang tersedia di OfficeSync untuk Anda pelajari strukturnya.
            </p>
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {ROUTES.length} Rute Terdaftar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROUTES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.path}
                className="rounded-xl border bg-card p-4 hover:border-primary/50 transition shadow-sm flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-muted text-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-sm">{item.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.isProtected ? (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center gap-1">
                          <Lock className="h-2.5 w-2.5" />
                          Protected (Auth)
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-500/10 text-zinc-600 border border-zinc-500/20 flex items-center gap-1">
                          <Globe className="h-2.5 w-2.5" />
                          Public
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <code className="font-mono text-[11px] font-semibold text-primary bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10">
                      {item.path}
                    </code>
                  </div>

                  {item.category === 'API Endpoint' ? (
                    <button
                      onClick={() => testEndpoint(item.path)}
                      className="flex items-center gap-1 text-primary hover:underline font-medium text-xs"
                    >
                      Test Endpoint
                      <Play className="h-3 w-3" />
                    </button>
                  ) : (
                    <Link
                      href={item.path}
                      className="flex items-center gap-1 text-primary hover:underline font-medium text-xs"
                    >
                      Kunjungi Path
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>

                <div className="text-[10px] font-mono text-muted-foreground truncate" title={item.file}>
                  File: {item.file}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guide Note */}
      <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900 text-xs space-y-2">
        <div className="font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <FolderGit2 className="h-4 w-4" />
          Tips Evaluasi & Pengembangan
        </div>
        <ul className="list-disc list-inside text-blue-800/90 dark:text-blue-400 space-y-1">
          <li>
            Untuk menjalankan project di mode dev: gunakan perintah <code className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">pnpm dev:web</code> (untuk Next.js) atau <code className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">pnpm dev</code> (Next.js + Socket bersamaan).
          </li>
          <li>
            Jika mengakses rute terlindungi (<code className="font-mono">/tickets</code>, <code className="font-mono">/admin</code>, <code className="font-mono">/datasets</code>), Anda dapat mengklik tombol <strong>1-Click Masuk Akun Demo</strong> di halaman <code className="font-mono">/login</code>.
          </li>
          <li>
            Untuk database MongoDB lokal: jalankan <code className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">docker-compose up -d</code> jika ingin menggunakan container database yang sudah disiapkan di root folder.
          </li>
        </ul>
      </div>
    </div>
  );
}
