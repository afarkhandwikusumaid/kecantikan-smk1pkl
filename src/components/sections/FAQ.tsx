import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: 'faq-1',
      question: 'Apakah lulusan Jurusan Tata Kecantikan & Spa hanya bisa bekerja di salon biasa?',
      answer: 'Tentu tidak. Lulusan kami memiliki jangkauan karir yang sangat luas dan berkelas. Selain wirausaha mandiri salon, alumni terserap menjadi asisten klinis/terapis dermal di klinik kecantikan medis terakreditasi (bekerja sama dengan dokter spesialis kulit/dermatolog), senior wellness therapis di hotel atau resor bintang 5, penata rias profesional (MUA) bridal/fashion, hingga formulator produk kosmetika.'
    },
    {
      id: 'faq-2',
      question: 'Apa perbedaan mendasar jurusan ini dengan tata rias artis biasa?',
      answer: 'Jurusan Tata Kecantikan Kulit & Spa kami berfokus seimbang pada sains kecantikan (anatomi kulit, analisis kecocokan kosmetik harian, kelainan dermatologis ringan), terapi spa tubuh tradisional nusantara (hidroterapi dan sauna uap herbal), penggunaan alat kecantikan kelistrikan modern (High Frequency ozon, galvanic iontophoresis, ultrasound), baru kemudian ditunjang pangkas rambut artistik dan rias pengantin.'
    },
    {
      id: 'faq-3',
      question: 'Bagaimana siswa melakukan unjuk praktik kerja industri?',
      answer: 'Siswa kelas XII wajib mengikuti program magang / Praktik Kerja Lapangan (PKL) terstruktur selama beberapa bulan di institusi mitra komersial terpercaya seperti Martha Tilaar Salon & Day Spa, Mustika Ratu, Larissa Aesthetic Center, atau klinik kecantikan medis modern lainnya untuk melatih kesiapan mental kerja riil (hospitality excellence).'
    },
    {
      id: 'faq-4',
      question: 'Apakah sertifikasi kompetensi BNSP yang diperoleh lulusan resmi?',
      answer: 'Sangat resmi. Sekolah kami merupakan penyelenggara mandiri berlisensi LSP-P1 resmi dari BNSP (Badan Nasional Sertifikasi Profesi) Indonesia. Ujian kompetensi dinilai langsung oleh tim asesor eksternal bersertifikat. Lulusan akan menerima sertifikat berlambang Garuda Emas yang menjadi bukti keahlian hukum kuat untuk melamar pekerjaan.'
    },
    {
      id: 'faq-5',
      question: 'Bagaimana sistem Teaching Factory (TEFA) di Eduspa Salon dijalankan?',
      answer: 'Eduspa Salon merupakan perwujudan Living Lab sekolah. Di sini, siswa diajarkan simulasi operasional bisnis salon kecantikan komersial sesungguhnya. Siswa melayani pelanggan umum Pekalongan (seperti perawatan facial manual, creambath rambut, nail art, manicure-pedicure, lulur rempah) di bawah bimbingan guru ahli pembina sehingga terbentuk jiwa wirausaha mandiri.'
    }
  ]);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const { data } = await supabase.from('site_settings').select('value').eq('key', 'faqs').single();
        if (data && data.value) setFaqItems(data.value as FAQItem[]);
      } catch (err) { console.error(err); }
    }
    fetchFaqs();
  }, []);


  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 bg-gradient-to-b from-white to-[#faf6f8]/40 border-t border-b border-pink-100/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-pink-50 border border-pink-100 text-pink-600 px-3.5 py-1.5 rounded-full text-sm font-extrabold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TANYA JAWAB UMUM</span>
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-serif font-bold text-gray-990 leading-tight">
            Pertanyaan Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            Menjawab keraguan dan pertanyaan umum calon siswa serta wali murid mengenai konsentrasi keahlian Tata Kecantikan Kulit &amp; Spa.
          </p>
        </div>

        {/* Minimalist Interactive Accordions */}
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div 
              key={item.id} 
              id={`faq-item-${item.id}`}
              className="bg-white border border-pink-100 rounded-2xl overflow-hidden shadow-2xs hover:border-pink-300 transition-all duration-300"
            >
              <button
                id={`faq-btn-${item.id}`}
                onClick={() => toggleFAQ(item.id)}
                className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4 font-sans focus:outline-none cursor-pointer group"
              >
                <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors leading-snug">
                  {item.question}
                </span>
                <span className="p-1 bg-pink-50/50 rounded-lg group-hover:bg-pink-50 transition-colors shrink-0">
                  {openId === item.id ? (
                    <ChevronUp className="w-4 h-4 text-pink-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-pink-600" />
                  )}
                </span>
              </button>

              {/* Collapsible Content */}
              <div 
                id={`faq-answer-${item.id}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openId === item.id ? 'max-h-60 opacity-100 border-t border-pink-50' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 sm:px-6 py-4 bg-pink-50/5">
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal font-sans">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support note */}
        <div className="mt-8 text-center bg-pink-50/10 border border-pink-100/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-sans">
          <span className="flex items-center space-x-1.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span>Punya pertanyaan khusus yang belum terjawab?</span>
          </span>
          <span className="font-bold text-pink-600 flex items-center space-x-1 shrink-0">
            <span>Tanya admin di bawah</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>
    </section>
  );
}
