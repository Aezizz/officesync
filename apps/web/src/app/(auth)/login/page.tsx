import React from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-sm p-6 bg-card border rounded-lg shadow-sm">
        <h1 className="text-xl font-bold mb-4">Masuk ke OfficeSync</h1>
        <p className="text-xs text-muted-foreground mb-4">Gunakan kredensial akun divisi Anda.</p>
        <form className="flex flex-col gap-3">
          <input type="email" placeholder="Email" className="border px-3 py-2 rounded text-sm" />
          <input type="password" placeholder="Password" className="border px-3 py-2 rounded text-sm" />
          <button type="submit" className="bg-primary text-primary-foreground py-2 rounded font-semibold text-sm">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
