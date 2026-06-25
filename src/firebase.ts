/**
 * firebase.ts — Pure FE Static Adapter
 * 
 * File ini menggantikan Firebase SDK dengan data statis in-memory.
 * Tidak ada koneksi jaringan, tidak ada localStorage, tidak ada database.
 * Semua operasi tulis (addDoc, updateDoc, deleteDoc, setDoc) adalah no-op silent.
 * Semua operasi baca (getDocs, getDoc) mengembalikan data default dari data statis.
 * Auth menggunakan state in-memory sederhana (reset saat halaman di-refresh).
 */

// ─── Static default data ───────────────────────────────────────────────────

const STATIC_DATA: Record<string, any[]> = {
  news: [
    { id: 'news-1', title: 'Sertifikasi Kompetensi Resmi BNSP LSP-P1 Jurusan Kecantikan Berjalan Khidmat', date: '2026-06-12', category: 'Akademik', desc: 'Seluruh siswi tingkat akhir mengikuti rangkaian uji kompetensi terapan didampingi penguji asesor yang ketat dari BNSP Indonesia guna menjamin legalitas keahlian.' },
    { id: 'news-2', title: 'Siswa SMKN 1 Pekalongan Juara 1 LKS Bidang Beauty Therapy Karesidenan Pekalongan', date: '2026-06-08', category: 'Prestasi', desc: 'Tim perwakilan sekolah menyabet medali emas dalam kompetisi bergengsi tahunan LKS dengan memamerkan kehalusan teknik massage tradisional modifikasi keraton nusantara.' },
    { id: 'news-3', title: 'Penyelarasan Kurikulum Vokasi Bersama Martha Tilaar Group & Mustika Ratu Tbk', date: '2026-05-25', category: 'Kemitraan', desc: 'Workshop tahunan sinkronisasi materi ajar berorientasi penyerapan kerja tinggi serta persiapan program beasiswa studi magang di industri kosmetik kecantikan nasional.' },
  ],

  gallery: [
    { id: 'proj1', title: 'Rias Pengantin Solo Putri Modifikasi', studentName: 'Fara Adelia Pramesti', grade: 'Kelas XII - Kecantikan 2', category: 'Prestasi', imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600', description: 'Mahakarya tata rias pengantin dengan Paes klasik gaya Surakarta Sala Putri, diberi sentuhan modern dewy look di bagian pipi.', productsUsed: ['Wardah Instaperfect Foundation', 'Mustika Ratu Paes Kit', 'Make Over Eyeshadow Palette'], achievementBadge: 'Juara 1 LKS Kota Pekalongan 2025', date: '2026-06-12' },
    { id: 'proj2', title: 'Sanggul Fantasi Siluet Lotus Mekar', studentName: 'Dian Wahyuni Ningtyas', grade: 'Kelas XII - Kecantikan 1', category: 'Fasilitas', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600', description: 'Desain penataan rambut avant-garde bermotif bunga lotus mekar mandiri di atas sanggul Jawa klasik.', productsUsed: ['Rudy Hadisuwarno Styling Spray', 'Makarizo Professional Hair Wax', "L'Oreal Elnett Satin"], achievementBadge: 'Juara Harapan 1 LKS Jawa Tengah 2025', date: '2026-06-12' },
    { id: 'proj3', title: 'Dermal Moisture-Lock bagi Kulit Dehidrasi', studentName: 'Amelia Saputri Hermawan', grade: 'Kelas XII - Kecantikan 2', category: 'Praktik', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600', description: 'Studi kasus klinis penanganan kulit wajah bersisik ekstrem akibat paparan AC berkepanjangan.', productsUsed: ['Martha Tilaar Professional Serum', 'Biokos Aloe Moisture Gel', 'Skin Food Alginate Powder'], date: '2026-06-12' },
    { id: 'proj4', title: 'Ramuan Scrub Boreh Rempah Kuning Pekalongan', studentName: 'Ratih Sukma Ningrum', grade: 'Kelas XI - Kecantikan 1', category: 'Kegiatan', imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', description: 'Formulasi scrub lulur basah organik menggabungkan rempah kencur Pekalongan, bubuk kopi Robusta, parutan kunyit, dan esens temulawak murni.', productsUsed: ['Bahan Alami Curcumae Radix', 'Minyak Zaitun Mustika Ratu', 'Aromaterapi Esensial Serai'], achievementBadge: 'Proyek Inovasi Ramuan Nusantara Terbaik', date: '2026-06-12' },
  ],

  facilities: [
    { id: 'lab1', name: 'Laboratorium Utama Kosmetologi Terapan', description: 'Laboratorium rias wajah dan perawatan kulit utama yang dilengkapi dengan 20 stasiun kerja hidrolik, cermin LED melingkar 3 arah, dan pencahayaan studio standar kompetensi nasional.', capacity: 'Kapasitas 20 Siswi', status: 'Aktif', image: 'https://images.unsplash.com/photo-1521590832167-7bcbfeac2531?q=80&w=800', equipment: ['Stasiun Kerja Hidrolik', 'Cermin Rias Studio LED', 'Alat Sterilisasi Autoclave'] },
    { id: 'lab2', name: 'Klinik Estetika & Teaching Factory Eduspa', description: 'Living laboratory untuk simulasi pelayanan konsumen riil. Dilengkapi dengan tempat tidur facial elektronik, mesin dermal High Frequency, Galvanic, dan Ultrasound skin scrubber.', capacity: 'Kapasitas 10 Bed', status: 'Aktif', image: 'https://images.unsplash.com/photo-1519823551278-64ac9283ca47?q=80&w=800', equipment: ['Electronic Facial Bed', 'Dermal High Frequency', 'Ultrasound Skin Scrubber'] },
    { id: 'lab3', name: 'Studio Hairdressing & Sanggul Kreatif', description: 'Laboratorium spesialis penataan rambut, cuci rambut, pemangkasan rambut modern, dan kreasi sanggul pengantin adat tradisional nusantara.', capacity: 'Kapasitas 25 Siswi', status: 'Aktif', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800', equipment: ['Hair Wash Chair', 'Styling Mirror Station', 'Sanggul Jawa & Aksesoris'] },
  ],

  teachers: [
    { id: 't1', name: 'Dra. Hj. Wahyu Astuti', nip: '19680312 199403 2 004', subject: 'Etika Pelayanan & Beauty Service Excellence', position: 'Ketua Konsentrasi Keahlian', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400' },
    { id: 't2', name: 'Sri Mulyani, S.Pd.', nip: '19750824 200212 2 003', subject: 'Anatomi Fisiologi Kulit & Formulasi Kosmetik', position: 'Sekretaris Jurusan / Dewan Guru Produktif', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400' },
    { id: 't3', name: 'Rini Widowati, S.S.T', nip: '19841102 201001 2 008', subject: 'Terapi Spa Tubuh & Pijat Tradisional Nusantara', position: 'Koordinator Unit TEFA Eduspa Salon', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400' },
  ],

  curriculum: [
    { id: 'c1', name: 'Dasar Kecantikan & Kosmetologi', description: 'Mempelajari dasar-dasar tipe kulit wajah, anatomi, sanitasi, higiene, K3, dan formulasi dasar kosmetik.', semester: 1 },
    { id: 'c2', name: 'Manicure, Pedicure & Nail Art', description: 'Teknik perawatan kuku tangan dan kaki secara fisiologis serta seni menghias kuku (Nail Art).', semester: 2 },
    { id: 'c3', name: 'Tata Rias Pengantin Tradisional Jawa', description: 'Penyusunan pakem cengkorongan paes ageng Solo dan Yogyakarta serta sanggul tradisional melati.', semester: 3 },
    { id: 'c4', name: 'Teknologi Kelistrikan Dermal Estetika', description: 'Praktik penggunaan mesin High Frequency, Galvanic, dan Ultrasound skin scrubber untuk peremajaan kulit.', semester: 4 },
    { id: 'c5', name: 'Praktik Kerja Lapangan (PKL) Klinik Estetika', description: 'Magang industri di klinik kecantikan estetika papan atas sebagai asisten dermal klinis terakreditasi.', semester: 5 },
    { id: 'c6', name: 'Digital Marketing & Manajemen Bisnis Salon', description: 'Mempelajari model bisnis canvas, pembukuan kasir digital, dan periklanan media sosial.', semester: 6 },
  ],

  partnerships: [
    { id: 'p1', name: 'Martha Tilaar', subtitle: 'GROUP', isPink: false },
    { id: 'p2', name: 'Mustika Ratu', subtitle: '', isPink: true },
    { id: 'p3', name: 'Wardah', subtitle: 'Cosmetics', isPink: false },
    { id: 'p4', name: 'BNSP LSP-P1', subtitle: '', isPink: false },
    { id: 'p5', name: 'Rudy Hadisuwarno', subtitle: '', isPink: true },
  ],

  alumni: [
    { id: 'a1', name: 'Adelia Setyowati', graduationYear: '2024', workplace: 'Erha Clinic Group Pekalongan (Aesthetician)', testimonial: 'Praktik di TEFA Eduspa Salon sangat membantu saya melatih mental menghadapi konsumen riil.' },
    { id: 'a2', name: 'Putri Rahayu', graduationYear: '2023', workplace: 'Martha Tilaar Salon & Day Spa Bali (Senior Therapist)', testimonial: 'Sertifikasi LSP-P1 BNSP yang difasilitasi sekolah diakui secara nasional. Begitu lulus, saya langsung ditempatkan di resor bintang 5 di Bali.' },
  ],

  achievements: [
    { id: 'ac1', studentName: 'Dian Wahyuni N.', type: 'LKS Bidang Beauty Therapy', level: 'Nasional', year: '2025', description: 'Juara Harapan 1 Tingkat Nasional Jawa Tengah dengan kreasi pijat rempah hangat.' },
    { id: 'ac2', studentName: 'Fara Adelia P.', type: 'LKS Bidang Beauty Therapy', level: 'Kota/Kab', year: '2025', description: 'Juara 1 Tingkat Karesidenan Pekalongan di bidang tata rias pengantin modifikasi Solo Putri.' },
  ],

  jobVacancies: [
    { id: 'j1', position: 'Beauty Consultant & Therapist', company: 'Larissa Aesthetic Center Pekalongan', location: 'Kota Pekalongan', deadline: '2026-08-30', description: 'Dibutuhkan alumni Jurusan Kecantikan SMKN 1 Pekalongan yang jujur, komunikatif, dan terampil dalam facial treatment.', status: 'Buka' },
    { id: 'j2', position: 'Aesthetician Assistant', company: 'Naavagreen Estetika', location: 'Kab. Batang', deadline: '2026-07-15', description: 'Membantu operasional treatment wajah dasar di bawah pengawasan dokter penanggung jawab klinik.', status: 'Buka' },
  ],
};

const STATIC_SETTINGS: Record<string, any> = {
  'visi-misi': {
    visi: 'Menjadi pelopor pendidikan vokasi kecantikan dan spa di tingkat nasional yang menghasilkan lulusan unggul, mandiri, berjiwa wirausaha, serta menguasai integrasi teknologi kosmetologi tropis modern yang berkarakter mulia pada tahun 2030.',
    misi: [
      'Penyelarasan Kurikulum Komprehensif (SKKNI): Menyelenggarakan proses pembelajaran berkualitas tinggi dengan standar kosmetik industri kecantikan nasional.',
      'Kemitraan Strategis Dunia Usaha (DUDI): Menjalin kerja sama penempatan praktik kerja industri di PT Mustika Ratu, Martha Tilaar Group, dan klinik estetika terpercaya.',
      'Penguatan Mental Kewirausahaan Tangguh: Membekali siswa kemandirian berbisnis, analisis kosmetik dasar, serta profesionalisme pelayanan prima.',
    ],
  },
  contact: {
    address: 'Jl. Landungsari No. 2, Pekalongan, Jawa Tengah',
    email: 'kecantikan@smkn1pekalongan.sch.id',
    phone: '+62 823-2898-1111',
  },
  social: {
    instagram: '@kecantikan_smk1pkl',
    youtube: 'Kecantikan SMKN 1 Pekalongan Official',
    tiktok: '@kecantikan_smk1pkl',
  },
};

// ─── Dummy export types (untuk kompatibilitas TypeScript) ───────────────────

export type User = { uid: string; email: string | null };

export const app = {};
export const db = {};
export const storage = {};
export const analytics = null;

export function initializeApp() { return app; }
export function getAuth() { return auth; }
export function getFirestore() { return db; }
export function getStorage() { return storage; }

// ─── In-memory Auth state ───────────────────────────────────────────────────

let _currentUser: User | null = null;
const _authListeners: Array<(user: User | null) => void> = [];

function _notifyListeners() {
  _authListeners.forEach(cb => cb(_currentUser));
}

export const auth = {
  get currentUser() { return _currentUser; }
};

export function onAuthStateChanged(_auth: any, callback: (user: User | null) => void): () => void {
  _authListeners.push(callback);
  // Kirim status saat ini secara async agar mirip Firebase
  setTimeout(() => callback(_currentUser), 0);
  return () => {
    const idx = _authListeners.indexOf(callback);
    if (idx !== -1) _authListeners.splice(idx, 1);
  };
}

export async function signInWithEmailAndPassword(_auth: any, email: string, _password: string) {
  // FE-only: terima semua email & password, tidak ada validasi
  _currentUser = { uid: 'static-admin', email };
  _notifyListeners();
  return { user: _currentUser };
}

export async function signOut(_auth: any) {
  _currentUser = null;
  _notifyListeners();
}

// ─── Reference Classes ─────────────────────────────────────────────────────

export class CollectionReference {
  constructor(public path: string) {}
}

export class DocumentReference {
  constructor(public path: string, public id: string) {}
}

// ─── Firestore API Stubs ───────────────────────────────────────────────────

export function collection(_db: any, path: string): CollectionReference {
  return new CollectionReference(path);
}

export function doc(parentOrDb: any, ...segments: string[]): DocumentReference {
  if (parentOrDb instanceof CollectionReference) {
    return new DocumentReference(parentOrDb.path, segments[0]);
  }
  // doc(db, 'collection', 'id')
  return new DocumentReference(segments[0], segments[1]);
}

export class QueryConstraint {
  constructor(public type: 'limit' | 'orderBy', public value: any) {}
}

export function limit(n: number): QueryConstraint {
  return new QueryConstraint('limit', n);
}

export function orderBy(field: string, dir: 'asc' | 'desc' = 'asc'): QueryConstraint {
  return new QueryConstraint('orderBy', { field, dir });
}

export class Query {
  constructor(public colRef: CollectionReference, public constraints: QueryConstraint[]) {}
}

export function query(colRef: CollectionReference, ...constraints: QueryConstraint[]): Query {
  return new Query(colRef, constraints);
}

/** Baca koleksi — kembalikan data statis */
export async function getDocs(ref: CollectionReference | Query) {
  const path = ref instanceof Query ? ref.colRef.path : ref.path;
  const constraints = ref instanceof Query ? ref.constraints : [];

  let rows: any[] = (STATIC_DATA[path] || []).map(item => ({ ...item }));

  const limitC = constraints.find(c => c.type === 'limit');
  if (limitC) rows = rows.slice(0, limitC.value);

  const orderByC = constraints.find(c => c.type === 'orderBy');
  if (orderByC) {
    const { field, dir } = orderByC.value;
    rows.sort((a, b) => {
      if (a[field] < b[field]) return dir === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return dir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const docs = rows.map(item => ({
    id: item.id,
    data: () => item,
  }));

  return {
    empty: docs.length === 0,
    size: docs.length,
    docs,
    forEach(cb: (d: any) => void) { docs.forEach(cb); },
  };
}

/** Baca dokumen tunggal — kembalikan data statis (settings) */
export async function getDoc(ref: DocumentReference) {
  let found: any = null;

  if (ref.path === 'settings') {
    found = STATIC_SETTINGS[ref.id] ?? null;
  } else {
    const rows = STATIC_DATA[ref.path] || [];
    found = rows.find(r => r.id === ref.id) ?? null;
  }

  return {
    exists: () => found !== null,
    data: () => found,
  };
}

// ─── Write stubs — silent no-op ────────────────────────────────────────────

/** No-op: tidak ada penyimpanan */
export async function addDoc(_ref: CollectionReference, _data: any) {
  return { id: `static-${Math.random().toString(36).slice(2)}` };
}

/** No-op: tidak ada penyimpanan */
export async function setDoc(_ref: DocumentReference, _data: any) {
  // silent no-op
}

/** No-op: tidak ada penyimpanan */
export async function updateDoc(_ref: DocumentReference, _data: any) {
  // silent no-op
}

/** No-op: tidak ada penyimpanan */
export async function deleteDoc(_ref: DocumentReference) {
  // silent no-op
}
