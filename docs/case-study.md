# Case Study - OfficeSync Monorepo Architecture

## Tantangan
Mengintegrasikan beberapa divisi operasional dalam satu platform yang responsif dengan data terisolasi namun terkoordinasi secara real-time.

## Solusi
- **Next.js App Router**: Server components untuk rendering cepat dan Server Actions untuk mutasi data aman.
- **Socket.io Microservice**: Layanan mandiri yang dapat di-scale terpisah pada Railway/Render.
- **Shared Package**: Standarisasi event names, payloads, dan enums antara Web dan Socket tanpa duplikasi kode.
- **Modular Directory**: Pemisahan per modul (tickets, users, datasets) dengan entry-point terkapsulasi (`index.ts`).
