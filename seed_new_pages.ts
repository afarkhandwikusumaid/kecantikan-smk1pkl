import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log("Seeding default data...");

  const sejarahContent = {
    paragraphs: [
      "SMK Negeri 1 Pekalongan merupakan salah satu sekolah vokasi unggulan di Kota Pekalongan yang berdedikasi tinggi dalam mencetak lulusan kompeten. Sejak didirikan, sekolah ini terus berkembang dalam menyediakan fasilitas pendidikan terbaik untuk mendukung kompetensi keahlian siswanya.",
      "Program Keahlian Tata Kecantikan & Spa menjadi salah satu pilar utama yang telah terakreditasi dan memiliki Teaching Factory (Eduspa Salon) yang berstandar industri, memberikan pengalaman praktik nyata bagi siswa. Seiring berkembangnya industri kecantikan, jurusan ini selalu menyesuaikan kurikulumnya agar relevan dengan tuntutan zaman."
    ]
  };

  const akreditasiContent = {
    akreditasiText: "Program keahlian Tata Kecantikan Kulit dan Rambut telah meraih akreditasi A (Unggul) dari BAN-SM, menunjukkan kualitas standar pelayanan pendidikan yang sangat baik.",
    lisensiText: "Sekolah kami merupakan Lembaga Sertifikasi Profesi (LSP P1) yang terlisensi oleh BNSP untuk menguji dan menerbitkan sertifikat kompetensi nasional bagi lulusan.",
    sertifikatUrl: ""
  };

  const kurikulumContent = {
    paragraphs: [
      "Kurikulum Operasional Satuan Pendidikan (KOSP) pada Program Keahlian Tata Kecantikan & Spa merupakan pola dan susunan mata pelajaran yang harus ditempuh oleh peserta didik dalam kegiatan pembelajaran. Kedalaman muatan kurikulum pada setiap mata pelajaran pada setiap satuan pendidikan dituangkan dalam kompetensi yang harus dikuasai peserta didik sesuai dengan beban belajar yang tercantum dalam struktur kurikulum.",
      "Pengembangan kurikulum di program keahlian ini selalu diselaraskan dengan kebutuhan Dunia Usaha dan Dunia Industri (DUDI), khususnya di bidang estetika, tata rias, dan spa. Dinamika ini terjadi untuk menyesuaikan arah pendidikan dengan kebutuhan zaman, kemajuan teknologi alat kecantikan, dan tuntutan pelayanan jasa global."
    ],
    focusPoints: [
      "**Pendidikan Karakter & Etika Profesi :** Mengembangkan sikap (attitude) pelayanan pelanggan (hospitality) yang merupakan standar utama di industri jasa kecantikan.",
      "**Keterampilan Praktik (Hard Skills) :** Proporsi pembelajaran praktik mencapai lebih dari 60%, dilakukan di laboratorium dan Teaching Factory (Eduspa Klinik) yang sesuai dengan standar industri.",
      "**Sertifikasi Kompetensi :** Kurikulum dirancang agar di akhir masa studi, siswa siap mengikuti uji kompetensi oleh LSP (Lembaga Sertifikasi Profesi) P1 berlisensi BNSP."
    ]
  };

  const { error: err1 } = await supabase.from('site_settings').upsert(
    { key: 'sejarah', value: sejarahContent }, { onConflict: 'key' }
  );
  if (err1) console.error("Error sejarah:", err1);
  else console.log("Sejarah seeded.");

  const { error: err2 } = await supabase.from('site_settings').upsert(
    { key: 'akreditasi', value: akreditasiContent }, { onConflict: 'key' }
  );
  if (err2) console.error("Error akreditasi:", err2);
  else console.log("Akreditasi seeded.");

  const { error: err3 } = await supabase.from('site_settings').upsert(
    { key: 'kurikulum_text', value: kurikulumContent }, { onConflict: 'key' }
  );
  if (err3) console.error("Error kurikulum_text:", err3);
  else console.log("Kurikulum text seeded.");

  console.log("Seeding complete!");
}

seedData();
