# Web Portal Jurusan Kecantikan dan Spa — SMK Negeri 1 Pekalongan

Website resmi dan Sistem Manajemen Konten (CMS) untuk Konsentrasi Keahlian **Kecantikan dan Spa** di **SMK Negeri 1 Pekalongan**. Platform ini dirancang untuk menyajikan profil jurusan, kegiatan akademik, fasilitas praktik industri, pendaftaran alumni, serta panel administrasi berbasis peran (admin portal) untuk pengelolaan konten secara dinamis.

---

## Fitur Utama

### 1. Portal Publik (Pengunjung & Siswa)
*   **Beranda (Home):** Menyajikan sambutan Kepala Program Keahlian, info kemitraan industri (DUDI), dan FAQ interaktif.
*   **Profil Jurusan:**
    *   **Sejarah:** Latar belakang dan perkembangan program keahlian.
    *   **Visi & Misi:** Komitmen dan arah tujuan kompetensi keahlian.
    *   **Struktur Organisasi & Guru:** Daftar tenaga pengajar, kualifikasi, NIP, serta kutipan motivasi.
    *   **Akreditasi:** Informasi status akreditasi resmi jurusan.
*   **Akademik:**
    *   **Kurikulum:** Struktur mata pelajaran berbasis Kurikulum Merdeka.
    *   **Pembelajaran:** Detail dan dokumentasi kegiatan pembelajaran praktik siswa.
*   **Fasilitas:** Daftar laboratorium, studio tata rias, salon penataan rambut, serta klinik perawatan kulit (*Skin Care Clinic*) berstandar industri.
*   **Galeri:** Dokumentasi foto kegiatan, kompetensi siswa, serta dokumentasi praktik Eduspa.
*   **Alumni & Karir:**
    *   **Pendataan Alumni (Tracer Study):** Formulir pendaftaran kelulusan dan penelusuran status kerja/wirausaha.
    *   **Statistik Alumni:** Grafik visualisasi penyerapan alumni di dunia kerja dan industri kecantikan.

### 2. Portal Admin (`/admin`)
*   **Autentikasi Aman:** Sistem masuk/login terintegrasi dengan **Supabase Auth**.
*   **Dasbor Ringkasan:** Statistik cepat mengenai jumlah data guru, fasilitas, galeri, dan alumni terdaftar.
*   **Manajer Konten (CMS):**
    *   Pengeditan teks sambutan dan foto kepala program.
    *   Manajemen logo kemitraan industri.
    *   CRUD (Create, Read, Update, Delete) data Tanya Jawab (FAQ).
    *   Pembaruan dinamis Visi & Misi serta Sejarah Jurusan.
    *   Pengelolaan data Guru (NIP, Mata Pelajaran, Foto, Sertifikasi).
    *   Pembaruan data Kurikulum dan Pembelajaran.
    *   Pengelolaan database Fasilitas (nama, kapasitas, daftar alat, galeri foto).
    *   Manajemen dokumentasi Galeri kegiatan.
    *   Database alumni serta verifikasi/pengelolaan status tracer study.
*   **Proteksi Sesi:** Menggunakan penyimpanan berbasis tab (*sessionStorage*) untuk memastikan keamanan akses panel admin.

---

## Teknologi yang Digunakan

*   **Frontend Framework:** React 19
*   **Build Tool:** Vite 6
*   **Bahasa Pemrograman:** TypeScript
*   **Desain & Styling:** Tailwind CSS v4 (menggunakan `@tailwindcss/vite` untuk build yang cepat)
*   **Animasi:** Motion (Framer Motion) untuk transisi halaman dan efek micro-interaction
*   **Ikon:** Lucide React
*   **Routing:** React Router DOM v7
*   **Backend & Database:** Supabase (Database Relasional, Auth, dan Storage Buckets)

---

## Struktur Direktori Utama

```text
kecantikan-smk1pkl/
├── .env.example            # Contoh berkas konfigurasi variabel lingkungan
├── .env.local              # Konfigurasi lokal (diabaikan oleh git)
├── index.html              # Template HTML utama aplikasi
├── package.json            # Daftar dependensi dan perintah skrip
├── seed_web_profile.sql    # Skrip SQL untuk inisialisasi tabel & bucket Supabase
├── vite.config.ts          # Konfigurasi plugin Vite dan Tailwind
├── supabase/
│   └── config.toml         # Konfigurasi proyek lokal Supabase
├── src/
│   ├── main.tsx            # Entry point aplikasi React
│   ├── App.tsx             # Manajemen router utama publik dan admin
│   ├── index.css           # Styling global dan konfigurasi Tailwind
│   ├── lib/
│   │   └── supabase.ts     # Client Supabase & utilitas unggah berkas (image upload)
│   ├── components/
│   │   ├── layout/         # Header & Footer publik
│   │   └── admin/          # Komponen layout, auth, dan konteks admin
│   └── pages/
│       ├── home/           # Halaman Utama (Beranda)
│       ├── profil/         # Halaman Sejarah, Visi Misi, Guru, Akreditasi
│       ├── akademik/       # Halaman Kurikulum & Pembelajaran
│       ├── fasilitas/      # Halaman Daftar Lab & Fasilitas
│       ├── alumni/         # Halaman Pendaftaran & Statistik Alumni
│       └── admin/          # Modul Panel Admin (Dashboard & CRUD Managers)
```

---

## Konfigurasi Basis Data & Media (Supabase)

Untuk menjalankan portal ini dengan fitur dinamis dan unggah gambar, Anda harus menginisialisasi database Supabase terlebih dahulu.

### 1. Inisialisasi Tabel
Salin konten dari berkas [`seed_web_profile.sql`](file:///Users/mac/kecantikan-smk1pkl/seed_web_profile.sql) dan jalankan pada **SQL Editor** di Dashboard Supabase Anda. Skrip ini akan membuat tabel berikut:
*   `site_settings` (Key-Value JSON untuk konfigurasi teks dinamis)
*   `teachers` (Data guru dan staff pengajar)
*   `facilities` (Daftar laboratorium dan studio beserta detailnya)
*   `curriculum` (Mata pelajaran dan kurikulum pembelajaran)
*   `galleries` (Dokumentasi galeri foto)
*   `news` (Berita dan pengumuman)
*   `services` (Opsi layanan Eduspa Salon)
*   `certificates` (Sertifikat kompetensi sekolah/jurusan)

### 2. Setup Storage (Unggah Gambar)
*   Buat sebuah bucket baru bernama `asset-saya` di menu **Storage** Supabase.
*   Ubah akses bucket tersebut menjadi **Public** agar URL gambar dapat diakses oleh umum.
*   Skrip [`seed_web_profile.sql`](file:///Users/mac/kecantikan-smk1pkl/seed_web_profile.sql) juga telah mengonfigurasi kebijakan akses (*Storage Policies*) untuk bucket ini agar mengizinkan unggah, sunting, dan hapus berkas tanpa RLS ketat selama masa pengembangan.

---

## Panduan Menjalankan Secara Lokal

### **Persyaratan Sistem:**
*   Node.js (versi 18 ke atas disarankan)
*   NPM / Bun / Yarn sebagai package manager

### **Langkah-Langkah:**

1.  **Kloning Proyek & Masuk ke Direktori:**
    ```bash
    cd kecantikan-smk1pkl
    ```

2.  **Konfigurasi Variabel Lingkungan:**
    Salin berkas `.env.example` menjadi `.env.local`:
    ```bash
    cp .env.example .env.local
    ```
    Buka `.env.local` dan masukkan URL proyek serta Kunci Anonim Supabase Anda:
    ```env
    VITE_SUPABASE_URL=https://proyek-anda.supabase.co
    VITE_SUPABASE_ANON_KEY=kunci-anon-anda-di-sini
    ```

3.  **Instalasi Dependensi:**
    ```bash
    npm install
    ```
    *(atau `bun install` jika menggunakan Bun)*

4.  **Jalankan Server Pengembang (Development Server):**
    ```bash
    npm run dev
    ```

5.  **Akses Aplikasi:**
    Buka peramban (browser) Anda dan akses tautan lokal:
    *   **Portal Publik:** [http://localhost:3000](http://localhost:3000)
    *   **Portal Admin:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Catatan Pengembangan

*   **Penyimpanan Sesi Admin:** Jika Anda membuka tab baru di browser Anda untuk masuk ke halaman `/admin`, Anda akan diminta untuk masuk kembali. Hal ini sengaja diimplementasikan melalui `sessionStorageAdapter` pada konfigurasi Supabase Auth di [`src/lib/supabase.ts`](file:///Users/mac/kecantikan-smk1pkl/src/lib/supabase.ts) demi privasi keamanan akun admin sekolah.
*   **Modifikasi CSS / UI:** Kustomisasi gaya visual dapat dilakukan secara langsung di berkas [`src/index.css`](file:///Users/mac/kecantikan-smk1pkl/src/index.css) menggunakan aturan sintaksis baru dari Tailwind CSS v4.
