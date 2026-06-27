// Centralized academic data and activity documentation for SMKN 1 Pekalongan - Tata Kecantikan Kulit & Spa
// Structured according to formal Indonesian school systems mimicking prestigious sites like sti.dinus.id

// 1. Legal Bases (Dasar Hukum)
export interface LegalBasis {
  id: string;
  title: string;
  source: string;
  desc: string;
  regulationNo?: string;
  year: string;
}

export const legalBases: LegalBasis[] = [
  {
    id: 'law-1',
    title: 'Undang-Undang Sistem Pendidikan Nasional',
    source: 'Lembaran Negara Republik Indonesia',
    regulationNo: 'UU No. 20 Tahun 2003',
    year: '2003',
    desc: 'Menjadi landasan pokok penyelenggaraan pendidikan nasional yang mengamanatkan penguatan pendidikan vokasi keahlian guna membentuk tenaga kerja Indonesia yang terampil, berdaya saing, dan berakhlak mulia.'
  },
  {
    id: 'law-2',
    title: 'Peraturan Presiden Penyinkronan Vokasi',
    source: 'Perpres Republik Indonesia',
    regulationNo: 'Perpres No. 68 Tahun 2022',
    year: '2022',
    desc: 'Tentang Revitalisasi Pendidikan Vokasi dan Pelatihan Vokasi nasional, mewajibkan keselarasan (link and match) kurikulum satuan pendidikan menengah kejuruan dengan kebutuhan riil Dunia Usaha, Dunia Industri, dan Dunia Kerja (DUDI).'
  },
  {
    id: 'law-3',
    title: 'Pedoman Struktur Kurikulum Merdeka Vokasi',
    source: 'Keputusan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi',
    regulationNo: 'Permendikbudristek No. 56/M/2022',
    year: '2022',
    desc: 'Pedoman penerapan kurikulum dalam rangka pemulihan pembelajaran, memberikan hak fleksibilitas pengaturan jam pelajaran serta proyek penguatan profil pelajar pancasila (P5) pada konsentrasi kejuruan.'
  },
  {
    id: 'law-4',
    title: 'Standar Kompetensi Kerja Nasional Indonesia (SKKNI) Kecantikan',
    source: 'Keputusan Menteri Ketenagakerjaan Republik Indonesia',
    regulationNo: 'Kepmenaker No. KEP.141/MEN/IV/2021',
    year: '2021',
    desc: 'Menyangkut penetapan standar kualifikasi kompetensi profesi kecantikan kulit, tata rias wajah artistik, serta terapi spa tradisional nusantara yang diadopsi secara mutlak dalam pembelajaran produktif.'
  },
  {
    id: 'law-5',
    title: 'Instruksi Presiden tentang Revitalisasi SMK',
    source: 'Instruksi Presiden Republik Indonesia',
    regulationNo: 'Inpres No. 9 Tahun 2016',
    year: '2016',
    desc: 'Menginstruksikan kementerian terkait untuk meningkatkan kualitas lulusan SMK yang meliputi keahlian penguasaan laboratorium serta sertifikasi kompetensi keahlian tersertifikasi BNSP.'
  }
];

// 2. Curriculum Foundations (Landasan Kurikulum)
export interface CurriculumFoundation {
  id: string;
  title: string;
  desc: string;
  implementationDetail: string;
}

export const curriculumFoundations: CurriculumFoundation[] = [
  {
    id: 'found-1',
    title: 'Landasan Filosofis Vokasional',
    desc: 'Mencakup pemikiran bahwa pendidikan kejuruan harus memadukan keselarasan rasa artistik, integritas moral, serta kehalusan tata pergaulan keramahan (hospitality).',
    implementationDetail: 'Diinternalisasikan dalam modul etika pelayanan salon kecantikan (Beauty Service Excellence) dan adab kerja profesional.'
  },
  {
    id: 'found-2',
    title: 'Landasan Sosiologis-Komersial',
    desc: 'Menjawab tantangan demografi serta tingginya konsumsi publik wilayah tropis terhadap jasa estetika klinis, industri wellness rileksasi, dan produk kosmetika bersertifikasi aman.',
    implementationDetail: 'Kurikulum didesain responsif terhadap tren kosmetologi terapan terkini agar lulusan tidak gagap terhadap tuntutan pasar.'
  },
  {
    id: 'found-3',
    title: 'Landasan Psikopedagogis Terapan',
    desc: 'Pendidikan berbasis pengalaman nyata (experiential learning) dengan pendekatan laboratorium terintegrasi Teaching Factory (TEFA) sebagai sarana penumbuh mental spiritual wirausaha mandiri.',
    implementationDetail: 'Siswa belajar langsung dalam iklim usaha riil melalui pelayanan konsumen umum Pekalongan secara terbimbing di Eduspa Salon.'
  },
  {
    id: 'found-4',
    title: 'Landasan Teknologis & Keilmuan',
    desc: 'Mengintegrasikan perkembangan sains teknologi dermal elektrostatis, pemanfaatan zat aktif herbal kosmetis, serta teknik digital marketing industri estetika.',
    implementationDetail: 'Penyediaan modul khusus penggunaan peralatan kosmetik berbasis arus listrik frekuensi tinggi dan gelombang suara.'
  }
];

// 3. Curriculum Course Syllabus (Mata Pelajaran Produktif)
export interface SyllabusItem {
  code: string;
  name: string;
  hrs: string; // JP
  category: 'Dasar' | 'Konsentrasi' | 'Ekspertis/Magang';
  desc: string;
  skillsAcquired: string[];
}

export const curriculumSyllabus = {
  X: [
    {
      code: 'MK-KEC-101',
      name: 'Anatomi & Fisiologi Kulit Dasar',
      hrs: '144 JP',
      category: 'Dasar' as const,
      desc: 'Pemahaman komprehensif tentang struktur jaringan epitel, anatomi pori-pori, siklus regenerasi melanin, kelenjar sebasea, dan teknik diagnosis tipe kulit wajah.',
      skillsAcquired: ['Analisis tipe kulit wajah (tropis/berminyak/kering)', 'Identifikasi kelainan patologis dermal awal', 'Penyusunan kosmetik kecocokan kulit']
    },
    {
      code: 'MK-KEC-102',
      name: 'Sanitasi Higiene, Sterilisasi & Keselamatan Kerja',
      hrs: '72 JP',
      category: 'Dasar' as const,
      desc: 'Metodologi sterilisasi higienis instrumen kerja (autoclave/sinar UV), pembersihan sanitair salon, aplikasi K3, serta pertolongan pertama kecelakaan kerja estetika.',
      skillsAcquired: ['Aseptis & desinfeksi peralatan modern', 'Penerapan sterilisasi alat ekstraksi komedo', 'SOP sterilisasi ruang treatment']
    },
    {
      code: 'MK-KEC-103',
      name: 'Dasar Kosmetologi Tropis & Formulasi Kimia',
      hrs: '108 JP',
      category: 'Dasar' as const,
      desc: 'Pembelajaran kandungan senyawa aktif kosmetik (AHA, BHA, Niacinamide, Retinol), pH sediaan emulsi, kelarutan minyak esensial, serta deteksi bahan dilarang merkuri.',
      skillsAcquired: ['Deteksi kontaminasi zat berbahaya dasar', 'Formulasi sediaan lulur organik personal', 'Pengukuran stabilitas emulsi krim']
    },
    {
      code: 'MK-KEC-104',
      name: 'Perawatan Kulit Wajah (Facial Manual)',
      hrs: '180 JP',
      category: 'Dasar' as const,
      desc: 'Praktik pembersihan wajah mendalam ganda (double cleansing), massage relaksasi teknik effleurage & petrissage, ekstraksi komedo ringan, dan pencampuran masker.',
      skillsAcquired: ['Teknik pijat limfatik wajah standar Eropa', 'SOP ekstraksi komedo higienis', 'Aplikasi masker gel/clay/peel-off']
    },
    {
      code: 'MK-KEC-105',
      name: 'Perawatan Tangan & Kaki (Manicure & Pedicure)',
      hrs: '108 JP',
      category: 'Dasar' as const,
      desc: 'Studi pembersihan kuku tangan dan kaki, kikir kontur kuku, eliminasi kutikula mati, pijat refleksi sirkulasi kaki, serta dasar dekorasi seni kuku (Nail Art).',
      skillsAcquired: ['Teknik kikir kuku fisiologis', 'Perawatan tumit pecah-pecah medis', 'Aplikasi kuteks gel UV & seni lukis kuku']
    }
  ],
  XI: [
    {
      code: 'MK-KEC-201',
      name: 'Pemangkasan & Pewarnaan Rambut Artistik',
      hrs: '216 JP',
      category: 'Konsentrasi' as const,
      desc: 'Implementasi teknik potong geometri kelas dunia (model Pivot Point), pangkas rambut gradasi (shaggy/layer), pewarnaan artistik modern teknik balayage, ombre, dan bleaching aman.',
      skillsAcquired: ['Pemotongan rambut simetris presisi tinggi', 'Bleaching rambut dengan perlindungan keratin', 'Aplikasi tone warna pantone estetik']
    },
    {
      code: 'MK-KEC-202',
      name: 'Rias Pengantin Adat Tradisional Jawa Tengah',
      hrs: '180 JP',
      category: 'Konsentrasi' as const,
      desc: 'Seni tingkat tinggi membuat cengkorongan paes ageng, pembuatan lulur kerikan rambut dahi pengantin putri adat Solo Putri & Jogja Putri, serta sanggul lulur melati.',
      skillsAcquired: ['Pembuatan lulur paes hitam presisi simetris', 'Penataan sanggul bangun tulak srimanganti', 'Pemasangan hiasan cunduk mentul pengantin']
    },
    {
      code: 'MK-KEC-203',
      name: 'Terapi Spa Tubuh & Hidroterapi Keraton',
      hrs: '180 JP',
      category: 'Konsentrasi' as const,
      desc: 'Penerapan pijat lulur keraton tradisional (Javanese heritages body massage), scrubbing boreh Bali hangat, sauna ragi mandi uap herbal, totok aura jalur meridian wajah.',
      skillsAcquired: ['Penguasaan ritme pijat relaksasi tubuh utuh', 'Terapi mandi rempah uap detoksifikasi', 'Totok wajah penstabil kelenjar sinus']
    },
    {
      code: 'MK-KEC-204',
      name: 'Teknologi Dermal Kelistrikan Estetika',
      hrs: '144 JP',
      category: 'Konsentrasi' as const,
      desc: 'Sinkronisasi penggunaan alat elektronik medik dasar salon: High Frequency ozonisasi jerawat, galvanic iontophoresis penyerapan serum, serta ultrasound lifting kulit.',
      skillsAcquired: ['Operasi mesin elektro-dermal frekuensi tinggi', 'Penyaluran penetrasi serum vitamin C via kation', 'SOP terapi ultrasound peremajaan kulit']
    }
  ],
  XII: [
    {
      code: 'MK-KEC-301',
      name: 'Rias Fantasi, Prostetik & FX Makeup',
      hrs: '180 JP',
      category: 'Ekspertis/Magang' as const,
      desc: 'Pembelajaran tingkat lanjut penataan rias wajah fantasi bertema teatrikal, lukis wajah (body painting), pembuatan organ kulit tiruan latex untuk efek film bioskop (SFX).',
      skillsAcquired: ['Pembuatan organ luka palsu silikon/lateks', 'Desain makeup karakter teater kolosal', 'Rias wajah fantasi abstrak panggung']
    },
    {
      code: 'MK-KEC-302',
      name: 'Dermal Assistant Clinic Internship (PKL)',
      hrs: '280 JP',
      category: 'Ekspertis/Magang' as const,
      desc: 'Program Praktik Kerja Lapangan (PKL) terstruktur di klinik kecantikan estetika modern yang terafiliasi dengan dokter kulit kecantikan sebagai asisten operasional.',
      skillsAcquired: ['Manajemen sterilitas ruang bedah dermato-estetis', 'Konseling tipe kulit pelanggan klinis', 'Asistensi dokter dalam tindakan non-invasif']
    },
    {
      code: 'MK-KEC-303',
      name: 'Manajemen Bisnis Salon & Pemasaran Digital',
      hrs: '144 JP',
      category: 'Ekspertis/Magang' as const,
      desc: 'Uraian pendirian badan usaha salon kecantikan kelas menengah, manajemen gaji komisi staf, pembukuan kasir terkomputerisasi, serta kampanye iklan digital kecantikan.',
      skillsAcquired: ['Rancangan business model canvas salon kecantikan', 'Analisis arus kas kasir digital', 'Optimasi iklan media sosial salon spesifik']
    }
  ]
};

// 4. Graduate Career Profiles (Profil Lulusan)
export interface CareerProfile {
  title: string;
  salary: string;
  growth: string;
  desc: string;
  tags: string[];
  industrialPartners: string[];
}

export const careerProfiles: CareerProfile[] = [
  {
    title: 'Medical Aesthetician / Dermal Therapist Helper',
    salary: 'Rp 4,5 Juta - Rp 8,5 Juta / bulan',
    growth: 'Sangat Tinggi (Lulusan Selalu Terserap Habis)',
    desc: 'Bekerja secara sinergis profesional membantu dokter spesialis kulit di berbagai klinik kecantikan medis terakreditasi nasional, mengoperasikan mesin laser dermal dasar, facial cleansing klinis, serta memberikan rekomendasi skincare.',
    tags: ['Klinik Estetika Medik', 'Aesthetic Consultant', 'Clinical Helper'],
    industrialPartners: ['Erha Clinic Group', 'Naavagreen Estetika', 'Skingame Center', 'Larissa Aesthetic Center']
  },
  {
    title: 'Senior Wellness Spa Lead & Aromatherapis',
    salary: 'Rp 5,5 Juta - Rp 12 Juta / bulan',
    growth: 'Kebutuhan Tinggi Sektor Pariwisata Resor Bintang 5',
    desc: 'Terapis tubuh premium bersertifikat BNSP nasional yang menguasai teknik pemijatan warisan budaya nusantara, hidroterapi, totok meridian wajah, serta peracikan aromaterapi herbal spesifik bagi wisatawan mancanegara.',
    tags: ['Hotels & Resors Bintang 5', 'Terapi Spa Tradisional', 'Wellness Director'],
    industrialPartners: ['Martha Tilaar Salon & Day Spa', 'Mustika Ratu Royal Spa', 'Plataran Resorts Bali', 'Alila Wellness Resor']
  },
  {
    title: 'Professional Creative Makeup Artist (MUA)',
    salary: 'Rp 5 Juta - Rp 45 Juta+ per Event Pernikahan',
    growth: 'Wirausaha Mandiri Kreatif',
    desc: 'Pengusaha rias wajah mandiri kelas atas yang menyajikan layanan makeup pengantin modern, riasan adat nusantara, tata rias komersial fotografi HD, hingga pengerjaan efek khusus (SFX) industri perfilman nasional.',
    tags: ['Bridal MUA', 'Special Effects Makeup', 'Personal Studio'],
    industrialPartners: ['Ivan Gunawan Cosmetics', 'Wardah Professional Teams', 'Himpunan Ahli Rias Pengantin HARPI Melati']
  },
  {
    title: 'Salon Entrepreneur (Beauty Salon Business Owner)',
    salary: 'Pendapatan Berbasis Profit Bisnis Mandiri',
    growth: 'Tahan Krisis Sektor Lifestyle',
    desc: 'Mendirikan dan memimpin jaringan studio kecantikan, salon potong rambut artistik, nail care, hingga klinik facial mandiri dengan keahlian kepemimpinan tim, manajemen margin keuntungan, serta manajemen retensi pelanggan.',
    tags: ['Owner Salon', 'Beauty Brandpreneur', 'Franchise Builder'],
    industrialPartners: ['Rudy Hadisuwarno Franchise Network', 'Persatuan Pengusaha Salon Indonesia (PPSI)']
  }
];

// 5. Activity Documentation (Dokumentasi Kegiatan Akademik & TEFA)
export interface ActivityDoc {
  id: string;
  title: string;
  date: string;
  category: 'Sertifikasi & Lisensi' | 'Sempro & Expo' | 'Seminar & Workshop' | 'Pengabdian Masyarakat' | 'Kemitraan DUDI';
  summary: string;
  description: string;
  imageUrl: string;
  writer: string;
  tags: string[];
  location: string;
}

export const activityDocs: ActivityDoc[] = [
  {
    id: 'act-1',
    title: 'Uji Sertifikasi Kompetensi Lisensi BNSP LSP-P1 Tata Rias & Perawatan Kulit',
    date: '12 Juni 2026',
    category: 'Sertifikasi & Lisensi',
    summary: 'Sebanyak 84 siswi tingkat akhir sukses menempuh ujian sertifikasi profesi resmi BNSP dengan asesor eksternal bersertifikat nasional.',
    description: 'Penyelenggaraan uji kompetensi ini dilakukan secara riil di TPA (Tempat Uji Kompetensi) Laboratorium Estetika Utama SMKN 1 Pekalongan. Siswi dinilai berdasarkan ketangkasan analisis kulit wajah menggunakan metode Woods Lamp, ketelatenan sterilisasi alat ekstraksi, serta keluwesan pijat wajah effleurage. Sertifikat kompetensi berlambang Garuda Emas dari BNSP ini menjadi senjata utama lulusan untuk langsung mendaftar sebagai staf ahli di jaringan klinik kecantikan premium papan atas.',
    imageUrl: '/images/photo-1522337360788-8b13dee7a37e.jpg',
    writer: 'Dra. Hj. Wahyu Astuti (Ketua Konsentrasi Keahlian)',
    tags: ['LSP-P1', 'BNSP', 'Kecantikan Kulit', 'Sertifikasi Resmi'],
    location: 'Lab Utama Kosmetologi Terapan, SMKN 1 Pekalongan'
  },
  {
    id: 'act-2',
    title: 'Pekan Raya Vokasi Cantik & Pameran Kosmetika Organik Racikan Siswi Kelas XII',
    date: '02 Juni 2026',
    category: 'Sempro & Expo',
    summary: 'Ajang peluncuran 12 merek kosmetika herbal organik hasil riset produk kreatif siswa berbakat, dihadiri Dinas Perindustrian Kota Pekalongan.',
    description: 'Ajang tahunan Pekan Raya Vokasi Cantik ini menyajikan galeri produk orisinil ciptaan siswi meliputi minyak pijat atsiri beraromaterapi kelor Pekalongan, sabun mandi transparan berbahan dasar ekstrak lidah buaya alami, serta bubuk lulur beras kencur keraton instan. Acara ini dihadiri perwakilan PT Mustika Ratu Tbk yang melakukan penilaian kelayakan kemasan serta uji sensoris kesukaan konsumen terhadap sediaan krim buatan siswi kami.',
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&q=80&w=800',
    writer: 'Budi Hartono, M.Pd. (Waka Kemitraan Hubin)',
    tags: ['Expo Vokasi', 'Produk Kreatif', 'Kewirausahaan Mandiri', 'Kosmetik Herbal'],
    location: 'Convention Center Aula SMKN 1 Pekalongan'
  },
  {
    id: 'act-3',
    title: 'Workshop Sinkronisasi Kurikulum Terapan & Beasiswa Rekrutmen Bersama Martha Tilaar Group',
    date: '24 Mei 2026',
    category: 'Kemitraan DUDI',
    summary: 'Penyelarasan kurikulum kecantikan kulit tropis berstandar salon komersial modern guna optimalisasi jaminan kerja pasca lulus.',
    description: 'Pertemuan strategis dewan guru SMKN 1 Pekalongan dengan Direktur Pelatihan PT Cantika Puspa Pesona (Martha Tilaar Group). Workshop ini melahirkan nota kesepakatan penyesuaian kompetensi pemotongan rambut Pivot Point terkini serta skema beasiswa ikatan dinas eksklusif untuk 10 wisudawati terbaik per tahun untuk langsung berkontribusi sebagai terapis spa Martha Tilaar seluruh Indonesia.',
    imageUrl: '/images/photo-1540555700478-4be289fbecef.jpg',
    writer: 'Sri Mulyani, S.Pd. (Sie Kurikulum)',
    tags: ['Link and Match', 'Martha Tilaar', 'Beasiswa Kerja', 'Sinkronisasi Industri'],
    location: 'Meeting Room Grand Pekalongan Hotel'
  },
  {
    id: 'act-4',
    title: 'Workshop Teknologi Kosmetologi Advance: Penggunaan Frekuensi Tinggi & Microcurrent Lifting',
    date: '10 Mei 2026',
    category: 'Seminar & Workshop',
    summary: 'Kursus singkat penguasaan elektro-dermal estetik menghadirkan dewan instruktur dokter spesialis kulit (Dermatologis) senior.',
    description: 'Guna menjawab maraknya klinik estetika canggih yang menggunakan peralatan kelistrikan dermal, sekolah menyelenggarakan workshop intensif penguasaan mesin High Frequency, Galvanic Iontophoresis, dan ultrasound skin scrubber. Siswi diajarkan metodologi keamanan listrik statis, kalibrasi daya pancar gelombang, serta indikasi medis yang dilarang bagi pasien berkelainan jantung atau ibu hamil.',
    imageUrl: '/images/photo-1512290923902-8a9f81dc236c.jpg',
    writer: 'dr. Farah Nabila, Sp.DVE (Instruktur Tamu Klinik Medis)',
    tags: ['Elektro-Dermal', 'Laser Dermal Helper', 'Skincare Medis', 'Teknologi Salon'],
    location: 'Lab Facial Medik Terpadu SMKN 1 Pekalongan'
  },
  {
    id: 'act-5',
    title: 'Aksi Sosial Pengabdian Masyarakat: Terapi Pijat Kursi Rileksasi Gratis untuk UMKM Kota Pekalongan',
    date: '19 April 2026',
    category: 'Pengabdian Masyarakat',
    summary: 'Siswa kelas XI menggelar layanan pijat pundak dan punggung rileksasi akupresur cuma-cuma bagi para perajin kain batik tulis.',
    description: 'Sebagai bagian dari penguatan profil pelajar pancasila berjiwa sosial, siswa jurusan Tata Kecantikan menyelenggarakan bakti sosial peduli kesehatan punggung perajin batik tulis. Para pembatik yang rentan mengalami nyeri otot kronis diberikan terapi massage aromaterapi kayu manis Pekalongan gratis untuk mengendurkan ketegangan urat bahu, sekaligus sosialisasi teknik postur duduk ergonomis saat membatik.',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac9283ca47?auto=format&fit=crop&q=80&w=800',
    writer: 'Rini Widowati, S.S.T (Koor Pengabdian Masyarakat)',
    tags: ['Bakti Sosial', 'Terapi Pijat Tradisional', 'UMKM Pekalongan', 'Peduli Batik'],
    location: 'Sentra Sentra Batik Kauman Pekalongan'
  }
];

// 6. News & Announcements list (Beranda widget)
export const homeNews = [
  {
    id: 'news-1',
    title: 'Sertifikasi Kompetensi Resmi BNSP LSP-P1 Jurusan Kecantikan Berjalan Khidmat',
    date: '12 Juni 2026',
    category: 'AKADEMIK',
    desc: 'Seluruh siswi tingkat akhir mengikuti rangkaian uji kompetensi terapan didampingi penguji asesor yang ketat dari BNSP Indonesia guna menjamin legalitas keahlian.'
  },
  {
    id: 'news-2',
    title: 'Siswa SMKN 1 Pekalongan Juara 1 LKS Bidang Beauty Therapy Karesidenan Pekalongan',
    date: '08 Juni 2026',
    category: 'PRESTASI',
    desc: 'Tim perwakilan sekolah menyabet medali emas dalam kompetisi bergengsi tahunan LKS dengan memamerkan kehalusan teknik massage tradisional modifikasi keraton nusantara.'
  },
  {
    id: 'news-3',
    title: 'Penyelarasan Kurikulum Vokasi Bersama Martha Tilaar Group & Mustika Ratu Tbk',
    date: '25 Mei 2026',
    category: 'KEMITRAAN',
    desc: 'Workshop tahunan sinkronisasi materi ajar berorientasi penyerapan kerja tinggi serta persiapan program beasiswa studi magang di industri kosmetik kecantikan nasional.'
  }
];
