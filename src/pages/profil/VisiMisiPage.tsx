import React, { useEffect } from 'react';

export default function VisiMisiPage() {
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
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">VISI MISI JURUSAN</h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Tujuan dan pedoman utama dalam membangun generasi cerdas, berkarakter, dan kompeten di bidang kecantikan.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-8 text-slate-700">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Visi :</h3>
              <p className="text-base leading-relaxed">
                Unggul dalam IPTEK, Mantap dalam IMTAQ, Berbudaya Lingkungan dan Berjiwa Wirausaha.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Misi :</h3>
              <ol className="list-decimal pl-5 space-y-3 text-base leading-relaxed">
                <li>Mewujudkan kurikulum yang berwawasan IPTEK, IMTAQ, Budaya Lingkungan dan Wirausaha.</li>
                <li>Mewujudkan pembelajaran yang kreatif, inovatif, dan inspiratif.</li>
                <li>Mewujudkan Sumber Daya Guru yang berkualitas dibidang kecantikan.</li>
                <li>Mewujudkan lulusan yang berdaya saing tinggi dan siap kerja di industri.</li>
                <li>Menyediakan sarana dan prasarana praktik yang setara dengan industri salon dan spa.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
