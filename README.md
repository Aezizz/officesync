# OfficeSync

OfficeSync adalah platform internal operasional kantor (monorepo) yang mendukung multi-divisi, kolaborasi tiket kerja real-time, manajemen dataset, kalender, notifikasi, dan jejak audit aktivitas.

## Arsitektur Monorepo

```
officesync/
├── apps/
│   ├── web/             # Next.js 15+ App Router (Vercel)
│   └── socket/          # Socket.io Realtime Server (Railway/Render)
├── packages/
│   └── shared/          # Enums, Events, dan Tipe bersama (Web & Socket)
├── docs/                # PRD, ERD, dan Case Study
└── docker-compose.yml   # MongoDB & Multi-service container lokal
```

## Memulai Cepat

1. Salin environment variable:
   ```bash
   cp .env.example .env.local
   cp .env.example apps/web/.env.local
   ```

2. Jalankan database lokal (MongoDB):
   ```bash
   docker-compose up -d mongodb
   ```

3. Pasang dependensi:
   ```bash
   pnpm install
   ```

4. Seed data awal (3 divisi, user, dan tiket demo):
   ```bash
   pnpm --filter @officesync/web seed
   ```

5. Jalankan aplikasi (Web & Socket):
   ```bash
   pnpm dev:web
   pnpm dev:socket
   ```
