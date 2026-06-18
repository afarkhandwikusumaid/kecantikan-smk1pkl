import React from 'react';
import { Quote, Award, ShieldCheck, Heart, Sparkles, GraduationCap } from 'lucide-react';

export default function Sambutan() {
  return (
    <section id="sambutan-ketua" className="py-20 md:py-24 bg-gradient-to-b from-white to-pink-50/20 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.25em] font-extrabold text-pink-600 uppercase bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">
            KATA PENGANTAR UTAMA
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
            Sambutan <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">Ketua Jurusan</span>
          </h2>
          <p className="text-sm text-gray-500 pt-2">
            Membangun generasi emas ahli kecantikan, kosmetologi, dan terapi wellness yang berkarakter, unggul, dan siap berwirausaha secara global.
          </p>
        </div>

        {/* content split card */}
        <div className="bg-white rounded-[2.5rem] border border-pink-100 shadow-[0_15px_50px_-20px_rgba(251,182,206,0.15)] p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
          
          {/* Subtle Decorative Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-pink-50/50 rounded-full blur-2xl -z-10 pointer-events-none" />
          
          {/* Portrait Column (5 cols) styled exactly like the UDINUS reference */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
            <div className="relative w-64 h-[22rem] sm:w-[20rem] sm:h-[26rem] flex flex-col justify-end">
              
              {/* Outer soft shadow glow shape behind the arch */}
              <div className="absolute inset-0 bg-pink-100/40 rounded-t-full rounded-b-[2rem] blur-xl -z-10" />

              {/* Elegant Arch Portrait Frame (UDINUS Reference Dome Shape) */}
              <div className="absolute inset-0 bg-pink-50 border-2 border-pink-150 rounded-t-full rounded-b-[2rem] overflow-hidden flex items-end justify-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800"
                  alt="Dra. Endang Sulastri, M.Pd."
                  className="w-full h-[95%] object-cover object-top filter contrast-102 saturate-95 pointer-events-none transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping Name and Role Card at the bottom (UDINUS Style, Pink Theme) */}
              <div className="relative mx-auto w-[90%] bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl py-3 px-4 shadow-xl text-center z-20 mb-4 border border-pink-400/30 transform hover:-translate-y-0.5 transition-transform duration-300">
                <h4 className="font-serif text-[13px] sm:text-[14px] font-black tracking-wide leading-tight uppercase">
                  Dra. Endang Sulastri, M.Pd.
                </h4>
                <p className="text-[10px] text-pink-100 font-extrabold uppercase tracking-widest mt-1">
                  Ketua Konsentrasi Keahlian (Kakomli)
                </p>
              </div>
            </div>

            {/* Credential Tags */}
            <div className="flex flex-wrap gap-2 justify-center pt-1">
              <span className="bg-pink-50 text-pink-700 text-[9px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-pink-100 flex items-center space-x-1 shadow-xs">
                <Award className="w-3.5 h-3.5 text-pink-500" />
                <span>Asesor BNSP</span>
              </span>
              <span className="bg-pink-50 text-pink-700 text-[9px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-pink-100 flex items-center space-x-1 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
                <span>Instruktur Industri</span>
              </span>
            </div>
          </div>

          {/* Greeting Speech text (7 cols) */}
          <div className="lg:col-span-7 space-y-6 relative">
            <Quote className="w-16 h-16 text-pink-100 absolute -top-8 -left-2 opacity-50 -z-10 pointer-events-none" />
            
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              <p className="font-medium text-gray-900 text-lg">
                Assalamu’alaikum Warahmatullahi Wabarakatuh,
              </p>
              <p>
                Selamat datang di platform digital resmi Konsentrasi Keahlian <span className="font-bold text-pink-600">Kecantikan dan Spa (Eduspa Academy)</span> SMK Negeri 1 Pekalongan. Kami sangat bangga memperkenalkan program vokasi unggulan yang didedikasikan untuk melahirkan talenta profesional masa depan di belantika industri kecantikan, kosmetologi medik dasar, dan manajemen terapis kecantikan tradisional maupun modern.
              </p>
              <p>
                Dunia kecantikan dan wellness saat ini berkembang menjadi industri estetika global berteknologi tinggi yang menjanjikan karir gemilang bagi generasi muda. Oleh karena itu, kurikulum kami diselaraskan secara penuh dengan Standar Industri Vokasi Nasional, bermitra erat dengan merek raksasa seperti <span className="font-semibold text-gray-800">Mustika Ratu</span>, <span className="font-semibold text-gray-800">Martha Tilaar</span>, dan berbagai klinik kecantikan estetika modern di Indonesia.
              </p>
              <p>
                Melalui bimbingan para guru profesional tersertifikasi BNSP serta ditunjang oleh sarana <span className="font-bold text-pink-500">Living Lab Eduspa Salon</span> komersial, siswi kami dibentuk tidak hanya memiliki ketangkasan tangan (hard skills) yang presisi, melainkan juga dibekali insting kewirausahaan yang tangguh (entrepreneurship mindset). Terima kasih telah mempercayakan pendidikan vokasi terbaik bersama kami.
              </p>
              <p className="font-medium text-gray-900 pt-2">
                Wassalamu’alaikum Warahmatullahi Wabarakatuh,
              </p>
            </div>

            {/* Signature & Closing */}
            <div className="pt-6 border-t border-pink-100 flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-pink-50/50 flex items-center justify-center text-pink-500 border border-pink-100">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-gray-800">KOMITMEN VOKASI MAJU</p>
                  <p className="text-[10px] text-gray-500">Mencetak SDM Kompeten &amp; Berkarakter Mulia</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-serif italic text-pink-600 text-lg font-bold leading-none">
                  Dra. Endang Sulastri
                </div>
                <div className="w-16 h-0.5 bg-pink-500 ml-auto my-1 rounded-sm" />
                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">
                  Ttd. Kepala Jurusan
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
