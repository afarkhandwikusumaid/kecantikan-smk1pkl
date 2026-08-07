import React, { useEffect } from 'react';

export default function SejarahPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-16">
      {/* Page Header Outside Box */}
      <div className="text-center mb-8 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center justify-center space-x-2">
          <span className="w-8 h-px bg-secondary/50"></span>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">Profil Jurusan</span>
          <span className="w-8 h-px bg-secondary/50"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">SEJARAH SINGKAT</h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Mengenal lebih dekat perjalanan dan perkembangan kompetensi keahlian kami dari waktu ke waktu.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">
          <div className="prose prose-slate max-w-none text-slate-600">
            <p>
              SMK Negeri 1 Pekalongan merupakan salah satu sekolah vokasi unggulan di Kota Pekalongan yang berdedikasi tinggi dalam mencetak lulusan kompeten. Sejak didirikan, sekolah ini terus berkembang dalam menyediakan fasilitas pendidikan terbaik untuk mendukung kompetensi keahlian siswanya.
            </p>
            <p className="mt-4">
              Program Keahlian Tata Kecantikan & Spa menjadi salah satu pilar utama yang telah terakreditasi dan memiliki Teaching Factory (Eduspa Salon) yang berstandar industri, memberikan pengalaman praktik nyata bagi siswa. Seiring berkembangnya industri kecantikan, jurusan ini selalu menyesuaikan kurikulumnya agar relevan dengan tuntutan zaman.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
