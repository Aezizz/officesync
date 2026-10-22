# OfficeSync: Aturan Kerja Agent

## 1. Konteks

OfficeSync adalah platform kolaborasi internal untuk SATU perusahaan dengan tiga divisi (Sales, Marketing, IT/Engineering): tiket lintas divisi, Data Hub dengan persetujuan akses, perencanaan kampanye, notifikasi real-time, dan audit trail. Ini proyek portofolio dan pemiliknya sedang belajar TypeScript, jadi kode harus jelas, tipenya benar, dan mudah dipelajari.

Sumber kebenaran: docs/PRD.md dan docs/ERD.md. Jika instruksi di sini bertentangan dengan dokumen itu, ikuti dokumen dan laporkan pertentangannya. Jika file tersebut tidak ada, berhenti dan minta. Jangan menebak kebutuhan dan jangan menambah fitur di luar PRD.

## 2. Stack

- Bahasa: TypeScript strict. Package manager: pnpm workspaces. Node: versi LTS terbaru (.nvmrc).
- apps/web: Next.js (App Router, versi stabil terbaru), React, Tailwind CSS, shadcn/ui, next-themes, TanStack Query, Zustand, React Hook Form + Zod, dnd-kit, Recharts, socket.io-client.
- Auth: Auth.js (next-auth) dengan provider Google dan Credentials (akun demo), @auth/mongodb-adapter, session strategy JWT.
- Database: MongoDB (Atlas atau lokal) dengan Mongoose.
- apps/socket: Node.js + Socket.io + jose, berjalan terpisah dari Next.js.
- packages/shared: enum dan tipe event WebSocket yang dipakai bersama.
- Pengujian: Vitest (unit), Playwright (e2e). Lint: ESLint + Prettier. CI: GitHub Actions.
- Sebelum memakai API library mana pun, cek dokumentasi versi yang terpasang (pakai tool dokumentasi atau web bila tersedia). Jangan mengandalkan ingatan: API Next.js, Auth.js, dan Mongoose berubah antar versi.

## 3. Struktur Repo (target)

officesync/
apps/
web/
src/
app/
(auth)/login/page.tsx
(dashboard)/layout.tsx, page.tsx
(dashboard)/tickets/page.tsx, tickets/[id]/page.tsx
(dashboard)/datasets/, campaigns/, calendar/, activity/, admin/
api/auth/[...nextauth]/route.ts
api/upload/route.ts, api/health/route.ts, api/socket-token/route.ts
modules/
tickets/ datasets/ campaigns/ activity/ notifications/ calendar/ users/
(masing-masing: components/, hooks/, actions.ts, service.ts, model.ts, schema.ts, index.ts)
components/ui/ (shadcn), components/layout/ (Sidebar, Topbar, EmptyState)
lib/ db.ts, auth.ts, permissions.ts, audit.ts, realtime.ts, socket-client.ts, socket-token.ts, storage.ts, env.ts
providers/ (QueryProvider, SocketProvider, ThemeProvider)
middleware.ts
scripts/seed.ts
tests/
socket/
src/ index.ts, auth.ts, rooms.ts, internal.ts
Dockerfile
packages/shared/src/ enums.ts, events.ts, index.ts
docs/ PRD.md, ERD.md, learning-log.md
.github/workflows/ci.yml
docker-compose.yml, .env.example, pnpm-workspace.yaml, tsconfig.base.json, package.json, README.md

## 4. Aturan Arsitektur

1. Alur satu aksi (wajib untuk setiap mutasi), dikerjakan di service.ts: validasi Zod -> cek izin can(user, action, resource) -> tulis ke MongoDB -> logActivity -> buat notifikasi -> emit event real-time. UI memanggil actions.ts, actions memanggil service.
2. Layer: halaman di app/ tipis. Komponen React tidak boleh mengakses database. Izin diperiksa di server (service), bukan hanya disembunyikan di UI.
3. Modul: setiap modul punya components/, hooks/, actions.ts, service.ts, model.ts, schema.ts, index.ts. Modul lain hanya boleh mengimpor dari index.ts. service.ts dan model.ts memuat import 'server-only'.
4. Izin terpusat di lib/permissions.ts: fungsi murni can(user, action, resource) mengikuti matriks PRD bagian 7. Dilarang menyebar pengecekan role di tempat lain.
5. Audit: activity_logs bersifat append-only (hanya create dan read yang diekspos). Setiap mutasi tiket, dataset, dan kampanye juga memperbarui lastEditedBy dan updatedAt. Snapshot actor (nama, divisi, peran) disimpan di log.
6. Data mengikuti ERD: relasi memakai ObjectId reference; embed hanya yang disebut di ERD (attachments, labels, snapshot actor, previewRows, columns, targets, results). Semua indeks di ERD bagian 20 dibuat di model. Dokumen utama punya schemaVersion.
7. Enum (role, status, priority, dan sebagainya) hanya didefinisikan di packages/shared/src/enums.ts. Nama dan payload event WebSocket hanya didefinisikan di packages/shared/src/events.ts. Keduanya diimpor dari sana.
8. Real-time: web tidak memegang server WebSocket. Setelah menulis ke database, service memanggil lib/realtime.ts yang mengirim POST ke endpoint internal socket server (header shared secret). Browser tersambung ke socket server memakai token pendek (JWT HS256 dari SOCKET_JWT_SECRET) yang diterbitkan route /api/socket-token. Socket server memverifikasi token saat handshake dan memasukkan klien ke room user:{id} dan division:{id}.
9. lib/db.ts menyimpan koneksi Mongoose di globalThis (mencegah koneksi ganda saat hot reload). lib/env.ts memvalidasi semua env dengan Zod dan gagal cepat bila ada yang kurang.
10. Single company: jangan membuat konsep organization atau multi-tenant.

## 5. Aturan TypeScript dan Kualitas

- Dilarang any, @ts-ignore, dan @ts-expect-error tanpa alasan tertulis di komentar. Gunakan unknown dan penyempitan tipe. Tipe domain diturunkan dari Zod (z.infer) atau Mongoose (InferSchemaType); jangan menulis tipe ganda untuk hal yang sama.
- Pakai alias impor @/. Tidak ada impor relatif yang naik lebih dari satu tingkat.
- Penamaan: file kebab-case, komponen PascalCase. Nama kode, komentar, dan commit dalam bahasa Inggris. Teks UI dalam bahasa Inggris dan konsisten.
- Validasi semua input dari luar (form, route handler, event socket) dengan Zod.
- Jangan menaruh secret di kode atau commit. .env\* diabaikan git. Jangan pernah mencetak isi .env di output.
- Tambahkan dependency hanya bila benar-benar dipakai, dan jelaskan alasannya di laporan.
- UI responsif, mendukung dark mode, kontras memadai, memakai komponen shadcn/ui.

## 6. Cara Kerja

- Kerjakan satu fase pada satu waktu sesuai roadmap PRD (bagian 11). Jangan mulai fase berikutnya sebelum diminta.
- Mulai dengan membaca bagian PRD dan ERD yang relevan, lalu tampilkan rencana singkat (daftar file yang akan dibuat atau diubah) sebelum menulis kode.
- Commit kecil dan bermakna (Conventional Commits) di branch khusus fase.
- Fase dianggap selesai hanya jika pnpm typecheck, pnpm lint, pnpm test, dan pnpm build lulus DAN kriteria selesai fase terpenuhi. Jalankan perintahnya; jangan berasumsi.
- Bila ada ambiguitas, ambil keputusan paling sederhana yang sesuai PRD dan catat sebagai asumsi di laporan. Berhenti dan bertanya hanya jika keputusannya sulit dibatalkan (menghapus data, mengubah skema, menambah dependency besar).
- Pemilik sedang belajar: setelah tiap fase, tambahkan 3-5 butir catatan belajar TypeScript/Next.js dari kode yang baru dibuat ke docs/learning-log.md (konsep, di file mana muncul, kenapa dipakai).
- Berkomunikasi dengan pemilik dalam bahasa Indonesia santai.
