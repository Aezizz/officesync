import React from 'react';

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Detail Tiket #{params.id}</h1>
      <p className="text-sm text-muted-foreground">Informasi lengkap, riwayat aktivitas, dan komentar tiket.</p>
    </div>
  );
}
