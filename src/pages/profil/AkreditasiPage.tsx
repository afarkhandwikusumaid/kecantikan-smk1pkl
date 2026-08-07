import React, { useEffect } from 'react';
import { Award, CheckCircle } from 'lucide-react';

export default function AkreditasiPage() {
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
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">AKREDITASI & SERTIFIKASI</h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Bukti komitmen kami dalam menjaga standar mutu pendidikan dan kualitas lulusan profesional.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-start space-x-4 p-6 border border-slate-100 rounded-lg bg-slate-50">
              <div className="w-12 h-12 rounded bg-primary-100 flex items-center justify-center shrink-0 border border-primary-200">
                <Award className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Akreditasi A (Unggul)</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Program keahlian Tata Kecantikan Kulit dan Rambut telah meraih akreditasi A (Unggul) dari BAN-SM, menunjukkan kualitas standar pelayanan pendidikan yang sangat baik.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-6 border border-slate-100 rounded-lg bg-slate-50">
              <div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Lisensi BNSP</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Sekolah kami merupakan Lembaga Sertifikasi Profesi (LSP P1) yang terlisensi oleh BNSP untuk menguji dan menerbitkan sertifikat kompetensi nasional bagi lulusan.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 mt-8">
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 text-center">Sertifikat Akreditasi</h3>
            <div className="max-w-2xl mx-auto border-4 border-slate-200 rounded p-2 bg-slate-100">
              {/* The user requested to "up gambar sertifikasi" here */}
              <div className="aspect-[4/3] bg-slate-300 flex flex-col items-center justify-center text-slate-500 rounded">
                <Award className="w-16 h-16 mb-4 text-slate-400" />
                <p className="font-medium">Gambar Sertifikat Akreditasi</p>
                <p className="text-sm">(Menunggu unggahan dari admin)</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
