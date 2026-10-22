# OfficeSync: PRD & ERD (MongoDB)

Versi 2. Menggantikan ERD relasional pada dokumen sebelumnya. Rencana terbaru: single company, Next.js + React + TypeScript, MongoDB, Tailwind CSS, WebSocket.

# Bagian A. PRD (Product Requirements Document)

## 1. Ringkasan Produk

OfficeSync adalah platform kolaborasi internal untuk satu perusahaan (retail atau software house) dengan tiga divisi: Sales, Marketing, dan IT/Engineering. Platform ini menjadi satu tempat untuk request lintas divisi (tiket), berbagi data dengan persetujuan, perencanaan kampanye promo, notifikasi real-time, dan jejak audit yang mencatat siapa mengubah apa.

Project ini adalah proyek portofolio. Targetnya bukan produk komersial, melainkan demonstrasi kemampuan full-stack: auth, RBAC, real-time, desain data, dan UI yang rapi.

## 2. Latar Belakang dan Masalah

Kolaborasi antar divisi biasanya berjalan lewat WhatsApp, email, dan file Excel. Akibatnya request tercecer, prioritas dan tenggat tidak jelas, data beredar dalam banyak versi tanpa kontrol akses, tidak ada jejak perubahan, dan jadwal antar divisi bisa bentrok (misalnya promo besar bersamaan dengan deployment).

## 3. Tujuan dan Non-Tujuan

**Tujuan**

1. Satu pintu untuk request lintas divisi dengan status, prioritas, dan tenggat yang jelas.
2. Berbagi data antar divisi lewat alur permintaan dan persetujuan.
3. Menghubungkan kampanye Marketing dengan data Sales dan pekerjaan IT.
4. Mencatat setiap perubahan atas nama pelakunya (audit trail).
5. Memberi pembaruan real-time agar pengguna tidak perlu refresh.
6. Menjadi portofolio yang bisa didemokan tanpa setup: ada akun demo dan data contoh.

**Non-tujuan (di luar scope)**

- Multi-company atau multi-tenant.
- Aplikasi mobile native (cukup responsive web).
- Penagihan, pembayaran, atau manajemen karyawan (HR, payroll).
- Integrasi mendalam dengan Google Workspace (Calendar, Drive, Sheets).
- Chat penuh antar pengguna (hanya komentar pada tiket dan kampanye).

## 4. Pengguna dan Persona

Setiap divisi diasumsikan beranggotakan 1-5 orang.

| Persona                | Divisi        | Kebutuhan utama                                                  |
| ---------------------- | ------------- | ---------------------------------------------------------------- |
| Rina, Sales Manager    | Sales         | Mengajukan request ke IT, menyetujui akses data, memantau target |
| Dimas, Marketing Staff | Marketing     | Meminta data penjualan, merancang kampanye, mengumpulkan masukan |
| Fajar, IT Engineer     | IT            | Melihat antrian tiket, mengerjakan, melaporkan progres           |
| Sinta, Admin           | Lintas divisi | Mengelola pengguna, divisi, dan peran                            |

Nama di atas fiktif dan dipakai sebagai data contoh (seed).

## 5. Skenario Utama (Alur Demo)

1. Dimas (Marketing) meminta akses dataset produk slow-moving milik Sales.
2. Rina (Sales Manager) menerima notifikasi real-time dan menyetujui.
3. Dimas membuat kampanye diskon berdasarkan dataset tersebut.
4. Rina memberi masukan pada kampanye, lalu membuat tiket ke IT untuk landing page promo.
5. Fajar (IT) menerima tiket, mengubah status di kanban; Rina dan Dimas melihat perubahan langsung.
6. Tiket selesai, kampanye aktif, dan dashboard menampilkan hasilnya. Seluruh langkah tercatat di activity feed.

## 6. Kebutuhan Fungsional

Prioritas: **P0** wajib untuk MVP, **P1** penting, **P2** bonus.

### 6.1 Autentikasi dan Peran

| ID     | Kebutuhan                                                                            | Prioritas |
| ------ | ------------------------------------------------------------------------------------ | --------- |
| AUTH-1 | Login dengan Google (Auth.js)                                                        | P0        |
| AUTH-2 | Login akun demo per peran (tanpa Google) agar mudah dicoba                           | P0        |
| AUTH-3 | Setiap pengguna punya satu divisi dan satu peran (admin, manager, staff)             | P0        |
| AUTH-4 | Pengguna baru dari Google berstatus pending sampai admin menetapkan divisi dan peran | P1        |
| AUTH-5 | Kontrol akses terpusat lewat fungsi can(user, action, resource)                      | P0        |

### 6.2 Tiket Lintas Divisi

| ID    | Kebutuhan                                                                 | Prioritas |
| ----- | ------------------------------------------------------------------------- | --------- |
| TKT-1 | Buat tiket: judul, deskripsi, divisi tujuan, prioritas, tenggat, lampiran | P0        |
| TKT-2 | Status: open, in_review, in_progress, done (juga rejected opsional)       | P0        |
| TKT-3 | Penugasan ke anggota divisi tujuan oleh manager                           | P0        |
| TKT-4 | Komentar pada tiket                                                       | P0        |
| TKT-5 | Tampilan kanban dengan drag and drop untuk mengubah status                | P1        |
| TKT-6 | Filter dan pencarian (status, prioritas, divisi, penugas)                 | P1        |
| TKT-7 | Tiket dapat ditautkan ke kampanye                                         | P1        |
| TKT-8 | Indikator tenggat terlewat (overdue)                                      | P1        |

### 6.3 Data Hub

| ID    | Kebutuhan                                                                    | Prioritas |
| ----- | ---------------------------------------------------------------------------- | --------- |
| DAT-1 | Divisi mempublikasikan dataset (upload CSV) dengan deskripsi dan visibilitas | P0        |
| DAT-2 | Divisi lain meminta akses beserta alasan                                     | P0        |
| DAT-3 | Manager pemilik dataset menyetujui atau menolak, dengan catatan              | P0        |
| DAT-4 | Pratinjau tabel (beberapa ratus baris pertama) untuk yang punya akses        | P1        |
| DAT-5 | Ekspor CSV untuk yang punya akses                                            | P1        |
| DAT-6 | Akses dapat dicabut atau kedaluwarsa                                         | P2        |

### 6.4 Kampanye Promo

| ID    | Kebutuhan                                                               | Prioritas |
| ----- | ----------------------------------------------------------------------- | --------- |
| CMP-1 | Buat kampanye: nama, tujuan, periode, anggaran, target, dataset rujukan | P0        |
| CMP-2 | Status: draft, review, active, finished                                 | P0        |
| CMP-3 | Divisi lain memberi masukan (feedback) pada kampanye                    | P1        |
| CMP-4 | Kampanye menampilkan tiket terkait                                      | P1        |
| CMP-5 | Pencatatan hasil sederhana (target vs realisasi)                        | P2        |

### 6.5 Activity Feed dan Audit Trail

| ID    | Kebutuhan                                                                      | Prioritas |
| ----- | ------------------------------------------------------------------------------ | --------- |
| LOG-1 | Setiap perubahan penting dicatat: siapa, aksi, objek, waktu                    | P0        |
| LOG-2 | Menyimpan nilai sebelum dan sesudah (misalnya status Open menjadi In Progress) | P0        |
| LOG-3 | Activity feed per divisi dan global                                            | P0        |
| LOG-4 | Label Last edited by pada tiket, dataset, dan kampanye                         | P0        |
| LOG-5 | Halaman riwayat perubahan pada detail objek                                    | P1        |
| LOG-6 | Log bersifat append-only (tidak bisa diubah atau dihapus lewat aplikasi)       | P0        |

### 6.6 Notifikasi dan Real-time

| ID   | Kebutuhan                                                                        | Prioritas |
| ---- | -------------------------------------------------------------------------------- | --------- |
| RT-1 | Notifikasi real-time (tiket baru, penugasan, perubahan status, permintaan akses) | P0        |
| RT-2 | Notification center dengan status dibaca dan belum dibaca                        | P0        |
| RT-3 | Daftar tiket, kanban, dan feed terbarui otomatis tanpa refresh                   | P1        |
| RT-4 | Indikator pengguna online per divisi (presence)                                  | P2        |

### 6.7 Dashboard, Kalender, dan Pencarian

| ID    | Kebutuhan                                                                                                                      | Prioritas |
| ----- | ------------------------------------------------------------------------------------------------------------------------------ | --------- |
| DSH-1 | Dashboard per divisi dengan ringkasan relevan (Sales: request terbuka; Marketing: kampanye aktif; IT: antrian dan beban kerja) | P1        |
| DSH-2 | Metrik lintas divisi: rata-rata waktu penyelesaian tiket                                                                       | P1        |
| CAL-1 | Kalender bersama untuk promo, deployment, dan maintenance, dengan penanda bentrok                                              | P2        |
| SRC-1 | Pencarian global dan command palette (Ctrl+K)                                                                                  | P2        |
| AI-1  | Ringkasan otomatis thread tiket panjang                                                                                        | P2        |

## 7. Matriks Hak Akses

| Aksi                                          | Staff          | Manager              | Admin |
| --------------------------------------------- | -------------- | -------------------- | ----- |
| Membuat tiket ke divisi lain                  | Ya             | Ya                   | Ya    |
| Mengubah status tiket yang ditugaskan padanya | Ya             | Ya                   | Ya    |
| Menugaskan tiket di divisi tujuan             | Tidak          | Ya (divisinya)       | Ya    |
| Mempublikasikan dataset                       | Ya (divisinya) | Ya (divisinya)       | Ya    |
| Menyetujui akses dataset                      | Tidak          | Ya (pemilik dataset) | Ya    |
| Membuat dan mengubah kampanye                 | Ya (Marketing) | Ya (Marketing)       | Ya    |
| Memberi feedback kampanye                     | Ya             | Ya                   | Ya    |
| Melihat activity log                          | Divisinya      | Divisinya            | Semua |
| Mengelola pengguna, divisi, peran             | Tidak          | Tidak                | Ya    |

## 8. Kebutuhan Non-Fungsional

- **Keamanan:** semua pemeriksaan izin dilakukan di server (bukan hanya menyembunyikan tombol di UI); validasi input dengan Zod; secret di environment variable; token socket diverifikasi saat handshake.
- **Performa:** halaman daftar memakai pagination; target waktu muat awal di bawah 3 detik pada koneksi normal; indeks database sesuai pola kueri.
- **Keandalan real-time:** klien menyambung ulang otomatis; bila socket putus, aplikasi tetap berfungsi dan data diambil ulang saat tersambung kembali.
- **Responsif dan aksesibel:** nyaman di desktop dan ponsel; kontras warna memadai; navigasi keyboard untuk elemen utama; dark mode.
- **Kualitas kode:** TypeScript dengan strict mode, lint, dan format otomatis; pengujian unit untuk logika izin dan pencatatan audit; satu uji end-to-end untuk alur demo.
- **Observabilitas:** log error sisi server; Sentry opsional.

## 9. Arsitektur dan Tech Stack

| Lapisan           | Pilihan                                                                    | Catatan                                                       |
| ----------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Bahasa            | TypeScript                                                                 | strict mode aktif sejak awal                                  |
| Frontend          | React, Next.js (App Router), Tailwind CSS                                  | komponen UI dengan shadcn/ui                                  |
| State dan data    | TanStack Query, Zustand                                                    | Query untuk data server, Zustand untuk state UI               |
| Form dan validasi | React Hook Form, Zod                                                       | tipe diturunkan dari skema Zod (z.infer)                      |
| Auth              | Auth.js dengan Google provider dan MongoDB adapter                         | ditambah akun demo                                            |
| Database          | MongoDB Atlas, Mongoose                                                    | replica set tersedia di Atlas                                 |
| Real-time         | Socket.io pada service Node.js terpisah                                    | Next.js di Vercel tidak mendukung koneksi WebSocket persisten |
| UI tambahan       | dnd-kit (kanban), Recharts (grafik)                                        |                                                               |
| Penyimpanan file  | Cloudinary atau UploadThing                                                | CSV dan lampiran                                              |
| Deployment        | Next.js di Vercel; socket server di Railway atau Render; database di Atlas |                                                               |
| Pengujian         | Vitest, Playwright                                                         |                                                               |

**Alur real-time yang dipilih:** saat Next.js menyimpan perubahan ke MongoDB, ia memanggil endpoint internal di socket server (dilindungi shared secret) untuk menyiarkan event ke room yang tepat. Alternatif peningkatan: socket server membaca Change Streams MongoDB.

**Struktur folder (ringkas):** src/modules/{tickets, datasets, campaigns, activity, notifications}, src/lib/{db, auth, permissions, socket}, src/app untuk route, dan folder socket-server terpisah.

## 10. Spesifikasi Event WebSocket

Koneksi diautentikasi dengan token sesi. Setiap klien otomatis bergabung ke room user:{id}, division:{id}, dan room objek yang sedang dibuka.

| Event                    | Room tujuan                   | Pemicu                            |
| ------------------------ | ----------------------------- | --------------------------------- |
| ticket:created           | division:{toDivisionId}       | Tiket baru dibuat                 |
| ticket:updated           | ticket:{id}, division terkait | Status, penugas, atau isi berubah |
| ticket:comment           | ticket:{id}                   | Komentar baru                     |
| dataset:access_requested | division:{ownerDivisionId}    | Permintaan akses dataset          |
| dataset:access_reviewed  | user:{requesterId}            | Permintaan disetujui atau ditolak |
| campaign:feedback        | campaign:{id}                 | Feedback baru                     |
| notification:new         | user:{userId}                 | Notifikasi baru untuk pengguna    |
| activity:new             | division:{id}                 | Entri audit baru                  |
| presence:update          | company                       | Pengguna online atau offline (P2) |

## 11. Roadmap

Tidak ada tenggat tetap; fase disusun berurutan, dan tiap fase sekaligus latihan TypeScript.

| Fase | Isi                                                               | Hasil                         | Latihan TypeScript                  |
| ---- | ----------------------------------------------------------------- | ----------------------------- | ----------------------------------- |
| 0    | Setup repo, TypeScript strict, Tailwind, shadcn/ui, koneksi Atlas | Fondasi siap                  | Tipe dasar, interface               |
| 1    | Auth Google dan akun demo, peran, layout, seed data               | Bisa login per peran          | Union dan literal types             |
| 2    | Tiket, komentar, kanban                                           | Fitur inti jalan              | Tipe props dan hooks React          |
| 3    | Data Hub dan alur persetujuan                                     | Sales dan Marketing terhubung | Zod dan z.infer                     |
| 4    | Kampanye dan feedback, tiket terkait                              | Alur demo lengkap             | Utility types (Partial, Pick, Omit) |
| 5    | Activity log, socket server, notifikasi real-time                 | Terasa hidup                  | Generics sederhana                  |
| 6    | Dashboard, polish, dark mode, deploy, README dan case study       | Siap dipamerkan               |                                     |
| 7    | Kalender, pencarian global, ringkasan AI (opsional)               | Nilai tambah                  |                                     |

Fase 1 sampai 4 sudah cukup untuk portofolio yang kuat; fase 5 adalah pembeda utama.

## 12. Risiko dan Mitigasi

| Risiko                                          | Mitigasi                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------- |
| Kurva belajar TypeScript memperlambat awal      | Strict mode sejak awal, belajar bertahap sesuai fase, hindari any dan ts-ignore |
| WebSocket tidak jalan di Vercel                 | Socket.io di service terpisah dari awal                                         |
| Aggregation MongoDB untuk analitik rumit        | Mulai dari metrik sederhana; simpan field turunan bila perlu                    |
| Scope terlalu besar                             | Pegang prioritas P0, kerjakan P1 dan P2 hanya setelah alur demo jalan           |
| Google OAuth mode Testing dibatasi pengguna uji | Sediakan akun demo sebagai jalur utama bagi pengunjung                          |
| Data demo terasa kosong                         | Seed data realistis untuk 3 divisi dan beberapa tiket, dataset, kampanye        |

## 13. Kriteria Selesai (Definition of Done) MVP

- Alur demo pada bagian 5 dapat dijalankan dari awal sampai akhir dengan akun demo.
- Semua kebutuhan P0 terpenuhi.
- Aksi tanpa izin ditolak di server, bukan hanya disembunyikan di UI.
- Setiap perubahan pada tiket, dataset, dan kampanye muncul di activity log dengan nama pelaku.
- Notifikasi real-time bekerja antara dua browser berbeda.
- Aplikasi ter-deploy dengan URL publik dan README berisi case study.

## 14. Pertanyaan Terbuka

1. Apakah pengguna Google baru langsung aktif atau menunggu persetujuan admin (AUTH-4)?
2. Apakah dataset cukup berupa CSV berukuran kecil, atau perlu mendukung file besar?
3. Apakah kalender dan pencarian global masuk rilis pertama atau ditunda?
