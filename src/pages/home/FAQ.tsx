import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Apakah lulusan tata kecantikan & spa dijamin mendapatkan pekerjaan?",
      answer: "Lulusan kami sangat diminati oleh industri salon, spa, dan klinik kecantikan (DUDI). Melalui Bursa Kerja Khusus (BKK) SMK Negeri 1 Pekalongan, kami secara rutin menyalurkan lulusan terbaik ke berbagai mitra industri. Selain itu, kurikulum kewirausahaan kami juga membekali siswa untuk mandiri."
    },
    {
      question: "Sertifikasi kompetensi apa saja yang akan didapatkan siswa?",
      answer: "Selain ijazah resmi, lulusan akan mendapatkan Sertifikat Kompetensi dari BNSP melalui Lembaga Sertifikasi Profesi (LSP-P1) pihak pertama yang ada di sekolah, yang diakui secara nasional oleh industri kecantikan."
    },
    {
      question: "Fasilitas praktik apa saja yang tersedia di jurusan ini?",
      answer: "Kami memiliki fasilitas Teaching Factory bernama Eduspa Klinik yang didesain berstandar industri. Fasilitas ini mencakup ruang perawatan wajah (facial), perawatan rambut (hair dressing), perawatan badan (body spa), dan alat kosmetologi modern."
    },
    {
      question: "Apakah jurusan kecantikan hanya untuk siswa perempuan?",
      answer: "Tidak. Jurusan tata kecantikan terbuka untuk siswa laki-laki maupun perempuan. Industri kecantikan, MUA, dan hair styling profesional saat ini banyak membutuhkan tenaga ahli dari berbagai latar belakang."
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2">
            <span className="w-8 h-px bg-secondary/50"></span>
            <span className="text-xs font-bold text-secondary tracking-widest uppercase">Bantuan</span>
            <span className="w-8 h-px bg-secondary/50"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">PERTANYAAN YANG SERING DIAJUKAN</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-slate-600">
            Informasi umum seputar Program Keahlian Kecantikan & Spa
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-secondary bg-white shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-slate-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-secondary shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
