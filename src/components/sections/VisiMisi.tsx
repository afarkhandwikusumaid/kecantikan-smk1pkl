import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface VisiMisiProps {
  onNavigate: (sectionId: string) => void;
}

const defaultVisi = "Menjadi pelopor pendidikan vokasi kecantikan dan spa di tingkat nasional yang menghasilkan lulusan unggul, mandiri, berjiwa wirausaha, serta menguasai integrasi teknologi kosmetologi tropis modern yang berkarakter mulia pada tahun 2030.";
const defaultMisi = [
  {
    title: "Penyelarasan Kurikulum Komprehensif (SKKNI)",
    desc: "Menyelenggarakan proses pembelajaran berkualitas tinggi dengan standar kosmetik industri kecantikan nasional."
  },
  {
    title: "Kemitraan Strategis Dunia Usaha (DUDI)",
    desc: "Menjalin kerja sama penempatan praktik kerja industri (prakerin) di PT Mustika Ratu, Martha Tilaar Group, dan klinik estetika terpercaya."
  },
  {
    title: "Penguatan Mental Kewirausahaan Tangguh",
    desc: "Membekali siswa kemandirian berbisnis, analisis kosmetik dasar, serta profesionalisme pelayanan prima."
  }
];

export default function VisiMisi({ onNavigate }: VisiMisiProps) {
  const [visiText, setVisiText] = useState(defaultVisi);
  const [misiList, setMisiList] = useState<{ title: string; desc: string }[]>(defaultMisi);

  useEffect(() => {
    const loadData = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'visi-misi'));
        if (snap.exists()) {
          const data = snap.data();
          if (data.visi) {
            setVisiText(data.visi);
          }
          if (data.misi && Array.isArray(data.misi) && data.misi.length > 0) {
            // If misi stored as array of strings, map them
            const mapped = data.misi.map((m: string, i: number) => {
              // Try to split on bold part if any, or just make it simple
              const parts = m.split(':');
              if (parts.length > 1) {
                return { title: parts[0].trim(), desc: parts.slice(1).join(':').trim() };
              }
              // Try to split on double spaces or other cues, otherwise use default headings
              const headings = [
                "Program Unggulan",
                "Karakter & Etika",
                "Kemitraan Industri",
                "Kewirausahaan Mandiri",
                "Kesiapan Kerja Vokasi",
                "Kompetensi Global",
                "Inovasi Estetika"
              ];
              return {
                title: headings[i] || `Misi Ke-${i + 1}`,
                desc: m
              };
            });
            setMisiList(mapped);
          }
        }
      } catch (err) {
        console.error("Error loading Visi Misi on frontend:", err);
      }
    };
    loadData();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#fffefe] border-t border-b border-pink-100/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-pink-50/50 blur-3xl opacity-50" />
        <div className="absolute bottom-[10%] -left-[10%] w-[30%] h-[40%] rounded-full bg-pink-100/40 blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <span className="text-[10px] tracking-[0.25em] font-extrabold text-pink-600 bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full uppercase">
            HALUAN AKADEMIK JURUSAN
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Visi, Misi &amp; Sasaran Strategis
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Menjaga kualitas kepemimpinan akademik dan kelulusan vokasi yang unggul sesuai dinamika dunia kerja modern.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visi Left Box (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 bg-gradient-to-tr from-pink-500 via-pink-600 to-pink-500 text-white rounded-[2.5rem] p-10 flex flex-col justify-between shadow-xl shadow-pink-500/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:scale-150" />
            <div className="space-y-6 relative z-10">
              <span className="text-[9px] border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest font-semibold inline-block backdrop-blur-sm bg-white/5">
                VISI UTAMA 2030
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Pelopor Tata Kecantikan Vokasi Nasional
              </h3>
              <p className="text-pink-50 text-sm leading-relaxed italic font-light pt-2">
                "{visiText}"
              </p>
            </div>
            <div className="pt-8 flex items-center space-x-2.5 border-t border-white/20 mt-8 relative z-10">
              <span className="text-[10px] font-bold text-pink-100 tracking-wider font-sans uppercase flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>SMK HEBAT - SMK BISA</span>
              </span>
            </div>
          </motion.div>

          {/* Misi & Tujuan Right Box (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-white/60 backdrop-blur-xl border border-pink-100 rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between shadow-xl shadow-pink-100/40 relative"
          >
            <div className="space-y-8">
              <div className="inline-block">
                <span className="text-[10px] tracking-[0.2em] font-extrabold text-pink-600 uppercase bg-pink-50 px-3 py-1 rounded-md">
                  MISI JURUSAN &amp; TUJUAN STRATEGIS
                </span>
              </div>

              <div className="space-y-6 text-sm text-gray-700">
                {misiList.map((m, idx) => (
                  <div key={idx} className="flex items-start space-x-4 group">
                    <div className="w-8 h-8 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-sm shrink-0 border border-pink-100 transition-transform duration-300 group-hover:scale-110 group-hover:bg-pink-100">
                      {idx + 1}
                    </div>
                    <div>
                      <strong className="text-gray-900 font-bold block text-base group-hover:text-pink-600 transition-colors">{m.title}</strong>
                      <span className="text-gray-500 text-sm leading-relaxed block mt-1">{m.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
              <button
                onClick={() => onNavigate('akademik')}
                className="text-sm font-bold text-pink-600 hover:text-pink-700 cursor-pointer flex items-center group transition-colors"
              >
                <span>Buka Lembar Kurikulum Rinci</span>
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </button>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider bg-gray-50 px-2 py-1 rounded">Berdasarkan Regulasi Ditjen Vokasi RI</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
