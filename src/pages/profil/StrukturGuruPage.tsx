import React, { useEffect } from 'react';
import { Users } from 'lucide-react';

export default function StrukturGuruPage() {
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
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">STRUKTUR GURU & STAF</h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Mengenal para tenaga pendidik dan staf ahli yang berdedikasi membimbing generasi cerdas kecantikan.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border border-slate-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  <Users className="w-10 h-10 text-slate-400" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Nama Guru {item}</h4>
                <p className="text-sm text-slate-500 mt-1">Pengampu Produktif Kecantikan</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
