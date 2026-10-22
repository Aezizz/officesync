'use client';

import React, { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, KeyRound, AlertCircle, Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('demo@officesync.local');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setError('Login gagal. Periksa kembali email dan password.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || 'Terjadi kesalahan saat masuk.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: 'it.lead@officesync.local',
        password: 'demo-password',
        callbackUrl,
      });
      if (res?.error) {
        setError('Login demo gagal.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || 'Terjadi kesalahan saat demo login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-card border rounded-xl shadow-sm flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Dashboard
        </Link>
        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
          NextAuth
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Masuk ke OfficeSync</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Gunakan kredensial akun divisi Anda untuk mengakses fitur terproteksi.
        </p>
      </div>

      {error && (
        <div className="p-3 text-xs rounded-lg bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground">Email Divisi</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@officesync.local"
            required
            className="border px-3 py-2 rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="border px-3 py-2 rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 bg-primary text-primary-foreground py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground text-[10px]">Atau untuk evaluasi</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleQuickDemo}
        disabled={isLoading}
        className="w-full py-2.5 px-4 rounded-lg border border-dashed border-primary/40 bg-primary/5 text-primary text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary/10 transition disabled:opacity-50"
      >
        <KeyRound className="h-4 w-4" />
        1-Click Masuk Akun Demo (IT Lead)
      </button>

      <div className="text-[11px] text-muted-foreground text-center bg-muted/40 p-2.5 rounded-lg">
        Callback path saat ini:{' '}
        <code className="text-foreground font-mono bg-background px-1 py-0.5 rounded border">
          {callbackUrl}
        </code>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Memuat form login...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
