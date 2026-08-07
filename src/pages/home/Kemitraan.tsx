import React from 'react';

export default function Kemitraan() {
  const partners = [
    { name: 'Kementerian Pendidikan', initial: 'K' },
    { name: 'Industri Kosmetik Nasional', initial: 'I' },
    { name: 'Asosiasi Spa Indonesia', initial: 'A' },
    { name: 'LSP Kecantikan', initial: 'L' },
    { name: 'Dinas Pariwisata', initial: 'D' },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2">
            <span className="w-8 h-px bg-secondary/50"></span>
            <span className="text-xs font-bold text-secondary tracking-widest uppercase">Kolaborasi</span>
            <span className="w-8 h-px bg-secondary/50"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">MITRA INDUSTRI &amp; KERJASAMA</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Kami menjalin kerjasama dengan berbagai institusi dan dunia industri untuk memastikan kualitas pendidikan dan lulusan yang siap kerja.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center space-y-3 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="w-16 h-16 bg-white shadow-sm border border-slate-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-400">{partner.initial}</span>
              </div>
              <span className="text-sm font-medium text-slate-500">{partner.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
