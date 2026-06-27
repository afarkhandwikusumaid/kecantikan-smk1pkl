-- ==========================================
-- SQL SCHEMA JURUSAN KECANTIKAN & SPA
-- SMKN 1 PEKALONGAN
-- ==========================================

-- Hapus tabel lama jika sudah ada agar bisa mulai dari awal dengan bersih
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS galleries CASCADE;
DROP TABLE IF EXISTS facilities CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS curriculum CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS certificates CASCADE;

-- 1. TABEL PENGATURAN SITUS (site_settings)
-- Digunakan untuk menyimpan teks profil, visi-misi, kontak, dan data tunggal lainnya.
-- Menggunakan format Key-Value (JSON) agar sangat fleksibel.
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: Data default tidak disisipkan di sini agar admin dapat memasukkan secara manual melalui portal admin.
-- Jika ingin menambahkan default, cukup insert ke tabel ini (contoh: 'visi_misi', 'sambutan', 'faqs').

-- 2. TABEL BERITA & PENGUMUMAN (news)
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL GALERI & DOKUMENTASI (galleries)
CREATE TABLE galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL FASILITAS & LABORATORIUM (facilities)
CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  capacity TEXT,
  tools TEXT[],
  -- image_urls: Menyimpan banyak link gambar sekaligus (Array of String) untuk fitur Slider Foto Lab
  image_urls TEXT[],
  status TEXT NOT NULL DEFAULT 'Aktif',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABEL GURU & STAFF (teachers)
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  nip TEXT,
  subject TEXT NOT NULL,
  position TEXT NOT NULL,
  image_url TEXT,
  quote TEXT,
  certifications TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABEL KURIKULUM (curriculum)
CREATE TABLE curriculum (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  credits TEXT,
  semester INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABEL LAYANAN EDUSPA SALON (services)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL DEFAULT 60,
  price INTEGER NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL,
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. TABEL SERTIFIKAT & PENGHARGAAN (certificates)
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date DATE NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- PENGATURAN STORAGE & KEAMANAN
-- ==========================================

-- Pastikan untuk membuat Bucket bernama 'asset-saya' di menu Storage Supabase Anda dan set ke "Public".
-- Script di bawah mencoba membuatnya secara otomatis (jika ada error, buat manual di dashboard Supabase).
INSERT INTO storage.buckets (id, name, public) VALUES ('asset-saya', 'asset-saya', true)
ON CONFLICT (id) DO NOTHING;

-- Hapus policy lama jika sudah ada
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Deletes" ON storage.objects;

-- Policy untuk mengizinkan akses publik penuh ke bucket asset-saya
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'asset-saya');
CREATE POLICY "Allow All Uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'asset-saya');
CREATE POLICY "Allow All Updates" ON storage.objects FOR UPDATE USING (bucket_id = 'asset-saya');
CREATE POLICY "Allow All Deletes" ON storage.objects FOR DELETE USING (bucket_id = 'asset-saya');

-- DISABLE ROW LEVEL SECURITY (RLS)
-- PENTING: Untuk tahap ini, kita mematikan keamanan lapis kedua (RLS) 
-- agar portal admin (frontend) bisa bebas menambahkan, mengedit, dan menghapus data tanpa perlu token otentikasi login yang kompleks.
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE galleries DISABLE ROW LEVEL SECURITY;
ALTER TABLE facilities DISABLE ROW LEVEL SECURITY;
ALTER TABLE teachers DISABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE certificates DISABLE ROW LEVEL SECURITY;
