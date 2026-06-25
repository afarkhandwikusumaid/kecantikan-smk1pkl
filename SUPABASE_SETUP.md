# Panduan Konfigurasi Database Supabase

Dokumen ini berisi tutorial langkah-demi-langkah untuk membuat dan menyambungkan database Supabase untuk projek website **Tata Kecantikan & Spa SMKN 1 Pekalongan**, serta skrip SQL lengkap untuk menginisialisasi tabel-tabel, kebijakan keamanan (RLS), dan data awal (*seed data*).

---

## Langkah 1: Buat Akun & Projek di Supabase

1. Buka [https://supabase.com](https://supabase.com) dan masuk atau daftarkan akun baru (gratis).
2. Di halaman Dashboard, klik tombol **New Project**.
3. Pilih Organization Anda, lalu isi informasi projek:
   - **Name**: `kecantikan-smk1pkl` (atau nama lain bebas)
   - **Database Password**: Buat password yang kuat (dan catat!)
   - **Region**: Pilih region terdekat, misalnya **Singapore (ap-southeast-1)**.
   - **Pricing Plan**: Pilih **Free** (Gratis).
4. Klik **Create new project** dan tunggu beberapa menit hingga infrastruktur database siap dialokasikan.

---

## Langkah 2: Inisialisasi Database (Skrip SQL)

Setelah projek berhasil dibuat, lakukan inisialisasi tabel:
1. Di bilah navigasi kiri dasbor Supabase Anda, buka **SQL Editor** (ikon terminal dengan simbol `SQL`).
2. Klik **New Query** untuk membuat lembar editor baru.
3. Salin seluruh skrip SQL di bawah ini dan tempelkan ke editor Supabase:

```sql
-- 1. HAPUS TABEL JIKA SUDAH ADA (Untuk memulai bersih)
drop table if exists "jobVacancies" cascade;
drop table if exists news cascade;
drop table if exists gallery cascade;
drop table if exists facilities cascade;
drop table if exists teachers cascade;
drop table if exists curriculum cascade;
drop table if exists partnerships cascade;
drop table if exists alumni cascade;
drop table if exists achievements cascade;
drop table if exists settings cascade;

-- 2. BUAT TABEL BARU
create table news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  "desc" text not null,
  category text not null,
  date text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table gallery (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  "studentName" text,
  grade text,
  category text,
  "imageUrl" text,
  description text,
  "productsUsed" text[],
  "achievementBadge" text,
  date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table facilities (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  capacity text,
  status text default 'Aktif',
  image text,
  equipment text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table teachers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  nip text,
  subject text,
  position text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table curriculum (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  semester integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table partnerships (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  subtitle text,
  "isPink" boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table alumni (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  "graduationYear" text,
  workplace text,
  testimonial text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table achievements (
  id uuid default gen_random_uuid() primary key,
  "studentName" text not null,
  type text not null,
  level text not null,
  year text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table "jobVacancies" (
  id uuid default gen_random_uuid() primary key,
  position text not null,
  company text not null,
  location text,
  deadline text,
  description text,
  status text default 'Buka',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table settings (
  key text primary key,
  value jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. AKTIFKAN ROW LEVEL SECURITY (RLS) UNTUK KEAMANAN
alter table news enable row level security;
alter table gallery enable row level security;
alter table facilities enable row level security;
alter table teachers enable row level security;
alter table curriculum enable row level security;
alter table partnerships enable row level security;
alter table alumni enable row level security;
alter table achievements enable row level security;
alter table "jobVacancies" enable row level security;
alter table settings enable row level security;

-- 4. BUAT POLICY AKSES DATA (Select publik, CRUD hanya untuk Admin terautentikasi)
create policy "news_read" on news for select using (true);
create policy "news_write" on news for all using (auth.role() = 'authenticated');

create policy "gallery_read" on gallery for select using (true);
create policy "gallery_write" on gallery for all using (auth.role() = 'authenticated');

create policy "facilities_read" on facilities for select using (true);
create policy "facilities_write" on facilities for all using (auth.role() = 'authenticated');

create policy "teachers_read" on teachers for select using (true);
create policy "teachers_write" on teachers for all using (auth.role() = 'authenticated');

create policy "curriculum_read" on curriculum for select using (true);
create policy "curriculum_write" on curriculum for all using (auth.role() = 'authenticated');

create policy "partnerships_read" on partnerships for select using (true);
create policy "partnerships_write" on partnerships for all using (auth.role() = 'authenticated');

create policy "alumni_read" on alumni for select using (true);
create policy "alumni_write" on alumni for all using (auth.role() = 'authenticated');

create policy "achievements_read" on achievements for select using (true);
create policy "achievements_write" on achievements for all using (auth.role() = 'authenticated');

create policy "jobs_read" on "jobVacancies" for select using (true);
create policy "jobs_write" on "jobVacancies" for all using (auth.role() = 'authenticated');

create policy "settings_read" on settings for select using (true);
create policy "settings_write" on settings for all using (auth.role() = 'authenticated');

-- 5. MASUKKAN DATA AWAL (SEED DATA)
insert into news (title, "desc", category, date) values
('Sertifikasi Kompetensi Resmi BNSP LSP-P1 Jurusan Kecantikan Berjalan Khidmat', 'Seluruh siswi tingkat akhir mengikuti rangkaian uji kompetensi terapan didampingi penguji asesor yang ketat dari BNSP Indonesia guna menjamin legalitas keahlian.', 'Akademik', '2026-06-12'),
('Siswa SMKN 1 Pekalongan Juara 1 LKS Bidang Beauty Therapy Karesidenan Pekalongan', 'Tim perwakilan sekolah menyabet medali emas dalam kompetisi bergengsi tahunan LKS dengan memamerkan kehalusan teknik massage tradisional modifikasi keraton nusantara.', 'Prestasi', '2026-06-08'),
('Penyelarasan Kurikulum Vokasi Bersama Martha Tilaar Group & Mustika Ratu Tbk', 'Workshop tahunan sinkronisasi materi ajar berorientasi penyerapan kerja tinggi serta persiapan program beasiswa studi magang di industri kosmetik kecantikan nasional.', 'Kemitraan', '2026-05-25');

insert into gallery (title, "studentName", grade, category, "imageUrl", description, "productsUsed", "achievementBadge", date) values
('Rias Pengantin Solo Putri Modifikasi', 'Fara Adelia Pramesti', 'Kelas XII - Kecantikan 2', 'Prestasi', 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600', 'Mahakarya tata rias pengantin dengan Paes klasik gaya Surakarta Sala Putri, diberi sentuhan modern dewy look di bagian pipi. Dilengkapi hiasan melati ronce cunduk mentul yang presisi.', array['Wardah Instaperfect Foundation', 'Mustika Ratu Paes Kit', 'Make Over Eyeshadow Palette'], 'Juara 1 LKS Kota Pekalongan 2025', '2026-06-12'),
('Sanggul Fantasi Siluet Lotus Mekar', 'Dian Wahyuni Ningtyas', 'Kelas XII - Kecantikan 1', 'Fasilitas', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600', 'Desain penataan rambut avant-garde bermotif bunga lotus mekar mandiri di atas sanggul Jawa klasik. Teknik sasak tinggi penahan beban tanpa jepit berlebihan.', array['Rudy Hadisuwarno Styling Spray', 'Makarizo Professional Hair Wax', 'L''Oreal Elnett Satin'], 'Juara Harapan 1 LKS Jawa Tengah 2025', '2026-06-12'),
('Dermal Moisture-Lock bagi Kulit Dehidrasi', 'Amelia Saputri Hermawan', 'Kelas XII - Kecantikan 2', 'Praktik', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600', 'Studi kasus klinis penanganan kulit wajah bersisik ekstrem akibat paparan AC berkepanjangan. Menggunakan elektroterapi Galvanic dan masker alginat peel-off teh hijau.', array['Martha Tilaar Professional Serum', 'Biokos Aloe Moisture Gel', 'Skin Food Alginate Powder'], null, '2026-06-12'),
('Ramuan Scrub Boreh Rempah Kuning Pekalongan', 'Ratih Sukma Ningrum', 'Kelas XI - Kecantikan 1', 'Kegiatan', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', 'Formulasi scrub lulur basah organik menggabungkan rempah kencur Pekalongan, bubuk kopi Robusta, parutan kunyit, dan esens temulawak murni untuk detoksifikasi kulit sel mati.', array['Bahan Alami Curcumae Radix', 'Minyak Zaitun Mustika Ratu', 'Aromaterapi Esensial Serai'], 'Proyek Inovasi Ramuan Nusantara Terbaik', '2026-06-12');

insert into facilities (name, description, capacity, status, image, equipment) values
('Laboratorium Utama Kosmetologi Terapan', 'Laboratorium rias wajah dan perawatan kulit utama yang dilengkapi dengan 20 stasiun kerja hidrolik, cermin LED melingkar 3 arah, dan pencahayaan studio standar kompetensi nasional.', 'Kapasitas 20 Siswi', 'Aktif', 'https://images.unsplash.com/photo-1521590832167-7bcbfeac2531?q=80&w=800', array['Stasiun Kerja Hidrolik', 'Cermin Rias Studio LED', 'Alat Sterilisasi Autoclave']),
('Klinik Estetika & Teaching Factory Eduspa', 'Living laboratory untuk simulasi pelayanan konsumen riil. Dilengkapi dengan tempat tidur facial elektronik, mesin dermal High Frequency, Galvanic, dan Ultrasound skin scrubber.', 'Kapasitas 10 Bed', 'Aktif', 'https://images.unsplash.com/photo-1519823551278-64ac9283ca47?q=80&w=800', array['Electronic Facial Bed', 'Dermal High Frequency', 'Ultrasound Skin Scrubber']),
('Studio Hairdressing & Sanggul Kreatif', 'Laboratorium spesialis penataan rambut, cuci rambut, pemangkasan rambut modern, dan kreasi sanggul pengantin adat tradisional nusantara.', 'Kapasitas 25 Siswi', 'Aktif', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800', array['Hair Wash Chair', 'Styling Mirror Station', 'Sanggul Jawa & Aksesoris']);

insert into teachers (name, nip, subject, position, image) values
('Dra. Hj. Wahyu Astuti', '19680312 199403 2 004', 'Etika Pelayanan & Beauty Service Excellence', 'Ketua Konsentrasi Keahlian', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400'),
('Sri Mulyani, S.Pd.', '19750824 200212 2 003', 'Anatomi Fisiologi Kulit & Formulasi Kosmetik', 'Sekretaris Jurusan / Dewan Guru Produktif', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400'),
('Rini Widowati, S.S.T', '19841102 201001 2 008', 'Terapi Spa Tubuh & Pijat Tradisional Nusantara', 'Koordinator Unit TEFA Eduspa Salon', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400');

insert into curriculum (name, description, semester) values
('Dasar Kecantikan & Kosmetologi', 'Mempelajari dasar-dasar tipe kulit wajah, anatomi, sanitasi, higiene, K3, dan formulasi dasar kosmetik.', 1),
('Manicure, Pedicure & Nail Art', 'Teknik perawatan kuku tangan dan kaki secara fisiologis serta seni menghias kuku (Nail Art).', 2),
('Tata Rias Pengantin Tradisional Jawa', 'Penyusunan pakem cengkorongan paes ageng Solo dan Yogyakarta serta sanggul tradisional melati.', 3),
('Teknologi Kelistrikan Dermal Estetika', 'Praktik penggunaan mesin High Frequency, Galvanic, dan Ultrasound skin scrubber untuk peremajaan kulit.', 4),
('Praktik Kerja Lapangan (PKL) Klinik Estetika', 'Magang industri di klinik kecantikan estetika papan atas sebagai asisten dermal klinis terakreditasi.', 5),
('Digital Marketing & Manajemen Bisnis Salon', 'Mempelajari model bisnis canvas, pembukuan kasir digital, dan periklanan media sosial.', 6);

insert into partnerships (name, subtitle, "isPink") values
('Martha Tilaar', 'GROUP', false),
('Mustika Ratu', '', true),
('Wardah', 'Cosmetics', false),
('BNSP LSP-P1', '', false),
('Rudy Hadisuwarno', '', true);

insert into alumni (name, "graduationYear", workplace, testimonial) values
('Adelia Setyowati', '2024', 'Erha Clinic Group Pekalongan (Aesthetician)', 'Praktik di TEFA Eduspa Salon sangat membantu saya melatih mental menghadapi konsumen riil. Saat bekerja di Erha Clinic, saya tidak canggung lagi mengoperasikan mesin dermal kelistrikan.'),
('Putri Rahayu', '2023', 'Martha Tilaar Salon & Day Spa Bali (Senior Therapist)', 'Sertifikasi LSP-P1 BNSP yang difasilitasi sekolah diakui secara nasional. Begitu lulus, saya langsung ditempatkan di resor bintang 5 di Bali dengan standar gaji yang sangat baik.');

insert into achievements ("studentName", type, level, year, description) values
('Dian Wahyuni N.', 'LKS Bidang Beauty Therapy', 'Nasional', '2025', 'Juara Harapan 1 Tingkat Nasional Jawa Tengah dengan kreasi pijat rempah hangat.'),
('Fara Adelia P.', 'LKS Bidang Beauty Therapy', 'Kota/Kab', '2025', 'Juara 1 Tingkat Karesidenan Pekalongan di bidang tata rias pengantin modifikasi Solo Putri.');

insert into "jobVacancies" (position, company, location, deadline, description, status) values
('Beauty Consultant & Therapist', 'Larissa Aesthetic Center Pekalongan', 'Kota Pekalongan', '2026-08-30', 'Dibutuhkan alumni Jurusan Kecantikan SMKN 1 Pekalongan yang jujur, komunikatif, dan terampil dalam facial treatment.', 'Buka'),
('Aesthetician Assistant', 'Naavagreen Estetika', 'Kab. Batang', '2026-07-15', 'Membantu operasional treatment wajah dasar di bawah pengawasan dokter penanggung jawab klinik.', 'Buka');

insert into settings (key, value) values
('visi-misi', '{"visi": "Menjadi pelopor pendidikan vokasi kecantikan dan spa di tingkat nasional yang menghasilkan lulusan unggul, mandiri, berjiwa wirausaha, serta menguasai integrasi teknologi kosmetologi tropis modern yang berkarakter mulia pada tahun 2030.", "misi": ["Penyelarasan Kurikulum Komprehensif (SKKNI): Menyelenggarakan proses pembelajaran berkualitas tinggi dengan standar kosmetik industri kecantikan nasional.", "Kemitraan Strategis Dunia Usaha (DUDI): Menjalin kerja sama penempatan praktik kerja industri (prakerin) di PT Mustika Ratu, Martha Tilaar Group, dan klinik estetika terpercaya.", "Penguatan Mental Kewirausahaan Tangguh: Membekali siswa kemandirian berbisnis, analisis kosmetik dasar, serta profesionalisme pelayanan prima."]}'),
('contact', '{"address": "Jl. Landungsari No. 2, Pekalongan, Jawa Tengah", "email": "kecantikan@smkn1pekalongan.sch.id", "phone": "+62 823-2898-1111"}'),
('social', '{"instagram": "@kecantikan_smk1pkl", "youtube": "Kecantikan SMKN 1 Pekalongan Official", "tiktok": "@kecantikan_smk1pkl"}');
```

4. Klik tombol **Run** (di kanan bawah editor) untuk mengeksekusi perintah. Pastikan tidak ada pesan error merah. Sekarang database Anda sudah terisi data awal sekolah secara lengkap!

---

## Langkah 3: Daftarkan User Admin

Agar Anda dapat masuk ke Dashboard Admin, buatlah satu pengguna resmi di Supabase:
1. Di bilah navigasi kiri dasbor Supabase, buka menu **Authentication** (ikon gembok/key).
2. Klik tombol **Add User** -> **Create User**.
3. Masukkan **Email** dan **Password** admin yang ingin Anda gunakan untuk login (misalnya: `admin@smkn1pekalongan.sch.id` dan password pilihan Anda).
4. Klik **Create User**. Pastikan opsi *Auto-confirm User* aktif atau centang konfirmasi agar user langsung aktif tanpa perlu memverifikasi email terlebih dahulu.

---

## Langkah 4: Hubungkan ke Aplikasi (Konfigurasi `.env`)

1. Pada dasbor Supabase Anda, klik ikon gerigi **Project Settings** di pojok kiri bawah.
2. Masuk ke tab **API**.
3. Salin nilai-nilai berikut:
   - **Project URL** (salin URL di bawah tulisan *Project URL*)
   - **Anon Public API Key** (salin kunci panjang di bawah tulisan *anon public*)
4. Buka file `.env` di direktori utama projek ini dan ganti placeholder yang ada dengan nilai asli yang barusan Anda salin:

```env
VITE_SUPABASE_URL="https://[PROJECT-ID-ANDA].supabase.co"
VITE_SUPABASE_ANON_KEY="[ANON-KEY-PANJANG-ANDA]"
```

5. Simpan file `.env` tersebut.
6. Aplikasi akan mendeteksi variabel ini, menonaktifkan simulasi lokal (`localStorage`), dan otomatis melakukan CRUD langsung ke Cloud Database Supabase Anda!
