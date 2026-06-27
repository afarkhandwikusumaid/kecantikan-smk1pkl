-- SQL Schema untuk Web Profil SMK Jurusan Kecantikan

-- Hapus tabel lama jika sudah ada agar bisa mulai dari awal dengan bersih
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS galleries CASCADE;
DROP TABLE IF EXISTS facilities CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS curriculum CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- 1. Tabel Berita (news)
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Galeri (galleries)
CREATE TABLE galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel Fasilitas (facilities)
CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  capacity TEXT,
  tools TEXT[],
  status TEXT NOT NULL DEFAULT 'Aktif',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabel Guru (teachers)
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

-- 4b. Tabel Kurikulum (curriculum)
CREATE TABLE curriculum (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  semester INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabel Layanan Eduspa (services)
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

-- 6. Tabel Pengaturan Situs (site_settings)
-- Menggunakan format Key-Value agar fleksibel untuk menyimpan teks panjang atau JSON
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Settings
INSERT INTO site_settings (key, value) VALUES
  ('visi_misi', '{"visi": "Menjadi program keahlian unggulan dalam bidang kecantikan dan spa di tingkat nasional...", "misi": ["Menyelenggarakan pembelajaran berbasis proyek", "Menjalin kemitraan industri"]}'::jsonb),
  ('sambutan', '{"name": "Dra. Endang Sulastri, M.Pd.", "title": "Kakomli", "photoUrl": "", "greetingText": "Selamat datang di website resmi..."}'::jsonb),
  ('contact', '{"address": "Jl. Landungsari No. 2, Pekalongan, Jawa Tengah", "phone": "+62 812-2951-6969", "email": "kecantikan@smkn1pekalongan.sch.id", "mapsUrl": ""}'::jsonb),
  ('social', '{"instagram": "", "facebook": "", "youtube": "", "tiktok": ""}'::jsonb);

-- 7. Setup Storage Bucket (eduspa-media)
-- Pastikan untuk membuat Bucket secara manual atau lewat SQL ini jika diizinkan:
INSERT INTO storage.buckets (id, name, public) VALUES ('eduspa-media', 'eduspa-media', true)
ON CONFLICT (id) DO NOTHING;

-- Hapus policy lama jika sudah ada agar bisa dibuat ulang dengan bersih
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Deletes" ON storage.objects;

-- Policy untuk mengizinkan akses publik ke bucket eduspa-media
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'eduspa-media');
CREATE POLICY "Allow All Uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'eduspa-media');
CREATE POLICY "Allow All Updates" ON storage.objects FOR UPDATE USING (bucket_id = 'eduspa-media');
CREATE POLICY "Allow All Deletes" ON storage.objects FOR DELETE USING (bucket_id = 'eduspa-media');

-- Agar API dapat melakukan read/write tanpa auth yang rumit (hanya untuk testing/FE-only sementara), pastikan RLS di-disable pada tabel atau buat policy public.
-- PENTING: Untuk tahap awal, kita disable RLS agar frontend bisa langsung akses data. Nanti bisa diaktifkan lagi setelah setup auth yang aman.
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE galleries DISABLE ROW LEVEL SECURITY;
ALTER TABLE facilities DISABLE ROW LEVEL SECURITY;
ALTER TABLE teachers DISABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
