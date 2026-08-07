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

-- 6. TABEL KURIKULUM & MATA PELAJARAN (curriculum)
CREATE TABLE curriculum (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  credits TEXT,
  semester INTEGER NOT NULL,
  type TEXT NOT NULL DEFAULT 'Umum',
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

-- ==========================================
-- DATA DEFAULT SEEDING (Nilai Awal)
-- ==========================================

INSERT INTO site_settings (key, value) VALUES (
  'visi_misi',
  '{"visi": "Unggul dalam IPTEK, Mantap dalam IMTAQ, Berbudaya Lingkungan dan Berjiwa Wirausaha.", "misi": ["Mewujudkan kurikulum yang berwawasan IPTEK, IMTAQ, Budaya Lingkungan dan Wirausaha.", "Mewujudkan pembelajaran yang kreatif, inovatif, dan inspiratif.", "Mewujudkan Sumber Daya Guru yang berkualitas dibidang kecantikan.", "Mewujudkan lulusan yang berdaya saing tinggi dan siap kerja di industri.", "Menyediakan sarana dan prasarana praktik yang setara dengan industri salon dan spa."]}'
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES (
  'sambutan',
  '{"name": "Dra. Endang Sulastri, M.Pd.", "photoUrl": "", "title": "Kepala Jurusan", "greetingText": "Selamat datang di platform digital resmi Konsentrasi Keahlian Kecantikan dan Spa SMK Negeri 1 Pekalongan. Kami sangat bersyukur dapat menyediakan wadah informasi dan komunikasi ini untuk menjangkau seluruh siswa, orang tua, alumni, maupun dunia industri.\n\nSebagai program keahlian vokasi unggulan yang telah terakreditasi A (Unggul), kami terus berkomitmen untuk memberikan pendidikan yang berkualitas, seimbang antara teori dan praktik, serta selalu update dengan perkembangan tren estetika, kosmetologi, dan industri spa secara global. Dengan adanya fasilitas Teaching Factory Eduspa Klinik, kami berharap para lulusan kami kelak menjadi tenaga ahli yang profesional, berkarakter mulia, dan siap bersaing di pasar kerja maupun berwirausaha mandiri."}'
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES (
  'mitra_industri',
  '[{"id": "1", "name": "Kementerian Pendidikan", "subtitle": "", "isPink": false}, {"id": "2", "name": "Industri Kosmetik Nasional", "subtitle": "", "isPink": true}, {"id": "3", "name": "Asosiasi Spa Indonesia", "subtitle": "", "isPink": false}, {"id": "4", "name": "LSP Kecantikan", "subtitle": "", "isPink": true}, {"id": "5", "name": "Dinas Pariwisata", "subtitle": "", "isPink": false}]'
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES (
  'faqs',
  '[{"id": "1", "question": "Apakah lulusan tata kecantikan & spa dijamin mendapatkan pekerjaan?", "answer": "Lulusan kami sangat diminati oleh industri salon, spa, dan klinik kecantikan (DUDI). Melalui Bursa Kerja Khusus (BKK) SMK Negeri 1 Pekalongan, kami secara rutin menyalurkan lulusan terbaik ke berbagai mitra industri. Selain itu, kurikulum kewirausahaan kami juga membekali siswa untuk mandiri."}, {"id": "2", "question": "Sertifikasi kompetensi apa saja yang akan didapatkan siswa?", "answer": "Selain ijazah resmi, lulusan akan mendapatkan Sertifikat Kompetensi dari BNSP melalui Lembaga Sertifikasi Profesi (LSP-P1) pihak pertama yang ada di sekolah, yang diakui secara nasional oleh industri kecantikan."}, {"id": "3", "question": "Fasilitas praktik apa saja yang tersedia di jurusan ini?", "answer": "Kami memiliki fasilitas Teaching Factory bernama Eduspa Klinik yang didesain berstandar industri. Fasilitas ini mencakup ruang perawatan wajah (facial), perawatan rambut (hair dressing), perawatan badan (body spa), dan alat kosmetologi modern."}, {"id": "4", "question": "Apakah jurusan kecantikan hanya untuk siswa perempuan?", "answer": "Tidak. Jurusan tata kecantikan terbuka untuk siswa laki-laki maupun perempuan. Industri kecantikan, MUA, dan hair styling profesional saat ini banyak membutuhkan tenaga ahli dari berbagai latar belakang."}]'
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO facilities (name, description, capacity, status, image_urls) VALUES 
('Studio Tata Rias & Kosmetika', 'Dilengkapi dengan meja rias profesional, cermin besar berlampu (vanity mirror), kosmetik standar industri, serta kursi rias hidrolik untuk praktik makeup panggung, pengantin, dan karakter.', '20 Orang', 'Aktif', ARRAY['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800']),
('Salon Tata Kecantikan Rambut', 'Menyediakan peralatan lengkap seperti hair dryer, catokan, pengeriting rambut, area pencucian rambut (shampoo basin), manekin praktik, serta obat penataan rambut untuk belajar hair styling, cutting, maupun coloring.', '20 Orang', 'Aktif', ARRAY['https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800']),
('Ruang Praktik Perawatan Kulit (Skin Care Clinic)', 'Area khusus bernuansa klinis yang dilengkapi tempat tidur perawatan (facial bed), alat uap wajah (facial steamer), serta perangkat perawatan wajah modern lainnya.', '20 Orang', 'Aktif', ARRAY['https://images.unsplash.com/photo-1521590832167-7bcbfeac2531?q=80&w=800']),
('Studio Perawatan Spa (Spa Room)', 'Dilengkapi kasur spa, aromaterapi, perlengkapan lulur/pijat tradisional, hingga area khusus untuk praktik tren perawatan terbaru seperti Mom and Baby Treatment.', '20 Orang', 'Aktif', ARRAY['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800']);
